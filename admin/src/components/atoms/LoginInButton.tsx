import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Custom Material UI styles with Tailwind CSS integration
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Material UI primary color
  color: theme.palette.common.white, // Ensure text color is white
  padding: theme.spacing(1.5, 3), // Tailwind-like padding
  borderRadius: theme.shape.borderRadius, // Consistent border radius
  textTransform: "none", // Disable uppercase text
  boxShadow: theme.shadows[4], // Custom shadow
  transition: "all 0.3s ease", // Smooth transition

  "&:hover": {
    backgroundColor: theme.palette.primary.dark, // Darker shade on hover
    boxShadow: theme.shadows[6], // Slightly larger shadow on hover
  },

  "&:active": {
    backgroundColor: theme.palette.primary.dark, // Keep dark shade on active
    boxShadow: theme.shadows[8], // Even more pronounced shadow on active
  },

  "&.Mui-disabled": {
    backgroundColor: theme.palette.action.disabled, // Disabled background color
    color: theme.palette.action.disabledBackground, // Disabled text color
    boxShadow: "none", // Remove shadow when disabled
  },
}));

const SignInButton = () => {
  return (
    <StyledButton
      type="submit"
      variant="contained"
      fullWidth
      className="mt-4 shadow-lg rounded-lg"
    >
      Sign In
    </StyledButton>
  );
};

export default SignInButton;
