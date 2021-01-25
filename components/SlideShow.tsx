import { useState } from "react";
import { Box, BoxProps } from "rebass";

// const TIMEOUT = 2000;

export const SlideShow: React.FC<
  BoxProps & { images: string[]; captions?: string[]; className?: string }
> = ({ images, captions, className, ...props }) => {
  const [active, setActive] = useState(
    0
  ); /* 
  const [cancel, setCancel] = useState(0);
  useEffect(() => {
    setCancel(setTimeout(nextImage, TIMEOUT));
    return () => {
      if (cancel) clearTimeout(cancel);
    };
  }, []);

  function nextImage() {
    setActive(active === images.length - 1 ? 0 : active + 1);
    setCancel(setTimeout(nextImage, TIMEOUT));
  } */
  return (
    <Box {...props} textAlign="center">
      <img src={images[active]} className={className} />
      {captions && <figcaption>{captions[active]}</figcaption>}
      {images.length > 1 &&
        images.map((image, ix) => (
          <Dot
            mt={-3}
            key={image}
            color={ix === active ? "primary" : "lightgray"}
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
