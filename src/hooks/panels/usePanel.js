import { useQuery } from "@tanstack/react-query";
import { getPanel } from "../../utils/panel";

function usePanel(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["panel", id],
    queryFn: () => getPanel(id),
  });

  return { panel: data, isLoading, error };
}

export default usePanel;
