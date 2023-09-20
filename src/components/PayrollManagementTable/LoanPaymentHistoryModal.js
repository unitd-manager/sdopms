import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
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
  loanHistories,
  payroll,
  editPayrollData,
  handleInputs,

}) {
  LoanPaymentHistoryModal.propTypes = {
    loanPaymentHistoryModal: PropTypes.bool,
    setLoanPaymentHistoryModal: PropTypes.func,
    loanHistories: PropTypes.array,
    payroll:PropTypes.any,
    editPayrollData:PropTypes.any,
    handleInputs:PropTypes.any,
  };
  const [loanAmount, setLoanAmount] = useState(''); // State for loan_amount input field
  const [amountPayable, setAmountPayable] = useState(0); // State for Amount Payable


  const calculateAmountPayable = () => {
    const loanAmountValue = parseFloat(loanAmount || 0);
    const totalAmountPaid = parseFloat(loanHistories[0].total_repaid_amount || 0);
    const newAmountPayable = totalAmountPaid - loanAmountValue;
    setAmountPayable(newAmountPayable);
  };
  
  useEffect(() => {
    calculateAmountPayable(); // Initial calculation
  }, [loanAmount]); // State for notes text area

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
              <Card className="shadow-none">
                <CardBody className="shadow-none">
                  <Table id="example" className="display border border-secondary rounded">
                    <thead>
                      <tr>
                        {columns.map((cell) => {
                          return <td key={cell.name}>{cell.name}</td>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {loanHistories &&
                        loanHistories.map((element, index) => {
                          return (
                            <tr key={element.loan_id}>
                              <td>{index + 1}</td>
                              <td>
                                {element.type}/
                                {element.date ? moment(element.date).format('YYYY-MM-DD') : ''}
                              </td>
                              <td>{element.amount}</td>
                              <td>{element.total_repaid_amount}</td>
                              <td>
                                {' '}
                                <Input
                                  type="text"
                                  value={payroll && loanAmount.loan_amount}
                                  onChange={(e) => setLoanAmount(e.target.value)}
                                ></Input>
                              </td>
                              <td>
                                <Input
                                  type="textarea"
                                  value={payroll && payroll.notes}
                                  onChange={handleInputs}
                                ></Input>
                              </td>
                              <td>{amountPayable}</td> {/* Display the calculated Amount Payable */}
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              editPayrollData();
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
