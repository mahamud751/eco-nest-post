import React from "react";
import {
  Popper,
  Paper,
  Typography,
  Box,
  Button,
  Fade,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Notification {
  message: string;
  read: boolean;
}

interface NotificationPopperProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  notifications: Notification[];
}

const NotificationPopper: React.FC<NotificationPopperProps> = ({
  open,
  anchorEl,
  onClose,
  notifications,
}) => {
  const theme = useTheme();

  const textColor = theme.palette.mode === "dark" ? "white" : "black";

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      transition
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Paper
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
            <Typography variant="h6" gutterBottom sx={{ color: textColor }}>
              Notifications
            </Typography>
            {notifications.length === 0 ? (
              <Typography
                variant="body2"
                align="center"
                color="textSecondary"
                gutterBottom
                sx={{ color: textColor }}
              >
                No notifications available.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {notifications.map((notification, index) => (
                  <Grid item xs={12} key={index} container alignItems="center">
                    <Grid item xs>
                      <Box
                        sx={{
                          backgroundColor: notification.read
                            ? "#f0f0f0"
                            : "#d1f5d3",
                          borderRadius: "8px",
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: "black",
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color={
                            notification.read ? "textSecondary" : "primary"
                          }
                          sx={{ color: "black" }}
                        >
                          {notification.read ? "Read" : "Unread"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
            <Button
              onClick={onClose}
              fullWidth
              sx={{ marginTop: 2, color: textColor }}
            >
              Close
            </Button>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default NotificationPopper;
