import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../utils/user";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateSettings,
    isPending,
    data: response,
  } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  return { updateSettings, isLoading: isPending, response };
}
