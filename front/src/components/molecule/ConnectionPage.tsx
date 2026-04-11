import { useState } from "react";

interface Props {
  onConnect: (input: string) => void;
}

export const ConnectionPage = ({ onConnect }: Props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onConnect(input);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-10">
      <label htmlFor="connection" className="text-sm font-medium">
        Connection string :{" "}
      </label>
      <input
        id="connection"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your connection string"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-150"
      >
        Connect
      </button>
    </form>
  );
};
