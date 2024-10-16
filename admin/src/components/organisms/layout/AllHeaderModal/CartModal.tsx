import React from "react";
import { Box, Button, Popper, Typography, Grid, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartModalProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  open,
  anchorEl,
  onClose,
  cartItems,
  onRemoveItem,
}) => {
  const theme = useTheme();
  return (
    <Popper open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Box
            sx={{
              border: 1,
              p: 2,
              background: theme.palette.mode === "dark" ? "#141a21" : "#ffffff",
              marginTop: 1,
              boxShadow: 3,
              borderRadius: 3,
              color: theme.palette.mode === "dark" ? "white" : "black",
              overflow: "auto",
              maxHeight: 400,
              width: 300,
            }}
          >
            <Typography variant="h6">Your Cart</Typography>
            {cartItems.length === 0 ? (
              <Typography>No items in the cart.</Typography>
            ) : (
              <Grid container spacing={2}>
                {cartItems.map((item) => (
                  <Grid
                    item
                    xs={12}
                    key={item.id}
                    container
                    alignItems="center"
                  >
                    <Grid item>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "50px", marginRight: "8px" }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography>{item.name}</Typography>
                      <Typography>Price: ${item.price}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        color="secondary"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
            <Button onClick={onClose} color="primary" sx={{ marginTop: 1 }}>
              Close
            </Button>
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

export default CartModal;
