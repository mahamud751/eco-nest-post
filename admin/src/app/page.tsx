"use client";
import { Grid } from "@mui/material";
import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LatestProduct from "@/components/pageComponents/Home/LatestProduct";
import UseFetch from "@/services/hooks/UseRequest";
import { Advance, GrandPrice, Order } from "@/services/types";
import LatestOrders from "@/components/pageComponents/Home/LatestOrders";
const page = () => {
  const { total: orderTotal } = UseFetch<Order>(`orders`);
  const { data: totalGrandPrice } = UseFetch<GrandPrice>(
    `orders/totalGrandPrice`
  );

  const { total: customOrder } = UseFetch<Advance>(`advance`);
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
                <p className="fs-5 text-[20px]">Total Ecommerce Orders</p>
                <p className="fw-bold text-[14px]">{orderTotal}</p>
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
                <p className="fs-5 text-[20px]">Ecommerce Order Amount</p>
                <p className="fw-bold text-[14px]">
                  ৳ {totalGrandPrice?.data?.totalGrandPrice}
                </p>
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
                <p className="fs-5 text-[20px]">Total Custom Orders</p>
                <p className="fw-bold text-[14px]">৳ {customOrder}</p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LatestProduct />
        </Grid>
        <Grid item xs={6}>
          <LatestOrders />
        </Grid>
      </Grid>
    </>
  );
};

export default page;
