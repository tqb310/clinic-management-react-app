export function createData(cardId, patientName, phoneNumber, createAt,room, state) {
    return {
      id: Math.random().toString(32).substr(2,10),    
      cardId,  
      patientName,
      phoneNumber,
      createAt,
      room,
      state,
    };
  }
  
  export const rows = [
    createData(24, "Trương Quốc Bảo", "0123456789", "14/12/2021", 0),
    createData(24, "Đặng Nguyễn Hoài Đen", "0123456789", "14/12/2021", 0),
    createData(24, "Đặng Ngọc Liêm", "0123456789", "14/12/2021", 2),
    createData(24, "Lý Sô Ly", "0123456789", "14/12/2021", 2),
    createData(24, "Phùng Nguyễn Liêu Băng", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 3),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
    createData(24, "Nguyễn Văn A", "0123456789", "14/12/2021", 1),
  ];
  
  export const stateData = {
    0: {
      label: "Hoàn tất",
      colors: ["#ECFBF6", "#03B575"],
    },
    1: {
      label: "Chưa khám",
      colors: ["#EBF0FF", "#1F58E7"],
    },
    2: {
      label: "Chờ thu phí",
      colors: ["#FFF3F2", "#E74F48"],
    },
    3: {
      label: "Đang làm dịch vụ",
      colors: ["#FFF9ED", "#EFAD0A"],
    },
  };
  