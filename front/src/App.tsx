// type
import type { DataItem } from "./interface";

import "./App.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// composent
import { NavBar } from "./components/NavBar";
import { GetSelect } from "./components/GetSelect";
import { RemoveItem } from "./components/RemoveItem";
import { CreateItem } from "./components/CreateItem";
import { UpdateItem } from "./components/UpdateItem";
// import "@xyflow/react/dist/style.css";

function App() {
  const [select, setSelect] = useState<DataItem | null>(null);
  const [selectRoute, setSelectRoute] = useState("project");
  const navbar = ["CREATE", "READ", "UPDATE", "DELETE"];
  const [selectNav, setSelectNav] = useState("READ");
  console.log(selectRoute);
  const { data: routes = [] } = useQuery<string[]>({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/tables");
      const takeRes = await res.json();
      return takeRes;
    },
  });
  const { data: tableData = [] } = useQuery<DataItem[]>({
    queryKey: ["data", selectRoute],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/${selectRoute}`);
      const response = await res.json();
      return response;
    },
  });
  return (
    <div>
      <nav className="text-white m-5 flex gap-5">
        {routes.map((route) => (
          <button
            key={route}
            onClick={() => setSelectRoute(route)}
            className="border-2 text-3xl p-5 rounded-2xl hover:bg-amber-50 hover:text-black transition delay-75 duration-150 ease-in-out"
          >
            {route}
          </button>
        ))}
      </nav>
      <div className="flex m-11 text-white text-2xl gap-5">
        <div className="w-1/2">
          {tableData.map((elem) => (
            <div
              className="border-blue-200 border-2 p-5 m-5 hover:bg-white hover:text-black transition delay-75 duration-150 ease-in-out break-all rounded-2xl cursor-pointer"
              key={elem.id}
              onClick={() => setSelect(elem)}
            >
              <div className="border-blue-200 pb-5">
                {Object.entries(elem).map(([key, value]) => (
                  <div key={`${elem.id}-${key}`} className="mb-2">
                    <span className="font-bold capitalize">{key} :</span>{" "}
                    {String(value)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <NavBar navbar={navbar} setSelectNav={setSelectNav} />
          <pre className=" border-t-2 border-amber-50 p-10">
            {selectNav === "READ" && <GetSelect select={select} />}
            {selectNav === "CREATE" && (
              <CreateItem selectRoute={selectRoute} tableData={tableData} />
            )}
            {selectNav === "DELETE" && (
              <RemoveItem
                select={select}
                selectRoute={selectRoute}
                tableData={tableData}
              />
            )}
            {selectNav === "UPDATE" && (
              <UpdateItem
                select={select}
                selectRoute={selectRoute}
                tableData={tableData}
              />
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
