import React, { useState, useEffect } from 'react'

// Gleaned from https://medium.com/@jerrylowm/build-a-tags-input-react-component-from-scratch-1524f02acb9a

const ModalNew_TagInput = ({setInput_Focused, onChange, submitted, setSubmitted}) => {
	const [tags, setTags] = useState([])
	const [tagInput, setTagInput] = useState('')
  
	const removeTag = (i) => {
	    const newTags = [ ...tags ];
	    newTags.splice(i, 1);

	    // Call the defined function setTags which will replace tags with the new value.
	    setTags(newTags);
  	};

  const inputKeyDown = (e, triggerByButton) => {
    let val
    if (triggerByButton){
      val = tagInput;
    }else{
      val = e.target.value;
    }
    if ((e.key === ' ' || e.key === 'Tab' || triggerByButton) && val) {
  	  e.preventDefault();
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTagInput('')
      setTags([...tags, val]);
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tags.length - 1);
    } else if (e.key === 'Enter' && !val) {
      e.preventDefault();
      document.getElementById('new-breadcrumb').focus()
    }
  };

  useEffect(() => {
  	onChange(tags) // send the tags to callback function of parent
  	/*
	okay, so this throws the error "Cannot update a component (`App`) while rendering a different component"
	because apparently a child component should not do a render call
	to the parent element (via callback) IN THE function body of this
	child component.

  	*/
  }, [tags])

  useEffect(() => {
  	if(submitted){ setTags([]); setSubmitted(false) }

  }, [submitted, setSubmitted])


  return (
    <div className="input-tag">
      <ul className="input-tag__tags">
        { tags.map((tag, i) => (
          <li key={tag}>
            {tag}
            <button type="button" onClick={() => { removeTag(i); }}>+</button>
          </li>
        ))}
        <li className="input-tag__tags__input">
        <input type="text" onKeyDown={inputKeyDown} 
        		onClick={setInput_Focused(true)} value={tagInput}
        		onChange={(e) => setTagInput(e.target.value)}/>
        </li>
        <button type="button" onClick={(e) => inputKeyDown(e, true)}> add </button>
      </ul>
    </div>
  );
}

export default ModalNew_TagInput