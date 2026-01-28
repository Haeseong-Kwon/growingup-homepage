/**
 * 줄바꿈 문자를 정규화하는 유틸리티 함수
 * - "\\n" (문자열) -> "\n" (실제 개행)
 * - "\r\n" -> "\n"
 */
export function normalizeNewlines(text: string): string {
  return text.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
}

