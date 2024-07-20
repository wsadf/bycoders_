<template>
  <div>
    <span class="phases">Etapa <small>3</small> de 4</span>
    <h2>Senha de acesso</h2>
    <form @submit.prevent="handleNextStep">
      <label for="senha">Sua senha:</label>
      <input id="senha" v-model="formData.senha" type="password" />
      <span v-if="senhaError" class="error">{{ senhaError }}</span>

      <div class="actions">
        <button class="btn-voltar" type="button" @click="previousStep">
          Voltar
        </button>
        <button type="submit" :disabled="!formData.senha">Continuar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  formData: Object,
  updateFormData: Function,
  previousStep: Function,
  nextStep: Function,
});

const formData = ref(props.formData);

const handleNextStep = () => {
  if (!formData.value.senha) {
    return;
  }
  props.updateFormData(formData.value);
  props.nextStep();
};

const previousStep = () => {
  props.previousStep();
};
</script>
