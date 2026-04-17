import type { SetStateAction, Dispatch } from "react";

export interface RemoveSelectProps {
  select: any;
  selectRoute: string;
  tableData: any[];
}

export interface NavBarProps {
  navbar: string[];
  setSelectNav: Dispatch<SetStateAction<string>>;
}

export interface SelectRouteTableProps {
  tableData: any[];
  setSelect: (item: any) => void;
}
