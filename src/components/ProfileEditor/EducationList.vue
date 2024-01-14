<template lang="pug">
q-card.my-card
  q-card-section
    .text-h6 Education
  q-card-section
    q-expansion-item(expand-separator , icon='add_circle', label='Add Education' v-model="UIStore.eduAddOpen")
      q-card.my-card
        q-card-section.row
          EducationEditor(eduId="0", :info="newEducation")
  q-card-section
    q-list
      q-item(v-for="(education, idx) in profile.profile.education")
        q-item-section
          .text-label {{ education.degree }}
          .text-caption {{ education.locale }} ({{ education.years }})
        q-item-section(avatar)
          q-btn(color='primary', icon='edit', @click='openEduEdit(idx)')

q-dialog(v-model='eduEdit', persistent)
  q-card.editDialog
    q-card-section.row.justify-between
      .col.text-h6 Edit Education
      .col-1 #[q-btn(color='primary', flat icon='close', @click='UIStore.eduEditOpen=false') ]
    q-card-section
      EducationEditor(:eduId="tempEduId" :info="tempEdu")

</template>
<script lang="ts" setup>
import type { Education } from 'src/data/resume.model';
import { ref } from 'vue';
import { useUIStore } from 'src/stores/ui-store';
import { useProfileStore } from 'src/stores/profile-store';
import EducationEditor from './EducationEditor.vue';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { inject } from 'vue';
import { EventBus } from 'quasar';

const newEducation = ref({
  degree: '',
  locale: '',
  years: '',
} as Education);
const tempEdu = ref({} as Education);
const tempEduId = ref(-1);

const UIStore = useUIStore();
const profile = useProfileStore();

const bus = inject('bus') as EventBus;
onMounted(() => {
  bus.on('resetEduInput', () => {
    tempEdu.value = {} as Education;
    newEducation.value = {
      degree: '',
      locale: '',
      years: '',
    } as Education;
    UIStore.eduAddOpen = false;
    UIStore.eduEditOpen = false;
  });
});

function openEduEdit(eduId: number) {
  tempEduId.value = eduId;
  tempEdu.value = {
    degree: profile.profile.education[eduId].degree,
    locale: profile.profile.education[eduId].locale,
    years: profile.profile.education[eduId].years,
  };
  UIStore.eduEditOpen = true;
}
const eduEdit = computed(() => {
  return UIStore.eduEditOpen;
});
const eduAdd = computed(() => {
  return UIStore.eduAddOpen;
});
</script>
<style lang="sass">
.editDialog
  min-width: 25vw
  .row
    width: 99%
</style>
