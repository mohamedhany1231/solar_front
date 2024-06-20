import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../utils/user";

export default function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  return { logout, isLoading: isPending };
}
