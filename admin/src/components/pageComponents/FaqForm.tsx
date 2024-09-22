import { Grid, TextField } from "@mui/material";
import { Faq } from "@/services/types";

interface FaqFormProps {
  faq: Faq | null;
}
const FaqForm: React.FC<FaqFormProps> = ({ faq }) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Faq Name"
          name="title"
          fullWidth
          defaultValue={faq?.title || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Faq Name"
          name="desc"
          fullWidth
          defaultValue={faq?.desc || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Faq Position"
          name="position"
          fullWidth
          defaultValue={faq?.position || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default FaqForm;
