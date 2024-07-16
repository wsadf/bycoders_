<template>
    <div>
      <h2>Passo 1</h2>
      <form @submit.prevent="handleNextStep">
        <label for="email">Endereço de e-mail:</label>
        <input id="email" v-model="email" type="email" required />
  
        <label for="cadastro">Tipo de cadastro:</label>
        <select id="cadastro" v-model="cadastroType" required>
          <option value="PF">Pessoa Física (PF)</option>
          <option value="PJ">Pessoa Jurídica (PJ)</option>
        </select>
  
        <button type="submit">Continuar</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    formData: Object,
    updateFormData: Function,
    nextStep: Function,
  });
  
  const email = ref(props.formData.email);
  const cadastroType = ref(props.formData.cadastroType);
  
  const handleNextStep = () => {
    props.updateFormData({
      email: email.value,
      cadastroType: cadastroType.value
    });
    props.nextStep();
  };
  </script>
  
  <style scoped>
  /* Adicione estilos responsivos aqui, se necessário */
  </style>
  