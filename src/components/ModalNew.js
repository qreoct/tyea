import React, { useEffect, useState } from 'react'
import ModalNew_TagInput from './ModalNew_TagInput'
import ModalNew_CommentInput from './ModalNew_CommentInput'
import postsService from '../services/posts.js'

const ModalNew = ({setShowModalNew, showModalNew, setInput_Focused, input_focused, posts, setPosts}) => {
	useEffect(() => {
		if (showModalNew) {
			document.getElementById('modal').focus()
		}
	}, [showModalNew])

	const [submitted, setSubmitted] = useState(false)


	const [state, setState] = useState({
		title: "",
		url: "",
		breadcrumb: "",
		type: "",
		comment: [],
		tags: []
	})

	// Gleaned from https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
	const handleChange = (e) =>{
		const val = e.target.value;
		setState({
			...state,
			[e.target.name]: val
		})
	}

	if (!showModalNew) { return null }
	const displayModal = showModalNew 
						? "modal display-block" 
						: "modal display-none"

	const handleEsc = (e) => {
		if(!input_focused){
			if(['Escape', 'Esc', 'c', 'n', '=', '+'].includes(e.key)){
				setShowModalNew(false);
				setInput_Focused(false);
				// reset focus back to home on close
				document.getElementById('tyea').focus();
				e.preventDefault();
			}
		}else{
			if(['Escape', 'Esc'].includes(e.key)){
				setShowModalNew(false);
				setInput_Focused(false);
				// reset focus back to home on close
				document.getElementById('tyea').focus();
				e.preventDefault();
			}			
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('MODALNEW submitted! data:', state);
		postsService.create(state).then(
			(res) => {
				console.log("MODALNEW res is:", res)
				setPosts([...posts, res])
			}
		);
		setState({
			title: "",
			url: "",
			breadcrumb: "",
			type: "",
			comment: [],
			tags: []
		});
		setSubmitted(true)
		setInput_Focused(false)

	}

	const handleTag = (data) => {
		setState({
			...state,
			tags: data
		})
	}
	const handleComment = (data) => {
		setState({
			...state,
			comment: data
		})
	}

	return (
		<div id="modal" className={displayModal}
			 onClick={() => {setShowModalNew(false); setInput_Focused(false)}}
			 onKeyDown={(e) => handleEsc(e)}
			 tabIndex={-1}>
			<div className="modal-new" onClick={(e) => e.stopPropagation()}>
				<div className="modal-close" onClick={() => {setShowModalNew(false); setInput_Focused(false)}}>
					X
				</div>
				<div className="modal-content modal-new-formcontainer">
					<h3> NEW </h3>
					<em> <p> [n]ew / [c]reate / + </p> </em>


					<form className="modal-new-formarea" autoComplete="off" 
						onSubmit={(e) => handleSubmit(e)}>
					<div className="modal-new-formrow">
						<label htmlFor="title" className="modal-new-formtitle">
								title </label>
						<input type="text" name="title" className="modal-new-forminput"
								value={state.title} onChange={handleChange}
								onClick={() => setInput_Focused(true)}
								onBlur={() => setInput_Focused(false)}/>

					</div>
					<div className="modal-new-formrow">
						<label htmlFor="title" className="modal-new-formtitle">
								url </label>
						<input type="text" name="url" className="modal-new-forminput"
								value={state.url} onChange={handleChange}
								onClick={() => setInput_Focused(true)}
								onBlur={() => setInput_Focused(false)}/>
					</div>
					<div className="modal-new-formrow">
						<label htmlFor="breadcrumb" className="modal-new-formtitle">
									breadcrumb </label>
						<input id="new-breadcrumb" type="text" name="breadcrumb" className="modal-new-forminput"
								value={state.breadcrumb} onChange={handleChange}
								onClick={() => setInput_Focused(true)}
								onBlur={() => setInput_Focused(false)}/>
					</div>
					<div className="modal-new-formrow">
						<label htmlFor="tags" className="modal-new-formtitle">
						 			tags </label>
						<ModalNew_TagInput setInput_Focused={setInput_Focused}
											onChange={(data) => handleTag(data)}
											submitted={submitted} setSubmitted={setSubmitted}
											/>
					</div>
					<div className="modal-new-formrow">
						<label htmlFor="type" className="modal-new-formtitle">
						 				type </label>
						<div className="modal-new-typeradio">
						<label>
						<input type="radio" name="type" value="article" 
							checked={state.type==="article"} onChange={handleChange} />
							<i className="typcn typcn-news modal-new-typeicon"></i> </label>
						<label>
						<input type="radio" name="type" value="video" 
							checked={state.type==="video"} onChange={handleChange} />
							<i className="typcn typcn-video modal-new-typeicon"></i> </label>
						<label>
						<input type="radio" name="type" value="book" 
							checked={state.type==="book"} onChange={handleChange} />
							<i className="typcn typcn-book modal-new-typeicon"></i> </label>
						<label>
						<input type="radio" name="type" value="podcast" 
							checked={state.type==="podcast"} onChange={handleChange} />
							<i className="typcn typcn-microphone modal-new-typeicon"></i> </label>
						<label>
						<input type="radio" name="type" value="quote" 
							checked={state.type==="quote"} onChange={handleChange} />
							<i className="typcn typcn-message modal-new-typeicon"></i> </label>
						</div>
					</div>
					<div className="modal-new-formrow">
						<label htmlFor="comments" className="modal-new-formtitle">
											comments </label>
						<ModalNew_CommentInput setInput_Focused={setInput_Focused}
											onChange={(data) => handleComment(data)}
											submitted={submitted} setSubmitted={setSubmitted}
											/>
					</div>
					<div className="modal-new-formrow">
						<input type="submit" value="post"/>
					</div>
					</form>
				</div>
			</div>
		</div>
	)


}

export default ModalNew
