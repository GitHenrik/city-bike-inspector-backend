import React from "react";

interface SearchProps {
  description: string;
  type: "number" | "text";
  value: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (value: string) => void;
}

const Search = ({
  description,
  type,
  value,
  handleSubmit,
  handleChange,
}: SearchProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        {description}
        <input
          type={type}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
};

export default Search;
