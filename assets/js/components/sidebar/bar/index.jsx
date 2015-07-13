import React from 'react'
import ItemBar from '../itembar'
 
class SideBar extends React.Component {
	
	render() {
		return (
			<div id="sidebar" className="nav-collapse">
			    <ul className="sidebar-menu" id="nav-accordion">
			        <p className="centered">
			          <a href="profile.html">
			             <img src="images/avatar.jpeg" className="img-circle" width="60"/>
			          </a>
			        </p>
			        <h5 className="centered">Janid Ham</h5>
			        {
			        	this.props.data.map(function (item) {
							return (
								<ItemBar url={item.url} name={item.name} active={item.active}/>
							)
						})
			        }
			    </ul>
			</div>
		)
	}
}

export default SideBar