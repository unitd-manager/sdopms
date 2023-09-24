import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

function LoanPaymentHistoryModal({
  loanPaymentHistoryModal,
  setLoanPaymentHistoryModal,
  loan,
  payroll,
  handleInputs,
  insertLoanRepayment,

}) {
  LoanPaymentHistoryModal.propTypes = {
    loanPaymentHistoryModal: PropTypes.bool,
    setLoanPaymentHistoryModal: PropTypes.func,
    loan: PropTypes.array,
    payroll:PropTypes.any,
    insertLoanRepayment:PropTypes.any,
    handleInputs:PropTypes.any,
  };
 

  const columns = [
    {
      name: 'SN.No',
    },
    {
      name: 'Loan Type/Date',
    },
    {
      name: 'Total Loan Amount',
    },
    {
      name: ' Total Amount Paid',
    },
    {
      name: 'Amount Paid Now',
    },
    {
      name: 'Remarks',
    },
    {
      name: 'Amount Payable',
    },
  ];
  useEffect(() => {}, []);

  return (
    <>
       <Modal isOpen={loanPaymentHistoryModal} size="xl">
          <ModalHeader>Loan Payment History</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                {/* <Card className="shadow-none">
                  <CardBody className="shadow-none"> */}
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {loan &&
                      loan.map((element, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              {element.type}/
                              {element.date ? moment(element.date).format('DD-MM-YYYY') : ''}
                            </td>
                            <td>{element.amount}</td>
                            <td>{element.total_repaid_amount}</td>
                            <td>
                              {' '}
                              <Input
                                type="text"
                                value={payroll && payroll.loan_amount}
                                onChange={handleInputs}
                                name="loan_amount"
                              ></Input>
                            </td>
                            <td>
                              <Input
                                type="textarea"
                                value={payroll && payroll.notes}
                                onChange={handleInputs}
                                name="notes"
                              ></Input>
                            </td>
                            <td>{element.amount_payable}</td>{' '}
                            {/* Display the calculated Amount Payable */}
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                {/* </CardBody>
                </Card> */}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className="shadow-none"
              color="primary"
              onClick={() => {
                insertLoanRepayment();
              }}
            >
              submit
            </Button>
            <Button
              color="dark"
              className="shadow-none"
              onClick={() => {
                setLoanPaymentHistoryModal(false);
              }}
            >
              {' '}
              Close{' '}
            </Button>
          </ModalFooter>
        </Modal>
    </>
  );
}

export default LoanPaymentHistoryModal;
