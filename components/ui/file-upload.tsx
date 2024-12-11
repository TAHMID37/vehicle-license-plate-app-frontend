"use client";

import { Upload } from "lucide-react";

interface FileUploadProps {
  multiple?: boolean;
  onFileSelect: (files: FileList | null) => void;
  selectedFiles?: FileList | null;
  accept?: string;
}

export function FileUpload({
  multiple = false,
  onFileSelect,
  selectedFiles,
  accept = "image/*",
}: FileUploadProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Click to upload or drag and drop {multiple ? "multiple images" : "an image"}
          </p>
          {selectedFiles && (
            <p className="mt-2 text-sm text-muted-foreground">
              {selectedFiles.length} file(s) selected
            </p>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={(e) => onFileSelect(e.target.files)}
        />
      </label>
    </div>
  );
}