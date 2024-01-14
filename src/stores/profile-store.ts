import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import {
  Award,
  Education,
  ResumeProfile,
  Tooling,
  Work,
} from 'src/data/resume.model';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: {
      awards: [] as Award[],
      education: [] as Education[],
      email: '',
      frameworks: [] as Tooling[],
      icon: '',
      location: '',
      name: '',
      number: '',
      objective: '',
      skills: [] as string[],
      software: [] as Tooling[],
      subtitle: '',
      work: [] as Work[],
    } as ResumeProfile,
    $q: useQuasar(),
  }),
  getters: {
    getWholeProfile: (state) => state.profile,
  },
  actions: {
    resetProfile() {
      this.profile = {
        awards: [] as Award[],
        education: [] as Education[],
        email: '',
        frameworks: [] as Tooling[],
        icon: '',
        location: '',
        name: '',
        number: '',
        objective: '',
        skills: [] as string[],
        software: [] as Tooling[],
        subtitle: '',
        work: [] as Work[],
      };
    },
    setProfileAs(profile: ResumeProfile) {
      console.log(profile);
      this.profile = profile;
      this.saveProfileLocally();
    },
    saveProfileLocally() {
      this.$q.localStorage.set('profile', this.profile);
    },
    setContactInformation(name: string, phone: string, email: string) {
      this.profile.name = name;
      this.profile.number = phone;
      this.profile.email = email;
    },
    updateEducation(id: number, edu: Education) {
      this.profile.education[id] = edu;
    },
    addEducation(edu: Education) {
      this.profile.education.push({
        degree: edu.degree,
        locale: edu.locale,
        years: edu.years,
      } as Education);
    },
  },
});
