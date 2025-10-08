import { UseFormReturn } from "react-hook-form";
import { sanitizeSlug } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export function UrlSlugField({
  form,
  placeholder,
  loading,
  className,
}: {
  form: UseFormReturn<any>;
  placeholder?: string;
  loading?: boolean;
  className?: string;
}) {
  const { watch } = form;
  const watchSlug = watch("slug");

  return (
    <FormField
      control={form.control}
      name="slug"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="flex items-center gap-1">Slug</FormLabel>

          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <FormControl>
              <Input
                placeholder={placeholder || "请输入slug"}
                {...field}
                onBlur={() => field.onChange(sanitizeSlug(watchSlug))}
              />
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
