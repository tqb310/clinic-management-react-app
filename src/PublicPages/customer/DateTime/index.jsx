import React, { useState } from "react";
import { FastField } from "formik";
import { FormControl, FormLabel } from "@mui/material";
import {
  CustomRadioGroup,
  CustomRadio,
} from "_components/FormikField/CustomRadioBtn";
import Select from "_components/FormikField/Select";
import { Date } from "_components/FormikField/DateTime";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  // TimelineDot,
  TimelineOppositeContent,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
// import { Button } from "@mui/material";
import { RadioButtonChecked } from "@mui/icons-material";
import { hours } from "_constants/date";
import {Scrollbars} from "react-custom-scrollbars-2";
import "./index.scss";
// import PropTypes from 'prop-types'

export default function DateTimeChoice(props) {
  return (
    <div className="AppointmentForm__datetime" >
      <div className="col-1-7">
        <FastField
          id="date"
          name="appointment.time.date"
          component={Date}
          label="Ngày hẹn khám"
          required
        />
      </div>
      <div className="col-8-13">
        <FastField
          id="doctor_id"
          name="appointment.doctor_id"
          component={Select}
          label="Bác sĩ"
          items={[
            { id: 1, key: "BS.Phúc", value: 1 },
            { id: 2, key: "BS.Ly", value: 2 },
          ]}
          required
        />
      </div>
      <div className="col-1-13">
        <FormControl fullWidth>
          <FormLabel>Chọn khung giờ</FormLabel>
          <Scrollbars style={{height: '323.5px'}}>
            <Timeline position="left" sx={{ margin: 0, padding: 0 }}>
              <FastField id="time" name="appointment.time.time">
                {({ form, field }) => {
                  return (
                    <CustomRadioGroup {...field}>
                      {hours.map((hour, index) => {
                        const h = hour.split(":")[0];
                        return <TimelineItemComp key={index} h={h} hour={hour} />;
                      })}
                    </CustomRadioGroup>
                  );
                }}
              </FastField>
              <TimelineItem sx={{ minHeight: 0 }}>
                <TimelineSeparator>
                  <RadioButtonChecked
                    sx={{
                      color: "#bdbdbd",
                      margin: "7px 0",
                    }}
                  />
                </TimelineSeparator>
                <TimelineContent
                  color="text.secondary"
                  sx={{
                    paddingTop: "9px",
                    fontSize: "13px",
                    flexBasis: "33px !important",
                    flex: 0,
                  }}
                >
                  17:00
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Scrollbars>
        </FormControl>
      </div>
    </div>
  );
}

DateTimeChoice.propTypes = {};

function TimelineItemComp({ h, hour }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <TimelineItem sx={{ minHeight: expanded ? "70px" : "45px", transition: 'all .3s' }}>
      {expanded && (
        <TimelineOppositeContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 0,
          }}
        >
          <CustomRadio id={h + ":00"} value={h + ":00:00"} label="00 - 15" />
          <CustomRadio id={h + ":15"} value={h + ":15:00"} label="15 - 30" />
          <CustomRadio id={h + ":30"} value={h + ":30:00"} label="30 - 45" />
          <CustomRadio id={h + ":45"} value={h + ":45:00"} label="45 - 00" />
        </TimelineOppositeContent>
      )}
      <TimelineSeparator>
        <RadioButtonChecked
          sx={{
            color: expanded ? "#2E3192" : "#bdbdbd",
            margin: "7px 0",
            transition: 'all .3s',
            '&:hover': !expanded ? {
              transform: 'scale(1.1,1.1)'
            } : ''
          }}
          onClick={() => setExpanded(!expanded)}
        />
        <TimelineConnector
          sx={{
            backgroundColor: expanded ? "#2E3192" : "#bdbdbd",
          }}
        />
      </TimelineSeparator>
      <TimelineContent
        color={expanded ? "#2E3192" : "text.secondary" }
        sx={{
          paddingTop: "9px",
          fontSize: "13px",
          flexBasis: "33px !important",
          flex: 0,
        }}
      >
        {hour}
      </TimelineContent>
    </TimelineItem>
  );
}
