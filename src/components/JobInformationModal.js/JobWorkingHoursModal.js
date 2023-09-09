import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import ComponentCard from '../ComponentCard';

export default function JobWorkingHoursModal({
    handleInputs, jobModal
}) {
    JobWorkingHoursModal.propTypes = {
        handleInputs: PropTypes.object,
        jobModal: PropTypes.object
  };
  return (
    <ComponentCard >
            <FormGroup>
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Label>Details of Working Hours</Label>
                    <Input
                      type="textarea"
                      onChange={handleInputs}
                      value={jobModal && jobModal.work_hour_details}
                      name="work_hour_details"  />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Rest day per Week</Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={jobModal && jobModal.rest_day_per_week}
                      name="rest_day_per_week"  />
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row title="Leave and Medical Benefits (KET)">
                <Col md="3">
                  <FormGroup>
                    <Label>Paid Annual Leave per year</Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={jobModal && jobModal.paid_annual_leave_per_year}
                      name="paid_annual_leave_per_year"  />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Paid Outpatient Sick Leave per year</Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={jobModal && jobModal.paid_outpatient_sick_leave_per_year}
                      name="paid_outpatient_sick_leave_per_year"  />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Paid Hospitalisation Leave per year</Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={jobModal && jobModal.paid_hospitalisation_leave_per_year}
                      name="paid_hospitalisation_leave_per_year"  />
                  </FormGroup>
                </Col>

                <Col md="3">
                  <FormGroup>
                    <Label> Paid medical examination fee</Label>
                    <br></br>
                    <Label> Yes </Label>
                    <Input
                      name="paid_medical_examination"
                      value="1"
                      type="radio"
                      defaultChecked={jobModal && jobModal.paid_medical_examination === 1 && true}
                      onChange={handleInputs}/>
                    <Label> No </Label>
                    <Input
                      name="paid_medical_examination"
                      value="0"
                      type="radio"
                      defaultChecked={jobModal && jobModal.paid_medical_examination === 0 && true}
                      onChange={handleInputs}  />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Label>Other types of leave</Label>
                    <Input
                      type="textarea"
                      onChange={handleInputs}
                      value={jobModal && jobModal.other_type_of_leave}
                      name="other_type_of_leave"   />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Other Medical Benefits</Label>
                    <Input
                      type="textarea"
                      onChange={handleInputs}
                      value={jobModal && jobModal.other_medical_benefits}
                      name="other_medical_benefits" />
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>
          </ComponentCard>
  );
}