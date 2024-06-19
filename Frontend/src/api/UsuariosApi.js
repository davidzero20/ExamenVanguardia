import Api from "@/lib/axios";
import Swal from 'sweetalert2';
import router from "@/router";

export const crearUsuario = async (nombre, email, password) => {
    try {
        const response = await Api.post("/usuarios", { nombre, email, password });
        Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: response.data.msg
        }).then(() => {
            router.push('/');
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



