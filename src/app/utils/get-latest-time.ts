export function getLatestTime(countHours: number): Date {
  const now: Date = new Date();
  now.setHours(now.getHours() - countHours);
  return now;
}
