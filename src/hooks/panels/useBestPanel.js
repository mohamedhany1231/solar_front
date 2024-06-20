//

import { useQuery } from "@tanstack/react-query";
import { getBestPanel } from "../../utils/panel";

function useBestPanel() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["best-panel"],
    queryFn: getBestPanel,
  });

  return { panel: data, isLoading, error };
}

export default useBestPanel;
