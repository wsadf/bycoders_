<template>
    <div id="app">
      <component
        class="step-component"
        :is="currentStepComponent"
        :formData="formData"
        :updateFormData="updateFormData"
        :previousStep="previousStep"
        :nextStep="nextStep"
        :submitForm="submitForm"
        :setStep="setStep"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import Step1 from "../components/Step1.vue";
  import Step2 from "../components/Step2.vue";
  import Step3 from "../components/Step3.vue";
  import Step4 from "../components/Step4.vue";
  
  const formData = ref({
    email: "",
    cadastroType: "PF",
    nome: "",
    cpf: "",
    nascimento: "",
    telefone: "",
    razaoSocial: "",
    cnpj: "",
    abertura: "",
    senha: "",
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
      Object.entries(formData.value).filter(([_, v]) => v !== "")
  };
  
  const setStep = (newStep) => {
    step.value = newStep;
  };
  
  onMounted(() => {
    if (window.location.pathname !== '/registration') {
      window.location.href = '/registration';
    }
  });
  </script>

  