import type { DailyTracking, Mission, RPGStats } from '../types';

const XP_PER_LEVEL = 1000;
const XP_GROWTH_RATE = 1.5;

export function calculateXPForLevel(level: number): number {
  return Math.floor(XP_PER_LEVEL * Math.pow(XP_GROWTH_RATE, level - 1));
}

export function calculateLevelFromXP(totalXP: number): { level: number; currentXP: number; xpToNext: number } {
  let level = 1;
  let xpRemaining = totalXP;

  while (true) {
    const xpNeeded = calculateXPForLevel(level);
    if (xpRemaining < xpNeeded) {
      return { level, currentXP: xpRemaining, xpToNext: xpNeeded };
    }
    xpRemaining -= xpNeeded;
    level++;
  }
}

export function calculateHealthFromTracking(tracking: DailyTracking | null): number {
  if (!tracking) return 50;
  const mood = tracking.moodScore ?? 5;
  const stress = tracking.stressScore ?? 5;
  // Health = mood high + stress low
  return Math.round(((mood / 10) * 60 + ((10 - stress) / 10) * 40));
}

export function calculateEnergyFromTracking(tracking: DailyTracking | null): number {
  if (!tracking) return 50;
  return Math.round((tracking.energyScore ?? 5) * 10);
}

export function calculateXPFromActivities(
  completedMissions: number,
  trackingDays: number,
  sessionsAttended: number,
): number {
  return completedMissions * 50 + trackingDays * 25 + sessionsAttended * 100;
}

export function getRPGStats(
  tracking: DailyTracking | null,
  completedMissions: number,
  trackingDays: number,
  sessionsAttended: number,
): RPGStats {
  const totalXP = calculateXPFromActivities(completedMissions, trackingDays, sessionsAttended);
  const { level, currentXP, xpToNext } = calculateLevelFromXP(totalXP);

  return {
    health: calculateHealthFromTracking(tracking),
    energy: calculateEnergyFromTracking(tracking),
    xp: currentXP,
    xpToNext,
    level,
    streak: trackingDays,
  };
}

export function getHealthColor(health: number): string {
  if (health >= 70) return '#22C55E';
  if (health >= 40) return '#F59E0B';
  return '#EF4444';
}

export function getEnergyColor(energy: number): string {
  if (energy >= 70) return '#22C55E';
  if (energy >= 40) return '#F0A830';
  return '#F59E0B';
}
