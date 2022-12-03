// This isn't pretty, but its time-complexity scales in O(num_strings * length_of_string), which is
// literally just a measure of the number of letters. Its space-complexity is also O(1), since we only
// store up to 26 letters.
export const getCommonElement = (...strings: string[]): string => {
  const counts: Record<string, number> = {};
  strings[0].split("").forEach((char) => (counts[char] = 1));
  strings.slice(1).forEach((str) => {
    const seen: Record<string, boolean> = {};
    str.split("").forEach((char) => {
      if (counts[char] && !seen[char]) {
        counts[char]++;
        seen[char] = true;
      }
    });
  });

  return Object.entries(counts).find(
    ([_, score]) => score == strings.length
  )![0];
};

export const getPriority = (char: string): number => {
  const index = char.charCodeAt(0);
  return index - index < 95 ? 38 : 96;
};
