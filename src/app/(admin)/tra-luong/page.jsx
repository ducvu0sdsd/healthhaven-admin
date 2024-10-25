"use client";
import ListTraLuong from "@/components/admin/tra-luong/listTraLuong";
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

const TraLuongManagement = () => {
  const [dsPayment, setDsPayment] = useState([]);
  const { adminData, adminHandler } =
    useContext(adminContext);
  const { globalHandler } = useContext(globalContext);

  useEffect(() => {
    api({
      path: "/payments/get-all",
      sendToken: true,
      type: TypeHTTP.GET,
    }).then((res) => {
      setDsPayment(
        res.filter(
          (payment) => payment.namePayment === "PAYBACK"
        )
      );
    });
  }, []);

  return (
    <section className="h-screen w-full flex z-0">
      <Navbar />
      <div className="w-full h-screen relative pl-[20px] pb-[10px] flex flex-col gap-3">
        <Header
          image={"/calendar.png"}
          text={"Quản Lý Nhận Tiền"}
        />
        <ListTraLuong payments={dsPayment} />
        {/* <button onClick={() => adminHandler.showCreateTraLuongForm()} className='fixed px-4 py-1 rounded-md top-4 right-3 text-[14px] bg-[green] text-[white]'>+ Thêm Bác Sĩ</button> */}
      </div>
    </section>
  );
};

export default TraLuongManagement;
