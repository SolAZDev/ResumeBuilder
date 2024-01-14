<template lang="pug">
q-page.column.justify-center.items-center
  .col.text-center.q-pt-xl
    .text-h1 Resume Builder
    .text-subtitle2 Your One stop to build multiple resumes from one profile
  .col #[q-btn(color='primary', flat, label='Profile Editor', to="/profile")]
  .col #[q-btn(color='primary', flat, label='Import Profile')]
  .col #[q-btn(color='primary', flat, label='Layouts Editor', to="/layout")]
  .col #[q-btn(color='primary', flat, label='Assemble Resume', to="/build")]
  ImportProfile
</template>

<script setup lang="ts">
import ImportProfile from 'src/components/ImportProfile.vue';
import { ref } from 'vue';

function CheckForProfile(): boolean {
  return false;
}
</script>
