<template>
  <div class="p-6 w-full max-w-sm">
    <h2 class="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
      <span class="i-lucide-shield-plus w-6 h-6 text-green-500"></span>
      Neue Rolle anlegen
    </h2>
    <form @submit.prevent="submitRole" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Rollenname</label>
        <input v-model="role" type="text" class="input input-bordered w-full" required />
      </div>
      <div class="flex justify-end gap-2 mt-6">
        <button type="button" @click="$emit('close')" class="btn btn-secondary">Abbrechen</button>
        <button type="submit" class="btn btn-primary">Rolle anlegen</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['success', 'close']);
const role = ref('');

function submitRole() {
  if (role.value.trim()) {
    emit('success', { role: role.value.trim() });
  }
}
</script>

<style scoped>
.input {
  @apply border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100;
}
.input-bordered {
  @apply border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:border-blue-400;
}
.btn {
  @apply px-4 py-2 rounded font-semibold transition-colors;
}
.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
.btn-secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600;
}
</style>
