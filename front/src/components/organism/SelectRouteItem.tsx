import { NavBar } from "../atoms/NavBar";
import { GetSelect } from "../atoms/GetSelect";
import { CreateItem } from "./CreateItem";
import { RemoveItem } from "../molecule/RemoveItem";
import { UpdateItem } from "./UpdateItem";

import "@xyflow/react/dist/style.css";

export const SelectRouteItem = ({
  select,
  navbar,
  tableData,
  selectNav,
  selectRoute,
  setSelectNav,
}: any) => {
  return (
    <div>
      <NavBar navbar={navbar} setSelectNav={setSelectNav} />
      {select && (
        <pre className=" border-t-2 border-amber-50 p-10">
          {selectNav === "READ" && (
            <GetSelect select={select} tableData={tableData} />
          )}
          {selectNav === "CREATE" && (
            <CreateItem
              selectRoute={selectRoute}
              tableData={tableData}
              method="POST"
            />
          )}
          {selectNav === "DELETE" && (
            <RemoveItem select={select} selectRoute={selectRoute} />
          )}
          {selectNav === "UPDATE" && (
            <UpdateItem
              select={select}
              selectRoute={selectRoute}
              tableData={tableData}
            />
          )}
        </pre>
      )}
    </div>
  );
};
