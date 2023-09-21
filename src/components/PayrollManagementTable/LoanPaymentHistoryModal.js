import React, { useEffect } from 'react';
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
Form,
FormGroup,Label,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';


function LoanPaymentHistoryModal({
  loanPaymentHistoryModal,
  setLoanPaymentHistoryModal,
  loanHistories,
  payroll,
  editPayrollData,
  handleInputs,
  handleLoanInputs,
  updatedata,
}) {
  LoanPaymentHistoryModal.propTypes = {
    loanPaymentHistoryModal: PropTypes.bool,
    setLoanPaymentHistoryModal: PropTypes.func,
    loanHistories: PropTypes.array,
    payroll: PropTypes.any,
    editPayrollData: PropTypes.any,
    handleInputs: PropTypes.any,
    handleLoanInputs: PropTypes.any,
    updatedata: PropTypes.any,
  };
  // const [loanAmount, setLoanAmount] = useState(''); // State for loan_amount input field
  //const [amountPayable, setAmountPayable] = useState(0); // State for Amount Payable

  // const calculateAmountPayable = () => {
  //   const loanAmountValue = parseFloat(loanAmount || 0);
  //   const totalAmountPaid = parseFloat(loanHistories[0].total_repaid_amount || 0);
  //   const newAmountPayable = totalAmountPaid - loanAmountValue;
  //   setAmountPayable(newAmountPayable);
  // };

  // useEffect(() => {
  //   calculateAmountPayable(); // Initial calculation
  // }, [loanAmount]); // State for notes text area


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
                  <Form>
                    <FormGroup>
                      <ComponentCard
                       
                      >
                        <Row>
                          <Col md="3">
                            <FormGroup>
                              <Label>
                                Title<span className="required">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="title"
                                value={loanHistories && loanHistories.title}
                                onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label>
                                Amount<span className="required">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="amount"
                                value={loanHistories && loanHistories.amount}
                                onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label>
                                type<span className="required">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="type"
                                value={loanHistories && loanHistories.type}
                                onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>{' '}
                          <Input
                            type="text"
                            value={payroll && payroll.loan_amount}
                            onChange={handleInputs}
                            name="loan_amount"
                          ></Input>
                          <Input
                            type="textarea"
                            value={payroll && payroll.notes}
                            onChange={handleInputs}
                            name="notes"
                          ></Input>
                          <Input
                            type="text"
                            value={payroll && payroll.loan_repayment_amount_per_month}
                            onChange={handleLoanInputs}
                            name="loan_repayment_amount_per_month"
                          ></Input>
                        </Row>
                      </ComponentCard>
                    </FormGroup>
                  </Form>
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
              updatedata();
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
