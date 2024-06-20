import { useQuery } from "@tanstack/react-query";
import { getPanels } from "../../utils/panel";

function usePanels(page) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["panels", page],
    queryFn: () => getPanels(page),
  });

  let panels, pagesCount;
  if (!isLoading) {
    ({ panels, pagesCount } = data);
  }

  return { panels, pagesCount, isLoading, error };
}

export default usePanels;
