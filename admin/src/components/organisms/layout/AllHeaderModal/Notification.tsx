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
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");
  const [readCount, setReadCount] = useState<number>(0);
  const [unreadCount, setUnreadCount] = useState<number>(0);

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
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/notifications?email=${user.email}`
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
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/notifications/${notificationId}`,
        {
          status: "read",
        }
      );

      fetchNotifications();
      onClose();
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

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
              color: textColor,
              overflow: "auto",
              maxHeight: 400,
              width: 300,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: textColor }}>
              Notifications
            </Typography>

            <Grid container spacing={1} mb={2}>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
                    item
                    xs={12}
                    key={notification.orderId}
                    container
                    alignItems="center"
                  >
                    <Grid item xs>
                      <Link
                        href={`/order-show/${notification.orderId}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <Box
                          sx={{
                            backgroundColor:
                              notification.status === "read"
                                ? "#f0f0f0"
                                : "#d1f5d3",
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

            <Button
              onClick={onClose}
              fullWidth
              sx={{ marginTop: 2, color: textColor }}
            >
              Close
            </Button>
            <Link href={"/notification-list"}>
              <Button
                className="bg-violet-500 hover:bg-violet-500"
                fullWidth
                sx={{ marginTop: 1, color: "white" }}
              >
                View All Notifications
              </Button>
            </Link>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default NotificationPopper;
