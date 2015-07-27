import React from 'react'
import TableRow from '../tablerow'

class TableClients extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { searchString: '', clients: [], noClients: true }
    this._bind('_handleChange', '_handleNewClient', '_listenServer')
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
    //this.loadClientsFromServer()
    io.socket.post( this.props.url , {}, (resData) => {
      this.setState({ clients: resData.data })
    }.bind(this))
  }

  componentDidMount() {
    if ( this.state.clients.length > 0)
      this.setState({ noClients: false })
    this._connectAndListenServer()
  }

  /**
   * [_bind Con este metodo creo una relacion con los metodos creados con este componente]
   * @param  {...[type]} methods [Recibe un numero indefinido de metodos para vincularlos]
   * @return {[type]}            [Retorna los metodos binculados]
   */
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) )
  }

  _handleChange(e) {
    this.setState({ searchString: e.target.value })
  }

   _connectAndListenServer() {
    io.socket.on('connect', this._listenServer )
  }

  _listenServer() {
    io.socket.on('new client', this._handleNewClient )
  }

  _handleNewClient(newClient) {
    this.setState({ clients: this.state.clients.concat( [newClient] ) })
  }

  render() {
      
    if ( this.state.clients.length <= 0) {
      if ( this.state.noClients )
        return <p className="text-center">No hay ningún cliente registrado.</p>  
      return <p className="text-center">Cargando clientes...</p>
    }

    var clients      = this.state.clients,
        searchString = this.state.searchString.trim().toLowerCase()

    if ( searchString.length > 0 )
      clients = clients.filter( (client) => { return client.firstName.toLowerCase().match( searchString ) } )

    return (
      <div className="col-lg-12">
        <div className="col-lg-4">
            <input className="form-control" type="search" value={this.state.searchString} onChange={this._handleChange} placeholder="Buscar.." />
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
  }

}

export default TableClients