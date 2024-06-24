/**
 * 주어진 입력이 문자열인지 Date 객체인지 확인하고 Date 객체로 변환합니다.
 * @param input - 날짜 입력 (문자열 또는 Date 타입)
 * @returns Date 객체
 */
export function toDate(input: string | Date): Date {
  return typeof input === 'string' ? new Date(input) : input;
}

/**
 * 두 날짜 사이의 날짜를 숫자로 반환합니다.
 * @param date - 기준 날짜 (문자열 또는 Date 타입)
 * @param startDate - 시작 날짜 (문자열 또는 Date 타입)
 * @param endDate - 끝 날짜 (문자열 또는 Date 타입)
 * @returns 해당 날짜가 기준 날짜로부터 며칠 째인지를 나타내는 숫자. 범위를 벗어날 경우 -1을 반환합니다.
 */
export function getDayNum(date: string | Date, startDate: string | Date, endDate: string | Date): number {
  const start = toDate(startDate);
  const end = toDate(endDate);
  const current = toDate(date);

  // 날짜 형식이 유효하지 않거나 범위를 벗어난 경우
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || Number.isNaN(current.getTime())) {
    return -1;
  }

  if (current < start || current > end) {
    return -1;
  }

  // 0부터 시작하는 차이를 1부터 시작하는 차이로 변환
  const dayDiff = Math.floor((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return dayDiff;
}

/**
 * 특정 일수가 시작 날짜로부터 며칠째인지를 나타내는 날짜를 반환합니다.
 * @param dayNum - 시작 날짜로부터 며칠째인지 나타내는 숫자
 * @param startDate - 시작 날짜 (문자열 또는 Date 타입)
 * @param endDate - 끝 날짜 (문자열 또는 Date 타입)
 * @returns 특정 일수에 해당하는 날짜 문자열 (YYYY-MM-DD 형식). 범위를 벗어날 경우 null을 반환합니다.
 */
export function getDateFromDayNum(dayNum: number, startDate: string | Date, endDate: string | Date): string | null {
  const start = toDate(startDate);
  const end = toDate(endDate);

  // 날짜 형식이 유효하지 않거나 범위를 벗어난 경우
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || dayNum < 1) {
    return null;
  }

  // 시작 날짜와 일수를 기준으로 날짜를 계산
  const resultDate = new Date(start.getTime() + (dayNum - 1) * 24 * 60 * 60 * 1000);

  // 계산된 날짜가 범위를 벗어나는 경우
  if (resultDate > end) {
    return null;
  }

  // 날짜를 YYYY-MM-DD 형식의 문자열로 변환하여 반환
  const year = resultDate.getFullYear();
  const month = String(resultDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(resultDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
