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
    employee_name: '',
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
  
    api
      .post('/attendance/insertAttendance1', employeeData)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        message('Employee inserted successfully.', 'success');
        setTimeout(() => {
          
          navigate(`/TimesheetEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Unable to create employee.', 'error');
      });
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
                              {ele.employee_name}
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
                    name="record_date"
                    value={employeeData && employeeData.record_date}
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                    type="text"
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
                    name="leave_time"
                    value={employeeData && employeeData.leave_time}
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                    type="text"
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
