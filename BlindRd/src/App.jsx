import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage'
import Collection from './pages/Collection'
import SignUpForm from './pages/SignUpForm'
import Login from './pages/Login'
import MyAccount from './pages/MyAccount'
import ProtectedRoute from './components/ProtectedRoute'



const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {path: '/collection',
    element: <Collection/>
  },
  {path: '/signup',
    element: <SignUpForm/>
  },
  {path: '/login',
    element: <Login />
  },
  {
    path: '/my-account',
    element: (
      <ProtectedRoute>
        <MyAccount />
      </ProtectedRoute>
    )
  },



]);

function App() {

  return (
    <>
      <RouterProvider router = {router}/>
    </>
  )
}

export default App
