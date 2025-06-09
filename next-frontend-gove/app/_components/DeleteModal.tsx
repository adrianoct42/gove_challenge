"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useDeleteUser } from "../usuarios/useDeleteUser";

type DeleteModalProps = {
  open: boolean;
  onSet: () => void;
  userId: string;
  name: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onSet,
  userId,
  name,
}) => {
  const { userMutationDelete } = useDeleteUser();

  console.log(userId);

  return (
    <Dialog
      open={open}
      onClose={onSet}
      slotProps={{
        paper: {
          sx: {
            width: "500px",
          },
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <WarningAmberIcon />
          Atenção
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography>Você deseja excluir o usuário {name}?</Typography>
      </DialogContent>

      <DialogActions
        className="space-x-2"
        sx={{ justifyContent: "flex-end", padding: 2 }}
      >
        <Button variant="outlined" onClick={onSet}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            userMutationDelete(userId);
            onSet();
          }}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
