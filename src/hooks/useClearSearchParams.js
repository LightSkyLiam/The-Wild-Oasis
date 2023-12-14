import { useSearchParams } from "react-router-dom";

export const useClearSearchParams = () => {
  const [searchParmas, setSearchParams] = useSearchParams();
  const clearSearchParams = (params) => {
    params.forEach((param) => searchParmas.delete(param));
    setSearchParams(searchParmas);
  };
  return { clearSearchParams };
};
