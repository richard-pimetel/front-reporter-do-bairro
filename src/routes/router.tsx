import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import MapPage from '../pages/MapPage/MapPage'

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <HomePage/>
    },
    { 
        path: "/map", 
        element: <MapPage/>
    }
])

export default router
