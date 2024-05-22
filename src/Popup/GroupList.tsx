import React from "react";
import Button from "@tabby/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { type GroupType } from "./types";
import { TopBar } from "@tabby/components/TopBar";

export const GroupList = ({
  activeId,
  groups,
  onCreateGroup,
  onChangeGroup,
  onGroupDetails,
}: {
  activeId: string;
  groups: GroupType[];
  onCreateGroup: () => any;
  onChangeGroup: (groupId: string) => void;
  onGroupDetails: (groupId: string) => void;
}) => {
  return (
    <div>
      <TopBar title="Tabby" />
      <div className="flex flex-col gap-3 p-3">
        {groups.length > 0 ? (
          <ul className="flex flex-col">
            {groups.map((group) => (
              <li key={group.name} className="group flex items-center gap-1">
                <Button
                  className="flex-1 text-sm"
                  outlined="none"
                  justify="start"
                  size="xs"
                  onClick={() => onChangeGroup(group.id)}
                  color={activeId === group.id ? "green" : undefined}
                  disabled={activeId === group.id}
                >
                  {group.name}
                </Button>
                <kbd>ctrl+1</kbd>
                <Button
                  className="invisible group-hover:visible"
                  size="xs"
                  onClick={() => onGroupDetails(group.id)}
                >
                  <FontAwesomeIcon icon={faCog} />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <h1 className="text-lg text-center ">no groups exist</h1>
        )}
        <Button
          className="w-full"
          onClick={() => onCreateGroup()}
          left={<FontAwesomeIcon icon={faPlus} />}
        >
          New group
        </Button>
      </div>
    </div>
  );
};
