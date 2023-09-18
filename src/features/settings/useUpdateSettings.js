import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingaApi } from "../../services/apiSettings";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingaApi,
    onSuccess: () => {
      toast.success(`Setting Successfuly Edited`);
      queryClient.invalidateQueries({ queryKey: [`settings`] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateSetting };
};
