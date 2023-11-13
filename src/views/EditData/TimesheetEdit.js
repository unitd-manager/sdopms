import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import ApiButton from '../../components/ApiButton';

const TimesheetEdit = () => {
  const [timesheetDetails, setPurchaseOrderDetails] = useState();
  const [staffLinked, setStaffLinked] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setPurchaseOrderDetails({ ...timesheetDetails, [e.target.name]: e.target.value });
  };
  const getStaff = () => {
    api.get('/timesheet/getStaff', staffLinked).then((res) => {
      setStaffLinked(res.data.data);
    });
  };
  const editPurchaseOrderById = () => {
    api
      .post('/attendance/getAttendanceById', { attendance_id: id })
      .then((res) => {
        setPurchaseOrderDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Purchase Order Data Not Found', 'info');
      });
  };
  const editTimesheetData = () => {
    api
      .post('/attendance/editAttendance', timesheetDetails)
      .then(() => {
        message('Record edited successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  useEffect(() => {
    editPurchaseOrderById();
    getStaff();
  }, [id]);
  const backToList = () => {
    navigate('/Timesheet');
  };

  return (
    <>
      <BreadCrumbs heading={timesheetDetails && timesheetDetails.staff_id} />

      <Form>
        <FormGroup>
          <ApiButton
            editData={editTimesheetData}
            navigate={navigate}
            applyChanges={editTimesheetData}
            backToList={backToList}
            module="Timesheet"
          ></ApiButton>

          <ComponentCard title="`Details">
            <Row>
              {/* <Col md="3">
                <FormGroup>
                  <Label>Staff</Label>
                  <Input
                    type="select"
                    name="staff_id"
                    value={timesheetDetails && timesheetDetails.staff_id}
                    onChange={handleInputs}
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    {staffLinked &&
                      staffLinked.map((ele) => {
                        return <option value={ele.staff_id}>{ele.staff_name}</option>;
                      })}
                  </Input>
                </FormGroup>
              </Col> */}
              <Col md="3">
                <FormGroup>
                  <Label>Employee Name</Label>
                  <Input
                    type="text"
                    name="employee_name"
                    value={timesheetDetails && timesheetDetails.employee_name}
                    onChange={handleInputs}
                    disabled
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      timesheetDetails &&
                      moment(timesheetDetails.creation_date).format('YYYY-MM-DD')
                    }
                    name="creation_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> On Leave</Label>
                  <br></br>
                  <Label> Yes </Label>
                  <Input
                    name="on_leave"
                    value="1"
                    type="radio"
                    defaultChecked={timesheetDetails && timesheetDetails.show_title === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label> No </Label>
                  <Input
                    name="on_leave"
                    value="0"
                    type="radio"
                    defaultChecked={timesheetDetails && timesheetDetails.show_title === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
                        <Col md="3">
                <FormGroup>
                  <Label>Type Of Leave</Label>
                  <Input
                    value={timesheetDetails && timesheetDetails.type_of_leave}
                    type="select"
                    onChange={handleInputs}
                    name="type_of_leave"
                  >
                    <option value="">Please Select</option>
                    <option value="earning leave">Earning Leave</option>
                    <option value="sick leave">Sick Leave</option>
                    <option value="loss of pay">Loss of Pay</option>
                  </Input>
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                  <Label>Normal Hours</Label>
                  <Input
                    type="text"
                    value={timesheetDetails && timesheetDetails.hours}
                    onChange={handleInputs}
                    name="hours"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>OT Hours</Label>
                  <Input
                    type="text"
                    value={timesheetDetails && timesheetDetails.employee_ot_hours}
                    onChange={handleInputs}
                    name="employee_ot_hours"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>PH Hours</Label>
                  <Input
                    type="text"
                    value={timesheetDetails && timesheetDetails.employee_ph_hours}
                    onChange={handleInputs}
                    name="employee_ph_hours"
                  />
                </FormGroup>
              </Col> */}
             
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Time in (HH:MM)</Label>
                  <Input
                    type="textarea"
                    value={timesheetDetails && timesheetDetails.time_in}
                    onChange={handleInputs}
                    name="time_in"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Time out (HH:MM)</Label>
                  <Input
                    type="textarea"
                    value={timesheetDetails && timesheetDetails.leave_time}
                    onChange={handleInputs}
                    name="leave_time"
                  />
                </FormGroup>
              </Col>
              
              <Col md="3">
                <FormGroup>
                  <Label>Time in1 (HH:MM)</Label>
                  <Input
                    type="textarea"
                    value={timesheetDetails && timesheetDetails.time_in1}
                    onChange={handleInputs}
                    name="time_in1"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Time out1 (HH:MM)</Label>
                  <Input
                    type="textarea"
                    value={timesheetDetails && timesheetDetails.leave_time1}
                    onChange={handleInputs}
                    name="leave_time1"
                  />
                </FormGroup>
              </Col>
              {/* Display the calculated hours */}
            {/* <FormGroup>
              <Row>
                <Col md="10">
                  <Label>
                    Hours Difference
                  </Label>
                  <Input
                    name="hours"
                    value={timesheetDetails && timesheetDetails.hours}
                    type="text"
                    readOnly
                  ></Input>
                </Col>
              </Row>
            </FormGroup> */}

              <Col md="3">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    value={timesheetDetails && timesheetDetails.description}
                    onChange={handleInputs}
                    name="description"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Created By</Label>
                  <Input
                    type="text"
                    value={timesheetDetails && timesheetDetails.created_by}
                    onChange={handleInputs}
                    name="created_by"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Modified By</Label>
                  <Input
                    type="text"
                    value={timesheetDetails && timesheetDetails.modified_by}
                    onChange={handleInputs}
                    name="modified_by"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default TimesheetEdit;
