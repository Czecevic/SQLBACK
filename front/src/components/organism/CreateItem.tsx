import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const CreateItem = ({
  selectRoute,
  tableData,
  method,
}: {
  selectRoute: string;
  tableData: any[];
  method: "POST" | "PUT";
}) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({});

  const fields =
    tableData.length > 0
      ? Object.keys(tableData[0]).filter((key) => key !== "id")
      : [];

  const CreateSelect = useMutation({
    mutationFn: async (newItem: any) => {
      const res = await fetch(`http://localhost:8000/${selectRoute}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error("Erreur lors de la creation");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data", selectRoute] });
    },
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CreateSelect.mutate(formData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {fields.map((field) => (
          <div key={field} className="flex items-center flex-col">
            <label>{field}</label>
            <input
              type="text"
              className="border-2 rounded-xl p-2"
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        ))}

        <button className="border-2 bg-amber-50 text-black rounded-xl p-2 mt-5">
          Create
        </button>
      </form>
    </div>
  );
};
