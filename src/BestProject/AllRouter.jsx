import React from 'react'
import {BrowserRouter,Routes, Route } from "react-router-dom"
import Home from './Home'
import CreatPage from './CreatPage'
import EditPage from './EditPage'

function AllRouter() {
  return (
    <BrowserRouter>
    <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/CreatPage' element={<CreatPage/>}/>
<Route path='/EditPage/:id' element={<EditPage/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default AllRouter