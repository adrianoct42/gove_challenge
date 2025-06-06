"use client";

import { Add, Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { getUsers } from "../services/api";
import React from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "../utils/dateUtil";

export default function Page() {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = React.useState<string | number | null>(
    null
  );

  const router = useRouter();

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    id: string | number
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedId(null);
  };

  const handlePageNavigation = (url: string): void => {
    router.push(url);
  };

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (error) return <div>Erro ao carregar usuários... :(</div>;

  const columns: GridColDef[] = [
    { field: "name", headerName: "Usuário", flex: 2 },
    { field: "email", headerName: "E-mail", flex: 2 },
    { field: "phone", headerName: "Telefone", flex: 1 },
    {
      field: "created_at",
      headerName: "Data de Criação",
      flex: 1,
      valueFormatter: (params: never) => formatDate(params),
    },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.row.id)}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={menuAnchor !== null && selectedId === params.row.id}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                router.push(`/editar-usuario/${params.row.id}`);
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                <Edit fontSize="small" />
              </ListItemIcon>
              <ListItemText>Editar</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                // Abre modal de deletar
              }}
            >
              <ListItemIcon onClick={() => null}>
                <Delete fontSize="small" />
              </ListItemIcon>
              <ListItemText>Deletar</ListItemText>
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    created_at: user.created_at,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <div className=" border-1 bg-white flex flex-row justify-between w-[85%] mx-auto px-9 py-9">
        <h1 className="font-bold text-2xl text-fuchsia-900">Usuários</h1>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handlePageNavigation("/cadastrar-usuario")}
        >
          Novo usuário
        </Button>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Paper sx={{ height: 400, width: "85%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{
              border: 1,
              boxShadow: 12,
            }}
          />
        </Paper>
      )}
    </>
  );
}
