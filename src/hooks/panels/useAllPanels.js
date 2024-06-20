import { useQuery } from "@tanstack/react-query";
import { getAllPanels } from "../../utils/panel";

function useAllPanels(page) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["AllPanels", page],
    queryFn: () => getAllPanels(page),
  });

  let panels, pagesCount;
  if (!isLoading) {
    ({ panels, pagesCount } = data);
  }

  return { panels, pagesCount, isLoading, error };
}

export default useAllPanels;
