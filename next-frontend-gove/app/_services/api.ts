import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  userType: string;
  secretary: string;
  permissionOne?: boolean;
  permissionTwo?: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getUsers(): Promise<User[]> {
  try {
    const res = await axios.get<User[]>("/usuarios");
    return res.data;
  } catch (error) {
    console.error(`Falha ao buscar usuários! Detalhes: ${error}`);
    throw error;
  }
}

export async function createUser(user: User) {
  try {
    return axios.post("/cadastrar-usuario", {
      name: user.name,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
      secretary: user.secretary,
      permissionOne: user.permissionOne,
      permissionTwo: user.permissionTwo,
    });
  } catch (error) {
    console.error(`Falha ao adicionar usuário! Detalhes: ${error}`);
    throw error;
  }
}

export async function editUser(user: User) {
  try {
    const response = await axios.put(`/editar-usuario/${user.id}`, {
      name: user.name,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
      secretary: user.secretary,
      permissionOne: user.permissionOne,
      permissionTwo: user.permissionTwo,
    });
    return response;
  } catch (error) {
    console.error(`Falha ao editar usuário! Detalhes: ${error}`);
    throw error;
  }
}

export async function deleteUser(userId: string) {
  try {
    return axios.delete(`/deletar-usuario/${userId}`);
  } catch (error) {
    console.error(`Falha ao deletar usuário! Detalhes: ${error}`);
    throw error;
  }
}
