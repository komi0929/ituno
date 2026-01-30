"use client";

import { createClient } from "@/lib/supabase/client";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label: string;
  aspectRatio?: "square" | "video" | "any";
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  label,
  aspectRatio = "any",
  className = "",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);
      setError(null);

      try {
        // Create a unique file path
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Check for missing configuration (Vercel env vars)
        const supabaseUrl = (supabase as any).supabaseUrl;
        if (supabaseUrl && supabaseUrl.includes("placeholder.supabase.co")) {
          throw new Error(
            "データベース設定が不足しています。Vercelの環境変数 (NEXT_PUBLIC_SUPABASE_URL) を設定してください。",
          );
        }

        // Upload to Supabase Storage 'images' bucket
        const { data, error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        // Get Public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(filePath);

        onChange(publicUrl);
      } catch (err: any) {
        console.error("Upload failed:", err);
        setError(err.message || "画像のアップロードに失敗しました。");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, supabase],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-zinc-400">{label}</label>

      <div
        {...getRootProps()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl transition-all duration-200
          ${value ? "border-0 ring-1 ring-zinc-700 hover:ring-zinc-600" : "border-2 border-dashed border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800/80 hover:border-zinc-500"}
          ${isDragActive ? "border-blue-500 bg-blue-500/10 ring-blue-500" : ""}
          ${aspectRatio === "square" ? "aspect-square w-32" : "aspect-video w-full max-w-sm"}
        `}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            <span className="text-xs text-zinc-400">アップロード中...</span>
          </div>
        ) : value ? (
          <div className="group relative h-full w-full overflow-hidden rounded-xl">
            {/* Image Preview */}
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover"
            />

            {/* Hover Actions */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-xs font-medium text-white">画像を変更</span>
            </div>

            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-red-500/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
              <ImagePlus className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-zinc-300">
                クリックまたドラッグ
              </p>
              <p className="text-[10px] text-zinc-500">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
