import React from 'react'

const NavFilter = ({filter, setFilter, posts}) => {

	const countLength = posts.length
	const doneLength = posts.filter(p => p.status === "done").length
	const todoLength = posts.filter(p => p.status === "todo").length
	const bookLength = posts.filter(p => p.type === "book").length
	const vidLength = posts.filter(p => p.type === "video").length
	const artiLength = posts.filter(p => p.type === "article").length
	const podLength = posts.filter(p => p.type === "podcast").length
	const quoteLength = posts.filter(p => p.type === "quote").length

	return(
        <div className="nav-filtercontainer">

          <div className="nav-filterALL">
          	<div className="nav-filterrow">
            <a href="#/" onClick={() => setFilter('')}>
            <div className="nav-filtercount"> {countLength} </div>
            <i title="all" className="nav-filtername typcn typcn-star"> </i>
            </a>
            </div>
          </div>

          <div className="nav-filterSTATUS">
          	<div className="nav-filterrow">
            <a href="#done-true" onClick={() => setFilter('done-true')}>
            <div className="nav-filtercount"> {doneLength} </div>
            <i title="done" className="nav-filtername typcn typcn-tick"> </i>
            </a>
            </div>

          	<div className="nav-filterrow">
            <a href="#done-false" onClick={() => setFilter('done-false')}>
            <div className="nav-filtercount"> {todoLength} </div>
            <i title="to do" className="nav-filtername typcn typcn-times"> </i>
            </a>
            </div>
          </div>

          	<div className="nav-filterrow">
            <a href="#type-book" onClick={(e) => setFilter('type-book')}>
            <div className="nav-filtercount"> {bookLength} </div>
            <i title="book" className="nav-filtername typcn typcn-book"> </i>
            </a>
            </div>

          	<div className="nav-filterrow">
            <a href="#type-video" onClick={(e) => setFilter('type-video')}>
            <div className="nav-filtercount"> {vidLength} </div>
            <i title="video" className="nav-filtername typcn typcn-video"> </i>
            </a>
            </div>

          	<div className="nav-filterrow">
            <a href="#type-article" onClick={(e) => setFilter('type-article')}>
            <div className="nav-filtercount"> {artiLength} </div>
            <i title="article" className="nav-filtername typcn typcn-news"> </i>
            </a>
            </div>

          	<div className="nav-filterrow">
            <a href="#type-podcast" onClick={(e) => setFilter('type-podcast')}>
            <div className="nav-filtercount"> {podLength} </div>
            <i title="podcast" className="nav-filtername typcn typcn-microphone"> </i>
            </a>
            </div>

          	<div className="nav-filterrow">
            <a href="#type-quote" onClick={(e) => setFilter('type-quote')}>
            <div className="nav-filtercount"> {quoteLength} </div>
            <i title="quote" className="nav-filtername typcn typcn-message"> </i>
            </a>
            </div>
        </div>
	)
}

export default NavFilter