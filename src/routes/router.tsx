import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import MapPage from '../pages/MapPage/MapPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NoticiaPage from '../pages/NoticiaPage/NoticiaPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'

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
    },
    { 
        path: "/profile/:id", // Nova rota para o perfil do usuário, com um ID dinâmico
        element: <ProfilePage/>
    }
])

export default router
