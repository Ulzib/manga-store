// zurag link, file-r hadgalsniig haruulh fn

export const getImageUrl = (photo) => {
  //zyrag bhgui bl
  if (!photo) return "/nophoto.jpg";
  //internetees tatsn zurag
  if (photo.startsWith("http")) {
    return photo;
  }
  //file-r upload hiisn zurag (filename)
  const url = `http://localhost:8000/uploads/${photo}`;
  return url;
};
