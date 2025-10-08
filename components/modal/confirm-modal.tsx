"use client";
import { ReactNode, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export interface ConfirmModalProps {
  loading?: boolean;
  title?: string | ReactNode;
  description?: string;
  showLocalesOption?: boolean;
  localesOptionDescription?: string;
  open: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  needReconfirm?: boolean;
  onConfirm?: (deleteAllLocales?: boolean) => void;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const {
    loading,
    title = "确认删除吗？",
    description = "删除后数据将无法恢复，请谨慎操作",
    showLocalesOption,
    localesOptionDescription = "删除选中数据全部语言版本内容",
    open,
    onOpenChange,
    onConfirm,
  } = props;
  const [withAllLocales, setWithAllLocales] = useState<boolean>(false);

  const handleConfirm = () => {
    onConfirm?.(withAllLocales);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="break-all">{title}</DialogTitle>
          <DialogDescription className="mt-4">{description}</DialogDescription>
        </DialogHeader>

        {showLocalesOption && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="locales"
              checked={withAllLocales}
              onCheckedChange={(checked) =>
                setWithAllLocales(checked as boolean)
              }
            />
            <Label htmlFor="locales">{localesOptionDescription}</Label>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              取消
            </Button>
          </DialogClose>
          <Button disabled={loading} type="button" onClick={handleConfirm}>
            {loading && <LoaderCircle size="16" className="animate-spin" />}
            确定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
