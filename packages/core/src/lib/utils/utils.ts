export const Keys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};
