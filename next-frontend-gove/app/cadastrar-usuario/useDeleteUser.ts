import { deleteUser } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { mutate: userMutationDelete } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { userMutationDelete };
}
