import { beforeEach, describe, expect, it } from 'vitest';
import { format } from 'date-fns';

import {
  DAY_FORMAT,
  TIME_FORMAT,
  getNoteDateLabel,
  getTaskDueLabel,
} from '@/components/content/utils';

// Test all date labels for Notes
describe('getNoteDateLabel', () => {
  it('should return the correct date labels Notes', () => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 7);
    const threeWeeksAgo = new Date(now);
    threeWeeksAgo.setDate(now.getDate() - 21);
    const lastMonth = new Date(now);
    lastMonth.setMonth(now.getMonth() - 1);
    const lastYear = new Date(now);
    lastYear.setFullYear(now.getFullYear() - 1);

    expect(getNoteDateLabel(now)).toBe(format(now, TIME_FORMAT));
    expect(getNoteDateLabel(yesterday)).toBe(
      'Yesterday at ' + format(yesterday, TIME_FORMAT),
    );
    expect(getNoteDateLabel(lastWeek)).toBe('Last week');
    expect(getNoteDateLabel(threeWeeksAgo)).toBe('3 weeks ago');
    expect(getNoteDateLabel(lastMonth)).toBe('1 month(s) ago');
    expect(getNoteDateLabel(lastYear)).toBe('1 year(s) ago');
  });
});

// Test all date labels for Tasks
describe('getTaskDueLabel', () => {
  it('should return the correct label for Tasks', () => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const thisWeek = new Date(now);
    thisWeek.setDate(now.getDate() + 3);
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);

    expect(getTaskDueLabel(now)).toBe('Today');
    expect(getTaskDueLabel(yesterday)).toBe('Overdue');
    expect(getTaskDueLabel(tomorrow)).toBe('Tomorrow');
    expect(getTaskDueLabel(thisWeek)).toBe(format(thisWeek, DAY_FORMAT));
    expect(getTaskDueLabel(nextWeek)).toBe('Next week');
  });
});
