import { AboutSection } from "./about-section";
import { ExperienceSection } from "./experience-section";
import { ProjectsSection } from "./projects-section";
import { EducationSection } from "./education-section";
import { CertificationsSection } from "./certifications-section";

/**
 * 이력서 메인 컬럼의 5개 섹션을 순서대로 합성한다.
 *
 * 바깥 래퍼(`max-w-[720px] space-y-16 lg:space-y-20`)는 Phase 6 의 view 가
 * <main> 구조 안에서 소유한다. 따라서 여기서는 자체 spacing 래퍼를 두지 않고
 * fragment 로 섹션만 나열해, view 의 space-y 가 섹션 간 간격을 그대로 제어하도록 한다.
 */
export function ResumeContent() {
  return (
    <>
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
    </>
  );
}
