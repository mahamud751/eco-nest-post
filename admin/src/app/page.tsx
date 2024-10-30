"use client";
import { Grid, Paper } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import UseFetch from "@/services/hooks/UseRequest";
import { Advance, GrandPrice, Order, School, Student } from "@/services/types";
import LatestOrders from "@/components/pageComponents/Home/LatestOrders";
import LatestProducts from "@/components/pageComponents/Home/LatestProducts";
import LottieAnimation from "@/components/dynamics/animations/LottieAnimation";
import SchoolAnimation from "@/components/dynamics/animations/SchoolAnimation";
import TotalEcommerceAnimation from "@/components/dynamics/animations/TotalEcommerceAnimation";
import TotalCustomOrderAnimation from "@/components/dynamics/animations/TotalCustomOrderAnimation";
import TotalAmountAnimation from "@/components/dynamics/animations/TotalAmountAnimation";
import GreenBarAnimation from "@/components/dynamics/animations/GreenBarAnimation";
import DeliveryAnimation from "@/components/dynamics/animations/DeliveryAnimation";
import DeliveryVanAnimation from "@/components/dynamics/animations/DeliveryVanAnimation";
import OrderAnimation from "@/components/dynamics/animations/OrderAnimation";
import LatestProduct from "@/components/pageComponents/Home/LatestProduct";

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
    data?.data?.filter(
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
                ? "from-[#181818] to-[#218f87]"
                : "from-[#111111] to-[#218f87]"
            }`}
          >
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <TotalEcommerceAnimation />
              </div>
              <div className="flex items-center justify-center ms-3 text-white">
                <div>
                  <p className="fs-5 text-[20px]">Total Ecommerce Orders</p>
                  <p className="fw-bold text-[14px]">{orderTotal}</p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#121112] to-[#a449cb]"
                : "from-[#0e0e0e] to-[#a83bc8]"
            }`}
          >
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <TotalAmountAnimation />
              </div>
              <div className="flex items-center justify-center ms-3 text-white">
                <div>
                  <p className="fs-5 text-[20px]">Ecommerce Order Amount</p>
                  <p className="fw-bold text-[14px]">
                    ৳ {totalGrandPrice?.data?.totalGrandPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#020202] to-[#4e4f5d]"
                : "from-[#111111] to-[#474773]"
            }`}
          >
            <div className="flex py-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <GreenBarAnimation />
              </div>

              <div className="flex items-center ms-3 text-white">
                {" "}
                <div>
                  <p className="fs-5 text-[20px]">Total Custom Orders</p>
                  <p className="fw-bold text-[14px]">{customOrder}</p>
                </div>
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
                ? "from-[#181818] to-[#d94b4b]"
                : "from-[#080808] to-[#ec4646]"
            }`}
          >
            <div className="flex py-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <SchoolAnimation />
              </div>
              <div className="flex items-center ms-3 text-white">
                <div>
                  <p className="fs-5 text-[20px]">Total Schools</p>
                  <p className="fw-bold text-[14px]">{totalSchool}</p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#0c0c0c] to-[#80dc5c]"
                : "from-[#121111] to-[#7ad758]"
            }`}
          >
            <div className="flex py-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <DeliveryAnimation />
              </div>
              <div className="flex items-center ms-3 text-white">
                <div>
                  <p className="fs-5 text-[20px]">Total Measurements</p>
                  <p className="fw-bold text-[14px]">{totalStudents}</p>
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <div
            className={`rounded-[15px] p-5 bg-gradient-to-r ${
              theme.palette.mode === "dark"
                ? "from-[#171717] to-[#5371eb]"
                : "from-[#040404] to-[#165fb8]"
            }`}
          >
            <div className="flex py-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 ">
                <OrderAnimation />
              </div>
              <div className="flex items-center ms-3 text-white">
                <div>
                  <p className="fs-5 text-[20px]">
                    Total Delivery Measurements
                  </p>
                  <p className="fw-bold text-[14px]">{delivery?.length}</p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="flex items-center justify-center text-white">
        <TotalCustomOrderAnimation />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper elevation={2} className="shadow-lg">
            <LatestProduct />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={2} className="shadow-lg">
            <LatestOrders />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
