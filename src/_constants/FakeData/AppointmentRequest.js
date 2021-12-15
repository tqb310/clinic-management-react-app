export const data = [
  {
    createAt: "Vừa xong",
    name: "Nguyễn Văn B",
    phone: "0123456789",
  },
  {
    createAt: "27 phút trước",
    name: "Trần Thị C",
    phone: "0123456789",
  },
  {
    createAt: "1 giờ trước",
    name: "Đặng Nguyễn Phương Duyên",
    phone: "0123456789",
  },
  {
    createAt: "6 giờ trước",
    name: "Lê Trần Thành E",
    phone: "0123456789",
  },
  {
    createAt: "Hôm qua",
    name: "Nguyễn Văn B",
    phone: "0123456789",
  },
  {
    createAt: "13/11/2021",
    name: "Trần Thị C",
    phone: "0123456789",
  },
  {
    createAt: "09/11/2021",
    name: "Đặng Nguyễn Phương Duyên",
    phone: "0123456789",
  },
  {
    createAt: "09/11/2021",
    name: "Lê Trần Thành E",
    phone: "0123456789",
  },
];

export const stateData = {
  1: {
    label: "Đã tiếp nhận",
    colors: ["#ECFBF6", "#03B575"],
  },
  0: {
    label: "Chưa tiếp nhận",
    colors: ["#EBF0FF", "#1F58E7"],
  },
  2: {
    label: "Đã hủy",
    colors: ["#F3F3F3", "#BDBDBD"],
  },
  3: {
    label: "Quá giờ",
    colors: ["#FFF3F2", "#E74F48"],
  },
};

export const examineType = {
  0: {
    label: 'Mới',
    colors: {
      color: "#00cde0",
      background: "#e8fdff"
    }
  },
}

function createData(orderNum, patientName, checkIn, room, state, type) {
  return {
    id: Math.random().toString(32).substr(2, 10),
    orderNum,
    patientName,    
    checkIn,
    room,
    state,
    type 
  };
}

export const rows = [
  createData(24, "Nguyễn Văn A", "8:30", 1, 0, 0),
  createData(24, "Nguyễn Văn A", "8:30", 1, 0, 0),
  createData(24, "Nguyễn Văn A", "8:30", 1, 2, 0),
  createData(24, "Nguyễn Văn A", "8:30", 1, 2, 1),
  createData(24, "Nguyễn Văn A", "8:30", 1, 1, 1),
  createData(24, "Nguyễn Văn A", "8:30", 1, 1, 0),
  createData(24, "Nguyễn Văn A", "8:30", 1, 1, 1),
  createData(24, "Nguyễn Văn A", "8:30", 1, 1, 1),
  createData(24, "Nguyễn Văn A", "8:30", 1, 1, 0),
  createData(24, "Nguyễn Văn A", "8:30", 1, 1, 0),
];
