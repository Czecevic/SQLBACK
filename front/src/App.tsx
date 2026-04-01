import type { DataItem } from "./interface";
import "./App.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SelectRouteItem } from "./components/organism/SelectRouteItem";
import { SelectRouteTable } from "./components/organism/SelectRouteTable";

function App() {
  const [select, setSelect] = useState<DataItem | null>(null);
  const [selectRoute, setSelectRoute] = useState("project");
  const navbar = ["CREATE", "READ", "UPDATE", "DELETE"];
  const [selectNav, setSelectNav] = useState("READ");
  const [openCRUD, setOpenCRUD] = useState(false);

  const { data: routes = [] } = useQuery<string[]>({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/tables");
      return res.json();
    },
  });

  const { data: tableData = [] } = useQuery<DataItem[]>({
    queryKey: ["data", selectRoute],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/${selectRoute}`);
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* navbar */}
      <nav className="flex items-center gap-3 px-6 py-4 border-b border-gray-800 bg-gray-900">
        <span className="text-gray-400 text-sm font-medium uppercase tracking-widest mr-4">
          Tables
        </span>
        {routes.map((route) => (
          <button
            key={route}
            onClick={() => setSelectRoute(route)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
              ${
                selectRoute === route
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
          >
            {route}
          </button>
        ))}
      </nav>

      {/* contenu principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* panneau gauche — liste */}
        <div
          className={`transition-all duration-300 border-r border-gray-800 overflow-y-auto
            ${openCRUD ? "w-1/2" : "w-full"}`}
        >
          <SelectRouteTable tableData={tableData} setSelect={setSelect} />
        </div>

        {/* bouton toggle CRUD */}
        <div className="flex items-center bg-gray-900 border-r border-gray-800">
          <button
            onClick={() => setOpenCRUD(!openCRUD)}
            className="h-full px-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-150"
            title={openCRUD ? "Fermer le panneau" : "Ouvrir le panneau CRUD"}
          >
            <span className="text-xl">{openCRUD ? "→" : "←"}</span>
          </button>
        </div>

        {/* panneau droit — CRUD */}
        {openCRUD && (
          <div className="flex flex-col justify-center w-1/2 overflow-y-auto bg-gray-900">
            <SelectRouteItem
              select={select}
              navbar={navbar}
              tableData={tableData}
              selectNav={selectNav}
              selectRoute={selectRoute}
              setSelectNav={setSelectNav}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
