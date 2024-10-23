"use client";
import { Grid } from "@mui/material";
import React from "react";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import { useTheme } from "@mui/material/styles";
import LatestProduct from "@/components/pageComponents/Home/LatestProduct";
import UseFetch from "@/services/hooks/UseRequest";
import { Advance, GrandPrice, Order, School, Student } from "@/services/types";
import LatestOrders from "@/components/pageComponents/Home/LatestOrders";

const Page = () => {
  const { total: orderTotal } = UseFetch<Order>(`orders`);
  const { data: totalGrandPrice } = UseFetch<GrandPrice>(
    `orders/totalGrandPrice`
  );
  const { total: customOrder } = UseFetch<Advance>(`advance`);
  const { data, total: totalSchool } = UseFetch<School>(`schools`);
  const { total: totalStudents } = UseFetch<Student>(`students`);
  const delivery =
    data &&
    data.data.filter(
      (school: { status: string }) => school.status === "delivered"
    );

  const theme = useTheme();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#2d7f7a] to-[#35b0a7]"
                : "from-[#35b0a7] to-[#2d7f7a]"
            }`}
          >
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 w-20">
                <SignalCellularAltOutlinedIcon
                  className="text-white"
                  fontSize="large"
                />
              </div>
              <div className="ms-3 text-white">
                <p className="fs-5 text-[20px]">Total Ecommerce Orders</p>
                <p className="fw-bold text-[14px]">{orderTotal}</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#6b2c7e] to-[#8e44ad]"
                : "from-[#8e44ad] to-[#6b2c7e]"
            }`}
          >
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 w-20">
                <TimelineOutlinedIcon className="text-white" fontSize="large" />
              </div>
              <div className="ms-3 text-white">
                <p className="fs-5 text-[20px]">Ecommerce Order Amount</p>
                <p className="fw-bold text-[14px]">
                  ৳ {totalGrandPrice?.data?.totalGrandPrice}
                </p>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#b94768] to-[#E55A7E]"
                : "from-[#E55A7E] to-[#b94768]"
            }`}
          >
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 w-20">
                <InsightsOutlinedIcon className="text-white" fontSize="large" />
              </div>
              <div className="ms-3 text-white">
                <p className="fs-5 text-[20px]">Total Custom Orders</p>
                <p className="fw-bold text-[14px]">{customOrder}</p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#2d477f] to-[#5035b0]"
                : "from-[#3537b0] to-[#2d537f]"
            }`}
          >
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 w-20">
                <SignalCellularAltOutlinedIcon
                  className="text-white"
                  fontSize="large"
                />
              </div>
              <div className="ms-3 text-white">
                <p className="fs-5 text-[20px]">Total Schools</p>
                <p className="fw-bold text-[14px]">{totalSchool}</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#ce5e4f] to-[#b06a6a]"
                : "from-[#ce5b5b] to-[#c37a75]"
            }`}
          >
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 w-20">
                <TimelineOutlinedIcon className="text-white" fontSize="large" />
              </div>
              <div className="ms-3 text-white">
                <p className="fs-5 text-[20px]">Total Measurements</p>
                <p className="fw-bold text-[14px]">{totalStudents}</p>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#171717] to-[#302e2e]"
                : "from-[#040404] to-[#4f4e4e]"
            }`}
          >
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(239,232,232,0.2)] rounded-full p-5 w-20">
                <InsightsOutlinedIcon className="text-white" fontSize="large" />
              </div>
              <div className="ms-3 text-white">
                <p className="fs-5 text-[20px]">Total Delivery Measurements</p>
                <p className="fw-bold text-[14px]">{delivery?.length}</p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LatestProduct />
        </Grid>
        <Grid item xs={12} md={6}>
          <LatestOrders />
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
