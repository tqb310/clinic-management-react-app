import { Dialog, FormControl, FormHelperText, FormLabel, RadioGroup, Typography, TextField, FormControlLabel, Radio } from '@mui/material';
import React, { useState } from 'react'

function Form(props) {
    const [oldCustomer, setOldCustomer] = useState(false)
    return (
        <Dialog
            title="Dialog With Custom Width"
            modal={true}
            open={props.open}
        >
            <form>
                <p>Tạo Lịch Hẹn</p>
                <p>Khách Hàng</p>
                <input type='radio' id="old" name='old-customer' onChange={() => setOldCustomer(true)} checked={oldCustomer}></input>
                <label htmlFor="old">Cũ</label>
                <input type='radio' id='new' name='old-customer' onChange={() => setOldCustomer(false)} checked={!oldCustomer}></input>
                <label htmlFor="new">Mới</label>
                <br />
                <label htmlFor="customer-id" className={oldCustomer? 'hiden':''}>Mã khách hàng</label>
                <input type='text' id='customer-id'></input>
                <label htmlFor="customer-id">Số điện thoại</label>
                <input type='text' id='customer-phone' ></input>

            </form>
        </Dialog>
    )
}

export default Form
