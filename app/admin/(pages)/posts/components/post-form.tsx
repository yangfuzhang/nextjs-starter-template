"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useApi from "@/hooks/use-api";
import { toastSuccess, toastError } from "@/lib/toast";
import { nanoid } from "@/lib/nanoid";
import { sanitizeSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LocalePicker } from "@/components/i18n";
import { Skeleton } from "@/components/ui/skeleton";
import { MdEditor } from "@/components/editors";
import { UrlSlugField } from "@/components/form";
import { LocaleTips } from "@/components/i18n";
import { formSchema } from "@/schemas/post";

const defaultValues = {
  title: "",
  slug: "",
  cover: "",
  abstract: "",
  content: "",
  seo_title: "",
  seo_description: "",
};
export function PostForm({ document_id }: { document_id?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") ?? "en";
  const mdOptions = useMemo(() => {
    return {
      hideIcons: ["fullscreen"] as readonly any[],
      sideBySideFullscreen: false,
    };
  }, []);

  const { get, patch, post, useQuery, useMutation, useQueryClient } = useApi();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { locale, ...defaultValues },
  });
  // 根据标题自动生成slug
  const { watch } = form;
  const watchName = watch("title");
  const watchSlug = watch("slug");
  const [autoSlug, setAutoSlug] = useState<string>("");
  useEffect(() => {
    if (!watchSlug) {
      setAutoSlug(sanitizeSlug(watchName));
    }
  }, [watchName, watchSlug]);

  const { data: postItem, isFetching } = useQuery({
    queryKey: ["posts", { document_id, locale }],
    queryFn: () => {
      if (document_id) {
        return get(`/posts/${document_id}?locale=${locale}`);
      }
      return null;
    },
  });
  useEffect(() => {
    if (postItem) {
      form.reset({
        ...postItem,
      });
    } else {
      form.reset({
        locale,
        ...defaultValues,
      });
    }
  }, [form, postItem, locale]);

  const { data: enPost } = useQuery({
    queryKey: ["posts", { document_id: document_id, locale: "en" }],
    queryFn: () => {
      if (document_id) {
        return get(`/posts/${document_id}?locale=en`);
      }
      return null;
    },
  });
  const handleAutoFill = () => {
    if (enPost) {
      form.reset(
        {
          ...enPost,
          locale,
          published: false,
        },
        {
          keepDefaultValues: true,
        }
      );
    }
  };

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      if (postItem) {
        return patch(`/posts/${document_id}?locale=${locale}`, {
          ...values,
          slug: values.slug || autoSlug,
        });
      }

      return post("/posts", {
        ...values,
        slug: values.slug || autoSlug,
        document_id: document_id ? document_id : nanoid(),
        locale,
      });
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        toastSuccess(document_id ? "文章更新成功" : "文章新建成功");
        queryClient.invalidateQueries({ queryKey: ["posts"] });

        if (!document_id) {
          router.push(`/admin/posts/edit/${data.document_id}?locale=${locale}`);
        }
      },
      onError: (error) => {
        toastError(
          error.message ?? (document_id ? "文章更新失败" : "文章新建失败")
        );
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[900px] space-y-8"
      >
        {!isFetching && document_id && !postItem && locale !== "en" && (
          <LocaleTips
            className="col-span-10 flex-row"
            onAutoFill={handleAutoFill}
            onReset={() => {
              form.reset(defaultValues);
            }}
          />
        )}
        <LocalePicker disabled={!document_id} />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>标题</FormLabel>
              <FormControl>
                {isFetching ? (
                  <Skeleton className="w-full h-10" />
                ) : (
                  <Input placeholder="请输入文章标题" {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <UrlSlugField form={form} placeholder={autoSlug} loading={isFetching} />

        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>封面图</FormLabel>
              <FormControl>
                {isFetching ? (
                  <Skeleton className="w-full h-10" />
                ) : (
                  <Input placeholder="请输入封面图URL" {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="abstract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>摘要</FormLabel>
              <FormControl>
                {isFetching ? (
                  <Skeleton className="w-full h-10" />
                ) : (
                  <Textarea placeholder="请输入文章摘要" {...field} />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>内容</FormLabel>
              <FormControl>
                {isFetching ? (
                  <Skeleton className="w-full h-20" />
                ) : (
                  <MdEditor
                    placeholder="请输入文章内容"
                    options={mdOptions}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seo_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SEO标题</FormLabel>
              <FormControl>
                {isFetching ? (
                  <Skeleton className="w-full h-20" />
                ) : (
                  <Textarea placeholder="请输入SEO标题" {...field} />
                )}
              </FormControl>
              <FormDescription>
                {form.getValues("seo_title")?.length ?? 0} / 60
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seo_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SEO描述</FormLabel>
              <FormControl>
                {isFetching ? (
                  <Skeleton className="w-full h-20" />
                ) : (
                  <Textarea placeholder="请输入SEO描述" {...field} />
                )}
              </FormControl>
              <FormDescription>
                {form.getValues("seo_description")?.length ?? 0} / 160
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isFetching || mutation.isPending}>
          {mutation.isPending && (
            <LoaderCircle className="animate-spin" size="16" />
          )}
          保存
        </Button>
      </form>
    </Form>
  );
}
