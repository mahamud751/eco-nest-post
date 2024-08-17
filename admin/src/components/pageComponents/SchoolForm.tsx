import { School } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface SchoolFormProps {
  school: School | null;
}

const SchoolForm: React.FC<SchoolFormProps> = ({ school }) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="User Name"
          name="name"
          fullWidth
          defaultValue={school?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Address"
          name="location"
          fullWidth
          defaultValue={school?.location || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Email"
          name="email"
          fullWidth
          defaultValue={school?.email || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {!school?.id && (
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Password"
            name="password"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      )}
    </>
  );
};

export default SchoolForm;
