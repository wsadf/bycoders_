<template>
  <div>
    <h2>Passo 2</h2>
    <form @submit.prevent="handleNextStep">
      <div v-if="props.formData?.cadastroType === 'PF'">
        <label for="nome">Nome:</label>
        <input id="nome" v-model="props.formData.nome" type="text" />

        <label for="cpf">CPF:</label>
        <input
          id="cpf"
          v-model="props.formData.cpf"
          type="text"
          @blur="validateCpf"
        />
        <span v-if="cpfError" class="error">{{ cpfError }}</span>
        
        <label for="nascimento">Data de nascimento:</label>
        <input id="nascimento" v-model="props.formData.nascimento" @input="maskDateInput" />
        <span v-if="dateError" class="error">{{ dateError }}</span>

        <label for="telefone">Número de telefone:</label>
        <input id="telefone" v-model="props.formData.telefone" type="text" />
      </div>

      <div v-if="props.formData?.cadastroType === 'PJ'">
        <label for="razaoSocial">Razão Social:</label>
        <input
          id="razaoSocial"
          v-model="props.formData.razaoSocial"
          type="text"
        />

        <label for="cnpj">CNPJ:</label>
        <input id="cnpj" v-model="props.formData.cnpj" type="text" />

        <label for="abertura">Data de abertura da empresa:</label>
        <input id="abertura" v-model="props.formData.abertura" />

        <label for="telefone">Telefone:</label>
        <input id="telefone" v-model="props.formData.telefone" type="text" />
      </div>

      <div class="actions">
        <button type="button" @click="props.previousStep">Voltar</button>
        <button type="submit" :disabled="!isFormValid">Continuar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";

const props = defineProps({
  formData: Object,
  updateFormData: Function,
  previousStep: Function,
  nextStep: Function,
});

let cpfError = ref("");
let dateError = ref("");

const formatCpf = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
};

const validateCpf = () => {
  const cleanedCpf = props.formData?.cpf.replace(/\D/g, "");
  if (cleanedCpf.length === 11 && isValidCpf(cleanedCpf)) {
    props.formData.cpf = formatCpf(cleanedCpf);
    cpfError.value = "";
  } else {
    props.formData.cpf = "";
    cpfError.value = "CPF inválido";
  }
};

const maskDateInput = () => {
  let maskedValue = props.formData.nascimento
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d*/, '$1');
  props.formData.nascimento = maskedValue;

  // Limpar dateError se uma data válida for inserida
  if (maskedValue.length === 10) {
    validateDate();
  } else {
    dateError.value = '';
  }
};

const validateDate = () => {
  const inputValue = props.formData.nascimento.trim();

  if (inputValue === '') {
    dateError.value = 'Data de nascimento é obrigatória';
  } else {
    const d1 = Date.parse(inputValue.replace(/([0-9]+)\/([0-9]+)/, '$2/$1'));

    if (isNaN(d1)) {
      dateError.value = 'Data de nascimento inválida';
    } else {
      dateError.value = '';
    }
  }
};

const isValidCpf = (cpf) => {
  if (cpf.length !== 11 || /^(\d)\1*$/.test(cpf)) {
    return false;
  }
  let sum;
  let rest;
  sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(9, 10))) {
    return false;
  }
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(10, 11))) {
    return false;
  }
  return true;
};

const isFormValid = computed(() => {
  return !cpfError.value && !dateError.value;
});

const handleNextStep = () => {
  validateCpf();
  validateDate();

  if (!cpfError.value && !dateError.value) {
    props.updateFormData(props.formData);
    props.nextStep();
  }
};
</script>

<style>
.error {
  color: red;
}
</style>
