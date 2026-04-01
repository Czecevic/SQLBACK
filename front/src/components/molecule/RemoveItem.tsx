import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DataItem, RemoveSelectProps } from "../../interface";

export const RemoveItem = ({ select, selectRoute }: RemoveSelectProps) => {
  const queryClient = useQueryClient();

  const deleteSelect = useMutation({
    mutationFn: async (elem: DataItem) => {
      const res = await fetch(
        `http://localhost:8000/${selectRoute}/${elem.id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        },
      );
      if (!res.ok) throw new Error("Errreur lors de la suppression");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data", selectRoute] });
    },
    onError: (error) => {
      console.log("erreur :", error);
    },
  });

  return (
    <div>
      {!select ? (
        <p className="text-gray-400">Clique sur un élément pour le supprimer</p>
      ) : (
        <div>
          <p>name : {select.name}</p>
          <p>id : {select.id}</p>
          <p>img : {select.img}</p>
          <p>link : {select.link}</p>
          <p>
            veux tu supprimer ceci ?{" "}
            <button
              className=" hover:bg-red-500 px-3 py-2 rounded-2xl cursor-pointer"
              onClick={() => deleteSelect.mutate(select)}
              disabled={deleteSelect.isPending}
            >
              oui
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
