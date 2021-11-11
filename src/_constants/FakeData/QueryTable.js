function createData(orderNum, patientName, phoneNumber, checkIn, room, state) {
  return {
    id: Math.random().toString(32).substr(2,10),
    orderNum,
    patientName,
    phoneNumber,
    checkIn,
    room,
    state,
  };
}

export const rows = [
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 0),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 0),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 2),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 2),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
];

export const stateData = {
  0: {
    label: "Đang khám",
    colors: ["#ECFBF6", "#03B575"],
  },
  1: {
    label: "Đang chờ",
    colors: ["#EBF0FF", "#1F58E7"],
  },
  2: {
    label: "Qua lượt",
    colors: ["#FFF3F2", "#E74F48"],
  },
};
