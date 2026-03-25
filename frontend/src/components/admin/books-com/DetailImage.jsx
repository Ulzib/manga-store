import { Camera } from "lucide-react";
import { getImageUrl } from "../../../../utils/imageHelper";

const DetailImage = ({ imagePreview, photo, name, handleImageChange }) => {
  return (
    <div className="relative group w-72 h-96 overflow-hidden rounded-lg border">
      {/* Сонгосон зураг эсвэл датабаазад байгаа зургийг харуулах */}
      <img
        className="w-full h-full object-cover"
        src={imagePreview || getImageUrl(photo)}
        alt={name}
      />

      {/* Хулгана дээгүүр нь очиход гарч ирэх зураг солих хэсэг */}
      <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
        <Camera className="text-white w-10 h-10" />
        <input
          type="file"
          className="hidden"
          onChange={handleImageChange}
          accept="image/*"
        />
      </label>
    </div>
  );
};

export default DetailImage;
