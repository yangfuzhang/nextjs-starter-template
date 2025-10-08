import z from "zod";

export const formSchema = z.object({
  locale: z.string({ error: "请选择语言" }),
  title: z
    .string({ error: "请输入文章标题" })
    .trim()
    .pipe(z.string().min(1, { message: "请输入文章标题" })),
  slug: z.string().optional(),
  cover: z
    .string({ error: "请输入文章封面图片url" })
    .trim()
    .pipe(z.string().min(1, { message: "请输入文章封面图片url" })),
  abstract: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});
