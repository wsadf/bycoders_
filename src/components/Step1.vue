<template>
  <div>
    <span class="phases">Etapa <small>1</small> de 4</span>
    <h2>Seja bem vindo(a)</h2>
    <form @submit.prevent="handleNextStep">
      <label for="email">Endereço de e-mail:</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        @input="validateEmail"
      />
      <span v-if="emailError" class="error">{{ emailError }}</span>

      <div class="container-radios">
        <label class="custom-radio" for="pf">
          <input
            type="radio"
            id="pf"
            value="PF"
            v-model="formData.cadastroType"
          />
          <span class="radio-btn"></span>
          Pessoa Física (PF)
        </label>
        <label class="custom-radio" for="pj">
          <input
            type="radio"
            id="pj"
            value="PJ"
            v-model="formData.cadastroType"
          />
          <span class="radio-btn"></span>
          Pessoa Jurídica (PJ)
        </label>
      </div>
      <button type="submit">Continuar</button>
    </form>
    <p class="btn-listar">Listar Usuários Cadastrados</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  formData: Object,
  updateFormData: Function,
  nextStep: Function,
});

const emailError = ref("");

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = emailPattern.test(props.formData.email)
    ? ""
    : "Por favor, insira um e-mail válido.";
};

const handleNextStep = () => {
  validateEmail();
  if (!emailError.value) {
    props.nextStep();
  }
};
</script>

<style scoped></style>
