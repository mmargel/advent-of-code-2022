export interface Range {
  min: number;
  max: number;
}

export type Tuple = [Range, Range];

const getRange = (rawRange: string): Range => {
  const [min, max] = rawRange.split("-").map((str) => parseInt(str, 10));
  return { min, max } as Range;
};

export const getRanges = (rawAssignment: string): Tuple => {
  const rawRanges = rawAssignment.split(",");
  return [getRange(rawRanges[0]), getRange(rawRanges[1])];
};

export const filterAssignments = (
  assignments: string[],
  filter: (ranges: Tuple) => boolean
): Tuple[] => {
  return assignments.map(getRanges).filter(filter);
};
