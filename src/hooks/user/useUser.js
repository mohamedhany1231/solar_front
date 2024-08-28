import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../utils/user";

function useUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  return { user: data, isLoading, error };
}

export default useUser;
