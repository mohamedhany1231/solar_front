import { useQuery } from "@tanstack/react-query";
import { getPeakPerformanceTime } from "../../utils/readings";

function usePeakPerformanceTime() {
  const { data, isLoading } = useQuery({
    queryKey: ["peakTime"],
    queryFn: getPeakPerformanceTime,
  });
  return { time: data, isLoading };
}

export default usePeakPerformanceTime;
