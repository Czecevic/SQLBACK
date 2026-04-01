import type { SetStateAction, Dispatch } from "react";

export interface DataItem {
  id: number;
  name: string;
  img: string;
  link: string;
  icon: string;
}

export interface RemoveSelectProps {
  select: DataItem | null;
  selectRoute: string;
}

export interface NavBarProps {
  navbar: string[];
  setSelectNav: Dispatch<SetStateAction<string>>;
}

export interface SelectRouteTableProps {
  tableData: any[];
  setSelect: (item: any) => void;
}
