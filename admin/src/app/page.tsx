import { Grid } from "@mui/material";
import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
const page = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="bg-[#35b0a7] rounded-[15px] p-5">
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 w-20">
                <TrendingUpIcon className="text-white" fontSize="large" />
              </div>

              <div className="ms-3 text-white">
                <p className="fs-5">Total Schools</p>
                <p className="fw-bold">Schools</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="bg-[#8e44ad] rounded-[15px] p-5">
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 w-20">
                <TrendingUpIcon className="text-white" fontSize="large" />
              </div>

              <div className="ms-3 text-white">
                <p className="fs-5">Total Schools</p>
                <p className="fw-bold">Schools</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="bg-[#E55A7E] rounded-[15px] p-5">
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 w-20">
                <TrendingUpIcon className="text-white" fontSize="large" />
              </div>

              <div className="ms-3 text-white">
                <p className="fs-5">Total Schools</p>
                <p className="fw-bold">Schools</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          s
        </Grid>
      </Grid>
    </>
  );
};

export default page;
