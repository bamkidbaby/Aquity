import buildingToScale from "./building-to-scale.js";
import clientCollaborationFramework from "./client-collaboration-framework.js";
import craftAtEveryLayer from "./craft-at-every-layer.js";
import digitalExperienceWestAfrica from "./digital-experience-west-africa.js";
import launchFastOrLaunchRight from "./launch-fast-or-launch-right.js";
import strategyBeforeDesign from "./strategy-before-design.js";
import typographyInProductDesign from "./typography-in-product-design.js";

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
