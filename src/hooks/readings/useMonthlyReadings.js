import { useQuery } from "@tanstack/react-query";
import { getMonthlyEnergy } from "../../utils/readings";

function useMonthlyReadings(id, date) {
  const { data, isLoading } = useQuery({
    queryKey: ["reading-monthly", id, date],
    queryFn: () => getMonthlyEnergy(id, date),
  });
  return { readings: data, isLoading };
}

export default useMonthlyReadings;
