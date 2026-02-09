<template>
  <div class="table-container">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Cargando usuarios...</p>
    </div>

    <div v-else-if="users.length === 0" class="empty-state">
      <div class="empty-state-icon">
        <Inbox :size="80" :stroke-width="1.5" />
      </div>
      <h3>No hay usuarios registrados</h3>
      <p>Comienza agregando un nuevo usuario</p>
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <div class="actions">
              <button @click="$emit('edit', user)" class="btn btn-success btn-sm">
                <Edit2 :size="16" />
                Editar
              </button>
              <button @click="$emit('delete', user)" class="btn btn-danger btn-sm">
                <Trash2 :size="16" />
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { Inbox, Edit2, Trash2 } from 'lucide-vue-next'

defineProps({
  users: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete'])
</script>
