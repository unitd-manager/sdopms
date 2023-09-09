import React from 'react';
import {
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';

function PrintPayslipModal({ printPayslipModal, setPrintPayslipModal }) {
  PrintPayslipModal.propTypes = {
    printPayslipModal: PropTypes.bool,
    setPrintPayslipModal: PropTypes.func,
  };
  return (
    <div>
      <Modal isOpen={printPayslipModal}>
        <ModalHeader>Generate All Payslip</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Col>
                <Row>
                  <Col md="3">
                    {' '}
                    <FormGroup>
                      <Label>Year</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input name="year" type="select">
                        <option value="selected">Please Select</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col md="3">
                    <FormGroup>
                      <Label>Month</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input name="month" type="select">
                        <option value="selected">Please Select</option>
                        <option value="jan">January</option>
                        <option value="feb">February</option>
                        <option value="mar">March</option>
                        <option value="apr">April</option>
                        <option value="may">May</option>
                        <option value="jun">June</option>
                        <option value="jul">July</option>
                        <option value="aug">August</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <CardBody className="shadow-none"></CardBody>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              setPrintPayslipModal(false);
            }}
          >
            {' '}
            Submit{' '}
          </Button>
          <Button
            color="dark"
            className="shadow-none"
            onClick={() => {
              setPrintPayslipModal(false);
            }}
          >
            {' '}
            Close{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PrintPayslipModal;
