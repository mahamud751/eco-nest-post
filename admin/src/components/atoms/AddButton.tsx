import React from "react";
import { Button } from "@mui/material";

interface MyButtonProps {
  buttonText: string;
}

const AddButton: React.FC<MyButtonProps> = ({ buttonText }) => (
  <Button
    type="submit"
    className="mt-12 text-white bg-neutral-950 px-6 py-3 hover:bg-neutral-700"
    sx={{ background: "#1C252E", "&:hover": { backgroundColor: "#1C252E" } }}
  >
    {buttonText}
  </Button>
);

export default AddButton;
