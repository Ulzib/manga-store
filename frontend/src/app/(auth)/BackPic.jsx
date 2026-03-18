const DEFAULT_BG =
  "https://www.nippon.com/en/ncommon/contents/japan-topics/2852968/2852968.jpg";

const BackgroundPic = ({ src = DEFAULT_BG }) => {
  return (
    <div className="opacity-100 absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src={src}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
          objectPosition: "center",
          filter: " brightness(0.18)",
          backgroundColor: "",
        }}
      />
    </div>
  );
};

export default BackgroundPic;
