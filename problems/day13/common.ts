export type List = (number | List)[];

export const parseList = (list: string): List | number => {
  if (list.match(/^\d+$/)) {
    return +list;
  }

  const contents = list.slice(1, list.length - 1);
  const sublists = [];
  let sublistStart = 0;
  let depth = 0;

  for (let i = 0; i < contents.length; i++) {
    const char = contents[i];
    if (char === "[") {
      depth++;
    } else if (char === "]") {
      depth--;
    } else if (char === "," && depth === 0) {
      sublists.push(contents.slice(sublistStart, i));
      sublistStart = i + 1;
    }
  }

  // This is the empty list
  if (contents.length > 0) {
    sublists.push(contents.slice(sublistStart, contents.length));
  }

  return sublists.map(parseList);
};

export const inOrder = (
  left: List | number,
  right: List | number
): boolean | null => {
  if (typeof left == "number" && typeof right == "number") {
    if (left < right) return true;
    if (left == right) return null;
    return false;
  } else if (typeof left == "number") {
    return inOrder([left], right);
  } else if (typeof right == "number") {
    return inOrder(left, [right]);
  } else {
    let result: boolean | null | undefined = undefined;
    for (let i = 0; i < left.length && result == undefined; i++) {
      if (right[i] == undefined) return false;
      result ||= inOrder(left[i], right[i]);
    }
    if (result != undefined) {
      return result;
    } else if (left.length < right.length) {
      return true;
    } else if (left.length > right.length) {
      return false;
    } else {
      return null;
    }
  }
};

export const sortPackets = (packets: List[]): List[] => {
  if (packets.length == 1) {
    return packets;
  } else if (packets.length == 2) {
    return inOrder(packets[0], packets[1])
      ? [packets[0], packets[1]]
      : [packets[1], packets[0]];
  } else {
    const middle = Math.floor(packets.length / 2);
    const left = sortPackets(packets.slice(0, middle));
    const right = sortPackets(packets.slice(middle, packets.length));

    let i = 0;
    let j = 0;
    const buffer = [];
    while (i < left.length && j < right.length) {
      if (inOrder(left[i], right[j])) {
        buffer.push(left[i++]);
      } else {
        buffer.push(right[j++]);
      }
    }
    // only one of these will have values, all in order
    buffer.push(...left.slice(i, left.length));
    buffer.push(...right.slice(j, right.length));

    return buffer;
  }
};
