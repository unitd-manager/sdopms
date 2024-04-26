import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const CreateReceipt = ({ createInvoice, handleInserts }) => {
  CreateReceipt.propTypes = {
    createInvoice: PropTypes.object,
    handleInserts: PropTypes.func,
  };
  return (
    <>
      <Col md="4">
        <FormGroup>
          <Label>Discount</Label>
          <Input
            type="number"
            onChange={handleInserts}
            value={createInvoice && createInvoice.discount}
            name="discount"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>PO Number</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.po_number}
            name="po_number"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Project Location</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.project_location}
            name="project_location"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Project Reference</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.project_reference}
            name="project_reference"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Invoice date</Label>
          <Input
            type="date"
            onChange={handleInserts}
            value={createInvoice && createInvoice.invoice_date}
            name="invoice_date"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label> Job Code</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.job_code}
            name="job_code"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Revision</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.revision}
            name="revision"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>WO NO</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.wo_no}
            name="wo_no"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Dept NO</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.dept_no}
            name="dept_no"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Dept Name</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.dept_name}
            name="dept_name"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Attention</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.attention}
            name="attention"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Job Scope</Label>
          <Input
            type="textarea"
            onChange={handleInserts}
            value={createInvoice && createInvoice.job_scope}
            name="job_scope"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Invoice Terms</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.invoice_terms}
            name="invoice_terms"
          />
        </FormGroup>
      </Col>
    </>
  );
};

export default CreateReceipt;
