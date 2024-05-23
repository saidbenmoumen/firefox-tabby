import React, { useState } from "react";
import Button from "@tabby/components/Button";
import { TopBar } from "@tabby/components/TopBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Icon, icons } from "@tabby/utils/icons";

export const CreateGroup = ({
  onCreate,
  onCancel,
}: {
  onCreate: (data: { name: string; icon: Icon }) => void;
  onCancel: () => void;
}) => {
  const [icon, setIcon] = React.useState<Icon>("folder");
  const [groupName, setGroupName] = React.useState<string>("");
  return (
    <div>
      <TopBar onBack={() => onCancel()} title="Create Group" />
      <div className="flex flex-col gap-3 p-3">
        <input
          className="rounded border border-zinc-700 p-2 bg-zinc-800"
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="grid grid-cols-7 gap-1">
          {(Object.keys(icons) as Icon[]).map((iconName: Icon) => (
            <Button
              key={iconName}
              onClick={() => setIcon(iconName)}
              color={icon === iconName ? "green" : undefined}
              variant={icon === iconName ? "solid" : "subtle"}
              isIcon
              size="xs"
            >
              <FontAwesomeIcon icon={icons[iconName as Icon]} />
            </Button>
          ))}
        </div>
        <Button
          disabled={groupName.length <= 0}
          onClick={() =>
            onCreate({
              name: groupName,
              icon,
            })
          }
        >
          Create
        </Button>
      </div>
    </div>
  );
};
