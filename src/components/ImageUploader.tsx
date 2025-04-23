
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Leaf } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
}

const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = useCallback(
    (file: File) => {
      // Check if the file is an image
      if (!file.type.match("image.*")) {
        toast({
          title: "Error",
          description: "Please select an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image less than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const imageUrl = e.target.result.toString();
          setImagePreview(imageUrl);
          onImageSelect(imageUrl);
          toast({
            title: "Image Uploaded",
            description: "Your leaf image has been uploaded successfully.",
          });
        }
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect, toast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0]);
      }
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        processFile(e.target.files[0]);
      }
    },
    [processFile]
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`drop-zone ${isDragging ? "border-primary bg-primary/5" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {imagePreview ? (
          <div className="w-full flex flex-col items-center">
            <img
              src={imagePreview}
              alt="Leaf preview"
              className="max-h-64 object-contain rounded-lg mb-4"
            />
            <p className="text-sm text-gray-500 mb-2">Want to upload a different image?</p>
            <div className="flex gap-2">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Select New Image
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Leaf className="h-12 w-12 mx-auto text-primary/40 mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Leaf Image</h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop your leaf image here, or click to browse
            </p>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Select Image
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
