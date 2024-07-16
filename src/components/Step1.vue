<template>
  <div>
    <h2>Passo 1</h2>
    <form @submit.prevent="handleNextStep">
      <label for="email">Endereço de e-mail:</label>
      <input id="email" v-model="email" type="email" @input="validateEmail" />
      <span v-if="emailError" class="error">{{ emailError }}</span>

      <label for="cadastro">Tipo de cadastro:</label>
      <select id="cadastro" v-model="cadastroType">
        <option value="PF">Pessoa Física (PF)</option>
        <option value="PJ">Pessoa Jurídica (PJ)</option>
      </select>

      <button type="submit" :disabled="isButtonDisabled">Continuar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  formData: Object,
  updateFormData: Function,
  nextStep: Function,
});

const email = ref(props.formData.email);
const cadastroType = ref(props.formData.cadastroType);
const emailError = ref("");

// Validação do e-mail
const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = emailPattern.test(email.value) ? "" : "Por favor, insira um e-mail válido.";
};

// Computed para desabilitar o botão
const isButtonDisabled = computed(() => {
  return !email.value || !!emailError.value;
});

// Assista a mudanças no email para validar quando mudar
watch(email, validateEmail);

const handleNextStep = () => {
  if (!emailError.value) {
    props.updateFormData({
      email: email.value,
      cadastroType: cadastroType.value,
    });
    props.nextStep();
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.875em;
  margin-top: 0.5em;
  display: block;
}

button {
  background-color: #171616;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #333;
}

button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
