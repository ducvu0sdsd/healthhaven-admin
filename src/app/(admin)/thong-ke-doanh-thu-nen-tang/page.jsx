"use client";

import HenKham from "@/components/admin/thong-ke-doanh-thu/HenKham";
import HenKhamTaiNha from "@/components/admin/thong-ke-doanh-thu/HenKhamTaiNha";
import TheoDoiSucKhoe from "@/components/admin/thong-ke-doanh-thu/TheoDoiSucKhoe";
import Header from "@/components/header";
import Navbar from "@/components/menu/navbar";
import { adminContext } from "@/context/adminContext";
import { globalContext } from "@/context/globalContext";
import { TypeHTTP, api } from "@/utils/api";
import { ports } from "@/utils/routes";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
const ThongKeManagement = () => {
  const { adminData, adminHandler } =
    useContext(adminContext);
  const { globalHandler } = useContext(globalContext);
  const [type, setType] = useState("1");
  const [ticketType, setTicketType] = useState("1");

  // useEffect(() => {
  //   api({
  //     sendToken: false,
  //     path: "/appointments/getAll",
  //     type: TypeHTTP.GET,
  //   }).then((res) => setAppointments(res));
  //   api({
  //     sendToken: true,
  //     path: "/appointmentHomes/getAll",
  //     type: TypeHTTP.GET,
  //   }).then((res) => setAppointmentHomes(res));
  //   api({
  //     sendToken: true,
  //     path: "/healthLogBooks/get-all",
  //     type: TypeHTTP.GET,
  //   }).then((res) => setLogBooks(res));
  // }, []);
  return (
    <section className="h-screen w-full flex z-0">
      <Navbar />
      <div className="w-full min-h-screen relative pl-[20px] pb-[10px] flex flex-col gap-3">
        <Header
          image={"/calendar.png"}
          text={"Thống kê doanh thu"}
        />
        <div className="flex gap-3 w-full">
          <select
            onChange={(e) => setTicketType(e.target.value)}
            className="px-2 py-2 text-[15px] shadow-lg text-center focus:outline-0 rounded-md font-medium"
          >
            <option value={1}>
              Doanh Thu Đăng Ký Hẹn Khám
            </option>
            <option value={2}>
              Doanh Thu Hẹn Khám Tại Nhà
            </option>
            <option value={3}>
              Doanh Thu Theo Dõi Sức Khỏe
            </option>
          </select>
          <select
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 text-[15px] shadow-lg focus:outline-0 rounded-md font-medium"
          >
            <option value={1}>Tất cả</option>
            <option value={2}>Tuần này</option>
            <option value={3}>Tháng Này</option>
            <option value={4}>Năm này</option>
          </select>
        </div>
        {ticketType === "1" ? (
          <HenKham type={type} setType={setType} />
        ) : ticketType === "2" ? (
          <HenKhamTaiNha type={type} setType={setType} />
        ) : (
          <TheoDoiSucKhoe type={type} setType={setType} />
        )}
        {/* : ticketType === "2" ? (
          <TheoDoiSucKhoe type={type} setType={setType} />
        ) : (
          <HenKhamTaiNha type={type} setType={setType} />
        )} */}
      </div>
    </section>
  );
};

export default ThongKeManagement;
