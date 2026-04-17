import type { Dispatch, SetStateAction } from "react";

interface toggleButtonProps {
  openCRUD: boolean;
  setOpenCRUD: Dispatch<SetStateAction<boolean>>;
}

export const ToggleButton = ({ openCRUD, setOpenCRUD }: toggleButtonProps) => {
  return (
    <div className="flex items-center bg-gray-900 border-r border-gray-800">
      <button
        onClick={() => setOpenCRUD(!openCRUD)}
        className="h-full px-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-150"
        title={openCRUD ? "Fermer le panneau" : "Ouvrir le panneau CRUD"}
      >
        <span className="text-xl">{openCRUD ? "→" : "←"}</span>
      </button>
    </div>
  );
};
