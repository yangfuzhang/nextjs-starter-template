"use client";
import { useState } from "react";
import Link from "next/link";
import { useApi } from "@/hooks/use-api";
import { toastSuccess, toastError } from "@/lib/toast";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modal/confirm-modal";
import type { Post } from "@/types/post";

export interface ActionsProps {
  post: Post;
}

export function Actions({ post }: ActionsProps) {
  const { document_id, locale, title, published } = post;
  const [showDelModal, setShowDelModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const { patch, del, useMutation, useQueryClient } = useApi();
  const queryClient = useQueryClient();
  const delMutation = useMutation({
    mutationFn: async (withAllLocales?: boolean) => {
      if (withAllLocales) {
        return del(`/posts/${document_id}?locale=all`);
      }
      return del(`/posts/${document_id}?locale=${locale}`);
    },
  });
  const publishMutation = useMutation({
    mutationFn: async (withAllLocales?: boolean) => {
      if (withAllLocales) {
        return patch(`/posts/${document_id}?locale=all`, {
          published: !published,
        });
      }
      return patch(`/posts/${document_id}?locale=${locale}`, {
        published: !published,
      });
    },
  });

  const handleDel = (withAllLocales?: boolean) => {
    delMutation.mutate(withAllLocales, {
      onSuccess: () => {
        toastSuccess("文章删除成功");
        setShowDelModal(false);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        toastError(error.message ?? "文章删除失败");
      },
    });
  };

  const handlePublish = (withAllLocales?: boolean) => {
    publishMutation.mutate(withAllLocales, {
      onSuccess: () => {
        toastSuccess(published ? "取消发布成功" : "文章发布成功");
        setShowPublishModal(false);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        toastError(error.message ?? "操作失败");
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>操作</DropdownMenuLabel>
          <Link href={`/admin/posts/edit/${document_id}?locale=${locale}`}>
            <DropdownMenuItem>编辑</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setShowPublishModal(true)}>
            {published ? "取消发布" : "发布"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDelModal(true)}>
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showPublishModal && (
        <ConfirmModal
          loading={publishMutation.isPending}
          title={
            <div>
              确认{published ? "取消发布" : "发布"}文章{" "}
              <strong className="font-bold text-primary">{title}</strong> 吗？
            </div>
          }
          description=""
          showLocalesOption
          localesOptionDescription="应用到当前文章的全部语言版本内容"
          open={showPublishModal}
          onOpenChange={(isOpen) => setShowPublishModal(isOpen)}
          onConfirm={handlePublish}
        />
      )}

      {showDelModal && (
        <ConfirmModal
          loading={delMutation.isPending}
          showLocalesOption
          open={showDelModal}
          onOpenChange={(isOpen) => setShowDelModal(isOpen)}
          onConfirm={handleDel}
        />
      )}
    </>
  );
}
