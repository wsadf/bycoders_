<template>
  <div>
    <form @submit.prevent="handleNextStep">
      <div v-if="props.formData?.cadastroType === 'PF'">
        <h2>Pessoa Física</h2>
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
        <input
          id="nascimento"
          v-model="props.formData.nascimento"
          @input="maskDateInput('nascimento')"
        />
        <span v-if="dateError" class="error">{{ dateError }}</span>

        <label for="telefone">Número de telefone:</label>
        <input
          id="telefonePF"
          v-model="props.formData.telefonePF"
          type="text"
          @input="maskPhoneNumberPF"
        />
        <span v-if="telefoneErrorPF" class="error">{{ telefoneErrorPF }}</span>
      </div>

      <div v-if="props.formData?.cadastroType === 'PJ'">
        <h2>Pessoa Jurídica</h2>
        <label for="razaoSocial">Razão Social:</label>
        <input
          id="razaoSocial"
          v-model="props.formData.razaoSocial"
          type="text"
        />

        <label for="cnpj">CNPJ:</label>
        <input id="cnpj" v-model="props.formData.cnpj" type="text" />

        <label for="abertura">Data de abertura:</label>
        <input
          id="abertura"
          v-model="props.formData.abertura"
          @input="maskDateInput('abertura')"
        />

        <label for="telefonePJ">Telefone:</label>
        <input
          id="telefonePJ"
          v-model="props.formData.telefonePJ"
          type="text"
          @input="maskPhoneNumberPJ"
        />
        <span v-if="telefoneErrorPJ" class="error">{{ telefoneErrorPJ }}</span>
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
let telefoneErrorPF = ref("");
let telefoneErrorPJ = ref("");

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

const maskDateInput = (fieldName) => {
  let fieldValue = props.formData[fieldName];
  let maskedValue = fieldValue
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d*/, "$1");
  props.formData[fieldName] = maskedValue;

  if (maskedValue.length === 10) {
    validateDate(fieldName);
  } else {
    dateError.value = "";
  }
};

const validateDate = (fieldName) => {
<<<<<<< HEAD
  const inputValue = props.formData[fieldName];
=======
  const inputValue = props.formData[fieldName].trim();
>>>>>>> 0f82c1e6da8a1772b899af11cd6214bec9880c35

  if (inputValue === "") {
    dateError.value = `Campo ${fieldName} é obrigatório`;
  } else {
    const d1 = Date.parse(inputValue.replace(/([0-9]+)\/([0-9]+)/, "$2/$1"));

    if (isNaN(d1)) {
      dateError.value = `Campo ${fieldName} inválido`;
    } else {
      dateError.value = "";
    }
  }
};

const isValidCpf = (cpf) => {
  // Função de validação de CPF
<<<<<<< HEAD
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
=======
>>>>>>> 0f82c1e6da8a1772b899af11cd6214bec9880c35
};

const maskPhoneNumberPF = () => {
  let phone_number = props.formData.telefonePF;
  phone_number = phone_number.replace(/\D/g, "");

  if (phone_number.length <= 10) {
    props.formData.telefonePF = phone_number
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    props.formData.telefonePF = phone_number
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  validatePhoneNumberPF(phone_number);
};

const validatePhoneNumberPF = (phone_number) => {
  if (phone_number.length < 10) {
    telefoneErrorPF.value = "Número de telefone inválido";
  } else {
    telefoneErrorPF.value = "";
  }
};

const maskPhoneNumberPJ = () => {
  let phone_number = props.formData.telefonePJ;
  phone_number = phone_number.replace(/\D/g, "");

  if (phone_number.length <= 10) {
    props.formData.telefonePJ = phone_number
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    props.formData.telefonePJ = phone_number
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  validatePhoneNumberPJ(phone_number);
};

const validatePhoneNumberPJ = (phone_number) => {
  if (phone_number.length < 10) {
    telefoneErrorPJ.value = "Número de telefone inválido";
  } else {
    telefoneErrorPJ.value = "";
  }
};

const isFormValid = computed(() => {
  if (props.formData.cadastroType === 'PF') {
    return (
      !cpfError.value &&
      !dateError.value &&
      !telefoneErrorPF.value &&
<<<<<<< HEAD
      props.formData.telefonePF !== ""
=======
      props.formData.telefonePF.trim() !== ""
>>>>>>> 0f82c1e6da8a1772b899af11cd6214bec9880c35
    );
  } else if (props.formData.cadastroType === 'PJ') {
    return (
      !dateError.value &&
      !telefoneErrorPJ.value &&
<<<<<<< HEAD
      props.formData.telefonePJ !== ""
=======
      props.formData.telefonePJ.trim() !== ""
>>>>>>> 0f82c1e6da8a1772b899af11cd6214bec9880c35
    );
  }
});

const handleNextStep = () => {
  if (props.formData.cadastroType === 'PF') {
    validateCpf();
    validateDate('nascimento');
    validatePhoneNumberPF(props.formData.telefonePF.replace(/\D/g, ""));

    if (
      !cpfError.value &&
      !dateError.value &&
      !telefoneErrorPF.value &&
<<<<<<< HEAD
      props.formData.telefonePF !== ""
    ) {
      props.updateFormData(props.formData);
      props.nextStep();
    } else if (props.formData.telefonePF === "") {
=======
      props.formData.telefonePF.trim() !== ""
    ) {
      props.updateFormData(props.formData);
      props.nextStep();
    } else if (props.formData.telefonePF.trim() === "") {
>>>>>>> 0f82c1e6da8a1772b899af11cd6214bec9880c35
      telefoneErrorPF.value = "Favor inserir um telefone";
    }
  } else if (props.formData.cadastroType === 'PJ') {
    validateDate('abertura');
    validatePhoneNumberPJ(props.formData.telefonePJ.replace(/\D/g, ""));

    if (
      !dateError.value &&
      !telefoneErrorPJ.value &&
<<<<<<< HEAD
      props.formData.telefonePJ !== ""
    ) {
      props.updateFormData(props.formData);
      props.nextStep();
    } else if (props.formData.telefonePJ === "") {
=======
      props.formData.telefonePJ.trim() !== ""
    ) {
      props.updateFormData(props.formData);
      props.nextStep();
    } else if (props.formData.telefonePJ.trim() === "") {
>>>>>>> 0f82c1e6da8a1772b899af11cd6214bec9880c35
      telefoneErrorPJ.value = "Favor inserir um telefone";
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>