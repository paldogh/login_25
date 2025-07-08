import { Outlet } from "react-router-dom";


export default function AuthLayout(){
    return (
<main> 
    <img src="../img/login.jpg"
    width="20"
    height="50"
    ></img>
    <Outlet/>
</main>


    );
}