"use client";
import * as React from "react";
import Image from "next/image";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSnackbar } from "@/services/contexts/useSnackbar";
import { School } from "@/services/types/types";

interface MeasuremenDetailsProps {
  params: {
    id: string;
  };
}
const MeasuremenDetails = ({ params: { id } }: MeasuremenDetailsProps) => {
  const [data, setData] = React.useState<School | null>(null);
  const [selectedOption, setSelectedOption] = React.useState("shirtHalf");

  const fetchData = async () => {
    try {
      const response = await axios.get<School>(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/schools/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setData(null);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [id]);

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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }}>
          {data &&
            data.photos.map((school, index) => (
              <Box
                className="border-radius-lg overflow-hidden my-10"
                key={index}
              >
                <Image
                  src={school.src}
                  alt={school.title}
                  width={450}
                  height={450}
                  className="object-cover"
                />
              </Box>
            ))}
        </Grid>
        {data?.id}
      </Grid>
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
              />
            </FormControl>
          </Grid>
        </Grid>
        <div className="flex justify-end mt-6">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
};
export default MeasuremenDetails;
