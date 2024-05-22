import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type GroupType = {
  id: string;
  name: string;
  icon?: IconDefinition;
  ids: number[];
};
