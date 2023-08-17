<template lang="pug">
q-page
  q-stepper(v-model="step")
  q-stepper-
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type {
  ResumeProfile,
  Award,
  Education,
  Tooling,
  Work,
} from '../data/resume.model';

const step = ref(0);
const resume = ref({
  icon: '',
  name: '',
  subtitle: '',
  location: '',
  email: '',
  number: '',
  objective: '',
  skills: [],
  frameworks: [] as Tooling[],
  software: [] as Tooling[],
  education: [] as Education[],
  awards: [] as Award[],
  work: [] as Work[],
} as ResumeProfile);

function importProfile() {
  return;
}
</script>
