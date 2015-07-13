import React from 'react'

class TableRow extends React.Component {

  handleClick(e) {
    console.log(e.target.parentElement.getAttribute('id'))//Con esto obtengo el id del cliente.
  }

  render() {
    return (
      <tr id={this.props.client.id} onClick={this.handleClick}>
        <td>{this.props.client.firstName}</td>
        <td>{this.props.client.lastName}</td>
        <td>{this.props.client.userName}</td>
        <td>{this.props.client.phoneNumber}</td>
      </tr>
      )
  }
}

export default TableRow