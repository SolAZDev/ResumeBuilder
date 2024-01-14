<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar
      q-btn(flat, dense, round, icon="menu", aria-label="Menu", @click="toggleLeftDrawer")
        q-toolbar-title.

          Quasar App

        div Quasar v{{ $q.version }}
  q-drawer(v-model="leftDrawerOpen", show-if-above, bordered)
    q-list
      q-item-label(header)


  q-page-container
    router-view

</template>

<script setup lang="ts">
import { ref } from 'vue';
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
