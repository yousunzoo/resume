import Link from "next/link";
import { ArrowRightIcon, SkipLink, Text } from "@/shared/ui";
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
            <div className="mx-auto max-w-[720px]">
              {/* Top nav — jump to the full portfolio */}
              <div className="no-print mb-10 flex justify-end lg:mb-12">
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  <Text as="span" variant="body-sm" weight="semibold">
                    전체 포트폴리오 보기
                  </Text>
                  <ArrowRightIcon
                    width={15}
                    height={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              <div className="space-y-16 lg:space-y-20 print:space-y-12">
                <ResumeContent />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
