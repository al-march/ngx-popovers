export const Keys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

export const isContainElement = <T extends Node>(current: T | null, target: T | null) => {
  if (current instanceof Node && target instanceof Node) {
    return current.contains(target);
  } else {
    return false;
  }
};
