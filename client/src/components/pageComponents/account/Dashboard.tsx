"use client";
import { Grid2 as Grid } from "@mui/material";
import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import UseFetch from "@/services/hooks/useFetch";
import { Order } from "@/services/types/types";
import { useAuth } from "@/services/hooks/auth";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: orders, total: orderTotal } = user
    ? UseFetch<Order[]>(`orders/myBooking?email=${user.email}`)
    : { data: [], total: 0 };

  const pendingOrdersCount = Array.isArray(orders)
    ? orders.filter((order) => order.status === "PENDING").length
    : 0;
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <div className="bg-[#b5f6f1] rounded-[15px] p-5">
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-full p-5 w-20">
                <TrendingUpIcon fontSize="large" />
              </div>

              <div className="ms-3">
                <p className="fs-5 text-[20px]">Total Orders</p>
                <p className="fw-bold text-[14px]">{orderTotal}</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <div className="bg-[#000000] rounded-[15px] p-5">
            <div className="flex p-3">
              <div className="flex justify-center items-center bg-[rgba(255,247,247,0.2)] rounded-full p-5 w-20">
                <TrendingUpIcon className="text-white" fontSize="large" />
              </div>

              <div className="ms-3 text-white">
                <p className="fs-5 text-[20px]">Pending Orders</p>
                <p className="fw-bold text-[14px]">{pendingOrdersCount}</p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
