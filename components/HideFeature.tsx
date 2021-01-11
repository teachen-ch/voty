import { isProd } from "util/isBrowser";

const prodEnabled: Record<string, boolean> = {
  cards: false,
  activities: false,
  discussions: false,
  demo: false,
};

/**
 *
 * @param env if env="prod" then feature will be hidden on prod, unless it's enabled
 */
export const HideFeature: React.FC<{
  id: string;
}> = ({ children, id }) => {
  const feature = <>{children}</>;
  if (isProd()) return prodEnabled[id] ? feature : null;
  else return feature;
};
