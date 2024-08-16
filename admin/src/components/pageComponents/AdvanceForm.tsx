import React, { useState } from "react";
import { Advance } from "@/services/types";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  SelectChangeEvent,
} from "@mui/material";

interface AdvanceFormProps {
  advance: Advance | null;
}

const AdvanceForm: React.FC<AdvanceFormProps> = ({ advance }) => {
  const [students, setStudents] = useState<string | undefined>(undefined);
  const [ratio, setRatio] = useState<string | undefined>(undefined);
  const [topPart, setTopPart] = useState<string | undefined>(undefined);
  const [topFab, setTopFab] = useState<string | undefined>(undefined);
  const [bottomPart, setBottomPart] = useState<string | undefined>(undefined);
  const [bottomFab, setBottomFab] = useState<string | undefined>(undefined);

  const handleStudentsChange = (event: SelectChangeEvent<string>) => {
    setStudents(event.target.value);
  };

  const handleRatioChange = (event: SelectChangeEvent<string>) => {
    setRatio(event.target.value);
  };

  const handleTopPartChange = (event: SelectChangeEvent<string>) => {
    setTopPart(event.target.value);
  };

  const handleTopFabChange = (event: SelectChangeEvent<string>) => {
    setTopFab(event.target.value);
  };

  const handleBottomPartChange = (event: SelectChangeEvent<string>) => {
    setBottomPart(event.target.value);
  };

  const handleBottomFabChange = (event: SelectChangeEvent<string>) => {
    setBottomFab(event.target.value);
  };

  return (
    <>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Students</InputLabel>
          <Select
            value={students}
            onChange={handleStudentsChange}
            label="Students"
            name="students"
          >
            <MenuItem value="girl">Girl</MenuItem>
            <MenuItem value="boy">Boy</MenuItem>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
          {students === "others" && (
            <TextField
              label="Custom Student"
              name="students"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ marginTop: 16 }}
            />
          )}
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Class Ratio</InputLabel>
          <Select
            value={ratio}
            onChange={handleRatioChange}
            label="Class Ratio"
            name="ratio"
          >
            <MenuItem value="class5-8">Class 5 to Class 8</MenuItem>
            <MenuItem value="class9-12">Class 9 to Class 12</MenuItem>
            <MenuItem value="play-4">Play to Class 4</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
          {ratio === "others" && (
            <TextField
              label="Custom Ratio"
              name="ratio"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ marginTop: 16 }}
            />
          )}
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Top Part</InputLabel>
          <Select
            value={topPart}
            onChange={handleTopPartChange}
            label="Top Part"
            name="topPart"
          >
            <MenuItem value="kameez">Kameez</MenuItem>
            <MenuItem value="shirt">Shirt</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
          {topPart === "others" && (
            <TextField
              label="Custom Top Part"
              name="topPart"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ marginTop: 16 }}
            />
          )}
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Top Fabrication</InputLabel>
          <Select
            value={topFab}
            onChange={handleTopFabChange}
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
          {topFab === "others" && (
            <TextField
              label="Custom Top Fabrication"
              name="topFab"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ marginTop: 16 }}
            />
          )}
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Bottom Part</InputLabel>
          <Select
            value={bottomPart}
            onChange={handleBottomPartChange}
            label="Bottom Part"
            name="bottomPart"
          >
            <MenuItem value="pant">Pant</MenuItem>
            <MenuItem value="salwar">Salwar</MenuItem>
            <MenuItem value="skirt">Skirt</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
          {bottomPart === "others" && (
            <TextField
              label="Custom Bottom Part"
              name="bottomPart"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ marginTop: 16 }}
            />
          )}
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Bottom Fabrication</InputLabel>
          <Select
            value={bottomFab}
            onChange={handleBottomFabChange}
            label="Bottom Fabrication"
            name="bottomFab"
          >
            <MenuItem value="hisofy">Hisofy</MenuItem>
            <MenuItem value="otherFab1">Other Fabric 1</MenuItem>
            <MenuItem value="otherFab2">Other Fabric 2</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
          {bottomFab === "others" && (
            <TextField
              label="Custom Bottom Fabrication"
              name="bottomFab"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ marginTop: 16 }}
            />
          )}
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
