<template>
  <div>
    <h2>Passo 3</h2>
    <form @submit.prevent="handleNextStep">
      <label for="senha">Senha de acesso:</label>
      <input id="senha" v-model="formData.senha" type="password" required />

      <div class="actions">
        <button type="button" @click="previousStep">Voltar</button>
        <button type="submit">Continuar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  formData: Object,
  updateFormData: Function,
  previousStep: Function,
  nextStep: Function,
});

const formData = ref(props.formData);

const handleNextStep = () => {
  props.updateFormData(formData.value);
  props.nextStep();
};

const previousStep = () => {
  props.previousStep();
};
</script>
