<template>
  <div class="review-form">
    <h2>Passo 4</h2>
    <div class="form-container">
      <h3>Revisar Informações</h3>

      <div class="form-section">
        <p><strong>Email:</strong> {{ formData.email }}</p>
        <p><strong>Tipo de Cadastro:</strong> {{ formData.cadastroType }}</p>
      </div>

      <div v-if="formData.cadastroType === 'PF'" class="form-section">
        <p><strong>Nome:</strong> {{ formData.nome }}</p>
        <p><strong>CPF:</strong> {{ formData.cpf }}</p>
        <p><strong>Data de Nascimento:</strong> {{ formData.nascimento }}</p>
        <p><strong>Telefone:</strong> {{ formData.telefone }}</p>
      </div>

      <div v-if="formData.cadastroType === 'PJ'" class="form-section">
        <p><strong>Razão Social:</strong> {{ formData.razaoSocial }}</p>
        <p><strong>CNPJ:</strong> {{ formData.cnpj }}</p>
        <p><strong>Data de Abertura:</strong> {{ formData.abertura }}</p>
        <p><strong>Telefone:</strong> {{ formData.telefone }}</p>
      </div>

      <div class="form-section">
        <p><strong>Senha:</strong> {{ formData.senha }}</p>
      </div>

      <div class="actions">
        <button type="button" @click="previousStep">Voltar</button>
        <button type="button" @click="submitForm">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(["formData", "previousStep", "submitForm"]);
const formData = ref(props.formData);

const previousStep = () => {
  props.previousStep();
};

const submitForm = () => {
  props.submitForm();
};
</script>
