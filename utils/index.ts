import dayjs from "dayjs";

export function hasObjectsDifferentValues(obj1: object, obj2: object) {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

export function formatDate(
  date?: Date | string,
  format: string = "ddd, MMM DD YYYY",
): string {
  if (!date) return "";
  return dayjs(date).format(format);
}
