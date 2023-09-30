import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';

export default function JobProbation({ handleInputsJobInformation, job }) {
  JobProbation.propTypes = {
    handleInputsJobInformation: PropTypes.any,
    job: PropTypes.any,
  };
 
  // Function to handle status change
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    handleInputsJobInformation(e); // Update the status in the job object

    if (selectedStatus === 'archive') {
      // If the status is "archive," show an alert
      Swal.fire({
        title: 'Enter Termination Record',
        text: 'Please enter termination records before saving.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  };
  return (
      <FormGroup>
        <Row>
          <Col md="4">
            <FormGroup>
              <Label> Under Probation</Label>
              <br></br>
              <Label> Yes </Label>
              <Input
                name="probationary"
                value="1"
                type="radio"
                defaultChecked={job && job.probationary === 1 && true}
                onChange={handleInputsJobInformation}
              />
              &nbsp;
              &nbsp;
              <Label> No </Label>
              <Input
                name="probationary"
                value="0"
                type="radio"
                defaultChecked={job && job.probationary === 0 && true}
                onChange={handleInputsJobInformation}
              />
            </FormGroup>
          </Col>
          {job && job.probationary === '1' && (
            <Col md="4">
              <FormGroup>
                <Label>Length of Probation</Label>
                <Input
                  type="text"
                  onChange={handleInputsJobInformation}
                  value={job && job.length_of_probation}
                  name="length_of_probation"
                />
              </FormGroup>
            </Col>
          )}
          {job && job.probationary === '1' && (
            <Col md="4">
              <Label>Probation Start Date</Label>
              <Input
                type="date"
                onChange={handleInputsJobInformation}
                value={job && moment(job.probation_start_date).format('YYYY-MM-DD')}
                name="probation_start_date"
              />
            </Col>
          )}
          {job && job.probationary === '1' && (
            <Col md="4">
              <Label>Probation End Date</Label>
              <Input
                type="date"
                onChange={handleInputsJobInformation}
                value={job && moment(job.probation_end_date).format('YYYY-MM-DD')}
                name="probation_end_date"
              />
            </Col>
          )}

          <Col md="4">
            <FormGroup>
              <Label>Employment Type</Label>
              <Input
                type="select"
                value={job && job.emp_type}
                name="emp_type"
                onChange={handleInputsJobInformation}
              >
                <option defaultValue="selected">Please Select</option>
                <option value="full time">Full Time</option>
                <option value="part time">Part Time</option>
                <option value="contract">Contract</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label>Designation</Label>
              <Input
                type="select"
                value={job && job.designation}
                name="designation"
                onChange={handleInputsJobInformation}
              >
                <option defaultValue="selected">Please Select</option>
                <option value="super visor">Super Visor </option>
                <option value="employee">Employee </option>
                <option value="manager">Manager </option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label>Department</Label>
              <Input
                type="select"
                value={job && job.department}
                name="department"
                onChange={handleInputsJobInformation}
              >
                <option defaultValue="selected">Please Select</option>
                <option value="civil">Civil</option>
                <option value="mehanic">Mehanic</option>
                <option value="engineer">Engineer</option>
              </Input>
            </FormGroup>
          </Col>

          <Col md="4">
            <FormGroup>
              <Label>
                Joined/Arrival Date<span className="required"> *</span>{' '}
              </Label>
              <Input
                type="date"
                onChange={handleInputsJobInformation}
                value={job && moment(job.join_date).format('YYYY-MM-DD')}
                name="join_date"
              />
            </FormGroup>
          </Col>
          <Col md="4">
          <FormGroup>
            <Label>Status</Label>
            <Input
              type="select"
              defaultValue={job && job.status}
              name="status"
              onChange={handleStatusChange}
            >
              <option>Please Select</option>
              <option value="current" selected={job && job.status === 'current'}>
                Current
              </option>
              <option value="archive" selected={job && job.status === 'archive'}>
                Archive
              </option>
              <option value="cancel" selected={job && job.status === 'cancel'}>
                Cancel
              </option>
            </Input>
           
          </FormGroup>
        </Col>
        </Row>
      </FormGroup>
  );
}
