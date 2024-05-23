import React from "react";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

interface TopBarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: React.ReactNode;
  onBack?: () => void;
  onDelete?: () => void;
}

export const TopBar = ({
  left,
  right,
  title,
  onBack,
  onDelete,
}: TopBarProps) => {
  return (
    <div className="p-2 flex items-center justify-between shadow shadow-zinc-800">
      <div className="flex items-center w-11 justify-start">
        {onBack ? (
          <Button size="xs" onClick={() => onBack()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        ) : null}
        {left}
      </div>
      <div className="flex items-center text-center justify-center flex-1 text-base font-semibold">
        {title}
      </div>
      <div className="flex items-center w-11 justify-end">
        {right}
        {onDelete ? (
          <Button size="xs" color="red" onClick={() => onDelete?.()}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        ) : null}
      </div>
    </div>
  );
};
