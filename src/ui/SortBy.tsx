import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { ChangeEvent } from "react";

interface SortByProps {
  sortByOptions: {
    value: string;
    label: string;
  }[];
}

function SortBy({ sortByOptions }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get("sortBy") ?? "";

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target?.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={selectedOption}
      selectOptions={sortByOptions}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
