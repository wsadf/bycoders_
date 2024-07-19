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
        <button type="button" @click="openEditModal">Editar</button>
        <button type="button" @click="submitForm">Cadastrar</button>
      </div>
    </div>

    <!-- Modal de edição -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2>Editar</h2>
        <label for="edit-email">Endereço de email:</label>
        <input id="edit-email" v-model="editData.email" type="email" />
        <label for="edit-type">Tipo de Cadastro:</label>
        <input id="edit-type" v-model="editData.cadastroType" type="text" />
        <div v-if="formData.cadastroType === 'PF'">
          <label for="edit-name">Nome:</label>
          <input id="edit-name" v-model="editData.nome" type="text" />
          <label for="edit-cpf">CPF:</label>
          <input id="edit-cpf" v-model="editData.cpf" type="text" />
          <label for="edit-nascimento">Data de nascimento:</label>
          <input id="edit-nascimento" v-model="editData.nascimento" type="text" />
          <label for="edit-telefonePF">Telefone:</label>
          <input id="edit-telefonePF" v-model="editData.telefonePF" type="text" />
        </div>
        <div v-if="formData.cadastroType === 'PJ'">
          <label for="edit-social">Razão Social:</label>
          <input id="edit-social" v-model="editData.razaoSocial" type="text" />
          <label for="edit-cnpj">CNPJ:</label>
          <input id="edit-cnpj" v-model="editData.cnpj" type="text" />
          <label for="edit-abertura">Data de abertura:</label>
          <input id="edit-abertura" v-model="editData.abertura" type="text" />
          <label for="edit-telefonePJ">Telefone:</label>
          <input id="edit-telefonePJ" v-model="editData.telefonePJ" type="text" />
        </div>
        
        <label for="edit-name">Senha:</label>
        <input id="edit-name" v-model="editData.senha" type="text" />
        <!-- Repetir para outros campos necessários -->

        <div class="actions">
          <button @click="handleEditSave">Salvar</button>
          <button @click="closeEditModal">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal de sucesso -->
    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <p>Cadastro realizado com sucesso!</p>
        <button @click="handleModalClose">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["formData", "previousStep", "submitForm"]);
const formData = ref(props.formData);
const showSuccessModal = ref(false);

const showEditModal = ref(false);
const editData = ref({ ...props.formData });

const openEditModal = () => {
  editData.value = { ...props.formData };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const handleEditSave = () => {
  console.log('salvar')
  Object.assign(formData.value, editData.value);
  closeEditModal();
  // props.updateFormData(editData.value);
  // closeEditModal();
};

const previousStep = () => {
  props.previousStep();
};

const submitForm = () => {
  let dados = {};

  if (formData.value.email) dados.email = formData.value.email;
  if (formData.value.cadastroType) dados.cadastro = formData.value.cadastroType;
  if (formData.value.nome) dados.nome = formData.value.nome;
  if (formData.value.cpf) dados.cpf = formData.value.cpf;
  if (formData.value.nascimento) dados.nascimento = formData.value.nascimento;
  if (formData.value.telefonePF) dados.telefonePF = formData.value.telefonePF;
  if (formData.value.razaoSocial) dados.razao = formData.value.razaoSocial;
  if (formData.value.cnpj) dados.cnpj = formData.value.cnpj;
  if (formData.value.abertura) dados.abertura = formData.value.abertura;
  if (formData.value.telefonePJ) dados.telefonePJ = formData.value.telefonePJ;
  if (formData.value.senha) dados.senha = formData.value.senha;

  fetch("http://localhost:9000/registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  }).then((response) => {
    if (response.ok) {
      showSuccessModal.value = true;
    }
  });
  props.submitForm();
};

const handleModalClose = () => {
  showSuccessModal.value = false;

  formData.value.email = "";
  formData.value.cadastroType = "PF";
  formData.value.nome = "";
  formData.value.cpf = "";
  formData.value.nascimento = "";
  formData.value.telefonePF = "";
  formData.value.razaoSocial = "";
  formData.value.cnpj = "";
  formData.value.abertura = "";
  formData.value.telefonePJ = "";
  formData.value.senha = "";

  const navigateToFirstStep = () => {
    if (props.previousStep !== undefined) {
      props.previousStep();
      navigateToFirstStep();
    }
  };

  navigateToFirstStep();
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal button {
  margin-top: 10px;
}
</style>
