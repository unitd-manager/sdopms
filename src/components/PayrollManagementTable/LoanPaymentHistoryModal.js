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
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

function LoanPaymentHistoryModal({
  loanPaymentHistoryModal,
  setLoanPaymentHistoryModal,
  loanHistories,
}) {
  LoanPaymentHistoryModal.propTypes = {
    loanPaymentHistoryModal: PropTypes.bool,
    setLoanPaymentHistoryModal: PropTypes.func,
    loanHistories: PropTypes.array,
  };

  const columns = [
    {
      name: 'Id',
    },
    {
      name: 'Type of Loan',
    },
    {
      name: 'Status',
    },
    {
      name: 'Date',
    },
    {
      name: 'Loan Start Date',
    },
    {
      name: 'Total Loan Amount',
    },
    {
      name: 'AmountPayable(permonth)',
    },
    {
      name: 'Loan Closing Date',
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
                        loanHistories.map((element) => {
                          return (
                            <tr key={element.loan_id}>
                              <td>{element.loan_id}</td>
                              <td>{element.type}</td>
                              <td>{element.status}</td>
                              <td>
                                {element.date ? moment(element.date).format('YYYY-MM-DD') : ''}
                              </td>
                              <td>
                                {element.loan_start_date
                                  ? moment(element.loan_start_date).format('YYYY-MM-DD')
                                  : ''}
                              </td>
                              <td>{element.amount}</td>
                              <td>{element.month_amount}</td>
                              <td>
                                {element.loan_closing_date
                                  ? moment(element.loan_closing_date).format('YYYY-MM-DD')
                                  : ''}
                              </td>
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
