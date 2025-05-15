<script setup lang="ts">
import UserCreateModal from './UserCreateModal.vue';
import { useModalManager } from '../composables/useModalManager';

const { openModal } = useModalManager();

async function openUserCreate() {
  const roles = ['Admin', 'Editor', 'Viewer'];
  const result = await openModal(UserCreateModal, { roles });
  if (result) {
    alert('Benutzer angelegt: ' + JSON.stringify(result));
  }
}
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Vue Modal Manager Demo</h1>
    <button @click="openUserCreate" class="btn btn-primary">
      Benutzer anlegen (mit Rollen-Nesting)
    </button>
  </div>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 rounded font-semibold transition-colors;
}
.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
</style>
