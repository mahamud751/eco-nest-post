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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/schools/${id}`
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
      total: parseFloat(formData.get("total") as string),
      category: formData.get("category"),
      height: parseFloat(formData.get("height") as string),
      shoulder: parseFloat(formData.get("shoulder") as string),
      sleeveLength: parseFloat(formData.get("sleeveLength") as string),
      collar: parseFloat(formData.get("collar") as string),
      length: parseFloat(formData.get("length") as string),
      armhole: parseFloat(formData.get("armhole") as string),
      sleeveOpening: parseFloat(formData.get("sleeveOpening") as string),
      halfBody: parseFloat(formData.get("halfBody") as string),
      bottomHem: parseFloat(formData.get("bottomHem") as string),
      hips: parseFloat(formData.get("hips") as string),
      waist: parseFloat(formData.get("waist") as string),
    };

    try {
      const data = {
        ...orderData,
        schoolId: id,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/students`,
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
      openSnackbar("Measurement Addes successfully!", "success", "#4caf50");
    } catch (error) {
      openSnackbar("Failed to place order!", "error", "#f44336");
    }
  };
  return (
    <Box className="container my-12 mx-auto px-2 md:px-4" sx={{ flexGrow: 1 }}>
      <div className="text-center">
        <h2 className="mb-5 px-6 text-3xl font-bold">{data?.name}</h2>
        <div className="flex justify-center">
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
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl variant="outlined" fullWidth>
              <FormHelperText id="outlined-weight-helper-text">
                আপনার নাম? Student Name
              </FormHelperText>
              <OutlinedInput
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "name",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "class",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "mobile",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "total",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "height",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "chest",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "length",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "shoulder",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "sleeveLength",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "collar",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "armhole",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "sleeveOpening",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "waist",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "hips",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "bottomHem",
                  type: "number",
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
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "halfBody",
                  type: "number",
                }}
                name="halfBody"
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
