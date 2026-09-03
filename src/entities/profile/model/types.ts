// ────────────────────────────────────────────────────────────────────────────
// profile 엔티티 — 도메인 타입 정의 (이력서 상단 소개·경력·기술·학력)
// ────────────────────────────────────────────────────────────────────────────

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  links: ProfileLink[];
  email: string;
  phone?: string;
  image?: string;
}

export interface TitledItem {
  title: string;
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  team: string;
  description: string;
  responsibilities: TitledItem[];
  keyImpact: TitledItem[];
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  institution: string;
  program: string;
  period: string;
  status: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}
