import React from "react";
import Button from "@tabby/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCog,
  faPlus,
  faXmark,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { type GroupType } from "./types";
import { TopBar } from "@tabby/components/TopBar";
import { icons } from "@tabby/utils/icons";

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
          <ul className="flex flex-col gap-1">
            {groups.map((group, index) => {
              const leftIcon = (
                group.icon && icons[group?.icon]
                  ? icons[group.icon]
                  : icons.folder
              ) as IconDefinition;
              return (
                <li key={group.name} className="group flex items-center gap-1">
                  <Button
                    className="flex-1 min-h-[0] h-6 py-0"
                    outlined="none"
                    justify="start"
                    onClick={() => onChangeGroup(group.id)}
                    left={
                      leftIcon ? (
                        <FontAwesomeIcon
                          className="text-white"
                          icon={leftIcon}
                        />
                      ) : undefined
                    }
                    color={activeId === group.id ? "green" : undefined}
                    variant={activeId === group.id ? "light" : undefined}
                    readonly={activeId === group.id}
                  >
                    {group.name}
                  </Button>
                  <Button
                    className="invisible group-hover:visible text-xs"
                    size="2xs"
                    onClick={() => onGroupDetails(group.id)}
                  >
                    <FontAwesomeIcon icon={faCog} />
                  </Button>
                  <kbd className="h-6">{index + 1}</kbd>
                </li>
              );
            })}
          </ul>
        ) : (
          <h1 className="text-lg text-center ">no groups exist</h1>
        )}
      </div>
      <Button
        outlined="none"
        className="w-full rounded-t-none border-t border-zinc-800"
        onClick={() => onCreateGroup()}
        left={<FontAwesomeIcon icon={faPlus} />}
      >
        New group
      </Button>
    </div>
  );
};
