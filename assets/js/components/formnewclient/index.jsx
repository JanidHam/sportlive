import React from 'react'
import AddClient from './addclient'

React.render(<AddClient urlDisciplines="/active-disciplines" urlSchedule="/classes-schedule" urlHours="/hours" urlPackages="/active-packages" urlSaveClient="/add-client"/>, document.getElementById('new-client'))