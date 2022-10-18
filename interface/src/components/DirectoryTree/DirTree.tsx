import React from "react";

import File from "./File";
import Folder from "./Folder";

interface Props {
  dirTree: any;
  indents?: number;
}

const startsWithFromArray = (str: string, arr: string[]) => {
  for (let sub of arr) {
    if (str.startsWith(sub)) {
      return true;
    }
  }
  return false;
};

const DirTree: React.FC<Props> = ({ dirTree }) => {
  const [collapsed, setCollapsed] = React.useState<string[]>([]);

  const generateTree = (dirTree: any) => {
    return (
      <ul key={dirTree.path} className="text-lg">
        <Folder
          root={dirTree.path === "root"}
          initialCollapsed={collapsed.includes(dirTree.path)}
          setCollapsed={setCollapsed}
          path={dirTree.path}
          name={dirTree.name}
        />
        {!startsWithFromArray(dirTree.path, collapsed) && (
          <div className="mx-3 my-1 ">
            {dirTree.children.map((child: any) => {
              if (child.type === "directory") {
                return generateTree(child);
              } else {
                return (
                  <File
                    path={child.path}
                    key={child.path}
                    extension={child.extension}
                    name={child.name}
                  />
                );
              }
            })}
          </div>
        )}
      </ul>
    );
  };

  return (
    <div className="w-full h-full py-24 px-6 overflow-y-auto">
      {generateTree(dirTree)}
    </div>
  );
};

export default DirTree;
