<template>
  <section class="vh-100" style="background-color: #508bfc;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">

              <h3 class="mb-5">Registro</h3>

              <div data-mdb-input-init class="form-outline mb-4">
                <input type="text" id="typeNameX-2" name="name" class="form-control form-control-lg" v-model="name" />
                <label class="form-label" for="typeNameX-2">Nombre</label>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <input type="email" id="typeEmailX-2" name="email" class="form-control form-control-lg" v-model="email" />
                <label class="form-label" for="typeEmailX-2">Correo</label>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <input type="password" id="typePasswordX-2" name="password" class="form-control form-control-lg" v-model="password" />
                <label class="form-label" for="typePasswordX-2">Contraseña</label>
              </div>

              <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block" type="submit" @click.prevent="registrarUsuario">Registrar</button>

              <hr class="my-4">

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { crearUsuario} from '@/api/UsuariosApi';

const name = ref('');
const email = ref('');
const password = ref('');

const registrarUsuario = async () => {
  try {
    const response = await crearUsuario(name.value, email.value, password.value);
  } catch (error) {
    console.error( error);
  }
};
</script>
