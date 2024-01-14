<template lang="pug">
.column.q-gutter-y-lg.full-width
  q-input(v-model='props.info.degree', type='text', label='Degree')
  q-input(v-model='props.info.locale', type='text', label='Institution')
  q-input(v-model='props.info.years', type='text', label='Year(s)')
  q-btn(color='primary', icon='save', :label='saveLabel', @click='SaveEducation()' :disable="!canSave")
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import type { PropType } from 'vue';
import type { Education } from 'src/data/resume.model';
import { useProfileStore } from 'src/stores/profile-store';
import { useUIStore } from 'src/stores/ui-store';
import { inject } from 'vue';
import { EventBus } from 'quasar';

const profile = useProfileStore();
const UIStore = useUIStore();

const bus = inject('bus') as EventBus;

const props = defineProps({
  eduId: { type: Number, default: -1 },
  info: {
    type: Object as PropType<Education>,
    required: true,
    // default: (rawProps: any) => {
    //   return { degree: '', locale: '', years: '' };
    // },
  },
});

const saveLabel = computed(() => {
  return props.eduId > -1 ? 'Save' : 'Add';
});

const canSave = computed(() => {
  return (
    props.info?.degree.length > 0 &&
    props.info?.years.length > 0 &&
    props.info?.locale.length > 0
  );
});

function SaveEducation() {
  if (props.eduId > -1) {
    profile.updateEducation(props.eduId, props.info as Education);
    UIStore.eduEditOpen = false;
  } else {
    profile.addEducation(props.info as Education);
    UIStore.eduAddOpen = false;
  }
  bus.emit('resetEduInput');
}
</script>
