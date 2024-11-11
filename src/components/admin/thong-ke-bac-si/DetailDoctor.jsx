import { formatMoney } from '@/utils/others'
import React, { useEffect, useState } from 'react'

const DetailDoctor = ({ currentDoctor, setCurrentDoctor, appointments, healthLogBooks, appointmentHomes, doctorRecords, fromDate, toDate }) => {

    const [myAppointments, setMyAppointments] = useState([])

    useEffect(() => {
        if (currentDoctor) {
            const doctorRecord = doctorRecords.filter(item => item.doctor._id === currentDoctor.doctor._id)[0]
            const arr = []
            // thêm trực tuyến vào arr
            appointments.forEach(item => {
                if (item.doctor_record_id === doctorRecord._id) {
                    arr.push({
                        type: 'appointment',
                        date: item.appointment_date,
                        data: item
                    })
                }
            })

            // thêm tại nhà vào arr
            appointmentHomes.forEach(item => {
                if (item.doctor_record_id === doctorRecord._id) {
                    arr.push({
                        type: 'appointmentHome',
                        date: item.appointment_date,
                        data: item
                    })
                }
            })

            // thêm logbook vào arr
            healthLogBooks.forEach(item => {
                if (item.doctor._id === currentDoctor.doctor._id) {
                    arr.push({
                        type: 'healthLogBook',
                        date: item.dateStop,
                        data: item
                    })
                }
            })

            // sắp xếp theo thời gian từ trước đến sau
            arr.sort((a, b) => {
                const dateA = new Date(a.date.year, a.date.month - 1, a.date.day, ...a.date.time.split(':'));
                const dateB = new Date(b.date.year, b.date.month - 1, b.date.day, ...b.date.time.split(':'));
                return dateA - dateB;
            });

            // lưu vào myAppointments
            setMyAppointments(arr)
        }
    }, [appointments, healthLogBooks, appointmentHomes, currentDoctor])

    return (
        <div className='min-w-[100%] h-full flex flex-col relative'>
            <button onClick={() => setCurrentDoctor()} className='absolute text-[25px] z-10 left-2 top-2 flex items-center'>
                <i className='bx bx-chevron-left'></i>
                <span className='text-[14px] font-semibold'>Trở lại</span>
            </button>
            <div className='absolute flex flex-col px-4 w-[100%] top-0 left-0 h-full'>
                <div className='py-[1rem] mt-[2rem] w-[100%] flex justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='w-[100px] h-[100px] rounded-full overflow-hidden border-[2px] flex justify-center bg-[white] items-center border-[#4edcc1]'>
                            <img src={currentDoctor?.doctor?.image} className='h-[100px] translate-y-[5px]' />
                        </div>
                        <div className='flex flex-col items-start gap-1'>
                            <span className='text-[18px] font-semibold'>BS. {currentDoctor?.doctor?.fullName}</span>
                            <span className='px-3 py-1 text-[14px] bg-[#50d4bc] rounded-md text-[white]'>{currentDoctor?.doctor?.specialize}</span>
                            <span className='text-[14px]'>Tổng doanh thu từ {fromDate} đến {toDate}: <span className='font-semibold'>{formatMoney(currentDoctor?.totalPrice) === '' ? 0 : formatMoney(currentDoctor?.totalPrice)}đ</span></span>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-[14px]'>Thời gian: <span className='font-semibold'>{fromDate}</span> - <span className='font-semibold'>{toDate}</span></span>
                        <span className='text-[14px]'>Số lượt khám trực tuyến: <span className='font-semibold'>{currentDoctor?.totalAppointments} lượt</span></span>
                        <span className='text-[14px]'>Số lượt khám tại nhà: <span className='font-semibold'>{currentDoctor?.totalAppointmentHomes} lượt</span></span>
                        <span className='text-[14px]'>Số lượt theo dõi sức khỏe: <span className='font-semibold'>{currentDoctor?.totalLogBooks} lượt</span></span>
                    </div>
                </div>
                <span className='text-[16px] font-semibold'>Lịch sử dòng tiền ({myAppointments.length})</span>
                <div className='h-[69%] w-full overflow-auto mt-2'>
                    <div className='grid grid-cols-4 gap-3'>
                        {myAppointments.map((item, index) => (
                            <div className='relative w-full bg-[#f2f2f2] rounded-md pt-[2rem] pb-[0.5rem]' key={index}>
                                <span style={{ backgroundColor: item.type === 'appointment' ? '#76d7c4' : item.type === 'appointmentHome' ? '#5dade2' : '#f39c12' }} className='text-[12px] text-[white] font-semibold px-2 py-1 rounded-md left-0 top-0 absolute'>{item.type === 'appointment' ? 'Cuộc hẹn trực tuyến' : item.type === 'appointmentHome' ? 'Cuộc hẹn tại nhà' : 'Theo dõi sức khỏe'}</span>
                                <span className='text-[12px] absolute top-1 right-2'>{item.date.day}-{item.date.month}-{item.date.year} {item.date.time}</span>
                                <div className='flex w-full px-[0.5rem] gap-2 items-center'>
                                    <img src={item.data.patient.image} className='w-[40px] h-[40px] rounded-full border-[2px] border-[#50d4bc]' />
                                    <div className='flex flex-col'>
                                        <span className='text-[14px] font-medium'>{item.data.patient.fullName}</span>
                                        <span className='text-[12px]'>Doanh thu: {item.type === 'healthLogBook' ? formatMoney((item.data.priceList.price * 0.7).toFixed(0)) : formatMoney((item.data.price_list.price * 0.7).toFixed(0))}đ</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailDoctor