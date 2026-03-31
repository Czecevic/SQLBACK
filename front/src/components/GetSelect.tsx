import type { DataItem } from "../interface";

export const GetSelect = ({ select }: { select: DataItem | null }) => {
  
  return (
    <>
      {!select ? (
        <p className="text-gray-400">Clique sur un élément pour le voir</p>
      ) : (
        <div>
          <p>name : {select.name}</p>
          <p>id : {select.id}</p>
          <p>img : {select.img}</p>
          <p>link : {select.link}</p>
        </div>
      )}
    </>
  );
};
