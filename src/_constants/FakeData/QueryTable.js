export function createData(orderNum, patientName, phoneNumber, checkIn, room, state) {
  return {
    id: Math.random().toString(32).substr(2, 10),
    orderNum,
    patientName,
    phoneNumber,
    checkIn,
    room,
    state,
  };
}

export const rows = [
  createData(24, "Trương Quốc Bảo", "0123456789", "8:30", 1, 0),
  createData(24, "Đặng Nguyễn Hoài Đen", "0123456789", "8:30", 1, 0),
  createData(24, "Đặng Ngọc Liêm", "0123456789", "8:30", 1, 2),
  createData(24, "Lý Sô Ly", "0123456789", "8:30", 1, 2),
  createData(24, "Phùng Nguyễn Liêu Băng", "0123456789", "8:30", 1, 1),
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


export const replaceDateWhenQueueEmpty = {
  room: 1,
  data: {
    order: 1,
    diagnostic: {
      DIAGNOSTIC_ID: 63,
      CREATE_AT: '2021-12-14T14:25:08.000Z',
      PATIENT_ID: 40,
      DOCTOR_ID: 1,
      SYMPTOM: null,
      PRESCRIPTION: null,
      DIAGNOSTIC_FEE: 80000,
      RE_EXAMINATION: null,
      NOTE: "",
      RECEPTION: 2,
      STATUS: 1,
      DOCTOR: {
        EMPLOYEE_ID: 1,
        EMPLOYEE_NAME: 'Tôi tên Ly',
        IDENTITY_NUMBER: "123456789",
        PHONE: "987654321",
        GENDER: true,
        DATE_OF_BIRTH: "2000-04-13",
        EMPLOYEE_ADDRESS: "122 Phạm Ngọc Thạch, Ma Lâm, Hàm Thuận Bắc, Bình Thuận",
        POSITION: 2,
        START_WORK_DATE: "2021-10-27",
        SALARY: 9000000
      },
      PATIENT: {
        PATIENT_ID: 40,
        PATIENT_NAME: "Đặng Ngọc Liêm",
        IDENTITY_NUMBER: "3342",
        PHONE: "0987654321",
        GENDER: true,
        DATE_OF_BIRTH: "2001-11-02",
        ADDRESS: "ddddd, Ma Lâm, Hàm Thuận Bắc, Bình Thuận",
        OCCUPATION: "Làm Nông"
      },
      SERVICE_ID_SERVICEs: [
        {
          SERVICE_ID: 1,
          SERVICE_NAME: "Khám bệnh",
          FEE: 10000,
          SERVICEFORDIAGNOSTIC: {
            DIAGNOSTIC_ID: 63,
            SERVICE_ID: 1
          }
        }]
    },
    status: "pending"
  }
}