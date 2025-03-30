// import { motion, useViewportScroll, useTransform } from "framer-motion";
import { Text, Link } from "rebass";

type BannerProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
};
export const Banner: React.FC<React.PropsWithChildren<BannerProps>> = ({ href, onClick, children }) => {
  /*const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1, 1, 1, 1, 0.5, 0]
  );*/

  return (
    /*
    <motion.div
      style={{ position: "fixed", opacity }}
      whileHover={{ opacity: 0.7 }}
    >*/
    <Text color="white">
      <Link
        bg="danger"
        px="70px"
        py={3}
        pb={[55, 55, 3]}
        sx={{
          top: [null, null, 40],
          left: [null, null, -95],
          zIndex: 20,
          bottom: [-18, -18, "inherit", "inherit"],
          right: [-97, -97, "inherit", "inherit"],
          position: "fixed",
          maxWidth: ["290px", "290px", "353px"],
          display: "block",
          transform: "rotate(-45deg)",
          boxShadow: [
            "0 -2px 10px 0 #333",
            "0 -2px 10px 0 #333",
            "0 2px 10px 0 #333",
          ],
          ":hover": {
            textDecoration: "none",
            transform: "scale(2) translate(100px, 0px)",
          },
        }}
        href={href}
        onClick={onClick}
      >
        <Text textAlign="center" fontWeight="bold" fontSize="17px">
          {children}
        </Text>
      </Link>
    </Text>
  );
};
