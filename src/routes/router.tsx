import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import MapPage from '../pages/MapPage/MapPage'
import LoginPage from '../pages/LoginPage/LoginPage'

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <HomePage/>
    },
    { 
        path: "/map", 
        element: <MapPage/>
    },
    { 
        path: "/login", 
        element: <LoginPage/>
    }
])

export default router
