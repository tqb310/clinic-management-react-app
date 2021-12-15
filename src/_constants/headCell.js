export const headCells = [
    {
      id: "orderNum",
      numeric: true,
      width: '12%',      
      label: "Thứ tự",
    },
    {
      id: "patientName",
      numeric: false,
      width: 'auto',      
      label: "Tên bệnh nhân",
    },
    {
      id: "phone",
      numeric: false,
      width: '20%',      
      label: "Số điện thoại",
    },
    {
      id: "checkIn",
      numeric: false,
      width: '10%',      
      label: "Giờ vào",
    },
    {
      id: "room",
      numeric: true,
      width: '10%',      
      label: "Phòng",
    },
    {
      id: "state",
      numeric: true,
      width: '15%',      
      label: "Trạng thái",
    },
    {
      width: '5%'
    }
  ];

export const AppointmentHeadCells = [
    {
      id: "orderNum",
      numeric: true,
      width: '10%',      
      label: "#",
    },
    {
      id: "patientName",
      numeric: false,
      width: '35%',      
      label: "Bệnh nhân",
    }, 
    {
      id: "time",
      numeric: false,
      width: '15%',      
      label: "Giờ",
    },
    {
      id: "room",
      numeric: true,
      width: '15%',      
      label: "Bác sĩ",
    },   
    {
      id: "state",
      numeric: true,
      width: '25%',      
      label: "Trạng thái",
    }, 
  ];

export const ExamineHeadCells = [
    {
      id: "orderNum",
      numeric: true,
      width: '10%',      
      label: "Mã phiếu",
    },
    {
      id: "patientName",
      numeric: false,
      width: 'auto',      
      label: "Bệnh nhân",
    }, 
    {
      id: "phoneNumber",
      numeric: false,
      width: '30%',      
      label: "Điện thoại",
    },
    {
      id: "createAt",
      numeric: true,
      width: '15%',      
      label: "Ngày lập",
    },
    {
      id: "room",
      numeric: true,
      width: '15%',      
      label: "Phòng",
    },      
    {
      id: "state",
      numeric: true,
      width: '15%',      
      label: "Trạng thái",
    },   
  ];

  // {filteredData.length ? (
  //   filteredData.map((appointment) => (
  //     <div className="appointment">
  //       <div className="appointment-header">
  //         <h3>
  //           {`${(
  //             "0" +
  //             new Date(
  //               appointment.TIMES.toString().slice(0, 21)
  //             ).getHours()
  //           ).slice(-2)}:${(
  //             "0" +
  //             new Date(
  //               appointment.TIMES.toString().slice(0, 21)
  //             ).getMinutes()
  //           ).slice(-2)}`}
  //         </h3>
  //         <p>{appointment.TYPE ? "Tái Khám" : "Khám mới"}</p>
  //       </div>
  //       <div className="appointment-body">
  //         <div>
  //           <h4>{appointment.PATIENT_NAME}</h4>
  //           <p>{`BS. ${appointment.EMPLOYEE_NAME}`}</p>
  //         </div>
  //         <FontAwesomeIcon icon="ellipsis-v"></FontAwesomeIcon>
  //       </div>
  //     </div>
  //   ))
  // ) : (
  //   <div><img src={NoResultDate} className="appointment__noresult" alt="No results" width="512"/></div>
  // )}        