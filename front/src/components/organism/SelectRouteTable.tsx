import { useCallback, useEffect, type SetStateAction } from "react";
import type { SelectRouteTableProps } from "../../interface";
// react flow
import "@xyflow/react/dist/style.css";
import {
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import type { MouseEvent } from "react";

const buildNodes = (tableData: any[]) => {
  if (!tableData || tableData.length == 0) return [];

  return tableData.map((elem, index) => ({
    id: String(elem.id),
    position: {
      x: (index % 3) * 300,
      y: Math.floor(index / 4) * 200,
    },
    data: {
      // contenu de mes éléments
      label: (
        <div className="text-left text-sm">
          {Object.entries(elem).map(([key, value]) => (
            <div key={`${elem.id}-${key}`} className="mb-2">
              <span className="font-bold capitalize">{key} :</span>{" "}
              {String(value)}
            </div>
          ))}
        </div>
      ),
      // l'objet qu'on va récuperer
      raw: elem,
    },
    style: {
      background: "#1e1e2e",
      color: "white",
      border: "2px solid #3b82f6",
      borderRadius: 12,
      cursor: "grab",
      padding: 10,
      width: 220,
    },
  }));
};

export const SelectRouteTable = ({
  tableData,
  setSelect,
}: SelectRouteTableProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<SetStateAction<any>>(
    [],
  );
  const [edges, , onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!tableData) return;
    setNodes(buildNodes(tableData));
  }, [tableData]);

  const onNodeClick = useCallback(
    (_: MouseEvent<Element>, node: any) => {
      setSelect(node.data.raw);
    },
    [setSelect],
  );
  return (
    <div style={{ height: 800 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls style={{ color: "black" }} />
      </ReactFlow>
    </div>
  );
};
