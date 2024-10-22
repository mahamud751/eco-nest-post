"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSnackbar } from "@/services/contexts/useSnackbar";
import UseFetch from "@/services/hooks/useFetch";
import { School } from "@/services/types/types";

interface MeasuremenDetailsProps {
  params: {
    id: string;
  };
}
const MeasuremenDetails = ({ params: { id } }: MeasuremenDetailsProps) => {
  const { data: schools } = UseFetch<School[]>(`schools/${id}`);
  const [selectedOption, setSelectedOption] = React.useState("shirtHalf");

  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };
  const { openSnackbar } = useSnackbar();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const orderData = {
      name: formData.get("name"),
      class: formData.get("class"),
      mobile: formData.get("mobile"),
      total: formData.get("total"),
      category: formData.get("category"),
      height: formData.get("height"),
      shoulder: formData.get("shoulder"),
      sleeveLength: formData.get("sleeveLength"),
      collar: formData.get("collar"),
      length: formData.get("length"),
      armhole: formData.get("armhole"),
      sleeveOpening: formData.get("sleeveOpening"),
      halfBody: formData.get("halfBody"),
      bottomHem: formData.get("bottomHem"),
      hips: formData.get("hips"),
    };

    try {
      const data = {
        ...orderData,
        schoolId: id,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      openSnackbar("Vendor Addes successfully!", "success", "#4caf50");
    } catch (error) {
      console.error("Error placing order:", error);
      openSnackbar("Failed to place order!", "error", "#f44336");
    }
  };
  return (
    <Box className="container my-12 mx-auto px-2 md:px-4" sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                আপনার নাম? Student Name
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="name"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                আপনি কোন শ্রেণির শিক্ষার্থী? Class Name
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="class"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                আপনার অভিভাবক বা আপনার মোবাইল নাম্বার এইখানে দিন।
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="mobile"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                আপনার কত সেট ইউনিফর্ম লাগবে?
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="total"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-select-helper-text">
                Select an option
              </FormHelperText>
              <Select
                labelId="outlined-select-helper-text"
                id="outlined-select"
                value={selectedOption}
                onChange={handleSelectChange}
                name="category"
              >
                <MenuItem selected value={"shirtHalf"}>
                  {" "}
                  Shirt Slim Fit(Half Sleeve)
                </MenuItem>
                <MenuItem value={"shirtRegular"}>Shirt Regular Fit</MenuItem>
                <MenuItem value={"frock"}>Frock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Height
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="height"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Height
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="height"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                ফিটিং এ একুরেট যা আসে সেটাই এইখানে দিবেন। Chest/ Width
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="chest"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Length
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="length"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Shoulder
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="shoulder"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Sleeve Length
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="sleeveLength"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Collar
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="collar"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Arm Hole
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="armhole"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Sleeve Open
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="sleeveOpening"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                আপনার কোমরের মা্প কত ইঞ্চি? Waist
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="waist"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Hips
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="hips"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Bottom Hem
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="bottomHem"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                Half Body
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                name="halfBody"
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
export default MeasuremenDetails;
