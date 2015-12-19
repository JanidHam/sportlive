import React from 'react'

class TableRow extends React.Component {

  _handleClickEdit(e) {
    window.location.href = "editar-cliente/?clientID=" + e.target.parentElement.parentElement.id
  }



  render() {
    var dateBegin = new Date(this.props.client.dateBegin).toLocaleDateString()
    var dateEnd = new Date(this.props.client.dateEnd).toLocaleDateString()
    var color = ""
    if ( this.props.client.isActive )
      color = "success"
    else
      color = "danger"
    return (
      <tr id={this.props.client.id} className={color}>
        <td>{this.props.client.firstName}</td>
        <td>{this.props.client.lastName}</td>
        <td>{this.props.client.userName}</td>
        <td>{this.props.client.phoneNumber}</td>
        <td>{dateBegin}</td>
        <td>{dateEnd}</td>
        <td>{this.props.client.activePackage.packageName}</td>
        <td>
        <span className="glyphicon glyphicon-check cursor-pointer font-size-15" aria-hidden="true" onClick={this.props._handleClickCheck}></span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="glyphicon glyphicon-edit cursor-pointer font-size-15" aria-hidden="true" onClick={this._handleClickEdit}></span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="glyphicon glyphicon-trash cursor-pointer font-size-15" aria-hidden="true" onClick=""></span>
        </td>
      </tr>
      )
  }
}

export default TableRow