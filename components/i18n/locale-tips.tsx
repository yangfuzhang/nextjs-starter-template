"use client";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LocaleTips({
  className,
  onReset,
  onAutoFill,
}: {
  className?: string;
  onReset?: () => void;
  onAutoFill?: () => void;
}) {
  return (
    <div className={cn("flex flex-col gap-2 text-sm", className)}>
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4" />
        <span>该语言版本内容不存在</span>
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" size="sm" onClick={onAutoFill}>
          使用英语内容填充
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onReset}>
          重置
        </Button>
      </div>
    </div>
  );
}
