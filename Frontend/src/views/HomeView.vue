<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="text-center flex-grow-1">
              <button @click="abrirModal" class="btn btn-primary mx-auto">
                Agregar Libro
              </button>
            </div>
          </div>

          <Modal
            :visible="openModal"
            @cerrar-modal="cerrarModal"
            :libro="libroSeleccionado"
            @libroGuardado="cargarLibros"
            @libroActualizado="cargarLibros"
          />

          <div class="card-body text-center">
            <h5>Lista de libros</h5>
            <table class="table table-striped custom-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">NombreLibro</th>
                  <th scope="col">Autor</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Editorial</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(libro, index) in libros" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ libro.NombreLibro }}</td>
                  <td>{{ libro.Autor }}</td>
                  <td>{{ libro.stock }}</td>
                  <td>{{ libro.Usuario }}</td>
                  <td>{{ libro.Editorial }}</td>
                  <td>
                    <button class="btn btn-warning" @click="cargarLibro(libro)">
                      <i class="bi bi-pencil-square"></i> Editar
                    </button>
                    <button class="btn btn-danger" @click="deleteLibro(libro.id)">
                      <i class="bi bi-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getLibros, crearLibro, actualizarLibro, eliminarLibro } from '@/api/librosApi';
import Modal from '@/components/modal.vue';
import router from '@/router/index';

const libros = ref([]);
const openModal = ref(false);
const libroSeleccionado = ref(null);

async function cargarLibros() {
  libros.value = await getLibros();
}

async function deleteLibro(id) {
  await eliminarLibro(id);
  await cargarLibros();
}

const cargarLibro = (libro) => {
  libroSeleccionado.value = libro;
  openModal.value = true;
};

const abrirModal = () => {
  libroSeleccionado.value = null;
  openModal.value = true;
};

const cerrarModal = () => {
  openModal.value = false;
};

const cerrarSesion = () => {
  localStorage.removeItem('token');
  router.push('/');
};

onMounted(cargarLibros);
</script>

<style>
.custom-table {
  background-color: #f8f9fa;
}

.custom-table tbody tr:nth-child(odd) {
  background-color: #e9ecef;
}

.custom-table tbody tr:hover {
  background-color: #dee2e6;
}
</style>
