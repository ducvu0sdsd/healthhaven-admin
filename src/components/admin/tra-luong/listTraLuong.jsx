import { adminContext } from "@/context/adminContext";
import {
  globalContext,
  notifyType,
} from "@/context/globalContext";
import { TypeHTTP, api } from "@/utils/api";
import {
  chuyen_doi_tien_VND,
  convertISODateToString,
} from "@/utils/others";
import { ports } from "@/utils/routes";
import React, { useContext } from "react";

const ListTraLuong = ({ payments }) => {
  const { globalHandler } = useContext(globalContext);
  const { adminHandler } = useContext(adminContext);

  const handleAccept = (appointment) => {
    globalHandler.notify(
      notifyType.LOADING,
      "Đang xử lý yêu cầu"
    );
    const currentDate = new Date();
    const vietnamTimeOffset = 7 * 60; // GMT+7 in minutes
    const localTimeOffset = currentDate.getTimezoneOffset(); // Local timezone offset in minutes
    const vietnamTime = new Date(
      currentDate.getTime() +
        (vietnamTimeOffset + localTimeOffset) * 60000
    );
    const time = {
      day: vietnamTime.getDate(),
      month: vietnamTime.getMonth() + 1,
      year: vietnamTime.getFullYear(),
      time: `${vietnamTime.getHours()}:${vietnamTime.getMinutes()}`,
    };
    api({
      path: "/payments/pay-for-doctor",
      type: TypeHTTP.POST,
      body: {
        _id: appointment._id,
        status_take_money: {
          type: "ACCEPT",
          messages: "Đã chấp nhận yêu cầu",
        },
        dateTake: time,
        descriptionTake:
          "Chấp nhận yêu cầu nhận tiền của bác sĩ",
      },

      sendToken: true,
    }).then((res) => {
      api({
        path: "/payBacks/accept-status",
        type: TypeHTTP.POST,
        body: {
          doctor_id: appointment.doctor?._id,
          status_type: "REQUEST",
          status: {
            type: "ACCEPT",
            messages: "Đã đồng ý",
          },
        },

        sendToken: true,
      }).then((res2) => {
        globalHandler.notify(
          notifyType.SUCCESS,
          "Đã chấp nhận yêu cầu rút tiền thành công!!!"
        );
      });
    });
  };
  const handleComplete = (appointment) => {
    globalHandler.notify(
      notifyType.LOADING,
      "Đang xử lý yêu cầu"
    );
    const currentDate = new Date();
    const vietnamTimeOffset = 7 * 60; // GMT+7 in minutes
    const localTimeOffset = currentDate.getTimezoneOffset(); // Local timezone offset in minutes
    const vietnamTime = new Date(
      currentDate.getTime() +
        (vietnamTimeOffset + localTimeOffset) * 60000
    );
    const time = {
      day: vietnamTime.getDate(),
      month: vietnamTime.getMonth() + 1,
      year: vietnamTime.getFullYear(),
      time: `${vietnamTime.getHours()}:${vietnamTime.getMinutes()}`,
    };
    api({
      path: "/payments/pay-for-doctor",
      type: TypeHTTP.POST,
      body: {
        _id: appointment._id,
        status_take_money: {
          type: "RESOLVED",
          messages: "Tiền đã được gửi",
        },
        dateTake: time,
        beneficiaryAccount: appointment.doctor?.bank,
        descriptionTake: `MB0834885704 đã gửi lương đến BS${appointment.doctor?._id}. Ngày ${time.day}/${time.month}/${time.year} lúc ${time.time}`,
      },

      sendToken: true,
    }).then((res) => {
      api({
        path: "/payBacks/complete-status",
        type: TypeHTTP.POST,
        body: {
          doctor_id: appointment.doctor?._id,
          status_type: "ACCEPT",
          status: {
            type: "COMPLETE",
            messages: "Đã hoàn thành",
          },
        },

        sendToken: true,
      }).then((res2) => {
        globalHandler.notify(
          notifyType.SUCCESS,
          "Yêu cầu đã được hoàn thành!!!"
        );
      });
    });
  };
  const handleRefuse = (appointment) => {
    globalHandler.notify(
      notifyType.LOADING,
      "Đang xử lý yêu cầu"
    );
    const currentDate = new Date();
    const vietnamTimeOffset = 7 * 60; // GMT+7 in minutes
    const localTimeOffset = currentDate.getTimezoneOffset(); // Local timezone offset in minutes
    const vietnamTime = new Date(
      currentDate.getTime() +
        (vietnamTimeOffset + localTimeOffset) * 60000
    );
    const time = {
      day: vietnamTime.getDate(),
      month: vietnamTime.getMonth() + 1,
      year: vietnamTime.getFullYear(),
      time: `${vietnamTime.getHours()}:${vietnamTime.getMinutes()}`,
    };
    api({
      path: "/payments/pay-for-doctor",
      type: TypeHTTP.POST,
      body: {
        _id: appointment._id,
        status_take_money: {
          type: "REJECTED",
          messages: "Từ chối yêu cầu",
        },
        dateTake: time,
        beneficiaryAccount: appointment.doctor?.bank,
        descriptionTake:
          "Yêu cầu nhận tiền của bác sĩ đã bị từ chối!!!",
      },

      sendToken: true,
    }).then((res) => {
      api({
        path: "/payBacks/refuse-status",
        type: TypeHTTP.POST,
        body: {
          doctor_id: appointment.doctor?._id,
          status_type: "REQUEST",
          status: {
            type: "REFUSE",
            messages: "Đã từ chối",
          },
        },

        sendToken: true,
      }).then((res2) => {
        globalHandler.notify(
          notifyType.SUCCESS,
          "Yêu cầu đã bị từ chối!!!"
        );
      });
    });
  };
  return (
    <div className="w-full h-[90%] overflow-auto mt-2">
      <div className="flex">
        <select
          // onChange={(e) => setTicketType(e.target.value)}
          className="px-4 py-2 text-[15px] shadow-lg text-start focus:outline-0 rounded-md font-medium bg-gray-100 "
        >
          <option value={1}>Tất cả</option>
          <option value={2}>Đã xử lý</option>
          <option value={3}>Chưa xử lý</option>
        </select>
      </div>
      <table className="text-sm w-[100%] text-[15px] text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-2">
        <thead className="sticky top-0 left-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-[15%]">
              Bác sĩ
            </th>

            <th scope="col" className="px-6 py-3 w-[10%]">
              Số tiền
            </th>
            <th scope="col" className="px-6 py-3 w-[15%]">
              Thời Gian
            </th>
            <th scope="col" className="px-6 py-3 w-[15%]">
              Mô tả
            </th>
            <th scope="col" className="px-6 py-3 w-[15%]">
              Ngân hàng
            </th>
            <th scope="col" className="px-6 py-3 w-[16%]">
              Trạng Thái
            </th>
            <th scope="col" className="px-6 py-3 w-[15%]">
              Các Thao Tác
            </th>
          </tr>
        </thead>
        <tbody className=" bg-black">
          {payments.map((appointment, index) => (
            <tr
              key={index}
              className="odd:bg-white text-[13px] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4 ">
                BS. {appointment.doctor?.fullName}
              </td>
              <td className="px-6 py-4">
                {chuyen_doi_tien_VND(appointment.price)}
              </td>
              <td className="px-6 py-4">
                {appointment.dateTake?.time}-
                {appointment.dateTake?.day}/
                {appointment.dateTake?.month}/
                {appointment.dateTake?.year}
              </td>

              <td className="px-6 py-4">
                {appointment.descriptionTake}
              </td>
              <td className="px-6 py-4">
                {appointment.doctor?.bank?.bankName}
                {appointment.doctor?.bank?.accountNumber}-
                {appointment.doctor?.bank?.accountName}
              </td>
              <td
                className="px-6 py-4"
                style={{
                  color:
                    appointment.status_take_money?.type ===
                    "RESOLVED"
                      ? "blue"
                      : appointment.status_take_money
                          ?.type === "ACCEPT"
                      ? "green"
                      : appointment.status_take_money
                          ?.type === "PENDING"
                      ? "black"
                      : "red",
                }}
              >
                {appointment.status_take_money?.messages}
              </td>
              <td className="px-6 py-4 flex items-center gap-1">
                {appointment.status_take_money?.type ===
                  "PENDING" && (
                  <>
                    <button
                      onClick={() =>
                        handleAccept(appointment)
                      }
                      className="px-2 py-1 rounded-md text-[12px] bg-[blue] text-white"
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={() =>
                        handleRefuse(appointment)
                      }
                      className="px-2 py-1 rounded-md text-[12px] bg-[#ef2b2b] text-white"
                    >
                      Từ chối
                    </button>
                  </>
                )}
                {appointment.status_take_money?.type ===
                  "ACCEPT" && (
                  <>
                    <button
                      onClick={() =>
                        handleComplete(appointment)
                      }
                      className="px-2 py-1 rounded-md text-[12px] bg-[blue] text-white"
                    >
                      Hoàn thành
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTraLuong;
