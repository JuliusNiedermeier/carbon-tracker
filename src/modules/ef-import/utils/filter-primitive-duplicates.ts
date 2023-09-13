/**Filters out duplicate primitive values from an array while preserving the order of the original array.*/
export const filterPrimitiveDuplicates = <T extends string | number>(array: Array<T>) => {
  return array.filter((value, index, array) => array.indexOf(value) === index);
};
