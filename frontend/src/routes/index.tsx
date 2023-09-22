import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Login from '../pages/login/Login'
import SignUp from '../pages/signup/SignUp'
import Dashboard from '../pages/dashboard/Dashboard'
import useAuthProvider from '../shared/hooks/useAuthProvider'

const AppRoutes: React.FunctionComponent = () => {
  const { session } = useAuthProvider()

  return <BrowserRouter>
        <Routes>
            <Route index element={<Navigate replace to={session ? 'dashboard' : 'login'}/> } />
            <Route path="register" element={session ? <Navigate replace to="dashboard"/> : <SignUp/>}/>
            <Route path="login" element={session ? <Navigate replace to="dashboard"/> : <Login/>}/>
            <Route path="dashboard" element={session ? <Dashboard/> : <Navigate replace to="login"/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    </BrowserRouter>
}

export default AppRoutes
