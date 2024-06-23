import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../utils/user";

export default function useLogin() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: login,
    isPending,
    data: response,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  return { login, isLoading: isPending, response };
}
