import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';

export const useUIStore = defineStore('UIStore', {
  state: () => ({
    importOpened: false,
    eduEditOpen: false,
    eduAddOpen: false,
    $q: useQuasar(),
  }),
  actions: {},
});
