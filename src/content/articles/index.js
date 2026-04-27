import buildingToScale from "./building-to-scale";
import clientCollaborationFramework from "./client-collaboration-framework";
import craftAtEveryLayer from "./craft-at-every-layer";
import digitalExperienceWestAfrica from "./digital-experience-west-africa";
import launchFastOrLaunchRight from "./launch-fast-or-launch-right";
import strategyBeforeDesign from "./strategy-before-design";
import typographyInProductDesign from "./typography-in-product-design";

export const articles = [
  strategyBeforeDesign,
  craftAtEveryLayer,
  buildingToScale,
  digitalExperienceWestAfrica,
  launchFastOrLaunchRight,
  clientCollaborationFramework,
  typographyInProductDesign,
];

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}
