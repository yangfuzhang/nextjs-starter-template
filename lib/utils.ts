import { ReadonlyURLSearchParams } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createUrl(
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  data: Record<string, string | number>
) {
  const sParams = new URLSearchParams(
    searchParams as unknown as URLSearchParams
  );
  Object.keys(data).forEach((key) => {
    sParams.set(key, data[key].toString());
  });

  return `${pathname}?${sParams.toString()}`;
}

export function sanitizeSlug(slug: string) {
  return slug
    .trim() // 移除首尾空格
    .replace(/\s+/g, "-") // 空格替换为“-”
    .replace(/[^\p{L}\p{N}\s]+/gu, "-") // 替换非语言字符
    .replace(/-+/g, "-") // 连续"-"只保留一个
    .replace(/^-+|-+$/g, "") // 去掉首尾"-"
    .toLocaleLowerCase(); // 转换为小写
}

export function isEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (isEqual(val1, val2)) {
      // 日期特殊处理
      if (val1 instanceof Date && val2 instanceof Date) {
        const time1 = new Date(val1).getTime();
        const time2 = new Date(val2).getTime();
        if (time1 !== time2) {
          return false;
        }
      }
      continue;
    } else {
      return false;
    }
  }
  return true;
}
