import { useEffect, useState } from "react";
import "./App.css";

interface DataItem {
  id: number;
  name: string;
  img: string;
  link: string;
  icon: string;
}

type Route = string;

function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [select, setSelect] = useState<DataItem | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectRoute, setSelectRoute] = useState("/projects");
  const navbar = ["C", "R", "U", "D"];
  const [selectNav, setSelectNav] = useState("R");
  useEffect(() => {
    const getRoutes = async () => {
      try {
        const res = await fetch("http://localhost:8000/openapi.json");
        const takeData = await res.json();
        const allRoutes = Object.keys(takeData.paths);
        setRoutes(allRoutes);
      } catch (error) {
        console.error(error);
      }
    };
    getRoutes();
  }, []);
  useEffect(() => {
    if (!selectRoute) return;
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:8000${selectRoute}`);
        const takeData = await res.json();
        if (Array.isArray(takeData)) {
          setData(takeData);
        } else {
          setData([]);
        }
        setSelect(null);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [selectRoute]);

  const handleRemove = async (elemOfData, selectRoute) => {
    try {
      console.log(elemOfData);
      const deleteData = await fetch(`http://localhost:8000${selectRoute}`, {
        method: "DELETE",
        headers: { "Content-Type": "applications/json" },
      });
      const resDeleteData = deleteData.json();
      return resDeleteData;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <nav className="text-white m-5 flex gap-5">
        {routes.map((route) => (
          <button
            key={route}
            onClick={() => setSelectRoute(route)}
            className="border-2 text-3xl p-5 rounded-2xl hover:bg-amber-50 hover:text-black transition delay-75 duration-150 ease-in-out"
          >
            {route.split("/")[1]}
          </button>
        ))}
      </nav>
      <div className="flex m-11 text-white text-2xl gap-5">
        <div className="w-1/2 mt-28">
          {data.map((elem) => (
            <div
              className="border-blue-200 border-2 p-5 m-5 hover:bg-white hover:text-black transition delay-75 duration-150 ease-in-out break-all rounded-2xl"
              key={elem.id}
              onClick={() => setSelect(elem)}
            >
              <h1 className="border-blue-200 pb-5 border-b-2 font-bold">
                {elem.name}
              </h1>
              <p className="pt-5">{elem.id}</p>
              <p>{elem.link}</p>
              <p>{elem.img}</p>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <nav className="flex justify-between text-6xl mx-8">
            {navbar.map((elemOfNavbar) => (
              <button
                key={elemOfNavbar}
                className="hover:border-2 pointer-cli p-5 rounded-2xl"
                onClick={() => setSelectNav(elemOfNavbar)}
              >
                {elemOfNavbar}
              </button>
            ))}
          </nav>
          <pre className="w-full h-full bg-amber-50 text-black p-10 rounded-2xl">
            {selectNav === "R" && select && (
              <div>
                <p>name : {select.name}</p>
                <p>id : {select.id}</p>
                <p>img : {select.img}</p>
                <p>link : {select.link}</p>
              </div>
            )}
            {selectNav === "R" && !select && (
              <p className="text-gray-400">
                Clique sur un élément pour le voir
              </p>
            )}
            {selectNav === "D" && select && (
              <div>
                <p>name : {select.name}</p>
                <p>id : {select.id}</p>
                <p>img : {select.img}</p>
                <p>link : {select.link}</p>
                <p>
                  veux tu supprimer ceci ?{" "}
                  <button
                    className=" bg-red-500 p-3 rounded-2xl cursor-pointer"
                    onClick={() => handleRemove(select, selectRoute)}
                  >
                    oui
                  </button>
                </p>
              </div>
            )}
            {selectNav === "D" && !select && (
              <p className="text-gray-400">
                Clique sur un élément pour le supprimer
              </p>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
