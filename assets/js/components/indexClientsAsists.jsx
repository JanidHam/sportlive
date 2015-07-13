import React from 'react'
import SideBar from './sidebar'
import TableClients from './tableclients'

React.render(<SideBar data={data}/>, document.getElementById('sidebar-react'))
React.render(<TableClients url="/list-clients/" search="j"/>, document.getElementById('table-clients'))