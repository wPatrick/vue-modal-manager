<script setup lang="ts">
import { useModalManager } from '../composables/useModalManager';
import Modal from './Modal.vue';

// Globale Komponente, die alle offenen Modals rendert und deren Events an den Modal-Manager weiterleitet
const { modals, closeModal, closeModalWithSuccess } = useModalManager();
</script>

<template>
  <div>
    <template v-for="modal in modals" :key="modal.id + '-' + modal.visible">
      <Modal
        :show="modal.visible"
        :maxWidth="modal.maxWidth"
        @close="closeModal(modal.id)"
        @success="(data) => closeModalWithSuccess(modal.id, data)"
      >
        <component
          :is="modal.component"
          v-bind="modal.props"
          @close="closeModal(modal.id)"
          @success="(data) => closeModalWithSuccess(modal.id, data)"
        />
      </Modal>
    </template>
  </div>
</template>
