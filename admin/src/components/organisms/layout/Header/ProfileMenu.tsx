import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button } from "@mui/material";
import { useAuth } from "@/services/hooks/auth";

export default function SwipeableTemporaryDrawer() {
  const { user, logoutUser } = useAuth();

  const handleLogOut = () => {
    logoutUser();
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, right: open });
    };

  const list = () => (
    <Box
      sx={{
        width: 350,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      className="relative"
    >
      <IconButton
        onClick={toggleDrawer(false)}
        className="absolute top-2 right-2 bg-purple-50 text-purple-700 rounded-md"
      >
        <CloseIcon />
      </IconButton>
      <div className="flex justify-center">
        <List className="mt-12 ">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Image
                  src={"https://i.ibb.co/t2JQT5q/girl.png"}
                  width={20}
                  height={20}
                  alt="profile image"
                  className="rounded-full"
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <h2 className="text-center text-xl">{user?.name}</h2>
      <p className="text-center mb-5 text-purple-600">{user?.email}</p>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <div className="flex justify-center">
        <Button
          className="bg-purple-800 text-white p-4 w-full mx-5 mt-12 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300 ease-in-out"
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </div>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        className="bg-purple-50 rounded-full mt-1"
      >
        <Image
          src={"https://i.ibb.co/t2JQT5q/girl.png"}
          width={15}
          height={15}
          alt="profile image"
          className="rounded-full"
        />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        BackdropProps={{ style: { background: "none" } }}
        PaperProps={{
          style: { zIndex: 1400 },
        }}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
