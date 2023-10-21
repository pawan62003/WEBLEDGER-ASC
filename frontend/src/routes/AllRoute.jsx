import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Recipe from '../pages/Recipe'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SavedRecipe from '../pages/SavedRecipe'
import PrivateRoute from './PrivateRoute'


const AllRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Recipe />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/saved-recipe' element={<PrivateRoute><SavedRecipe /></PrivateRoute>} />
    </Routes>
  )
}

export default AllRoute