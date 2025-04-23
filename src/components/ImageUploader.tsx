
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
}

const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    async (file: File) => {
      console.log("Processing file:", file.name, "Type:", file.type, "Size:", file.size);
      setIsLoading(true);
      
      try {
        // Check if the file is an image
        if (!file.type.match("image.*")) {
          console.log("File type error:", file.type);
          toast({
            title: "Invalid File Type",
            description: "Please select an image file (JPEG, PNG, etc.)",
            variant: "destructive",
          });
          return;
        }

        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          console.log("File size error:", file.size);
          toast({
            title: "File Too Large",
            description: "Please select an image less than 5MB",
            variant: "destructive",
          });
          return;
        }

        return new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          
          reader.onload = (e) => {
            console.log("File read successfully");
            if (e.target?.result) {
              const imageUrl = e.target.result.toString();
              setImagePreview(imageUrl);
              onImageSelect(imageUrl);
              toast({
                title: "Success",
                description: "Your leaf image has been uploaded successfully.",
              });
              resolve();
            }
          };

          reader.onerror = (e) => {
            console.error("Error reading file:", e);
            reject(new Error("Failed to read file"));
          };

          reader.readAsDataURL(file);
        });
      } catch (error) {
        console.error("Error processing file:", error);
        toast({
          title: "Upload Failed",
          description: "There was an error uploading your image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [onImageSelect, toast]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      console.log("File dropped");

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        await processFile(e.dataTransfer.files[0]);
      }
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("File input change event triggered");
      if (e.target.files && e.target.files[0]) {
        await processFile(e.target.files[0]);
      }
    },
    [processFile]
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`drop-zone p-8 border-2 border-dashed rounded-lg transition-colors ${
          isDragging 
            ? "border-primary bg-primary/5" 
            : isLoading
            ? "border-gray-300 bg-gray-50"
            : "border-gray-200 hover:border-primary/50"
        }`}
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
                <Button variant="outline" size="sm" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Select New Image
                    </>
                  )}
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="text-center">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <Loader className="h-12 w-12 text-primary animate-spin mb-4" />
                <h3 className="text-lg font-medium">Processing Image...</h3>
                <p className="text-sm text-gray-500">Please wait while we process your image</p>
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 mx-auto text-primary/40 mb-4" />
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
