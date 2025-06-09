import { editUser } from "@/app/_services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useEditUser() {
  const queryClient = useQueryClient();

  const { mutate: userMutationEdit } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      toast.success("Usuário editado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { userMutationEdit };
}
