import React from "react";
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
import Image from "next/image";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function SwipeableTemporaryDrawer() {
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
      <List className="mt-12">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Image
                src={"https://i.ibb.co/t2JQT5q/girl.png"}
                width={40}
                height={40}
                alt="profile image"
                className="rounded-full"
              />
            </ListItemIcon>
            Mahamud Pino
          </ListItemButton>
        </ListItem>
      </List>
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
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
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
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        className="bg-purple-50 rounded-full"
      >
        <Image
          src={"https://i.ibb.co/t2JQT5q/girl.png"}
          width={40}
          height={40}
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
          style: { zIndex: 1400 }, // Ensure this is above the AppBar's zIndex
        }}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
