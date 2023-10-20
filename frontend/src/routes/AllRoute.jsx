import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Recipe from '../pages/Recipe'

const AllRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Recipe />} />
    </Routes>
  )
}

export default AllRoute