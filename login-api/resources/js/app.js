require('./bootstrap');
// En App.jsx o main.jsx, antes de todo
if (process.env.NODE_ENV === 'development') {
  localStorage.removeItem('AUTH_TOKEN');
}
