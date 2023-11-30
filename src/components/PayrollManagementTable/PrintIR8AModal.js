import React, { useState } from 'react';
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
import IR8Pdf from '../PDF/IR8APdf';

function PrintIR8AModal({ printIR8AModal, setPrintIR8AModal, payrollManagementsdata }) {
  PrintIR8AModal.propTypes = {
    printIR8AModal: PropTypes.bool,
    setPrintIR8AModal: PropTypes.func,
    payrollManagementsdata: PropTypes.array,
  };
  const [filterPeriod, setFilterPeriod] = useState({
    year: '',
  });

  const handleFilterInputs = (e) => {
    setFilterPeriod({ ...filterPeriod, [e.target.name]: e.target.value });
  };
  // Calculate the previous year and current year
  const currentYear = new Date().getFullYear();
  // const previousYear = currentYear - 1;

// Generate options for the "Year" dropdown
const yearOptions = [currentYear].map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));

  const payrolls = payrollManagementsdata.filter((e) => {
    if ( filterPeriod.year === '') {
      return payrollManagementsdata;
    }
    // if (filterPeriod.month === '' && filterPeriod.year !== '') {
    //   return e.payroll_year === Number(filterPeriod.year);
    // }
    // if (filterPeriod.month !== '' && filterPeriod.year === '') {
    //   return e.payroll_month === filterPeriod.month;
    // }

    return e.payroll_year === filterPeriod.year && e.payroll_year === Number(filterPeriod.year);
  });
  console.log('payrolls', payrolls);
  console.log('filterPeriod', filterPeriod);
  console.log('filteryear', filterPeriod.year);

  return (
    <div>
      <Modal isOpen={printIR8AModal}>
        <ModalHeader>Generate IR8A Pdf</ModalHeader>
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
                      <Input
                        name="year"
                        type="select"
                        value={filterPeriod.year}
                        onChange={handleFilterInputs}
                      >
                        <option value="">Please Select</option>
                        {yearOptions}
                        
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
           {filterPeriod.year  && <IR8Pdf 
           payrollsYear={filterPeriod.year}
            ></IR8Pdf>}
          <Button
            color="dark"
            className="shadow-none"
            onClick={() => {
              setPrintIR8AModal(false);
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

export default PrintIR8AModal;
