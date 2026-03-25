import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ImageUpload = ({ imagePreview, handleImageChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel>Номын зураг</FormLabel>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2 h-3/4"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="aspect-3/4 rounded-lg object-contain w-full h-full"
        />
      )}
    </div>
  );
};

export default ImageUpload;
