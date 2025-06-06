"use client";

import {
  Checkbox,
  TextField,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCreateUser } from "./useCreateUser";
import * as yup from "yup";

type User = {
  name: string;
  email: string;
  phone: string;
  userType: string;
  secretary: string;
  permissionOne?: boolean;
  permissionTwo?: boolean;
};

export default function Page() {
  const schema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    phone: yup.string().required("Telefone é obrigatório"),
    userType: yup.string().required("Tipo de usuário é obrigatório"),
    secretary: yup.string().required("Órgão/Secretaria é obrigatório"),
    permissionOne: yup.boolean(),
    permissionTwo: yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      userType: "",
      secretary: "",
      permissionOne: false,
      permissionTwo: false,
    },
  });

  const { userMutationCreate } = useCreateUser();
  const router = useRouter();

  function onSubmit(data: User) {
    userMutationCreate(data);
    router.push("/usuarios");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white border-2 p-8 shadow-lg w-[85%]">
        <h1 className="font-bold text-2xl mb-8 text-fuchsia-900">
          Criar novo usuário
        </h1>
        <div className="flex flex-row space-x-8">
          <TextField
            label="Nome"
            variant="standard"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            variant="standard"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Telefone"
            variant="standard"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </div>
        <div className="flex flex-row space-x-8">
          <TextField
            label="Tipo de usuário"
            variant="standard"
            {...register("userType")}
            error={!!errors.userType}
            helperText={errors.userType?.message}
          />
          <TextField
            label="Órgão/Secretaria"
            variant="standard"
            {...register("secretary")}
            error={!!errors.secretary}
            helperText={errors.secretary?.message}
          />
        </div>
        <h2 className="font-bold my-4">Permissões de acesso</h2>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox {...register("permissionOne")} />}
            label="Permissão Filha 1"
          />
          <FormControlLabel
            control={<Checkbox {...register("permissionTwo")} />}
            label="Permissão Filha 2"
          />
        </FormGroup>
        <div className="flex flex-row justify-end space-x-4 my-2">
          <Button variant="outlined" onClick={() => router.push("/usuarios")}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
