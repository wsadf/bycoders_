<template>
  <div id="app">
    <component :is="currentStepComponent" 
               :formData="formData" 
               :updateFormData="updateFormData" 
               :previousStep="previousStep" 
               :nextStep="nextStep" 
               :submitForm="submitForm" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Step1 from './components/Step1.vue';
import Step2 from './components/Step2.vue';
import Step3 from './components/Step3.vue';
import Step4 from './components/Step4.vue';

export default {
  setup() {
    const formData = ref({
      email: '',
      cadastroType: 'PF',
      nome: '',
      cpf: '',
      nascimento: '',
      telefone: '',
      razaoSocial: '',
      cnpj: '',
      abertura: '',
      senha: ''
    });

    const step = ref(1);

    const steps = [Step1, Step2, Step3, Step4];
    const currentStepComponent = computed(() => steps[step.value - 1]);

    const updateFormData = (data) => {
      formData.value = { ...formData.value, ...data };
    };

    const previousStep = () => {
      if (step.value > 1) {
        step.value--;
      }
    };

    const nextStep = () => {
      if (step.value < steps.length) {
        step.value++;
      }
    };

    const submitForm = () => {
      console.log('Form data submitted:', formData.value);
      // Aqui você pode fazer uma requisição para a API de cadastro.
    };

    return {
      formData,
      currentStepComponent,
      updateFormData,
      previousStep,
      nextStep,
      submitForm
    };
  }
};
</script>

<style>
/* Estilos globais */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #171616;
}

#app {
  max-width: 600px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  margin: 20px;
}

h2 {
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
  font-weight: 700;
  color: #171616;
  display: block;
  text-align: left;
}

input, select, button {
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
}

input:focus, select:focus, button:focus {
  border-color: #007BFF;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
  color: #171616;
}

select {
  color: #171616;
}

button {
  background-color: #171616;
  height: 48px;
  border-radius: 28px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

button:hover {
  background-color: #fff;
  border: 1px solid #171616;
  color: #171616;
}

.actions { 
  display: flex;
}
@media (max-width: 600px) {
  #app {
    padding: 15px;
    margin: 10px;
  }
}
</style>
