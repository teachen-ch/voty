const prod = process.env.NODE_ENV === "production";

const prodEnabled: Record<string, boolean> = {
  cards: false,
};

/**
 *
 * @param env if env="prod" then feature will be hidden on prod, unless it's enabled
 */
export const HideFeature: React.FC<{
  id: string;
}> = ({ children, id }) => {
  const feature = <>{children}</>;
  if (prod) return prodEnabled[id] ? feature : null;
  else return feature;
};
