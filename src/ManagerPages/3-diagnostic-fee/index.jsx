import React, { useState, useEffect } from "react";
import PieChart from "./_components/PieChart";
import BarChart from "./_components/BarChart";
// import services from "_constants/FakeData/Service";
import { Button, IconButton } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import ServiceForm from "./_components/ServiceForm";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Services from "_services/servicesUsing.service";
import "./index.scss";
function DiagnosticFee() {
  const [selectIndex, setSelectIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (value, index) => {
    // console.log(value);
    if(index === undefined){      
      toast.success('Đang tạo...');
      Services.postService(value.SERVICE_NAME, value.FEE)
      .then(data => {console.log(data); setServiceData([...serviceData, value]);})      
      .catch(err => console.log(err));
    }
    else {
        toast.success('Đang cập nhật...');
        Services.updateFee(index, value.FEE)
        .then(data => {console.log(data); window.location.reload()})
        .catch(err => console.log(err));        
        // const temp = [...serviceData];
        // temp[index].SERVICE_NAME = value.SERVICE_NAME;
        // temp[index].FEE = value.FEE;
        // setServiceData(temp);
    }
  };
  const handleDelete = (ind) => {
    setServiceData([
      ...serviceData.slice(0, ind),
      ...serviceData.slice(ind + 1),
    ]);
  };
  const handleEdit = (service) => {
    setOpen(service);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await Services.getAllServices();
      console.log(res);
      setServiceData(res);
    }
    fetchData();
  }, [])
  return (
    <div className="manage-fee">
      <div className="manage-fee-card-chart">
        {/* <Card name='Dịch vụ' data='8' color='#349873' icon={serviceIcon}></Card> */}
        <PieChart></PieChart>
        <BarChart></BarChart>
      </div>
      <div className="manage-fee-right">
        <div className="manage-fee-right-table">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button startIcon={<Add />} onClick={() => setOpen(true)}>
              Thêm
            </Button>
          </div>
          <p className="manage-fee-right-table-title">DANH SÁCH DỊCH VỤ</p>
          <table>
            <tr>
              <th>STT</th>
              <th>Tên dịch vụ</th>
              <th>Chi phí (VND)</th>
              <th colSpan={2}>Thao tác</th>
            </tr>
            {serviceData.map((service, index) => (
              <tr
                className={
                  index == selectIndex
                    ? "manage-fee-right-table-row-active"
                    : ""
                }
                onClick={() => setSelectIndex(index)}
              >
                <td>{index + 1}</td>
                <td>{service.SERVICE_NAME}</td>
                <td>{service.FEE}</td>
                <td>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit />
                  </IconButton>
                </td>
                <td>
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <ServiceForm
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <ToastContainer/>
    </div>
  );
}

export default DiagnosticFee;
