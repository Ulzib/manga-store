const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    //  Validation
    if (!file.type.startsWith("image/")) {
      toast.error("Зөвхөн зураг файл сонгоно уу!");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Зургийн хэмжээ 5MB-с ихгүй байх ёстой!");
      return;
    }
    setImageFile(file);
  }
};

export default handleImageChange;
