import React from 'react'

const NavTag = ({tags, setFilter}) => {

	return (
		<div className="nav-tagcontainer">
					<i title="tag" className="nav-tagicon typcn typcn-tag"> </i>

					{tags.slice(0,8).map(k => 
						<div className="nav-tagrow" key={k}> 
							<div className="nav-tagcount">
								{k[1]} </div>
							<a className="nav-tagname" href={`#tag-${k[0]}`}
								 onClick={() => setFilter(`tag-${k[0]}`)}>
								{k[0]} </a>
						</div>
					)}
				</div>
	)
}

export default NavTag