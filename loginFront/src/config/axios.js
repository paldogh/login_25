import axios from 'axios';
import Cookies from 'js-cookie';

const clienteAxios = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN') || '')
  }
});

export default clienteAxios;