import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeViewer as removeViewerApi } from "../../../utils/panel";

export default function useRemoveViewer(panelId) {
  const queryClient = useQueryClient();

  const {
    mutateAsync: removeViewer,
    isPending,
    data: response,
  } = useMutation({
    mutationFn: removeViewerApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["panel", panelId]);
    },
  });

  return { removeViewer, isLoading: isPending, response };
}
