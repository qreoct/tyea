import React from 'react'
import Util from '../utils/utils.js'
import postsService from '../services/posts.js'

const Post = ({props, setFilter, posts, setPosts}) => {
	const title = props.title
	const url = props.url
	const date = props.date
	const tags = props.tags
	const comment = props.comment
	const status = props.status
	const type = props.type
	const breadcrumb = props.breadcrumb
	const id = props.id

	/*
	not sure if this is a potential issue here...? the hostname stuff
	is being called on every draw of Post. 

	is there a way to only call this Util once and tie it to
	the component?
	*/
	const dom = Util.extractRootDomain(url)

	const handleStatusUpdate = () => {
		postsService.update(id, props).then(
			(res) => {
				setPosts(posts.map(p => p.id !== id ? p : res))
			}
		);
	}

	let tagcontent
	if (tags.length > 1) {
		tagcontent = tags.map(t => 
			<a key={t} href={`#tag-${t}`} className="post-tag-indiv"
			 onClick={() => setFilter(`tag-${t}`)} >
			 {t}
			</a> 
		).reduce((prev, curr) => [prev, ', ', curr])
	} else if (tags.length === 1) {
		tagcontent = <a href={`#tag-${tags}`} className="post-tag-indiv"
					 onClick={() => setFilter(`tag-${tags}`)}>
					 {tags}
					</a>
	}

	let statusdesc
	if (status === "done") {
		statusdesc = <i title="done" className="typcn typcn-tick" 
						onClick={() => handleStatusUpdate() }> </i>
	} else {
		statusdesc = <i title="to do" className="typcn typcn-times"
						onClick={() => handleStatusUpdate() }> </i>
	}

	let typedesc
	switch(type){
		case("book"):
			typedesc = 
				<a href="#type-book" onClick={() => setFilter('type-book')}>
				<i title="book" className="typcn typcn-book"> </i>
				</a>
		break;
		case("video"):
			typedesc = 
				<a href="#type-video" onClick={() => setFilter('type-video')}>
				<i title="video" className="typcn typcn-video"> </i>
				</a>
		break;
		case("article"):
			typedesc = 
				<a href="#type-article" onClick={() => setFilter('type-article')}>
				<i title="article" className="typcn typcn-news"> </i>
				</a>
		break;
		case("podcast"):
			typedesc = 
				<a href="#type-podcast" onClick={() => setFilter('type-podcast')}>
				<i title="podcast" className="typcn typcn-microphone"> </i>
				</a>
		break;
		case("quote"):
			typedesc = 
				<a href="#type-quote" onClick={() => setFilter('type-quote')}>
				<i title="quote" className="typcn typcn-message"> </i>
				</a>
		break;
		default:
			typedesc = <i title="unknown" className="typcn typcn-warning"> </i>
		break;
	}

	return(
		<div>
			<div className="post-containerupper">
				<div className="post-linkarea">
					<a href={url}>
					<div className="post-posttitle"> <h3> {title} </h3> </div>
					<div className="post-link">
						<strong> /: </strong>
						<span className="post-linktitle">
							{dom}
						</span>
					</div>
					</a>
				</div>

				<div className="post-descarea">
					<div className="post-descicon post-descstatus"> {statusdesc} </div>
					<div className="post-descicon post-desctype"> {typedesc} </div>
				</div>
			</div>

			<div className="post-containerlower">

			<div className="post-row">
				<div className="post-date"> 
					<i className="typcn typcn-calendar-outline"> </i>
					{date} 
				</div>
			</div>

			{tags[0] !== undefined
				? 
				<div className="post-row">
					<div className="post-tags"> 
						<i className="typcn typcn-tag"> </i>
						{tagcontent}
					</div>
				</div> 
				: null
			}

			{comment 
				? comment.map(c => 
					<div className="post-row" key={c}>
						<div className="post-comment">
							<i className="typcn typcn-message"> </i>
							{c}
						</div>
					</div> 
					) 
				: null
			}


			{breadcrumb
				? 
				<div className="post-row">
					<div className="post-breadcrumb"> 
					<i className="typcn typcn-tree"> </i>
					{breadcrumb} </div>
				</div> 
				: null
			}
			</div>
		</div>
	)
}

export default Post