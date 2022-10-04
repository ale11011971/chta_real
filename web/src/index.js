import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './commons/styles/index.scss'

ReactDOM.render( < App / > , document.getElementById('root'))

//Se você quiser que seu aplicativo funcione off-line e carregue mais rápido, você pode alterar
//unregister() para registrar() abaixo. Observe que isso vem com algumas armadilhas.

serviceWorker.unregister()