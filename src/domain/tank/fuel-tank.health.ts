export function checkFuelTankHealth(
  currentLevel: number,
  realLevel: number,
): number {
  const difference = Math.abs(currentLevel - realLevel);
  return 1 - difference / currentLevel;
}
