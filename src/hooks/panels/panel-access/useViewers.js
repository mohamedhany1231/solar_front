import { useQuery } from "@tanstack/react-query";
import { getPanelViewers } from "../../../utils/user";

function useViewers(id) {
  const { isLoading, data: viewers } = useQuery({
    queryKey: ["viewers", id],
    queryFn: () => getPanelViewers(id),
  });

  return { viewers, isLoading };
}

export default useViewers;
