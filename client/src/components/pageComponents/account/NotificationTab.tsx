import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Button,
  Grid2 as Grid,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/services/hooks/auth";
import Link from "next/link";
import { Notification } from "@/services/types/types";

const NotificationTab = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");
  const [readCount, setReadCount] = useState<number>(0);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const socket: Socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
      transports: ["websocket"],
    });

    // Listen for 'notification' events from the server
    socket.on("notification", (notification: Notification) => {
      setAllNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchNotifications = async () => {
    if (!user || !user.email) {
      console.error("User is not logged in");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<{
        data: Notification[];
        total: number;
        perPage: number;
      }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications?email=${user.email}`
      );

      const notifications = response.data.data;
      setAllNotifications(notifications);

      const read = notifications.filter(
        (notification) => notification.status === "read"
      ).length;
      const unread = notifications.filter(
        (notification) => notification.status === "unread"
      ).length;

      setReadCount(read);
      setUnreadCount(unread);

      setFilteredNotifications(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setAllNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    let filteredData = allNotifications;

    if (filter === "read") {
      filteredData = allNotifications.filter(
        (notification) => notification.status === "read"
      );
    } else if (filter === "unread") {
      filteredData = allNotifications.filter(
        (notification) => notification.status === "unread"
      );
    }

    setFilteredNotifications(filteredData);
  }, [filter, allNotifications]);

  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  const handleShowAll = () => {
    setFilter("all");
  };

  const markNotificationAsRead = async (notificationId: string) => {
    if (!user || !user.email) {
      console.error("User is not logged in");
      return;
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/${notificationId}`,
        {
          status: "read",
        }
      );

      fetchNotifications();
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const textColor = theme.palette.mode === "dark" ? "white" : "black";

  return (
    <Box
      sx={{
        p: 2,
        marginTop: 1,
        overflow: "auto",
        maxHeight: 400,
        width: "100%",
      }}
    >
      <Grid container spacing={1} mb={2}>
        <Grid size={{ xs: 4 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleShowAll}
            sx={{
              background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #feb47b, #ff7e5f)",
              },
              borderRadius: "8px",
              height: "48px",
            }}
          >
            All
          </Button>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleFilterChange("read")}
            sx={{
              background: "linear-gradient(45deg, #6a82fb, #fc5c7d)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #5a72db, #e04b6e)",
              },
              borderRadius: "8px",
              height: "48px",
            }}
          >
            Read ({readCount})
          </Button>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleFilterChange("unread")}
            sx={{
              background: "linear-gradient(45deg, #00c6ff, #0072ff)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #0072ff, #00c6ff)",
              },
              borderRadius: "8px",
              height: "48px",
            }}
          >
            Unread ({unreadCount})
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : filteredNotifications.length === 0 ? (
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
          {filteredNotifications.map((notification) => (
            <Grid
              size={{ xs: 12 }}
              key={notification.orderId}
              container
              alignItems="center"
            >
              <Grid size={{ xs: 12 }}>
                <Link
                  href={`/order-show/${notification.orderId}`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        notification.status === "read" ? "#f0f0f0" : "#d1f5d3",
                      borderRadius: "8px",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography variant="body1" sx={{ color: "black" }}>
                      {notification.message}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "black" }}>
                      Order Id : {notification.orderId}
                    </Typography>

                    <Typography variant="body1" sx={{ color: "gray" }}>
                      {new Date(notification.createdAt).toLocaleString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default NotificationTab;
