import { useState } from "react";
import { Box } from "components/ui";

type SlideShowProps = React.HTMLAttributes<HTMLDivElement> & {
  images: string[];
  captions?: string[];
};

export const SlideShow: React.FC<React.PropsWithChildren<SlideShowProps>> = ({
  images,
  captions,
  className,
  ...props
}) => {
  const [active, setActive] = useState<number>(0);
  return (
    <Box {...props} className={`text-center ${className ?? ""}`}>
      <img
        src={images[active]}
        style={{ cursor: "pointer" }}
        onClick={() => setActive((active + 1) % images.length)}
        alt=""
      />
      {captions && <figcaption>{captions[active]}</figcaption>}
      {images.length > 1 &&
        images.map((image, ix) => (
          <Dot
            key={image}
            className={`-mt-3 cursor-pointer ${
              ix === active ? "text-primary" : "text-white"
            }`}
            onClick={() => setActive(ix)}
          />
        ))}
    </Box>
  );
};

export const Dot: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ className, ...props }) => (
  <Box className={`inline-block ${className ?? ""}`} {...props}>
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
