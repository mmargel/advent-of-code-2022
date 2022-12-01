const countCalories = (calories: string[]): number[] => {
  let currentElf = 0;
  const caloriesByElf: number[] = [];

  for (let i = 0; i < calories.length; i++) {
    if (calories[i]) {
      caloriesByElf[currentElf] =
        (caloriesByElf[currentElf] || 0) + parseInt(calories[i], 10);
    } else {
      currentElf++;
    }
  }

  return caloriesByElf;
};

const getSumOfNMax = (calories: number[], n: number): number => {
  return calories
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, n)
    .reduce((acc, val) => acc + val, 0);
};

export { countCalories, getSumOfNMax };
