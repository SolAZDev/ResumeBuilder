<template lang="pug">
q-dialog(v-model='opened', persistent)
  q-card#importWindow
    q-card-section.text-center
      .text-h4 Import Profile
    q-card-section.column
      q-file(filled, v-model="proFile", label="Local Profile File", accept=".rbp.json" @update:model-value="fileSelected")
        template(v-slot:prepend)
          q-icon(name='attach_file' @click.stop.prevent)
        template(v-slot:append)
          q-icon.cursor-pointer(name='close', @click.stop.prevent="proFile=null")

      q-input(v-model='profileText', type='textarea', label='Profile Data')
      q-btn(color='primary', label='Parse Data' @click="parseImported()")

    q-card-actions(align='around')
      q-btn(flat, label='Cancel', color='primary', @click="UIStore.importOpened = false")
      q-btn(flat, label='Commit to Profile', color='primary', @click="commitProfile()" :disabled="profileText==null")
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { ResumeProfile } from 'src/data/resume.model';
import { useProfileStore } from 'src/stores/profile-store';
import beautify from 'json-beautify';
import { computed, ref } from 'vue';
import { useUIStore } from 'src/stores/ui-store';

const profileStore = useProfileStore();
const UIStore = useUIStore();
const $q = useQuasar();

const proFile = ref(null as unknown as File);
const profileText = ref('');
const opened = computed(() => UIStore.importOpened);

function fileSelected() {
  if (!!profileText.value) {
    $q.dialog({
      title: 'Hold on!',
      message: 'This will overwrite the textfield below. Continue?',
      cancel: true,
      persistent: true,
    })
      .onCancel(() => {
        return;
      })
      .onOk(() => {
        //TODO: There should be a better way to do this...
        profileText.value = '';
        fileSelected();
      });
  }
  const reader = new FileReader();
  reader.addEventListener('load', (ev) => {
    profileText.value = beautify(
      JSON.parse(ev.target?.result as string),
      null as any,
      2,
      80
    );
  });
  reader.readAsText(proFile.value);
}

function parseImported() {
  //TODO: How do we verify object is type of Interface??
  const parsed = JSON.parse(profileText.value);
}

function commitProfile() {
  profileStore.setProfileAs(JSON.parse(profileText.value) as ResumeProfile);
  UIStore.importOpened = false;
}
</script>
<style lang="sass">
#importWindow
  min-width: 70vw

#profileTextArea
  min-height: 30vh
</style>
