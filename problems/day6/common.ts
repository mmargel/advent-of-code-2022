export const findFirstMarker = (
  byteStream: string[],
  markerLength: number
): number => {
  const visited = new Map<string, number>();
  for (let i = 0; i < byteStream.length; i++) {
    const char = byteStream[i];
    if (visited.has(char)) {
      // There was a hit - return to last know good configuration and reset state.
      i = visited.get(char)!;
      visited.clear();
    } else {
      visited.set(char, i);
      // If the list is long enough, return the index of this character, +1 for humans.
      if (visited.size >= markerLength) {
        return i + 1;
      }
    }
  }
  return -1;
};
