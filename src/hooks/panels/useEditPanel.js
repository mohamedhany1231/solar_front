import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPanel as editPanelApi } from "../../utils/panel";

export default function useEditPanel(id) {
  const queryClient = useQueryClient();

  const {
    mutateAsync: editPanel,
    isPending,
    data: response,
  } = useMutation({
    mutationFn: editPanelApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["panel", id]);
    },
  });

  return { editPanel, isLoading: isPending, response };
}
