"use client";
import ListCuocHen from "@/components/admin/cuoc-hen-bi-huy/listCuocHen";
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

const CuocHenBiHuyManagement = () => {
  const { adminData, adminHandler } =
    useContext(adminContext);
  const { globalHandler } = useContext(globalContext);
  const [dsCuocHen, setDsCuocHen] = useState([]);
  const [doctorRecords, setDoctorRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    api({
      path: "/appointments/getAll",
      sendToken: false,
      type: TypeHTTP.GET,
    }).then((res) => {
      setDsCuocHen(
        res.filter(
          (item) =>
            item.status === "REJECTED" ||
            item.status === "CANCELED"
        )
      );
    });
    api({
      path: "/payments/get-all",
      sendToken: true,
      type: TypeHTTP.GET,
    }).then((res) => {
      setPayments(res);
    });
    // api({
    //   path: "/auth/all/patient",
    //   type: TypeHTTP.GET,
    //   sendToken: true,
    // }).then((res) => {
    //   setPatients(res);
    // });
  }, []);

  return (
    <section className="h-screen w-full flex z-0">
      <Navbar />
      <div className="w-full h-screen relative pl-[20px] pb-[10px] flex flex-col gap-3">
        <Header
          image={"/calendar.png"}
          text={"Lịch Hẹn Bị Hủy"}
        />
        <ListCuocHen
          dsCuocHen={dsCuocHen}
          payments={payments}
        />
      </div>
    </section>
  );
};

export default CuocHenBiHuyManagement;
