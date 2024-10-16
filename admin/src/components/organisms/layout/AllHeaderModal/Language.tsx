import React from "react";
import {
  Popper,
  Fade,
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";

interface LanguageModalProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  open,
  anchorEl,
  onClose,
}) => {
  const [language, setLanguage] = React.useState<string>("English");
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as string);
  };

  return (
    <Popper open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Box
            sx={{
              border: 1,
              p: 2,
              bgcolor: theme.palette.mode === "dark" ? "#141a21" : "#ffffff",
              color: theme.palette.mode === "dark" ? "white" : "black",
              borderRadius: 2,
              overflow: "auto",
              maxHeight: 400,
              width: 300,
              boxShadow: 3,
              marginTop: 1,
            }}
          >
            <Typography variant="h6">Select Language</Typography>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
              <Select value={language} onChange={handleChange}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Bangla">Bangla</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={onClose} color="primary" sx={{ marginTop: 2 }}>
              Close
            </Button>
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

export default LanguageModal;
