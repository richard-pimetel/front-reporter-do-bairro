import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import MapPage from '../pages/MapPage/MapPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NoticiaPage from '../pages/NoticiaPage/NoticiaPage'

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
    },
    { 
        path: "/noticia/:id", 
        element: <NoticiaPage/>
    }
])

export default router
