<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button @click="$emit('close')" class="close-btn">
          <X :size="24" />
        </button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nombre *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              :class="{ error: errors.name }"
            />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="username">Usuario *</label>
            <input
              id="username"
              v-model="formData.username"
              type="text"
              required
              :class="{ error: errors.username }"
            />
            <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              :class="{ error: errors.email }"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="phone">Teléfono *</label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              required
              :class="{ error: errors.phone }"
            />
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>
        </form>
      </div>

      <div class="modal-footer">
        <button @click="$emit('close')" class="btn btn-secondary">
          Cancelar
        </button>
        <button @click="handleSubmit" class="btn btn-primary">
          {{ submitText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  user: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: 'Agregar Usuario'
  },
  submitText: {
    type: String,
    default: 'Guardar'
  }
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  name: '',
  username: '',
  email: '',
  phone: ''
})

const errors = ref({})

watch(() => props.user, (newUser) => {
  if (newUser) {
    formData.value = { ...newUser }
  } else {
    formData.value = {
      name: '',
      username: '',
      email: '',
      phone: ''
    }
  }
}, { immediate: true })

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!formData.value.name.trim()) {
    errors.value.name = 'El nombre es requerido'
    isValid = false
  }

  if (!formData.value.username.trim()) {
    errors.value.username = 'El usuario es requerido'
    isValid = false
  }

  if (!formData.value.email.trim()) {
    errors.value.email = 'El email es requerido'
    isValid = false
  } else if (!validateEmail(formData.value.email)) {
    errors.value.email = 'El email no es válido'
    isValid = false
  }

  if (!formData.value.phone.trim()) {
    errors.value.phone = 'El teléfono es requerido'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...formData.value })
  }
}
</script>
