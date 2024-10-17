"use client";
import React, { useState, useRef, FormEvent } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Typography,
} from "@mui/material";

type StudentType = "girl" | "boy" | "all";
type RatioType = "class5-8" | "class9-12" | "play-4" | "others";
type PartType = "kameez" | "shirt" | "pant" | "salwar" | "skirt" | "others";
type FabricationType =
  | "35/36"
  | "allexToray"
  | "chinaToray"
  | "presidentToray"
  | "TC"
  | "hisofy"
  | "otherFab1"
  | "otherFab2"
  | "others";

const Custom: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [files, setFiles] = useState<FileList | null>(null);
  const [student, setStudent] = useState<StudentType>("girl");
  const [otherRatio, setOtherRatio] = useState<string>("");
  const [ratio, setRatio] = useState<RatioType>("class5-8");

  const [otherTopPart, setOtherTopPart] = useState<string>("");
  const [topPart, setTopPart] = useState<PartType>("kameez");

  const [otherTopFab, setOtherTopFab] = useState<string>("");
  const [topFab, setTopFab] = useState<FabricationType>("35/36");

  const [otherBottomPart, setOtherBottomPart] = useState<string>("");
  const [bottomPart, setBottomPart] = useState<PartType>("pant");

  const [otherBottomFab, setOtherBottomFab] = useState<string>("");
  const [bottomFab, setBottomFab] = useState<FabricationType>("hisofy");

  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const MySwal = withReactContent(Swal);

  const validateField = (value: string, fieldName: string): boolean => {
    if (!value.trim()) {
      MySwal.fire("Validation Error", `${fieldName} is required.`, "error");
      return false;
    }
    return true;
  };

  const handleModal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !validateField(name, "Name") ||
      !validateField(email, "Email") ||
      !validateField(number, "Number") ||
      !validateField(address, "Address")
    ) {
      return;
    }

    try {
      const details: {
        url: string; // Assuming the server will handle saving the file and returning the actual URL
        fileType: string;
      }[] = [];

      // Handle file uploads
      if (files) {
        Array.from(files).forEach((file) => {
          details.push({
            url: file.name, // Assuming the server will handle saving the file and returning the actual URL
            fileType: file.type,
          });
        });
      }


      const data = {
        name,
        number,
        email,
        students: student,
        ratio: ratio === "others" ? otherRatio.trim() : ratio,
        topPart: topPart === "others" ? otherTopPart.trim() : topPart,
        topFab: topFab === "others" ? otherTopFab.trim() : topFab,
        bottomPart:
          bottomPart === "others" ? otherBottomPart.trim() : bottomPart,
        bottomFab: bottomFab === "others" ? otherBottomFab.trim() : bottomFab,
        address,
        quantity: parseInt(quantity, 10),
        details,
      };

      // Send data to the server
      await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/v1/advance`, data);

      MySwal.fire("Good job!", "Successfully added", "success");
      formRef.current?.reset();
    } catch (err: any) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "Validation Error"
      ) {
        const validationDetails = err.response.data.details;
        MySwal.fire("Validation Error", validationDetails[0], "error");
      } else {
        MySwal.fire("Something went wrong.", "warning");
      }
    }
  };

  return (
    <Box className="py-32">
      <Box className="container mx-auto">
        <Box className="text-center mb-8">
          <Typography variant="h4" className="font-bold">
            Custom Details
          </Typography>
        </Box>
        <Box component="form" ref={formRef} onSubmit={handleModal}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Students</InputLabel>
                <Select<StudentType>
                  value={student}
                  onChange={(e) => setStudent(e.target.value as StudentType)}
                  label="Students"
                >
                  <MenuItem value="girl">Girl</MenuItem>
                  <MenuItem value="boy">Boy</MenuItem>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Class Ratio</InputLabel>
                <Select<RatioType>
                  value={ratio}
                  onChange={(e) => setRatio(e.target.value as RatioType)}
                  label="Class Ratio"
                >
                  <MenuItem value="class5-8">Class 5 to Class 8</MenuItem>
                  <MenuItem value="class9-12">Class 9 to Class 12</MenuItem>
                  <MenuItem value="play-4">Play to Class 4</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
              {ratio === "others" && (
                <TextField
                  className="mt-4"
                  label="Other Ratio"
                  value={otherRatio}
                  onChange={(e) => setOtherRatio(e.target.value)}
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Top Part</InputLabel>
                <Select<PartType>
                  value={topPart}
                  onChange={(e) => setTopPart(e.target.value as PartType)}
                  label="Top Part"
                >
                  <MenuItem value="kameez">Kameez</MenuItem>
                  <MenuItem value="shirt">Shirt</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
              {topPart === "others" && (
                <TextField
                  className="mt-4"
                  label="Other Top Part"
                  value={otherTopPart}
                  onChange={(e) => setOtherTopPart(e.target.value)}
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Top Fabrication</InputLabel>
                <Select<FabricationType>
                  value={topFab}
                  onChange={(e) => setTopFab(e.target.value as FabricationType)}
                  label="Top Fabrication"
                >
                  <MenuItem value="35/36">35/36</MenuItem>
                  <MenuItem value="allexToray">Alex Toray</MenuItem>
                  <MenuItem value="chinaToray">China Toray</MenuItem>
                  <MenuItem value="presidentToray">President Toray</MenuItem>
                  <MenuItem value="TC">TC</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
              {topFab === "others" && (
                <TextField
                  className="mt-4"
                  label="Other Top Fabrication"
                  value={otherTopFab}
                  onChange={(e) => setOtherTopFab(e.target.value)}
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Bottom Part</InputLabel>
                <Select<PartType>
                  value={bottomPart}
                  onChange={(e) => setBottomPart(e.target.value as PartType)}
                  label="Bottom Part"
                >
                  <MenuItem value="pant">Pant</MenuItem>
                  <MenuItem value="salwar">Salwar</MenuItem>
                  <MenuItem value="skirt">Skirt</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
              {bottomPart === "others" && (
                <TextField
                  className="mt-4"
                  label="Other Bottom Part"
                  value={otherBottomPart}
                  onChange={(e) => setOtherBottomPart(e.target.value)}
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Bottom Fabrication</InputLabel>
                <Select<FabricationType>
                  value={bottomFab}
                  onChange={(e) =>
                    setBottomFab(e.target.value as FabricationType)
                  }
                  label="Bottom Fabrication"
                >
                  <MenuItem value="hisofy">Hisofy</MenuItem>
                  <MenuItem value="otherFab1">Other Fabric 1</MenuItem>
                  <MenuItem value="otherFab2">Other Fabric 2</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
              {bottomFab === "others" && (
                <TextField
                  className="mt-4"
                  label="Other Bottom Fabrication"
                  value={otherBottomFab}
                  onChange={(e) => setOtherBottomFab(e.target.value)}
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Files
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Custom;
