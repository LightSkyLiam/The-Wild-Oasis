import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValue = searchParams.get(`sortby`) || ``;
  const handleChange = (e) => {
    searchParams.set(`sortby`, e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      value={selectedValue}
      type="white"
      onChange={handleChange}
      options={options}
    />
  );
}

export default SortBy;
