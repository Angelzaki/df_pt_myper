<template>
  <div class="container">
    <div class="header">
      <h1>
        <Users :size="32" />
        Gestión de Usuarios
      </h1>
      <button @click="openAddModal" class="btn btn-primary">
        <UserPlus :size="20" />
        Agregar Usuario
      </button>
    </div>

    <UserTable 
      :users="users" 
      :loading="loading"
      @edit="openEditModal"
      @delete="openDeleteConfirmation"
    />

    <UserModal
      v-if="showModal"
      :user="selectedUser"
      :title="modalTitle"
      :submitText="modalSubmitText"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <DeleteConfirmation
      v-if="showDeleteConfirmation"
      :user="userToDelete"
      @close="closeDeleteConfirmation"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Users, UserPlus } from 'lucide-vue-next'
import UserTable from './components/UserTable.vue'
import UserModal from './components/UserModal.vue'
import DeleteConfirmation from './components/DeleteConfirmation.vue'
import { useUsers } from './composables/useUsers'

const { users, loading, fetchUsers, addUser, updateUser, deleteUser } = useUsers()

const showModal = ref(false)
const selectedUser = ref(null)
const showDeleteConfirmation = ref(false)
const userToDelete = ref(null)

const modalTitle = computed(() => 
  selectedUser.value ? 'Editar Usuario' : 'Agregar Usuario'
)

const modalSubmitText = computed(() => 
  selectedUser.value ? 'Actualizar' : 'Guardar'
)

const openAddModal = () => {
  selectedUser.value = null
  showModal.value = true
}

const openEditModal = (user) => {
  selectedUser.value = { ...user }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedUser.value = null
}

const handleSubmit = (userData) => {
  if (selectedUser.value) {
    updateUser(selectedUser.value.id, userData)
  } else {
    addUser(userData)
  }
  closeModal()
}

const openDeleteConfirmation = (user) => {
  userToDelete.value = user
  showDeleteConfirmation.value = true
}

const closeDeleteConfirmation = () => {
  showDeleteConfirmation.value = false
  userToDelete.value = null
}

const confirmDelete = () => {
  if (userToDelete.value) {
    deleteUser(userToDelete.value.id)
  }
  closeDeleteConfirmation()
}

onMounted(() => {
  fetchUsers()
})
</script>
