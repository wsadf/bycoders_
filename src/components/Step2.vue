<template>
    <div>
      <h2>Passo 2</h2>
      <form @submit.prevent="handleNextStep">
        <div v-if="cadastroType === 'PF'">
          <label for="nome">Nome:</label>
          <input id="nome" v-model="formData.nome" type="text" required />
  
          <label for="cpf">CPF:</label>
          <input id="cpf" v-model="formData.cpf" type="text" required />
  
          <label for="nascimento">Data de nascimento:</label>
          <input id="nascimento" v-model="formData.nascimento" type="date" required />
  
          <label for="telefone">Número de telefone:</label>
          <input id="telefone" v-model="formData.telefone" type="tel" required />
        </div>
  
        <div v-if="cadastroType === 'PJ'">
          <label for="razaoSocial">Razão Social:</label>
          <input id="razaoSocial" v-model="formData.razaoSocial" type="text" required />
  
          <label for="cnpj">CNPJ:</label>
          <input id="cnpj" v-model="formData.cnpj" type="text" required />
  
          <label for="abertura">Data de abertura da empresa:</label>
          <input id="abertura" v-model="formData.abertura" type="date" required />
  
          <label for="telefone">Telefone:</label>
          <input id="telefone" v-model="formData.telefone" type="tel" required />
        </div>
  
        <div class="actions">
          <button type="button" @click="previousStep">Voltar</button>
          <button type="submit">Continuar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    formData: Object,
    updateFormData: Function,
    previousStep: Function,
    nextStep: Function,
  });
  
  const cadastroType = ref(props.formData.cadastroType);
  const formData = ref(props.formData);
  
  const handleNextStep = () => {
    props.updateFormData(formData.value);
    props.nextStep();
  };
  
  const previousStep = () => {
    props.previousStep();
  };
  </script>
  
  <style scoped>
  /* Adicione estilos responsivos aqui, se necessário */
  </style>
  