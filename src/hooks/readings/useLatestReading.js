import { useQuery } from "@tanstack/react-query";
import { getLatestReading } from "../../utils/readings";

function useLatestReading(id, date) {
  const { data, isLoading } = useQuery({
    queryKey: ["reading", id, date],
    queryFn: () => getLatestReading(id, date),
  });
  return { reading: data, isLoading };
}

export default useLatestReading;
