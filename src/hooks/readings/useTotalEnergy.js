import { useQuery } from "@tanstack/react-query";
import { getTotalEnergy } from "../../utils/readings";

function useTotalEnergy() {
  const { data, isLoading } = useQuery({
    queryKey: ["totalEnergy"],
    queryFn: getTotalEnergy,
  });
  return { reading: data, isLoading };
}

export default useTotalEnergy;
