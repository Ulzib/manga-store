// zurag link, file-r hadgalsniig haruulh fn

export const getImageUrl = (photo) => {
  //zyrag bhgui bl
  if (!photo) return "/nophoto.jpg";
  //internetees tatsn zurag
  if (photo.startsWith("http")) return photo;

  // localhost - Render URL bolgoh
  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${photo}`;
};
