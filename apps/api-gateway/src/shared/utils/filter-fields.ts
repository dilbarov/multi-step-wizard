export const filterFields = <T>(source: Partial<T>, fields: (keyof T)[]): Partial<T> => {
  const filtered: Partial<T> = {};
  fields.forEach(field => {
    if (field in source) {
      filtered[field] = source[field];
    }
  });
  return filtered;
};
