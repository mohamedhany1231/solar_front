import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addViewer as addViewerApi } from "../../../utils/panel";

export default function useAddViewer(panelId) {
  const queryClient = useQueryClient();

  const {
    mutateAsync: addViewer,
    isPending,
    data: response,
  } = useMutation({
    mutationFn: addViewerApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["panel", panelId]);
    },
  });

  return { addViewer, isLoading: isPending, response };
}
