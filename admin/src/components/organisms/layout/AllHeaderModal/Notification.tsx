import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Popper,
  Paper,
  Typography,
  Box,
  Button,
  Fade,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useAuth } from "@/services/hooks/auth";
import { Notification } from "@/services/types";
import Link from "next/link";

interface NotificationPopperProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const NotificationPopper: React.FC<NotificationPopperProps> = ({
  open,
  anchorEl,
  onClose,
}) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [data, setData] = useState<{
    data: Notification[];
    total: number;
    perPage: number;
  } | null>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchOrders = async () => {
    if (!user || !user.email) {
      console.error("User is not logged in");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<{
        data: Notification[];
        total: number;
        perPage: number;
      }>(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/notifications?email=${user.email}&page=${page}&perPage=${rowsPerPage}`
      );

      if (response.data.data.length < rowsPerPage) {
        setHasMore(false);
      }

      setData((prevData) => ({
        data: [...(prevData?.data || []), ...response.data.data],
        total: response.data.total,
        perPage: response.data.perPage,
      }));
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const textColor = theme.palette.mode === "dark" ? "white" : "black";

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

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
            onScroll={handleScroll}
          >
            <Typography variant="h6" gutterBottom sx={{ color: textColor }}>
              Notifications
            </Typography>
            {data?.data.length === 0 ? (
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
                {data?.data.map((notification, index) => (
                  <Grid item xs={12} key={index} container alignItems="center">
                    <Grid item xs>
                      <Box
                        sx={{
                          backgroundColor: notification.status
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
                          variant="body1"
                          sx={{
                            color: "black",
                          }}
                        >
                          Order Id : <Link href={`/order-show/${notification.orderId}`}>{notification.orderId}</Link>
                        </Typography>
                        <Typography
                          variant="caption"
                          color={
                            notification?.status === "unread"
                              ? "textSecondary"
                              : "primary"
                          }
                          sx={{ color: "black" }}
                        >
                          {notification.status ? "Read" : "Unread"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
                {loading && <CircularProgress />}
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
