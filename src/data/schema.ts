import { z } from "zod";

// 藝廊照片型別
export const GalleryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(["space", "team", "latte_art"]),
  imageUrl: z.string(),
});

// 店鋪基本資訊型別
export const StoreInfoSchema = z.object({
  name: z.string(),
  subtitle: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
  openingHours: z.string(),
  socialLinks: z.object({
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
  })
});

// 匯出 TypeScript 型別供前端使用
export type GalleryItem = z.infer<typeof GalleryItemSchema>;
export type StoreInfo = z.infer<typeof StoreInfoSchema>;
