<template lang="pug">
q-card
  q-card-section.text-center
    .text-h6 Contact Information
    .text-subtitle2 Who are you? And how how can we get a hold of you?
  q-card-section.column
    q-input(v-model='name', type='text', label='Your name on Resume')
    q-input(v-model='phoneNo', type='text', label='Preffered Phone Number')
    q-input(v-model='email', type='email', label='Preffered Professional Email')
  q-card-section.column
    .text-center
      q-btn(color='primary', icon='save', label='Save Info', @click='setContactInfo()' :disable="!CanSubmit")
</template>
<script lang="ts" setup>
import { EventBus } from 'quasar';
import { useProfileStore } from 'src/stores/profile-store';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { inject } from 'vue';
import { ref } from 'vue';

const name = ref('');
const phoneNo = ref('');
const email = ref('');

const profileStore = useProfileStore();
const bus = inject('bus') as EventBus;

onMounted(() => {
  name.value = profileStore.profile.name;
  phoneNo.value = profileStore.profile.number;
  email.value = profileStore.profile.email;
  setTimeout(() => {
    if (CanSubmit.value) bus.emit('profileEditorCanContinue', true);
  }, 500);
});

const CanSubmit = computed(() => {
  return (
    name.value.length > 0 && phoneNo.value.length > 0, email.value.length > 0
  );
});

function setContactInfo() {
  profileStore.setContactInformation(name.value, phoneNo.value, email.value);
  bus.emit('profileEditorCanContinue', true);
}
</script>
