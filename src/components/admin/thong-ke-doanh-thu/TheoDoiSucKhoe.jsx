import { api, TypeHTTP } from "@/utils/api";
import {
  convertDateToDayMonthYearTimeObject,
  convertDateToDayMonthYearVietNam,
} from "@/utils/date";
import { formatMoney, returnNumber } from "@/utils/others";
import { Chart } from "chart.js/auto";

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
const TheoDoiSucKhoe = ({ type, setType }) => {
  const [logBooks, setLogBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const chartRef = useRef(null);
  const [sumLogBook, setSumLogBook] = useState([]);
  const [sumLogBookWeek, setSumLogBookWeek] = useState([]);
  const [sumLogBookMonth, setSumLogBookMonth] = useState(
    []
  );
  const [sumLogBookYear, setSumLogBookYear] = useState([]);
  const typeTime = {
    1: "tổng",
    2: "tuần này",
    3: "tháng này",
    4: "năm này",
  };
  useEffect(() => {
    if (chartRef.current && logBooks) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      // Tạo đối tượng để lưu trữ số lượng lịch đặt hẹn cho mỗi ngày
      const logBookCount = {};
      const logBookPrice = {};
      // Duyệt qua danh sách appointments và cập nhật đối tượng
      logBooks.forEach((item) => {
        const date = `${item.date.day}/${item.date.month}/${item.date.year}`;
        if (logBookCount[date]) {
          logBookCount[date]++;
          logBookPrice[date] += item.priceList.price;
        } else {
          logBookCount[date] = 1;
          logBookPrice[date] = item.priceList.price;
        }
      });

      // Chuyển đổi đối tượng thành mảng để sử dụng trong biểu đồ
      const labels = Object.keys(logBookCount);
      const data = Object.keys(logBookCount).map(
        (date) => ({
          count: logBookCount[date],
          totalPrice: logBookPrice[date],
        })
      );

      const context = chartRef.current.getContext("2d");
      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "My First Dataset",
              data: data.map((item) => {
                if (item.totalPrice === 1350000) {
                  return 945000 * item.count;
                } else if (item.totalPrice === 2300000) {
                  return 1610000 * item.count;
                } else {
                  return 2800000 * item.count;
                }
              }),
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 0.2)"],
              borderWidth: 2,
            },
            {
              type: "line",
              label: "Line Dataset",
              data: data.map((item) => {
                if (item.totalPrice === 1350000) {
                  return 945000 * item.count;
                } else if (item.totalPrice === 2300000) {
                  return 1610000 * item.count;
                } else {
                  return 2800000 * item.count;
                }
              }),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgb(255, 99, 132)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "Doanh thu (VNĐ)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Thời gian",
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
              },
            },
          },
          maintainAspectRatio: false,
        },
      });

      chartRef.current.chart = newChart;
    }
  }, [logBooks]);
  useEffect(() => {
    setLoading(true);
    if (type === "1") {
      api({
        path: "/admin/get-all-logBooks",
        type: TypeHTTP.GET,
        sendToken: true,
      }).then((logBooks) => {
        setLogBooks(
          logBooks.filter(
            (item) =>
              item.status.status_type === "COMPLETED"
          )
        );
        setLoading(false);
      });
    } else if (type === "2") {
      api({
        path: `/admin/get-logBooks-week`,
        type: TypeHTTP.GET,
        sendToken: true,
      }).then((logBooks) => {
        setLogBooks(
          logBooks.filter(
            (item) =>
              item.status.status_type === "COMPLETED"
          )
        );
        setLoading(false);
      });
    } else if (type === "3") {
      api({
        path: `/admin/get-logBooks-month`,
        type: TypeHTTP.GET,
        sendToken: true,
      }).then((logBooks) => {
        setLogBooks(
          logBooks.filter(
            (item) =>
              item.status.status_type === "COMPLETED"
          )
        );
        setLoading(false);
      });
    } else if (type === "4") {
      api({
        path: `/admin/get-logBooks-year`,
        type: TypeHTTP.GET,
        sendToken: true,
      }).then((logBooks) => {
        setLogBooks(
          logBooks.filter(
            (item) =>
              item.status.status_type === "COMPLETED"
          )
        );
        setLoading(false);
      });
    }
  }, [type]);
  const calculator = (logBooks) => {
    let logBookPrice = 0;
    logBooks.forEach((logBook) => {
      if (logBook.priceList?.price === 1350000) {
        logBookPrice += 405000;
      } else if (logBook.priceList?.price === 2300000) {
        logBookPrice += 690000;
      } else {
        logBookPrice += 1200000;
      }
    });
    return logBookPrice;
  };
  useEffect(() => {
    api({
      path: "/admin/get-all-logBooks",
      type: TypeHTTP.GET,
      sendToken: true,
    }).then((logBooks) => {
      setSumLogBook(
        logBooks.filter(
          (item) => item.status.status_type === "COMPLETED"
        )
      );
    });
    api({
      path: "/admin/get-logBooks-weeks",
      type: TypeHTTP.GET,
      sendToken: true,
    }).then((logBooks) => {
      setSumLogBookWeek(
        logBooks.filter(
          (item) => item.status.status_type === "COMPLETED"
        )
      );
    });
    api({
      path: "/admin/get-logBooks-month",
      type: TypeHTTP.GET,

      sendToken: true,
    }).then((logBooks) => {
      setSumLogBookMonth(
        logBooks.filter(
          (item) => item.status.status_type === "COMPLETED"
        )
      );
    });
    api({
      path: "/admin/get-logBooks-year",
      type: TypeHTTP.GET,

      sendToken: true,
    }).then((logBooks) => {
      setSumLogBookYear(
        logBooks.filter(
          (item) => item.status.status_type === "COMPLETED"
        )
      );
    });
  }, []);
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mt-2">
        <div
          className="h-[120px] gap-2 justify-center p-4 text-[white] rounded-lg flex flex-col"
          style={{
            backgroundImage: "url(/Flare.jpg)",
            backgroundSize: "cover",
          }}
        >
          <div className="flex items-end gap-2">
            <i className="text-[40px] bx bx-dollar-circle"></i>
            <span className="text-[25px] font-semibold">
              {sumLogBook.length === 0
                ? 0
                : formatMoney(calculator(sumLogBook))}{" "}
              đ
            </span>
          </div>
          <span className="font-medium text-[15px]">
            Tổng doanh thu
          </span>
        </div>
        <div
          className="h-[120px] gap-2 justify-center p-4 text-[white] rounded-lg flex flex-col"
          style={{
            backgroundImage: "url(/Quepal.jpg)",
            backgroundSize: "cover",
          }}
        >
          <div className="flex items-end gap-2">
            <i className="text-[30px] translate-y-[-5px] fa-regular fa-hourglass"></i>
            <span className="text-[25px] font-semibold">
              {sumLogBookWeek.length === 0
                ? 0
                : formatMoney(
                    calculator(sumLogBookWeek)
                  )}{" "}
              đ
            </span>
          </div>
          <span className="font-medium text-[15px]">
            Doanh thu theo tuần
          </span>
        </div>
        <div
          className="h-[120px] gap-2 justify-center p-4 text-[white] rounded-lg flex flex-col"
          style={{
            backgroundImage: "url(/SinCityRed.jpg)",
            backgroundSize: "cover",
          }}
        >
          <div className="flex items-end gap-2">
            <i className="text-[40px] bx bx-line-chart"></i>
            <span className="text-[25px] font-semibold">
              {sumLogBookMonth.length === 0
                ? 0
                : formatMoney(
                    calculator(sumLogBookMonth)
                  )}{" "}
              đ
            </span>
          </div>
          <span className="font-medium text-[15px]">
            Doanh thu theo tháng
          </span>
        </div>
        <div
          className="h-[120px] gap-2 justify-center p-4 text-[white] rounded-lg flex flex-col"
          style={{
            backgroundImage: "url(/EndlessRiver.jpg)",
            backgroundSize: "cover",
          }}
        >
          <div className="flex items-end gap-2">
            <i className="text-[40px] bx bx-calendar-check"></i>
            <span className="text-[25px] font-semibold">
              {sumLogBookYear.length === 0
                ? 0
                : formatMoney(
                    calculator(sumLogBookYear)
                  )}{" "}
              đ
            </span>
          </div>
          <span className="font-medium text-[15px]">
            Doanh thu theo năm
          </span>
        </div>
      </div>
      <div className="mt-8 relative h-[300px] w-full flex flex-col justify-center items-center gap-3">
        <div>
          <span className="text-[20px] font-bold">
            Doanh thu {typeTime[type]}
          </span>
        </div>
        <canvas ref={chartRef} />
      </div>
      <div className="w-full max-h-[500px] mt-4 overflow-y-auto relative">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 left-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="w-[5%] py-3 text-center"
              >
                #
              </th>
              <th scope="col" className="w-[15%] py-3">
                Bệnh Nhân
              </th>
              <th scope="col" className="w-[20%] py-3">
                Trạng Thái
              </th>
              <th scope="col" className="w-[23%] py-3">
                Thời Gian
              </th>
              <th scope="col" className="w-[20%] py-3">
                Loại Phiếu
              </th>
            </tr>
          </thead>
          <tbody className=" w-[full] bg-black font-medium">
            {!loading &&
              logBooks.map((logBook, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 text-center font-medium"
                  >
                    {index + 1}
                  </td>
                  <td className="py-4 text-[15px]">
                    {logBook.patient.fullName}
                  </td>
                  <td
                    style={{
                      color: "blue",
                    }}
                    className="py-4"
                  >
                    {logBook.status.message}
                  </td>
                  <td className="py-4">
                    {`${convertDateToDayMonthYearVietNam(
                      logBook.date
                    )}`}
                  </td>
                  <td className="py-4">
                    {logBook.priceList.price === 1350000
                      ? formatMoney(945000)
                      : logBook.priceList.price === 2300000
                      ? formatMoney(1610000)
                      : formatMoney(2800000)}
                    đ/
                    {logBook.priceList.type}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!loading && logBooks.length === 0 && (
          <div className="w-full flex items-center justify-center my-10 text-[18px] font-medium">
            Không có phiếu theo dõi sức khỏe được đăng ký
            trong {typeTime[type]}
          </div>
        )}
        {loading && (
          <div className="w-full flex items-center justify-center my-10 text-[18px] font-medium">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[black]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
};

export default TheoDoiSucKhoe;
