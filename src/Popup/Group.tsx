import React, { useEffect, useState } from "react";
import { type GroupType } from "./types";
import { TopBar } from "@tabby/components/TopBar";
import { browser, Tabs } from "webextension-polyfill-ts";

export const Group = ({
  groupId,
  onClose,
  onDelete,
}: {
  groupId: string;
  onClose: () => void;
  onDelete: (groupId: string) => void;
}) => {
  const [group, setGroup] = useState<GroupType | null>(null);
  const [tabs, setTabs] = useState<Tabs.Tab[]>([]);

  useEffect(() => {
    browser.storage.local.get("groups").then((data) => {
      const groups = data.groups as GroupType[];
      const group = groups.find((g) => g.id === groupId);
      if (group) setGroup(group);
    });
  }, []);

  useEffect(() => {
    if (group?.ids && group.ids.length > 0) {
      const promises = group.ids.map((id) => browser.tabs.get(id));
      Promise.all(promises).then((tabs) => {
        setTabs(tabs);
      });
    }
  }, [group]);

  if (group === null) return null;
  return (
    <div>
      <TopBar
        onBack={() => onClose()}
        title={group.name}
        onDelete={() => onDelete(groupId)}
      />
      <ul className="flex flex-col p-3">
        {tabs.map((tab) => (
          <li
            key={`tab-${tab.id}`}
            className="flex flex-col text-zinc-300 border-b border-zinc-700 py-2"
          >
            <span className="text-sm truncate">{tab.title}</span>
            <small className="truncate opacity-50 text-xs">{tab.url}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
