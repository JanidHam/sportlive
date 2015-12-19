import React from 'react'
import TableRow from '../tablerow'
import ResponseMessages from '../responsemessages'

class TableClients extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { searchString: '', clients: [], noClients: true }
    this._bind('_handleChange', '_handleNewClient', '_listenServer', '_handleClickCheck', 
                '_handleReponseFromServer')
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

  _handleClickCheck(e) {
    console.log(e.target.parentElement.parentElement.id)
    io.socket.post( '/find-class-client' , {clientID: e.target.parentElement.parentElement.id}, (resData,jwres) => {
      console.log(resData)
      this._handleReponseFromServer(jwres, resData)
    }.bind(this))
  }

  _handleReponseFromServer(jwres, resData) {
    if ( jwres.statusCode === 500 )
      this._drawMessages('Que pena, tuvimos un error interno.', 'danger')
    else if ( jwres.statusCode === 400 )
      this._drawMessages('No se encontró la ruta solicitada, o el server está caido.', 'danger')
    else if ( jwres.statusCode === 200 ) {
      if ( resData.message === 'ok')
        this._drawMessages( resData.data[0].client.firstName + ' ' + resData.data[0].client.lastName + ' asistencia registrada con éxito.' , 'success')
      else
        this._drawMessages( resData.message , 'danger')
    }

  }

  _drawMessages(message, type) {
    let typeM = 'alert-' + type
    this.refs.messages.setState({ message: message, typeM: typeM })
  }

  render() {
      
    if ( this.state.clients.length <= 0 ) {
      if ( this.state.noClients )
        return <p className="text-center">No hay ningún cliente registrado.</p>  
      return <p className="text-center">Cargando clientes...</p>
    }

    var clients      = this.state.clients,
        searchString = this.state.searchString.trim().toLowerCase()

    if ( searchString.length > 0 )
      clients = clients.filter( (client) => { return client.firstName.toLowerCase().match( searchString ) } )

    return (
      <div>
        <div className="col-lg-12" >
          <ResponseMessages ref="messages" />
        </div>
        <div className="col-lg-12 margin-top-30">
          <div className="col-lg-4">
              <input className="form-control" type="search" value={this.state.searchString} onChange={this._handleChange} placeholder="Buscar.." />
          </div>
          <div className="col-lg-12 margin-top-10">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th><strong>Nombre</strong></th>
                  <th><strong>Apellidos</strong></th>
                  <th><strong>Usuario</strong></th>
                  <th><strong>Teléfono</strong></th>
                  <th><strong>F. Inicio</strong></th>
                  <th><strong>F. Fin</strong></th>
                  <th><strong>Paquete</strong></th>
                  <th><strong>Acciones</strong></th>
                </tr>
              </thead>
              <tbody>
                { clients.map( (client) => { return ( <TableRow client={ client } key={client.id} _handleClickCheck={this._handleClickCheck}/> ) } ) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

}

export default TableClients