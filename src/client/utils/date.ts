export const SECOND = 1000;

export const MINUTE = 60 * SECOND;

export const HOUR = 60 * MINUTE;

export const DAY = 24 * HOUR;

export const WEEK = 7 * DAY;

export function timeAgo(date: string | Date) {
  return Date.now() - new Date(date).getTime();
}
