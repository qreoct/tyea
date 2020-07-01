import React, { useState, useEffect } from 'react'

// Gleaned from https://medium.com/@jerrylowm/build-a-tags-input-react-component-from-scratch-1524f02acb9a

const ModalNew_CommentInput = ({setInput_Focused, onChange, submitted, setSubmitted}) => {
	const [comments, setComments] = useState([])
	const [commentInput, setCommentInput] = useState('')
  
	const removeComment = (i) => {
	    const newComments = [ ...comments ];
	    newComments.splice(i, 1);

	    // Call the defined function setTags which will replace tags with the new value.
	    setComments(newComments);
  	};

  const inputKeyDown = (e, triggerByButton) => {
    let val
    if (triggerByButton) { val = commentInput; }
    else { val = e.target.value }

    if ((e.key === 'Tab' || triggerByButton) && val) {
      e.preventDefault();
      if (comments.find(c => c.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setCommentInput('')
      setComments([...comments, val]);
    } else if (e.key === 'Backspace' && !val) {
      removeComment(comments.length - 1);
    }
  };

  useEffect(() => {
  	onChange(comments) // send the comments to callback function of parent
  }, [comments])

  useEffect(() => {
  	if(submitted){ setComments([]); setSubmitted(false) }

  }, [submitted, setSubmitted])


  return (
    <div className="input-tag">
      <ul className="input-tag__tags">
        { comments.map((cmt, i) => (
          <li key={cmt}>
            {cmt}
            <button type="button" onClick={() => { removeComment(i); }}>+</button>
          </li>
        ))}
        <li className="input-tag__tags__input">
        <textarea type="text" onKeyDown={inputKeyDown} 
        		onClick={setInput_Focused(true)} value={commentInput}
        		onChange={(e) => setCommentInput(e.target.value)}/>
        </li>
        <button type="button" onClick={(e) => inputKeyDown(e, true)}> add </button>
      </ul>
    </div>
  );
}

export default ModalNew_CommentInput