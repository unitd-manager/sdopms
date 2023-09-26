import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function TenderMoreDetails({
  tenderDetails,
  handleInputs,
  company
}) {
  TenderMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    company: PropTypes.array,
    handleInputs: PropTypes.object,
 };
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Enquiry Details" creationModificationDate={tenderDetails}>
            <Row>
            <Col md="3">
                <FormGroup>
                  <Label>
                    Title<span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
             
              <Col md="3">
                <FormGroup>
                  <Label>Enquiry No</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.opportunity_code}
                    name="opportunity_code"
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Enquiry Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.enquiry_date}
                    name="enquiry_date"
                   
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                    <Label>
                      Company Name <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      name="company_id"
                      value={tenderDetails && tenderDetails.company_id}
                      onChange={handleInputs}
                    >
                      <option>Please Select</option>
                      {company &&
                        company.map((ele) => {
                          return (
                            <option key={ele.company_id} value={ele.company_id}>
                              {ele.company_name}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Reference</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.office_ref_no}
                    name="office_ref_no"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>BID Expiry</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.project_end_date}
                    name="project_end_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Service</Label>
                  <Input
                    value={tenderDetails && tenderDetails.services}
                    type="text"
                    onChange={handleInputs}
                    name="services"
                  />
                </FormGroup>
              </Col>
                  
            

              <Col md="3">
                <FormGroup>
                  <Label>Enquiry Status</Label>
                  <Input
                    type="select"
                    value={tenderDetails && tenderDetails.status}
                    onChange={handleInputs}
                    name="status"
                  >
                      <option value="">Please Select</option>
                    <option value="Estimated">Estimated</option>
                    <option value="Approved">Approved</option>
                    <option value="Awarded">Awarded</option>
                    <option value="ConvertedtoProject">Converted to Project</option>
                    <option value="Proposal Approved">Proposal Approved</option>
                    </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}
