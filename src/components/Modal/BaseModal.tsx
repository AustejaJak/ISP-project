import { Box, Modal, Typography } from "@mui/material";
import React from "react";

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const BaseModal: React.FC<ModalProps> = ({
  open,
  title,
  children,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box>
        <div className='w-full h-screen flex justify-center items-center'>
          <div className='bg-white w-[430px] rounded-lg'>
            <Typography
              id='modal-modal-title'
              variant='h5'
              component='h2'
              sx={{
                fontWeight: "700",
                backgroundColor: "#4F45E4",
                color: "white",
                p: 2,
                borderRadius: "8px 8px 0 0",
              }}
            >
              {title}
            </Typography>
            <div className='mt-2 p-2'>{children}</div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Modal;
