import React, { useState, useEffect } from 'react';
import './App.css'

import postsService from './services/posts.js'
import Post from './components/Post'

import NavFilter from './components/NavFilter'
import NavTag from './components/NavTag'
import NavFoot from './components/NavFoot'

import ModalAbout from './components/ModalAbout'
import ModalNew from './components/ModalNew'

import Util from './utils/utils.js'
import Theme from './utils/theme.js'

import ReactLoading from 'react-loading'

function App() {

  const [loading, setLoading] = useState(true)

  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [tags, setTags] = useState([])

  const [showModalAbout, setShowModalAbout] = useState(false)
  const [showModalNew, setShowModalNew] = useState(false)

  /* 
  the flow of posts array to what is actually rendered is as such

  posts (list of all posts) 
    -> filterlist (if there is any filter (tag, status, type) applied)
      -> querylist (if there is any query (querybox) applied)
        -> displaylist (the final list that is rendered)
  */
  const [queryList, setQueryList] = useState([])
  const [displayList, setDisplayList] = useState([])

  useEffect(() => {
    postsService.getAll().then((res) => {
      setPosts(res.reverse())
      setTimeout(() => setLoading(false), 1500);
    })
    document.getElementById('tyea').focus()

    const theme = new Theme();
    theme.install(document.body);
    theme.start()
  }, [])

  const handleQuery = (e) => {
    setQuery(e.target.value)
  }

/*  debugging purposes to check current filter and query
   useEffect(() => {
    console.log('APP: filter is ',filter)
    console.log('APP: query is ',query)
  }, [filter, query]) */

  // filter (filter by tag, done status, type etc)
  const evalFilter = (filter) => {
    if(filter.slice(0,4) === 'type'){
      return posts.filter((p) =>
          p.type.toLowerCase().indexOf(filter.slice(5).toLowerCase()) !== -1
      )
    }else if(filter.slice(0,4) === 'done'){
        if(filter.slice(5) === 'true'){
          return posts.filter((p) =>
            p.status.toLowerCase().indexOf('done') !== -1
          )
        }else{
          return posts.filter((p) =>
            p.status.toLowerCase().indexOf('todo') !== -1
          )
        }
    }else if(filter.slice(0,3) === 'tag'){
      if (filter.slice(4) === 'undefined'){
        return posts.filter((f) => !f.tags).concat(
                 posts.filter((f) => f.tags).filter((p) => 
                  p.tags.includes('undefined')
                  // why would you manually include 'undefined?' but so it goes
            )
          )
      }
      // first get rid of posts that do not have tags
      return posts.filter((f) => f.tags).filter((p) => 
        p.tags.includes(filter.slice(4))
      )
    }
  }

  const filterList = filter
    ? evalFilter(filter)
    : posts

  // able to query (search bar) both in title and comment
  // i'm sorry for this mess... this is made up of three bits
  // 1) search within titles (check if each title contains INDEXOF query)
  // 2) search within comments (since comments can be undefined, first filter the 
  //    entire list to ONLY have posts with comments, then run same INDEXOF query)
  // 3) concat these two arrays, turn it into a Set (then array), to ensure unique vals

  useEffect(() => {
    if(query.length >= 3){
      setQueryList(
        [...new Set(filterList.filter((p) => 
          p.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        ).concat(filterList.filter((f) => f.comment).filter((p) => p.comment.findIndex(c => c.includes(query.toLowerCase())) !== -1) ) )]
      )
    } else {
      setQueryList(filterList)
    }
  }, [query, filter])



  const tagDict = {}
  // when posts are initialized, set up tagdict
  useEffect( () => {
    const tagArr = posts.map(p => p.tags)
    const flatTag = [].concat(...tagArr) // alternative to tagArr.flat()
    flatTag.forEach(el => tagDict[el] = 1  + (tagDict[el] || 0))
    let sortedTagArr = []
    Object.keys(tagDict).map(k => 
      sortedTagArr.push([k, tagDict[k]])
    )
    sortedTagArr.sort((a,b) => b[1]-a[1])
    setTags(sortedTagArr)
    /*
    reorder the posts based on width of the page, setting no. of columns
    */
    if (window.innerWidth < 768){
    setDisplayList(filterList)
    }else if (window.innerWidth < 1080){
    setDisplayList(Util.reorder(filterList,2))
    }else{
    setDisplayList(Util.reorder(filterList,3))
    }
    /*
      i put this here for the initial render of displaylist on pageload
      but i think this might be causing the weird masonry rerender issue
    */
    console.log('APP current window width is', window.innerWidth)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]) 

  const [input_focused, setInput_Focused] = useState(false);

  /*
  in order to have global shortcuts, the entire body element was
  .focus() so that onKeyDown events would work. 
  however, this also meant that text inputs would trigger the hotkey

  so we have to manage a state to check whether input boxes
  are being selected.

  libraries exist for hotkeys, but i wanted to keep it pure
  see more:

  https://chrispearce.co/blog/exploring-hotkeys-and-focus-in-react.html 
  */
  const handleKeyPress = (e) => {
    if (!input_focused){
      if(['a', 'h', '/', '?'].includes(e.key)){
        // do not show modal if other one is already open
        if(!showModalNew){
          setShowModalAbout(!showModalAbout);
          e.preventDefault();
        }
      }
      else if(['n', 'c', '=', '+'].includes(e.key)){
        if(!showModalAbout){
          setShowModalNew(!showModalNew);
          e.preventDefault();
        }
      }
    }
  }

/* DEBUG to debug modal keyboard shortcut issues
  
  useEffect(() => {
    console.log('APP.js CURRENT INPUT_FOCUSED:', input_focused)
  }, [input_focused])
 
*/

  useEffect(() => {
    /* 
    When queryList changes (the searchbox), rerender display list
    based on number of columns and any filters applied
    */
    /*
    TODO: I am very concerned that this will cause performance issues
    when rendering loads of content... 
    */
    if (window.innerWidth < 768){
    setDisplayList(queryList)
    }else if (window.innerWidth < 1080){
    setDisplayList(Util.reorder(queryList,2))
    }else{
    setDisplayList(Util.reorder(queryList,3))
    }
  }, [queryList])


  return (
    <div id="tyea" tabIndex={-1} 
          onKeyDown={(e) => handleKeyPress(e)}>
      <nav>
        <div className="nav-query">
          <input className="nav-querybox" type="text" value={query} tabIndex={1}
                 onChange={(e) => handleQuery(e)}
                 onClick={() => setInput_Focused(true)}
                 onFocus={() => setInput_Focused(true)}
                 onBlur={() => setInput_Focused(false)}/>
          <i className="nav-queryicon typcn typcn-zoom-outline"> </i>
        </div>

        <NavFilter filter={filter} setFilter={setFilter} posts={posts}/>
        <NavTag tags={tags} setFilter={setFilter}/>
        <NavFoot setShowModalAbout={setShowModalAbout} showModalAbout={showModalAbout}
                 setShowModalNew={setShowModalNew} showModalNew={showModalNew}/>
      </nav>
      {loading 
        ? <ReactLoading type={"cylon"} className="body-loader" />
        :
      <div id="body">
          {displayList.map(p => 
            <div className="block" key={p.title}> 
              <Post props={p} setFilter={setFilter} posts={posts} setPosts={setPosts} />
            </div>
          )}
        
      </div>
    }

      
      <ModalAbout setShowModalAbout={setShowModalAbout} showModalAbout={showModalAbout}
                setInput_Focused={setInput_Focused} posts={posts}/>
      <ModalNew setShowModalNew={setShowModalNew} showModalNew={showModalNew} posts={posts} setPosts={setPosts}
                setInput_Focused={setInput_Focused} input_focused={input_focused}/>
    </div>
  );
}

export default App;
