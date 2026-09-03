import { SkipLink } from "@/shared/ui";
import { ResumeSidebar } from "@/widgets/resume-sidebar";
import { ResumeContent } from "@/widgets/resume-content";

/**
 * 홈(이력서) 화면 조립 — 좌측 사이드바 + 우측 메인 컬럼의 5개 섹션.
 * 레이아웃 래퍼(그리드, max-width, spacing)와 SkipLink 앵커 타깃(`#main`)을
 * 이 view 가 소유한다. app 라우트는 이 컴포넌트만 렌더한다.
 */
export function HomeView() {
  return (
    <>
      <SkipLink />
      <div className="min-h-screen bg-canvas">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* Left rail */}
          <ResumeSidebar />

          {/* Main column */}
          <main
            id="main"
            className="bg-canvas px-6 py-10 sm:px-9 lg:px-12 lg:py-14"
          >
            <div className="mx-auto max-w-[720px] space-y-16 lg:space-y-20">
              <ResumeContent />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
