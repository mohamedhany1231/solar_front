import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../utils/user";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: update,
    isPending,
    data: response,
  } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  return { update, isLoading: isPending, response };
}
