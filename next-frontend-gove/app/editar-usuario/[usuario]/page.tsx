"use client";

import {
  Checkbox,
  TextField,
  FormControlLabel,
  FormGroup,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/app/services/api";
import { useEditUser } from "./useEditUser";
import { useEffect } from "react";

type User = {
  id?: string | null;
  name: string;
  email: string;
  phone: string;
  userType: string;
  secretary: string;
  permissionOne?: boolean;
  permissionTwo?: boolean;
};

export default function Page() {
  const { usuario: userId } = useParams();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const user = users.find((us) => Number(us.id) === Number(userId));

  const schema = yup.object({
    id: yup.string().nullable(),
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

  const typesOfUser = [
    {
      value: "tipo_1",
      label: "Usuário do Tipo 1",
    },
    {
      value: "tipo_2",
      label: "Usuário do Tipo 2",
    },
    {
      value: "tipo_3",
      label: "Usuário do Tipo 3",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      phone: "",
      userType: "",
      secretary: "",
      permissionOne: false,
      permissionTwo: false,
    },
  });

  const userTypeValue = watch("userType");

  useEffect(() => {
    if (user) {
      reset({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        secretary: user.secretary,
        permissionOne: Boolean(user.permissionOne),
        permissionTwo: Boolean(user.permissionTwo),
      });
    }
  }, [user, reset]);

  const { userMutationEdit } = useEditUser();
  const router = useRouter();

  function onSubmit(data: User) {
    const dataWithId = { ...data, id: data.id ?? undefined };
    userMutationEdit(dataWithId);
    router.push("/usuarios");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white border-2 p-8 shadow-lg w-[85%]">
        <h1 className="font-bold text-2xl mb-8 text-fuchsia-900">
          Editar usuário
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
            error={!!errors.userType}
            helperText={errors.userType?.message}
            select
            value={userTypeValue}
            {...register("userType")}
          >
            {typesOfUser.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>
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
          <Controller
            name="permissionOne"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Permissão Filha 1"
              />
            )}
          />
          <Controller
            name="permissionTwo"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Permissão Filha 2"
              />
            )}
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
