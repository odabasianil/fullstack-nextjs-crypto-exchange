import { Input } from "@/components/ui/input"
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const ImageUploadField = ({ image, setImage, field, error }: any) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("Lütfen bir resim dosyası yükleyin.");
      return;
    }

    setFileName(file.name);


    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setFileError(null);
    };
    reader.onerror = () => setFileError("Resim yüklenirken hata oluştu.");
    reader.readAsDataURL(file);
  };
  return (
    <div  style={{ order: field?.sortOrder }}>
      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="file-input"
        />
        <div className="text-sm text-gray-100 ">{field?.fieldName}</div>
        <div className={twMerge(
          "mt-2 flex items-center gap-2 bg-transparent pl-4 focus-visible:outline-none border border-white-400 dark:border-gray-300 h-[46px] rounded-[4px] text-sm",
          (fileError || error) && "!border-error"
        )}>
          <label
            htmlFor="file-input"
            className="cursor-pointer border border-primary-100 px-2 h-8 flex items-center text-primary rounded transition"
          >
            Upload
          </label>
          <p className=" text-sm">{fileName ?? 'No File Choosen'}</p>
        </div>
        {fileError && <p className="text-error text-sm mt-1">{fileError}</p>}
        {error && <p className="text-error text-sm mt-1">{error}</p>}
      </div>
      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Uploaded Preview"
            className="w-48 h-48 object-cover rounded"
          />
        </div>
      )}
    </div>
  )
}