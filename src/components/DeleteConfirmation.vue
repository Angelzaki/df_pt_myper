<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>
          <AlertTriangle :size="28" />
          Confirmar Eliminación
        </h2>
        <button @click="$emit('close')" class="close-btn">
          <X :size="24" />
        </button>
      </div>
      
      <div class="modal-body">
        <p class="confirmation-text">
          ¿Estás seguro de que deseas eliminar al usuario 
          <span class="user-name">{{ user.name }}</span>?
        </p>
        <p class="confirmation-text">
          Esta acción no se puede deshacer.
        </p>
      </div>

      <div class="modal-footer">
        <button @click="$emit('close')" class="btn btn-secondary">
          Cancelar
        </button>
        <button @click="$emit('confirm')" class="btn btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertTriangle, X } from 'lucide-vue-next'

defineProps({
  user: {
    type: Object,
    required: true
  }
})

defineEmits(['close', 'confirm'])
</script>
