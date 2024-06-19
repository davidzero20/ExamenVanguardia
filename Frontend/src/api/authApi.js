import Api from "@/lib/axios";
import Swal from 'sweetalert2';
import router from "@/router";

export const login = async (email, password) => {
    try {
        const response = await Api.post("/login", { email, password });
        //guardar token en localstorage 
        localStorage.setItem('token', response.data.token); 
        Swal.fire({
            icon: 'success',
            title: 'Credenciales correctas',
            text: response.data.msg
        }).then(() => {
            router.push('/home');
        });
        return response.data;
    }
    catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.msg
        });
    }   
}





        