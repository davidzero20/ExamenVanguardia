import Api from "@/lib/axios";
import Swal from 'sweetalert2';

export const getLibros = async () => {
    try {
        const response = await Api.get("/libros");
        console.log(response.data.libros);
        return response.data.libros; 
    }
    catch (error) {
        console.error(error);
    }
}

export const crearLibro = async (NombreLibro, Autor, stock, Usuario, Editorial) => {
    try {
        const response = await Api.post("/libros", { NombreLibro, Autor, stock, Usuario, Editorial });
        Swal.fire({
            icon: 'success',
            title: 'Libro creado',
            text: response.data.msg
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.msg
        });
    }
}

export const actualizarLibro = async (id, NombreLibro, Autor, stock, Usuario, Editorial) => {
    try {
        const response = await Api.put(`/libros/${id}`, { NombreLibro, Autor, stock, Usuario, Editorial });
        Swal.fire({
            icon: 'success',
            title: 'Libro actualizado',
            text: response.data.msg
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.msg
        });
    }
}

export const eliminarLibro = async (id) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await Api.delete(`/libros/${id}`);
                    Swal.fire(
                        '¡Eliminado!',
                        response.data.msg,
                        'success'
                    );
                    resolve(response.data);
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response.data.msg
                    });
                    reject(error);
                }
            }
        });
    });
}
