import React, { useEffect } from 'react'

const ModalAbout = ({setShowModalAbout, showModalAbout, setInput_Focused, posts}) => {
	useEffect(() => {
		if (showModalAbout) {
			document.getElementById('modal').focus()
		}
	}, [showModalAbout])

	if (!showModalAbout) { return null }
	const displayModal = showModalAbout 
						? "modal display-block" 
						: "modal display-none"

	const handleEsc = (e) => {
		if(['Escape', 'Esc', 'a', 'h', '/', '?'].includes(e.key)){
			setShowModalAbout(!showModalAbout);
			// reset focus back to home on close
			document.getElementById('tyea').focus();
			e.preventDefault();
		}
	}

	return (
		<div id="modal" className={displayModal}
			 onClick={() => {setShowModalAbout(false); setInput_Focused(false)}}
			 onKeyDown={(e) => handleEsc(e)}
			 tabIndex={-1}>
			<div className="modal-about" onClick={(e) => e.stopPropagation()}>
				<div className="modal-close" onClick={() => {setShowModalAbout(false); setInput_Focused(false)}}>
					X
				</div>
				<div className="modal-content">
				<h3> Tyea </h3>
				<em> <p> [a]bout / [h]elp / ? </p> </em>
				<em> <p> Virtual note board </p> </em>
				<p> Tyea is a virtual sticky note board. Use it to store links to content
					that you value. Tyea aims to be lightweight and a pleasure to use. </p>
				<p> Licensed by MIT </p>
				<a href="https://github.com/qreoct/tyea"> view source code on GitHub </a>
				<br />
				<a className="modal-about-export" 
					href={`data:text/json;charset=utf-8,${encodeURIComponent(
						JSON.stringify({posts})
						)}`}
					download="tyea-exports.json">
				 	export posts (JSON) </a>
				<p> v.1.0.0 &copy; 2020 </p>
				</div>
			</div>
		</div>
	)


}

export default ModalAbout
