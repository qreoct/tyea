import React from 'react'

const NavFoot = ({setShowModalAbout, showModalAbout, setShowModalNew, showModalNew}) => { 

	return (

				<div className="nav-foot">
					<div className="nav-tagrow">
						<div className="nav-footnew" 
                  onClick={() => setShowModalNew(!showModalNew)}>
                  [n]ew </div>
						<div className="nav-footabout" 
                  onClick={() => setShowModalAbout(!showModalAbout)}>
                  [a]bout </div>
					</div>
				</div>
	)
}

export default NavFoot