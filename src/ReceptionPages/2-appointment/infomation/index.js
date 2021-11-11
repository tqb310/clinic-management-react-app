import React from 'react'
import './index.scss'
import lich from 'ReceptionPages/2-appointment/infomation/assets/lich.jpg'
import huylich from 'ReceptionPages/2-appointment/infomation/assets/huylich.png'

function infomation() {
    return (
        <div className='container'>
            <div className='card-wrapper'>
                <div className='card' style={{marginBottom: '2rem'}}>
                    <div>
                        <img src={lich} alt="lich-logo" width={64} height={64}/>
                    </div>
                    <div className='text-wrapper'>
                        <h5 >Tổng số cuộc hẹn</h5>
                        <h4 className='greendark'>7</h4>
                    </div>
                </div>
                <div className='card'>
                    <div>
                        <img src={huylich} alt="lich-huy-logo" width={64} height={64}/>
                    </div>
                    <div className='text-wrapper'>
                        <h5 >Tổng số cuộc hẹn bị hủy</h5>
                        <h4 className='reddark'>7</h4>
                    </div>
                </div>
            </div>
            <div className='chart'>
                <div className='chart-header'>
                    <p>Số lượng cuộc hẹn trong tuần</p>
                    <div>Tuần này</div>
                </div>
                <div className='chart-body'></div>
            </div>
        </div >
    )
}

export default infomation
