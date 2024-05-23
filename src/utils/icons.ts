import { faSquareJs } from "@fortawesome/free-brands-svg-icons";
import {
  faBriefcase,
  faFolder,
  faGamepad,
  faGraduationCap,
  faHammer,
  faMicrochip,
  faMugHot,
  faPenRuler,
  faPlugCircleBolt,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const icons = {
  folder: faFolder,
  "shopping-bag": faShoppingBag,
  briefcase: faBriefcase,
  gamepad: faGamepad,
  mug: faMugHot,
  hammer: faHammer,
  "square-js": faSquareJs,
  user: faUser,
  "plug-bolt": faPlugCircleBolt,
  "pen-ruler": faPenRuler,
  microchip: faMicrochip,
  "graduation-cap": faGraduationCap,
};

export type Icon = keyof typeof icons;
