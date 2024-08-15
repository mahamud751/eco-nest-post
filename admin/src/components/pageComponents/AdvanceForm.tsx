import { Advance } from "@/services/types";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from "@mui/material";

interface AdvanceFormProps {
  advance: Advance | null;
}

const AdvanceForm: React.FC<AdvanceFormProps> = ({ advance }) => {
  return (
    <>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Students</InputLabel>
          <Select
            onChange={(e) => e.target.value}
            label="Students"
            name="students"
          >
            <MenuItem value="girl">Girl</MenuItem>
            <MenuItem value="boy">Boy</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Class Ratio</InputLabel>
          <Select
            onChange={(e) => e.target.value}
            label="Class Ratio"
            name="ratio"
          >
            <MenuItem value="class5-8">Class 5 to Class 8</MenuItem>
            <MenuItem value="class9-12">Class 9 to Class 12</MenuItem>
            <MenuItem value="play-4">Play to Class 4</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Top Part</InputLabel>
          <Select
            onChange={(e) => e.target.value}
            label="Top Part"
            name="topPart"
          >
            <MenuItem value="kameez">Kameez</MenuItem>
            <MenuItem value="shirt">Shirt</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Top Fabrication</InputLabel>
          <Select
            onChange={(e) => e.target.value}
            label="Top Fabrication"
            name="topFab"
          >
            <MenuItem value="35/36">35/36</MenuItem>
            <MenuItem value="allexToray">Alex Toray</MenuItem>
            <MenuItem value="chinaToray">China Toray</MenuItem>
            <MenuItem value="presidentToray">President Toray</MenuItem>
            <MenuItem value="TC">TC</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Bottom Part</InputLabel>
          <Select
            onChange={(e) => e.target.value}
            label="Bottom Part"
            name="bottomPart"
          >
            <MenuItem value="pant">Pant</MenuItem>
            <MenuItem value="salwar">Salwar</MenuItem>
            <MenuItem value="skirt">Skirt</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Bottom Fabrication</InputLabel>
          <Select
            onChange={(e) => e.target.value}
            label="Bottom Fabrication"
            name="bottomFab"
          >
            <MenuItem value="hisofy">Hisofy</MenuItem>
            <MenuItem value="otherFab1">Other Fabric 1</MenuItem>
            <MenuItem value="otherFab2">Other Fabric 2</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          fullWidth
          defaultValue={advance?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="outlined-basic"
          label="Email"
          name="email"
          fullWidth
          defaultValue={advance?.email || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="outlined-basic"
          label="Number"
          name="number"
          fullWidth
          defaultValue={advance?.number || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="outlined-basic"
          label="Address"
          name="address"
          fullWidth
          defaultValue={advance?.address || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="outlined-basic"
          label="Quantity"
          name="quantity"
          defaultValue={advance?.quantity || ""}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default AdvanceForm;
