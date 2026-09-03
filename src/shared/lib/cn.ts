/**
 * clsx-lite: 진위값이 있는 클래스 문자열만 이어 붙인다.
 * 의존성 없이 undefined / false / "" 를 걸러내고 공백으로 join 한다.
 */
export type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
