import './App.css'
import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react'

import Home from './components/Home.jsx'

function App() {

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App;