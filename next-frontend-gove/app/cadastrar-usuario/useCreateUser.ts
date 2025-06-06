import { createUser } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: userMutationCreate } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { userMutationCreate };
}
