<template>
  <div class="review-form">
    <span class="phases">Etapa <small>4</small> de 4</span>
    <div class="form-container">
      <h2>Revisar Informações</h2>

      <div class="form-section">
        <p class="form-label"><strong>Endereço de email:</strong></p>
        <p class="form-value">{{ formData.email }}</p>
      </div>
      <div class="form-section">
        <p class="form-label"><strong>Tipo de Cadastro:</strong></p>
        <p class="form-value">{{ formData.cadastroType }}</p>
      </div>
      <div v-if="formData.cadastroType === 'PF'" class="form-section">
        <p class="form-label"><strong>Nome:</strong></p>
        <p class="form-value">{{ formData.nome }}</p>

        <p class="form-label"><strong>CPF:</strong></p>
        <p class="form-value">{{ formData.cpf }}</p>

        <p class="form-label"><strong>Data de Nascimento:</strong></p>
        <p class="form-value">{{ formData.nascimento }}</p>

        <p class="form-label"><strong>Telefone:</strong></p>
        <p class="form-value">{{ formData.telefonePF }}</p>
      </div>

      <div v-if="formData.cadastroType === 'PJ'" class="form-section">
        <p class="form-label"><strong>Razão Social:</strong></p>
        <p class="form-value">{{ formData.razaoSocial }}</p>
        <p class="form-label"><strong>CNPJ:</strong></p>
        <p class="form-value">{{ formData.cnpj }}</p>
        <p class="form-label"><strong>Data de Abertura:</strong></p>
        <p class="form-value">{{ formData.abertura }}</p>
        <p class="form-label"><strong>Telefone:</strong></p>
        <p class="form-value">{{ formData.telefonePJ }}</p>
      </div>

      <div class="form-section">
        <p class="form-label"><strong>Senha:</strong></p>
        <p class="form-value">{{ formData.senha }}</p>
      </div>

      <div class="actions">
        <button class="btn-voltar" type="button" @click="previousStep">
          Voltar
        </button>
        <button type="button" @click="submitForm">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["formData", "previousStep", "submitForm"]);
const formData = ref(props.formData);

const previousStep = () => {
  props.previousStep();
};

const submitForm = () => {
  props.submitForm();
};
</script>
