import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

function WorkSheetDetails({ worksheet, handleInputs }) {
  WorkSheetDetails.propTypes = {
    worksheet: PropTypes.object,
    handleInputs: PropTypes.func,

  };

  return (
    <div>
      <Form>
        <FormGroup>
          <ComponentCard title="Salary Based On WorkDone List">
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>
                    Group Code{' '}
                    <span className="required" style={{ color: 'red' }}>
                      {' '}
                      *
                    </span>
                  </Label>
                  <Input
                    type="text"
                    value={worksheet && worksheet.disabled}
                    onChange={handleInputs}
                    name=""
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                   Employee Name{' '}
                    <span className="required" style={{ color: 'red' }}>
                      {' '}
                      *
                    </span>
                  </Label>
                  <Input
                    type="text"
                    value={worksheet && worksheet.first_name}
                    onChange={handleInputs}
                    name="employee_name"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>                               
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={worksheet && moment(worksheet.date).format('YYYY-MM-DD')}
                    name="date"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>                               
                  <Label>Total Amount</Label>
                  <Input
                    type="text"
                    value={worksheet && worksheet.actual_total_amount}
                    name="actual_total_amount"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>                               
                  <Label>Share Per Head</Label>
                  <Input
                    type="text"
                    value={worksheet && worksheet.share_per_head}
                    name="share_per_head"
                    disabled
                  />
                </FormGroup>
              </Col>
              {/* <Col md="4">
                <FormGroup>
                  <Label>Working Days in Month</Label>e4e
                  <Input
                    type="text"
                    value={workingDaysInMonth}
                    onChange={handleInputs}
                    name="working_days_in_month"
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Actual worked days in month</Label>
                  <Input
                    type="text"
                    value={payroll && payroll.actual_working_days}
                    onChange={handleInputs}
                    name="actual_working_days"
                  />
                  {/* <div className="text-danger">{errorMessage}</div> 
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Mode Of Payment</Label>
                  <Input
                    type="select"
                    value={payroll && payroll.mode_of_payment}
                    onChange={handleInputs}
                    name="mode_of_payment"
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="cheque">cheque</option>
                    <option value="cash">cash</option>
                    <option value="giro">giro payment transfer</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Employee Name(DOB)</Label>
                  <Input
                    type="text"
                    value={
                      payroll && payroll.employee_name
                        ? payroll && payroll.employee_name
                        : payroll && payroll.employee_name
                    }
                    onChange={handleInputs}
                    name="employee_name"
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Generated Date</Label>
                  <Input
                    type="Date"
                    value={moment(payroll && payroll.generated_date).format('YYYY-MM-DD')}
                    onChange={handleInputs}
                    name="generated_date"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Basic Pay</Label>
                  <Input
                    type="text"
                    value={payroll && payroll.basic_pay}
                    onChange={handleInputs}
                    name="basic_pay"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={payroll && payroll.status}
                    name="status"
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="paid">Paid</option>
                    <option value="approved">Approved</option>
                    <option value="generated">Generated</option>
                    <option value="hold">Hold</option>
                    <option value="cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col> */}
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}

export default WorkSheetDetails;
