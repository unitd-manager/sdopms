import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const TimeSheetDetails = () => {
  //state variables
  // const [empcode, setEmpcode] = useState();
  const [employee, setEmployee] = useState();
  const [employeeData, setEmployeeData] = useState({
    employee_id: '',
    time_in:'',
    time_out:'',
    ot_hours:'',
    normal_hours:'',
    ph_hours:'',
    date:'',
    day:''
  });

  //routing
  const navigate = useNavigate();
  //Navigation and Parameters
  const { id } = useParams();
  const handleInputs = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const getemployee = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployee(res.data.data);
      })
      .catch(() => {});
  };

  //Insert Employee Data
  // Import necessary modules and components

  // ... Other code ...
 
  // Insert Employee Data
  const insertEmployee = () => {
  console.log('empdata',employeeData)
  let str1 = employeeData.time_out;
let str2 = "18:00";

str1 =  str1.split(':');
str2 =  str2.split(':');
const totalSeconds1 = parseFloat(str1[0] * 3600 + str1[1] * 60);
const totalSeconds2 = parseFloat(str2[0] * 3600 + str2[1] * 60 )
console.log('sec1',totalSeconds1)
console.log('sec2',totalSeconds2)
employeeData.date=new Date();
employeeData.day=employeeData.date.getDay();

console.log('day',employeeData.day)
if(employeeData.day ===1 || employeeData.day ===2 || employeeData.day ===3 || employeeData.day ===4 ){
if(totalSeconds1>totalSeconds2){
  employeeData.normal_hours=9;
  employeeData.ot_hours=1.5;
  employeeData.ph_hours=0;
}else{
  employeeData.normal_hours=9;
  employeeData.ot_hours=0;
  employeeData.ph_hours=0;
}
 }
 if(employeeData.day ===5 ){
  if(totalSeconds1>totalSeconds2){
    employeeData.normal_hours=8;
    employeeData.ot_hours=2.5;
    employeeData.ph_hours=0;
  }else{
    employeeData.normal_hours=8;
    employeeData.ot_hours=0;
    employeeData.ph_hours=0;
  }
   }
   if(employeeData.day ===6 ){
    if(totalSeconds1>totalSeconds2){
      employeeData.ot_hours=10.5;
      employeeData.ph_hours=0;
      employeeData.normal_hours=0;
    }else{
      employeeData.normal_hours=0;
      employeeData.ph_hours=0;
      employeeData.ot_hours=8;
    }
     }
     if(employeeData.day ===5 ){
  if(totalSeconds1>totalSeconds2){
    employeeData.normal_hours=8;
    employeeData.ot_hours=2.5;
    employeeData.ph_hours=0;
  }else{
    employeeData.normal_hours=8;
    employeeData.ot_hours=0;
    employeeData.ph_hours=0;
  }
   }
   if(employeeData.day ===6 ){
    if(totalSeconds1>totalSeconds2){
      employeeData.ot_hours=10.5;
      employeeData.ph_hours=0;
      employeeData.normal_hours=0;
    }else{
      employeeData.ph_hours=0;
      employeeData.ot_hours=8;
      employeeData.normal_hours=0;
    }
     }
     if(employeeData.day ===0 ){
      if(totalSeconds1>totalSeconds2){
        employeeData.ph_hours=10.5;
        employeeData.normal_hours=0;
        employeeData.ot_hours=0;
      }else{
        employeeData.normal_hours=0;
        employeeData.ot_hours=0;
        employeeData.ph_hours=8;
      }
       }
       console.log('empdata',employeeData)
// api
//       .post('/attendance/insertAttendance1', employeeData)
//       .then((res) => {
//         const insertedDataId = res.data.data.insertId;
//        employeeData.attendance_id=insertedDataId
        api
      .post('/projecttask/insertTimesheet', employeeData)
      .then(() => {
        
        message('Employee inserted successfully.', 'success');
        
        // setTimeout(() => {
          
        //   navigate(`/TimesheetEdit/${insertedDataId}`);
        // }, 300);
      })
      .catch(() => {
        message('Unable to create employee.', 'error');
      });
        // setTimeout(() => {
          
        //   navigate(`/TimesheetEdit/${insertedDataId}`);
        // }, 300);
      // })
      // .catch(() => {
      //   message('Unable to create employee.', 'error');
      // });
  };
  const calculateHours = () => {
    // Get "Time In" and "Time Out" values from state
    const timeIn = moment(employeeData.time_in, 'h:mm:ss a');
    const leaveTime = moment(employeeData.leave_time, 'h:mm:ss a');

    // Calculate the difference in hours
    const hoursDifference = leaveTime.diff(timeIn, 'hours');

    // Update the state with the calculated hours
    setEmployeeData({
      ...employeeData,
      hours: hoursDifference,
    });
  };


  function convertTo24HourFormat(timeString) { 
    const [time, period] = timeString.split(' '); 
    const [hour, minute] = time.split(':'); 
    let formattedHour = parseFloat(hour); 
  
    if (period === 'PM') { 
        formattedHour += 12; 
    } 
  
    return `${formattedHour}:${minute}`; 
} 
  

const formattedTime = convertTo24HourFormat(employeeData.time_out); 
console.log(formattedTime);




  useEffect(() => {
    getemployee();
  }, [id]);

  return (
    <div>
      <ToastContainer></ToastContainer>
      <BreadCrumbs />
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <FormGroup>
              <Row>
                <Col md="10">
                  <FormGroup>
                    <Label>
                      Employee Name <span className="required">*</span>
                    </Label>
                    <Input
                      type="select"
                      name="employee_id"
                      onChange={(e) => {
                        handleInputs(e);
                      }}
                    >
                      <option value="" selected>
                        Please Select
                      </option>
                      {employee &&
                        employee.map((ele) => {
                          return (
                            <option key={ele.employee_id} value={ele.employee_id}>
                              {ele.first_name}
                            </option>
                          );
                        })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md="10">
                  <Label>
                    Time In <span style={{ color: 'red' }}>*</span>
                  </Label>
                  <Input
                    name="time_in"
                    value={employeeData && employeeData.time_in}
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                    type="time"
                    
                    onBlur={calculateHours} // Calculate hours when "Time In" is changed
                  ></Input>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md="10">
                  <Label>
                    Time Out <span style={{ color: 'red' }}>*</span>
                  </Label>
                  <Input
                    name="time_out"
                    value={employeeData && employeeData.time_out}
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                    type="time"
                    onBlur={calculateHours} // Calculate hours when "Time out" is changed
                  ></Input>
                </Col>
              </Row>
            </FormGroup>

            <Row>
              <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                <Button
                  type="submit"
                  color="primary"
                  className="btn mr-2 shadow-none"
                  onClick={insertEmployee}
                >
                  Save & Continue
                </Button>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={() => {
                    navigate('/Timesheet');
                  }}
                >
                  Go to List
                </Button>
              </div>
            </Row>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default TimeSheetDetails;
