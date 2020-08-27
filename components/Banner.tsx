import { motion, useViewportScroll, useTransform } from "framer-motion";
import { Link } from "rebass";

export function Banner({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1, 1, 1, 1, 0, 0]
  );

  return (
    <motion.div
      style={{ position: "fixed", opacity }}
      whileHover={{ opacity: 0.7 }}
    >
      <Link
        bg="primary"
        px="70px"
        py={3}
        pb={[55, 55, 3]}
        sx={{
          top: [null, null, 40],
          left: [null, null, -95],
          bottom: [-18, -18, "inherit", "inherit"],
          right: [-97, -97, "inherit", "inherit"],
          position: "fixed",
          maxWidth: ["290px", "290px", "353px"],
          display: "block",
          transform: "rotate(-45deg)",
          boxShadow: [
            "0 -2px 10px 0 #967676",
            "0 -2px 10px 0 #967676",
            "0 2px 10px 0 #967676",
          ],
        }}
        textAlign="center"
        href={href}
        color="white"
        fontWeight="bold"
        target="_blank"
      >
        {children}
      </Link>
    </motion.div>
  );
}
