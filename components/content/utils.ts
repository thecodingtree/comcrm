import {
  isPast,
  isToday,
  isTomorrow,
  isYesterday,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  format,
} from 'date-fns';

// etc: 12:00 PM
export const TIME_FORMAT = 'h:mm a';
export const DAY_FORMAT = 'EEEE';

export const getNoteDateLabel = (date: Date): string => {
  const now = new Date();
  const daysSinceDate = differenceInCalendarDays(now, date);
  const weeksSinceDate = differenceInCalendarWeeks(now, date);
  const monthsSinceDate = differenceInCalendarMonths(now, date);
  const yearsSinceDate = differenceInCalendarYears(now, date);

  if (isToday(date)) {
    return format(date, TIME_FORMAT);
  }

  if (isYesterday(date)) {
    return `Yesterday at ${format(date, TIME_FORMAT)}`;
  }

  if (weeksSinceDate === 0) {
    return `${daysSinceDate} days ago`;
  }

  if (weeksSinceDate === 1) {
    return 'Last week';
  }

  if (weeksSinceDate > 1 && weeksSinceDate < 4) {
    return `${weeksSinceDate} weeks ago`;
  }

  if (monthsSinceDate >= 1 && monthsSinceDate < 12) {
    return `${monthsSinceDate} month(s) ago`;
  }

  return `${yearsSinceDate} year(s) ago`;
};

export const getTaskDueLabel = (date: Date): string => {
  const now = new Date();

  if (isPast(date)) {
    return 'Overdue';
  }

  if (isToday(date)) {
    return 'Today';
  }

  if (isTomorrow(date)) {
    return 'Tomorrow';
  }

  if (differenceInCalendarWeeks(date, now) === 0) {
    return `${format(date, DAY_FORMAT)}`;
  }

  if (differenceInCalendarWeeks(date, now) === 1) {
    return 'Next week';
  }

  return `${differenceInCalendarWeeks(date, now)} weeks from now`;
};
