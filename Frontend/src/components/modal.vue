<template>
  <!-- Modal -->
  <div v-if="openModal" class="modal fade show" 
       tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" 
       style="display:block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 v-if="libro" class="modal-title fs-5 text-center" id="exampleModalLabel">Editar Libro</h1>
          <h1 v-else class="modal-title fs-5 text-center" id="exampleModalLabel">Agregar Libro</h1>
          <button type="button" @click="cerrarModal" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="NombreLibro" class="form-label">Nombre del Libro</label>
              <input v-model="NombreLibro" type="text" class="form-control" id="NombreLibro" placeholder="Nombre del Libro" required>
            </div>
            <div class="mb-3">
              <label for="Autor" class="form-label">Autor</label>
              <input v-model="Autor" type="text" class="form-control" id="Autor" placeholder="Autor">
            </div>
            <div class="mb-3">
              <label for="stock" class="form-label">Stock</label>
              <input v-model="stock" type="number" class="form-control" id="stock" placeholder="Stock" required>
            </div>
            <div class="mb-3">
              <label for="Usuario" class="form-label">Usuario</label>
              <input v-model="Usuario" type="text" class="form-control" id="Usuario" placeholder="Usuario" required>
            </div>
            <div class="mb-3">
              <label for="Editorial" class="form-label">Editorial</label>
              <input v-model="Editorial" type="text" class="form-control" id="Editorial" placeholder="Editorial" required>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
          <button v-if="libro" type="button" class="btn btn-success" @click="updateLibro">Actualizar</button>
          <button v-else type="button" class="btn btn-primary" @click="guardarLibro">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';
import { crearLibro, actualizarLibro } from '@/api/librosApi';

const NombreLibro = ref('');
const Autor = ref('');
const stock = ref(0);
const Usuario = ref('');
const Editorial = ref('');
const openModal = ref(false);

const props = defineProps({
  visible: Boolean,
  libro: Object
});

const resetForm = () => {
  NombreLibro.value = '';
  Autor.value = '';
  stock.value = 0;
  Usuario.value = '';
  Editorial.value = '';
};

// Emits para comunicar con el componente padre
const emit = defineEmits(['cerrar-modal', 'libroGuardado', 'libroActualizado']);

// Watch para abrir y cerrar el modal
watch(() => props.visible, (newVal) => { 
  if (newVal) {
    openModal.value = true;
    if (props.libro) {
      NombreLibro.value = props.libro.NombreLibro;
      Autor.value = props.libro.Autor;
      stock.value = props.libro.stock;
      Usuario.value = props.libro.Usuario;
      Editorial.value = props.libro.Editorial;
    }
  } else {
    openModal.value = false;
    resetForm();
  }
});

const guardarLibro = async () => {
  try {
    const data = await crearLibro(NombreLibro.value, Autor.value, stock.value, Usuario.value, Editorial.value);
    emit('libroGuardado', data);
    cerrarModal();
  } catch (error) {
    console.error(error);
  }
};

const updateLibro = async () => {
  try {
    const data = await actualizarLibro(props.libro.id, NombreLibro.value, Autor.value, stock.value, Usuario.value, Editorial.value);
    emit('libroActualizado', data);
    cerrarModal();
  } catch (error) {
    console.error(error);
  }
};

const cerrarModal = () => {
  openModal.value = false;
  resetForm();
  emit('cerrar-modal');
};
</script>
