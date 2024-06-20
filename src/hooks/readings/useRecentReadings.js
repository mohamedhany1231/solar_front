import { useQuery } from "@tanstack/react-query";
import { getRecentReadings } from "../../utils/readings";

function useRecentReadings(id, date) {
  const { data, isLoading } = useQuery({
    queryKey: ["recent-reading", id, date],
    queryFn: () => getRecentReadings(id, date),
  });
  return { readings: data, isLoading };
}

export default useRecentReadings;
