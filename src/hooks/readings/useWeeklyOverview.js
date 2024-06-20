import { useQuery } from "@tanstack/react-query";
import { getWeekly } from "../../utils/readings";

function useWeeklyOverview() {
  const { data, isLoading } = useQuery({
    queryKey: ["reading-weekly-overview"],
    queryFn: getWeekly,
  });
  return { readings: data, isLoading };
}

export default useWeeklyOverview;
