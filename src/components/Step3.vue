<template>
  <div>
    <p class="phases">Etapa <span>3</span> de 4</p>
    <h2>Senha de acesso</h2>
    <form @submit.prevent="handleNextStep">
      <label for="senha">Sua senha:</label>
      <input id="senha" v-model="formData.senha" type="password" required />

      <div class="actions">
        <button class="btn-voltar"  type="button" @click="previousStep">Voltar</button>
        <button type="submit">Continuar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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