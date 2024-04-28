import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import { TUpdateSettingType } from "../../schema/settingsSchema";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: (newSettings: TUpdateSettingType) =>
      updateSettingAPI(newSettings),

    onSuccess: () => {
      toast.success("Settings updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { updateSettings, isUpdating };
}
