import { useState } from "react";
import { Box, BoxProps } from "rebass";

export const SlideShow: React.FC<
  BoxProps & { images: string[]; captions?: string[]; className?: string }
> = ({ images, captions, className, ...props }) => {
  const [active, setActive] = useState<number>(
    0
  ); /* 
  const [cancel, setCancel] = useState<number>(0);

  const TIMEOUT = 2000;

  useEffect(() => {
    setCancel(setTimeout(nextImage, TIMEOUT));
    return () => {
      if (cancel) clearTimeout(cancel);
    };
  }, []);

  function nextImage() {
    setActive((active + 1) % images.length);
    setCancel(setTimeout(nextImage, TIMEOUT));
  } */
  return (
    <Box {...props} textAlign="center">
      <img
        src={images[active]}
        className={className}
        style={{ cursor: "pointer" }}
        onClick={() => setActive((active + 1) % images.length)}
      />
      {captions && <figcaption>{captions[active]}</figcaption>}
      {images.length > 1 &&
        images.map((image, ix) => (
          <Dot
            mt={-3}
            key={image}
            color={ix === active ? "primary" : "white"}
            onClick={() => {
              // clearTimeout(cancel);
              setActive(ix);
            }}
            sx={{ cursor: "pointer" }}
          />
        ))}
    </Box>
  );
};

export const Dot: React.FC<BoxProps> = (props) => (
  <Box display="inline-block" {...props}>
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <ellipse
        ry="6"
        rx="6"
        cy="16"
        cx="16"
        strokeWidth="0"
        fill="currentColor"
      />
    </svg>
  </Box>
);
