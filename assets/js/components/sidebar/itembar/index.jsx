import React from 'react'

class ItemBar extends React.Component {
	
	render() {
		return (
			<li className="mt">
				<a className={this.props.active} href={this.props.url}>
					<i className="fa fa-tasks"></i>
					<span>{this.props.name}</span>
				</a>
			</li>
		)
	}
}

export default ItemBar