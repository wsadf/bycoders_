<template>
    <div>
      <h2>Passo 4</h2>
      <div>
        <h3>Revisar Informações</h3>
        <p><strong>Email:</strong> {{ formData.email }}</p>
        <p><strong>Tipo de Cadastro:</strong> {{ formData.cadastroType }}</p>
  
        <div v-if="formData.cadastroType === 'PF'">
          <p><strong>Nome:</strong> {{ formData.nome }}</p>
          <p><strong>CPF:</strong> {{ formData.cpf }}</p>
          <p><strong>Data de Nascimento:</strong> {{ formData.nascimento }}</p>
          <p><strong>Telefone:</strong> {{ formData.telefone }}</p>
        </div>
  
        <div v-if="formData.cadastroType === 'PJ'">
          <p><strong>Razão Social:</strong> {{ formData.razaoSocial }}</p>
          <p><strong>CNPJ:</strong> {{ formData.cnpj }}</p>
          <p><strong>Data de Abertura:</strong> {{ formData.abertura }}</p>
          <p><strong>Telefone:</strong> {{ formData.telefone }}</p>
        </div>
  
        <p><strong>Senha:</strong> {{ formData.senha }}</p>
      </div>
      <div class="actions">
        <button type="button" @click="previousStep">Voltar</button>
        <button type="button" @click="submitForm">Cadastrar</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';
  
  const props = defineProps(['formData', 'previousStep', 'submitForm']);
  
  const formData = ref(props.formData);
  
  const previousStep = () => {
    props.previousStep();
  };
  
  const submitForm = () => {
    props.submitForm();
  };
  </script>
  
  <style scoped>
  /* Adicione estilos responsivos aqui, se necessário */
  </style>
  