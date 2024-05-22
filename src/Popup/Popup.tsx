import "@tabby/globals.css";
import React, { useEffect, useMemo } from "react";
import { Group } from "./Group";
import { CreateGroup } from "./CreateGroup";
import { GroupList } from "./GroupList";
import { type GroupType } from "./types";
import { browser } from "webextension-polyfill-ts";
import { v4 as uuidv4 } from "uuid";

type ListRoute = {
  route: "list";
};

type CreateRoute = {
  route: "create";
};

type GroupRoute = {
  route: "group";
  groupId: string;
};

type Routes = ListRoute | CreateRoute | GroupRoute;

const Popup: React.FC = () => {
  const [router, setRouter] = React.useState<Routes>({ route: "list" });
  const [activeId, setActiveId] = React.useState<string>("default");
  const [groups, setGroups] = React.useState<GroupType[]>([]);

  const handleCreateGroup = async (groupName: string) => {
    // get visible tabs
    const visible_tabs = await browser.tabs.query({ hidden: false });
    // visible tabs ids
    const ids = visible_tabs
      .map((t) => t.id)
      .filter((id) => typeof id === "number") as number[];
    // generate workspace id
    const id = uuidv4();
    // save to storage
    await browser.storage.local.set({
      active: id,
      groups: [
        ...groups,
        { id, name: groupName, ids: groups.length > 0 ? [] : ids },
      ],
    });
    // close popup
    window.close();
  };

  useEffect(() => {
    // on mount get workspaces list and active workspace
    browser.storage.local.get(["groups", "active"]).then((data) => {
      if (data.groups) setGroups(data.groups);
      if (data.active) setActiveId(data.active);
    });
    // listen for changes
    browser.storage.onChanged.addListener((changes) => {
      if (changes.groups) setGroups(changes.groups.newValue);
      if (changes.active) setActiveId(changes.active.newValue);
    });
  }, []);

  useEffect(() => {
    const switchWorkspace = async (groupId: string) => {
      // get all tabs
      const tabs = await browser.tabs.query({});
      const ids = tabs
        .map((t) => t.id)
        .filter((id) => typeof id === "number") as number[];
      const group = groups.find((g) => g.id === groupId);
      // switch focus to last tab in target group
      if (group?.ids)
        await browser.tabs.update(group.ids[group.ids.length - 1], {
          active: true,
        });

      // hide all tabse
      await browser.tabs.hide(ids);

      // show tabs in target group
      const showIds = ids.filter((id) => group?.ids.includes(id));
      await browser.tabs.show(showIds);
    };

    if (activeId) {
      switchWorkspace(activeId)
        .then(() => {
          console.log("switched workspace", activeId);
          setRouter({ route: "list" });
        })
        .catch(() => {
          console.log("failed to switch workspace", activeId);
        });
    }
  }, [activeId]);

  return (
    <section id="popup" className="min-w-60">
      {router.route === "create" ? (
        <CreateGroup
          onCreate={handleCreateGroup}
          onCancel={() => setRouter({ route: "list" })}
        />
      ) : router.route === "group" ? (
        <Group
          groupId={router.groupId}
          onClose={() => setRouter({ route: "list" })}
          onDelete={async (groupId) => {
            // cleanup group tabs
            const data = await browser.storage.local.get("groups");
            const groups = data.groups as GroupType[];
            await browser.tabs.remove(
              groups.find((g) => g.id === groupId)?.ids || []
            );
            // switch to default group if active group is deleted
            if (groupId === activeId)
              await browser.storage.local.set({ active: "default" });
            // remove group
            browser.storage.local
              .set({ groups: groups.filter((g) => g.id !== groupId) })
              .then(() => {
                console.log("group removed");
              })
              .catch(() => {
                console.log("failed to remove group");
              });
          }}
        />
      ) : (
        <GroupList
          activeId={activeId}
          groups={groups}
          onCreateGroup={() =>
            setRouter({
              route: "create",
            })
          }
          onGroupDetails={(groupId) => {
            setRouter({
              route: "group",
              groupId,
            });
          }}
          onChangeGroup={async (groupId) => {
            // if group already active throw error
            if (activeId === groupId) {
              console.log("group already active");
              return;
            }
            // change active group state
            browser.storage.local.set({ active: groupId });
          }}
        />
      )}
    </section>
  );
};

export default Popup;
