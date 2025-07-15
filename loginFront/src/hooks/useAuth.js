import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import clienteAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('AUTH_TOKEN');

    //  Solo llama a /api/user si hay token
   const { data: user, error, mutate } = useSWR(
    '/api/user',
    () =>
        clienteAxios('/api/user')
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.response?.data?.message || 'Error al autenticar usuario');
            })
);


    //  Login
    const login = async (datos, setErrores) => {
        try {
            await clienteAxios.get('/sanctum/csrf-cookie');
            const { data } = await clienteAxios.post('/api/login', datos);

            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();  // Refresca la info del usuario
        } catch (error) {
            console.error("Error en login:", error);
            if (error.response?.data?.errors) {
                setErrores(Object.values(error.response.data.errors));
            } else if (typeof error.response?.data?.message === 'string') {
                setErrores([error.response.data.message]);
            } else {
                setErrores(['Error inesperado al iniciar sesión.']);
            }
        }
    };

    // Registro
    const registro = async (datos, setErrores) => {
        try {
            await clienteAxios.get('/sanctum/csrf-cookie');
            const { data } = await clienteAxios.post('/api/registro', datos);
            console.log("Registro exitoso:", data);
            setErrores([]);
        } catch (error) {
            console.error("Error en registro:", error);
            setErrores(Object.values(error.response?.data?.errors || {}));
        }
    };

    // Logout
// useAuth.js
const logout = async () => {
  try {
    await clienteAxios.get('/sanctum/csrf-cookie'); // 👈 NECESARIO
    await clienteAxios.post('/api/logout', null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      }
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  } finally {
    localStorage.removeItem('AUTH_TOKEN');
    await mutate(undefined);
  }
};


    //  Efecto de redirección según el estado de auth
    useEffect(() => {
        // 🔍 Verifica que ya se resolvió el fetch
        if (typeof user === 'undefined' && typeof error === 'undefined') return;

        console.log("User:", user);
        console.log("Error:", error);

        if (middleware === 'auth' && error) {
            navigate('/auth/login');
        }

        if (middleware === 'guest' && url && user && !error) {
            navigate('/auth/bienvenido');
        }
    }, [user, error]);

    return {
        login,
        registro,
        logout,
        user,
        error
    };
};
