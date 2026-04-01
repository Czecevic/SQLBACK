import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { DataItem } from "../../interface";
import { useState } from "react";

export const UpdateItem = ({ select, selectRoute, tableData }: any) => {
  const [formData, setFormData] = useState<any>({});
  const queryClient = useQueryClient();
  const fields: any =
    tableData.length > 0 &&
    Object.keys(tableData[0]).filter((key) => key !== "id");

  const updateSelect = useMutation({
    mutationFn: async (elem: DataItem) => {
      const res = await fetch(
        `http://localhost:8000/${selectRoute}/${elem.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(elem),
        },
      );
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data", selectRoute] });
    },
  });
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSelect.mutate({ ...formData, id: select.id });
  };

  return (
    <div>
      {!select ? (
        <p>Choisissez une table que vous voulez modifier</p>
      ) : (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {fields.map((field: any, index: number) => {
            return (
              <div key={index} className="flex flex-col">
                <label>{field}</label>
                <input
                  type="text"
                  placeholder={select[field]}
                  className="border-2 rounded-xl p-2"
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </div>
            );
          })}
          <button className="bg-amber-50 p-2 my-3 text-black rounded-xl">
            Change
          </button>
        </form>
      )}
    </div>
  );
};
