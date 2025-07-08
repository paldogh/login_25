import React, { useEffect, useState, createRef } from "react";
import clienteAxios from "../config/axios";
import { useAuth } from "../hooks/useAuth";
export default function Bienvenido (){
    //variable logout
const {logout, user} = useAuth({middleWeare: 'auth', url: '/auth/login'});

     const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const obtenerMensaje = async () => {
            try {
                const respuesta = await clienteAxios.get('/api/welcome');
                setMensaje(respuesta.data.message);
            } catch (error) {
                console.log("Error al obtener el mensaje:", error);
                setMensaje("No se pudo conectar con el backend");
            }
        };

        obtenerMensaje();
    }, []);

    return(
      
      <main>
      <div>
            Estás es un msj de laravel
        <strong>{mensaje}</strong>

        </div>

<div  className="my-5 px-5" >
<button 
type="button"
className="text-center bg-red-500 w-full p-3 font-bold  text-white"
     onClick={logout}    >
            Cerrar sesión
</button>
         
</div>
</main>

    );
}
