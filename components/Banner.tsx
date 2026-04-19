import { Box, Link } from "components/ui";

type BannerProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const Banner: React.FC<React.PropsWithChildren<BannerProps>> = ({
  href,
  onClick,
  children,
}) => {
  return (
    <Box className="text-white">
      <Link
        className="block fixed z-20 px-17.5 py-4 pb-13.75 sm:pb-4 bg-danger -rotate-45 max-w-72.5 sm:max-w-88.25 -bottom-4.5 -right-24.25 sm:bottom-auto sm:right-auto sm:top-10 sm:-left-23.75 shadow-[0_-2px_10px_0_#333] sm:shadow-[0_2px_10px_0_#333] hover:no-underline hover:scale-[2] hover:translate-x-25"
        href={href}
        onClick={onClick}
      >
        <span className="block text-center font-bold text-[17px]">
          {children}
        </span>
      </Link>
    </Box>
  );
};
