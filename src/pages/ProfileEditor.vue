<template lang="pug">
q-page
  q-stepper(v-model='step', ref='stepper', color='primary', animated)
    q-step(:name='1', title='Contact Info', icon='settings', :done='step > 1')
      ContactInfo

    q-step(:name='2', title='Capabilities', caption='Skills, Education, Awards', icon='create_new_folder', :done='step > 2')
      .row
        .col-12.col-md-4
          EducationList

    q-step(:name='2', title='Experience', caption='Employment History', icon='create_new_folder', :done='step > 3')

    template(v-slot:navigation)
      q-stepper-navigation.row.justify-between
        .col-2.text-center
          q-btn(color='primary', flat icon='arrow_left', :label='ShowStepNavText?"Back":""', @click='step--' :disable="step<2")
        .col-2.text-center
          q-btn(color='primary', flat icon='save', :label='ShowStepNavText?"Save":""', @click='SaveProfile()' :disable="step<2")
        .col-2.text-center
          q-btn(color='primary', flat icon-right='arrow_right', :label='ShowStepNavText?"Next":""', @click='NextStep()' :disable="!canContinue")

</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useProfileStore } from 'src/stores/profile-store';
import { useUIStore } from 'src/stores/ui-store';
import { inject } from 'vue';
import { EventBus, useQuasar } from 'quasar';
import { onMounted } from 'vue';

import ContactInfo from 'src/components/ProfileEditor/ContactInfo.vue';
import EducationList from 'src/components/ProfileEditor/EducationList.vue';

const bus = inject('bus') as EventBus;
const profileStore = useProfileStore();
const $q = useQuasar();

const step = ref(2);
const canContinue = ref(false);

const ShowStepNavText = computed(() => {
  return $q.screen.gt.sm;
});

onMounted(() => {
  bus.on('profileEditorCanContinue', (can) => {
    canContinue.value = can;
  });
});

function NextStep() {
  canContinue.value = false;
  step.value++;
}

//TODO: Open Bottom Dialog for exporting
function SaveProfile() {
  profileStore.saveProfileLocally();
}
</script>
