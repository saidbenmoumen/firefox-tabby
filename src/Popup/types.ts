import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { type Icon } from "@tabby/utils/icons";

export type GroupType = {
  id: string;
  name: string;
  icon?: Icon;
  ids: number[];
};
