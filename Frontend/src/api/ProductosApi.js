import Api from "@/lib/axios";
import Swal from 'sweetalert2';

export const getProductos = async () => {
    try {
        const response = await Api.get("/productos");
        return response.data.productos; 
    } catch (error) {
        console.error(error);
    }
}

export const crearProducto = async (idProducto, descripcion, cantidad, precio, proveedor) => {
    try {

        const response = await Api.post("/productos", { idProducto, descripcion, cantidad, precio, proveedor });

        Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            text: response.data.msg
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text:  error.response.data.msg
        });
    }
}

export const actualizarProducto = async ( uid, idProducto, descripcion, cantidad, precio, proveedor) => {
    try {
        const response = await Api.put(`/productos/${uid}`, { idProducto, descripcion, cantidad, precio, proveedor });
        Swal.fire({
            icon: 'success',
            title: 'Producto actualizado',
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

export const eliminarProducto = async (id) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await Api.delete(`/productos/${id}`);
                    Swal.fire(
                        'Eliminado!',
                        'El producto ha sido eliminado.',
                        'success'
                    );
                    resolve(response.data);
                } catch (error) {
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
