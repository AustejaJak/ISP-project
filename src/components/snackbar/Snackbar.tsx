import React from "react";
import { Snackbar as MuiSnackbar } from "@mui/material";
import { useSnackbarContext } from "../../context/snackbarContext";

export const Snackbar = () => {
  const { message } = useSnackbarContext();

  return (
    <>
      <MuiSnackbar
        message={message}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={!!message}
      />
    </>
  );
};
