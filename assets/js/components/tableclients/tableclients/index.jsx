import React from 'react'
import SearchInput from '../searchinput'
import TableRow from '../tablerow'

class TableClients extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { clients: [] }
  }

  loadClientsFromServer() {
    fetch( this.props.url , { method: 'POST' } )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({ clients: data.data })
    })
  }

  componentWillMount() {
    this.loadClientsFromServer()
  }

  componentDidMount() {
    if (this.refs.search)
      console.log(this.refs.search.state.searchString)
  }

  handleChange(searchTerm) {
    console.log("search.. table")
    this.setState({ searchString: searchTerm })
    console.log(searchTerm)
  }

  render() {
    //if ( this.state.clients.length > 0) {
      
      var clients      = this.state.clients
          //searchString = this.refs.search.trim().toLowerCase()
      if ( this.refs.search && this.refs.search.state.searchString.length > 0 )
        clients = clients.filter( (client) => { return client.firstName.toLowerCase().match( this.refs.search.state.searchString ) } )

      return (
        <div className="col-lg-12">
          <div className="col-lg-4">
              <SearchInput ref="search" onChange={this.handleChange}/>
          </div>
          <div className="col-lg-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th><strong>Nombre</strong></th>
                  <th><strong>Apellidos</strong></th>
                  <th><strong>Usuario</strong></th>
                  <th><strong>Teléfono</strong></th>
                </tr>
              </thead>
              <tbody>
                { clients.map( (client) => { return ( <TableRow client={ client } /> ) } ) }
              </tbody>
            </table>
          </div>
        </div>
      )
    //} else { return <p className="text-center">Cargando clientes...</p> }
  }

}

export default TableClients