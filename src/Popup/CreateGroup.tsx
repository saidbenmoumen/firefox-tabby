import React from "react";
import Button from "@tabby/components/Button";
import { TopBar } from "@tabby/components/TopBar";

export const CreateGroup = ({
  onCreate,
  onCancel,
}: {
  onCreate: (groupName: string) => void;
  onCancel: () => void;
}) => {
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
        <Button
          disabled={groupName.length <= 0}
          onClick={() => onCreate(groupName)}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
