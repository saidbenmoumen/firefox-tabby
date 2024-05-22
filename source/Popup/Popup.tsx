import * as React from "react";

import "./styles.scss";

type Group = {
  name: string;
  urls: string[];
};

const Popup: React.FC = () => {
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [creatingGroup, setCreatingGroup] = React.useState(false);
  return (
    <section id="popup">
      {creatingGroup ? (
        <CreateGroup
          onCreate={(groupName) => {
            const exists = groups.find((g) => g.name === groupName);
            if (exists) {
              alert("Group already exists");
              return;
            }
            setGroups((g) => [...g, { name: groupName, urls: [] }]);
          }}
          onCancel={() => setCreatingGroup(false)}
        />
      ) : (
        <div>
          {groups.length > 0 ? (
            <ul>
              {groups.map((group) => (
                <li key={group.name}>
                  <span>{group.name}</span>
                  <button
                    onClick={() => {
                      setGroups((g) => g.filter((g) => g.name !== group.name));
                    }}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <h1>no groups exist</h1>
          )}
          <button
            onClick={() => {
              setCreatingGroup(true);
            }}
          >
            create new group
          </button>
        </div>
      )}
    </section>
  );
};

export default Popup;

export const CreateGroup = ({
  onCreate,
  onCancel,
}: {
  onCreate: (groupName: string) => void;
  onCancel: () => void;
}) => {
  const [groupName, setGroupName] = React.useState<string>("");
  return (
    <form
      onSubmit={() => {
        onCreate(groupName);
      }}
    >
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button type="submit" disabled={groupName.length <= 0}>
        Create
      </button>
      <button onClick={() => onCancel()}>Cancel</button>
    </form>
  );
};
