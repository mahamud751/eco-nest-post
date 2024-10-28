import { Discount } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface DiscountFormProps {
  discount: Discount | null;
}

const DiscountForm: React.FC<DiscountFormProps> = ({ discount }) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="User Name"
          name="name"
          fullWidth
          defaultValue={discount?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Amount"
          name="amount"
          fullWidth
          defaultValue={discount?.amount || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Min Amount"
          name="minAmount"
          fullWidth
          defaultValue={discount?.minAmount || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid> */}

      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Start Date"
          name="startDate"
          type="datetime-local"
          fullWidth
          defaultValue={
            discount?.startDate
              ? discount.startDate.toISOString().slice(0, 16)
              : ""
          }
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="End Date"
          name="endDate"
          type="datetime-local"
          fullWidth
          defaultValue={
            discount?.endDate ? discount.endDate.toISOString().slice(0, 16) : ""
          }
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default DiscountForm;
