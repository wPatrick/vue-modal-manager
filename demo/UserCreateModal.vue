<template>
  <div class="p-6 w-full max-w-md">
    <h2 class="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
      <span class="i-lucide-user-plus w-6 h-6 text-blue-500"></span>
      Benutzer anlegen
    </h2>
    <form @submit.prevent="submitUser" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Name</label>
        <input v-model="user.name" type="text" class="input input-bordered w-full" required />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Rolle</label>
        <div class="flex gap-2">
          <select v-model="user.role" class="input input-bordered w-full">
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
          </select>
          <button type="button" @click="openRoleModal" class="btn btn-sm btn-outline-primary">Neue Rolle</button>
        </div>
      </div>
      <div class="flex justify-end gap-2 mt-6">
        <button type="button" @click="$emit('close')" class="btn btn-secondary">Abbrechen</button>
        <button type="submit" class="btn btn-primary">Benutzer anlegen</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useModalManager } from '../composables/useModalManager';
import RoleModal from './RoleModal.vue';

const props = defineProps<{ roles: string[] }>();
const emit = defineEmits(['success', 'close']);
const { openModal } = useModalManager();

const user = ref({ name: '', role: props.roles[0] || '' });
const roles = ref([...props.roles]);

async function openRoleModal() {
  const result = await openModal(RoleModal);
  if (result && result.role) {
    roles.value.push(result.role);
    user.value.role = result.role;
  }
}

function submitUser() {
  emit('success', { ...user.value });
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
.btn-outline-primary {
  @apply border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900;
}
</style>
