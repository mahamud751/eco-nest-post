import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Invoice from "@/components/pageComponents/Invoice";

interface InvoiceModalProps {
  open: boolean;
  onClose: () => void;
  selectedOrder: any;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  open,
  onClose,
  selectedOrder,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Invoice
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Invoice selectedOrder={selectedOrder} />
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
