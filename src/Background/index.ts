import { GroupType } from "@tabby/Popup/types";
import { v4 } from "uuid";
import { browser } from "webextension-polyfill-ts";

browser.runtime.onInstalled.addListener((): void => {
  console.log("🦄", "extension installed");

  // create default group
  browser.tabs.query({}).then((tabs) => {
    const ids = tabs
      .map((t) => t.id)
      .filter((id) => typeof id === "number") as number[];
    const groups = [{ id: "default", name: "Default", ids }];
    browser.storage.local.set({
      active: "default",
      groups,
    });
    console.log("🦄", "default group created");
  });

  // on tab created
  browser.tabs.onCreated.addListener(async (tab) => {
    const data = await browser.storage.local.get(["active", "groups"]);
    const active = data.active as string | undefined;
    const groups = data.groups as GroupType[];
    const group = groups.find((g) => g.id === active);
    if (group && typeof tab.id === "number") {
      group.ids.push(tab.id);
      await browser.storage.local.set({ groups });
      console.log("🦄", "tab created", tab);
    } else {
      console.log("❌", "tab not created", tab);
    }
  });

  // on tab removed
  browser.tabs.onRemoved.addListener(async (tabId) => {
    const data = await browser.storage.local.get(["active", "groups"]);
    const active = data.active as string | undefined;
    const groups = data.groups as GroupType[];
    const group = groups.find((g) => g.id === active);
    if (group) {
      group.ids = group.ids.filter((id) => id !== tabId);
      await browser.storage.local.set({ groups });
    }
    console.log("🦄", "tab removed", tabId);
  });

  // on tab updated
  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const data = await browser.storage.local.get(["active", "groups"]);
    const active = data.active as string | undefined;
    const groups = data.groups as GroupType[];
    const group = groups.find((g) => g.id === active);
    if (group) {
      group.ids = group.ids.map((id) => (id === tabId ? tabId : id));
      await browser.storage.local.set({ groups });
    }
    console.log("🦄", "tab updated", tabId, changeInfo, tab);
  });
});
