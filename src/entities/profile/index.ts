// profile 엔티티 public API
// entities 계층은 shared 와 외부 패키지에만 의존한다.

export type {
  ProfileLink,
  Profile,
  TitledItem,
  Experience,
  TechStackGroup,
  EducationItem,
  Certification,
} from "./model/types";

export {
  profile,
  summary,
  aboutMe,
  metrics,
  experiences,
  techStack,
  education,
  certifications,
} from "./model/profile";
