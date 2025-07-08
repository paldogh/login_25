import {createBrowserRouter}
 from "react-router-dom"; 
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Inicio from "./views/Inicio";
import Registro from "./views/Registro"
import Login from "./views/login"
import Bienvenido from "./views/bienvenido";
 const router = createBrowserRouter
 ([
    {
    path: '/',
    element:<Layout/>,
    children : 
    [
        
       { 
        index:true,
        element: <Inicio/>
       }
    ]

    } ,  
    {
        path: '/auth', 
        element:<AuthLayout/>,
        children: [
            {
                path: 'registro',
                element: <Registro/>
            },
       
        {
                path: 'login',
                element: <Login/>
            },
             {
                path: 'bienvenido',
                element: <Bienvenido/>
            }
       
        ]
    
    }

])
export default router;
    