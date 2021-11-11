const headCells = [
    {
      id: "orderNum",
      numeric: true,
      width: '7%',      
      label: "Số thứ tự",
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
      width: 'auto',      
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

export default headCells;