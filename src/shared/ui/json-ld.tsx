interface JsonLdProps {
  /** shared/lib/seo 빌더가 반환한 평범한 객체. */
  data: object;
}

/**
 * schema.org JSON-LD 를 <script> 로 렌더한다.
 * 빌더는 shared/lib/seo 에 있고, 렌더는 여기(ui)가 담당한다.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
