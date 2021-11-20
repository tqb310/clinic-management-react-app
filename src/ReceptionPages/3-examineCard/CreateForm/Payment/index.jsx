import React, { useState } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import { FastField } from "formik";
import { Add, Close } from "@mui/icons-material";
import "./index.scss";
// import PropTypes from 'prop-types'

function Guest({total}) {
  const [number, setNumber] = useState("");
  const [exchange, setExchange] = useState(0);
  const handleChange = (e) => {      
      setNumber(e.target.value);
      setExchange(Math.max(e.target.value - total, 0));
  }
  return (
    <td>
      <div className="PaymentForm__guest">
        <span>Khách trả</span>
        <TextField
          value={number}
          onChange={handleChange}
          variant="standard"
          size="small"
          InputProps={{
            endAdornment: <InputAdornment>đ</InputAdornment>,
          }}
        />
      </div>
      <div className="PaymentForm__exchange">
        <span>Tiền thừa</span>
        <span>
          {exchange}<span>đ</span>
        </span>
      </div>
    </td>
  );
}

function Payment(props) {
  return (
    <div className="PaymentForm">
      <FastField name="DIAGNOSTIC_FEE">
        {({ form, field }) => (
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  <div className="PaymentForm__total">Tổng phí</div>
                  <div className="PaymentForm__totalNum">
                    {field.value}
                    <span>đ</span>
                  </div>
                </td>
                <Guest total={form.values['DIAGNOSTIC_FEE']}/>
                <td>
                  <div className="PaymentForm__actions">
                    <Button
                      type="submit"
                      variant="outlined"
                      startIcon={<Add />}
                      color="primary"
                      sx={{ width: 140 }}
                    >
                      Tạo phiếu
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Close />}
                      sx={{ width: 140 }}
                      color="error"
                    >
                      Hủy
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </FastField>
    </div>
  );
}

Payment.propTypes = {};

export default Payment;
