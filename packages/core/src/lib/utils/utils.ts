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

export const awaitTime = (time = 0) => {
  return new Promise(r => setTimeout(r, time));
}

export const isHTML = (input: unknown): input is HTMLElement => {
  return input instanceof HTMLElement;
}

export const isString = (input: unknown): input is string => {
  return typeof input === 'string';
}
