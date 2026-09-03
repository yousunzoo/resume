/**
 * schema.org JSON-LD 빌더 — 순수 함수만 모은다.
 * React 나 데이터 import 없이 인자만 받아 평범한 객체를 반환한다.
 * 렌더링은 shared/ui/json-ld 의 <JsonLd /> 가 담당한다.
 */

const CONTEXT = "https://schema.org" as const;

export interface PersonJsonLdInput {
  name: string;
  jobTitle: string;
  url: string;
  sameAs?: string[];
  description?: string;
  image?: string;
}

export function buildPersonJsonLd({
  name,
  jobTitle,
  url,
  sameAs,
  description,
  image,
}: PersonJsonLdInput) {
  return {
    "@context": CONTEXT,
    "@type": "Person",
    name,
    jobTitle,
    url,
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
  };
}

export interface ProfilePageJsonLdInput {
  name: string;
  url: string;
}

export function buildProfilePageJsonLd({ name, url }: ProfilePageJsonLdInput) {
  return {
    "@context": CONTEXT,
    "@type": "ProfilePage",
    name,
    url,
  };
}

export interface CreativeWorkJsonLdInput {
  name: string;
  description?: string;
  url?: string;
  keywords?: string[];
}

export function buildCreativeWorkJsonLd({
  name,
  description,
  url,
  keywords,
}: CreativeWorkJsonLdInput) {
  return {
    "@context": CONTEXT,
    "@type": "CreativeWork",
    name,
    ...(description ? { description } : {}),
    ...(url ? { url } : {}),
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
  };
}
