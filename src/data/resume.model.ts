export interface ResumeProfile {
  icon: string;
  name: string;
  subtitle: string;
  location: string;
  email: string;
  number: string;
  objective: string;
  skills: string[];
  frameworks: Tooling[];
  software: Tooling[];
  education: Education[];
  awards: Award[];
  work: Work[];
}

export interface Award {
  name: string;
  by: string;
}

export interface Education {
  locale: string;
  years: string;
  degree: string;
}

export interface Tooling {
  name: string;
  type: string[];
}

export interface Work {
  position: string;
  employer: string;
  time: string;
  type: string[];
  responsibilities: string[];
}
