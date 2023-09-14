import React from 'react';
import { Row, Col, Form} from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import Deductions from './Deductions';
import Earnings from './Earnings';

function EarningDeductions({
  payroll,
  handleInputs,
  handleDeductions,
  handleEarnings,
  handleOtAmount,
  setLoanPaymentHistoryModal,
  totalMonthPay,
  totalDeductions,
  otAmount
}) {
  EarningDeductions.propTypes = {
    payroll: PropTypes.object,
    handleDeductions: PropTypes.func,
    handleEarnings: PropTypes.func,
    handleInputs: PropTypes.func,
    handleOtAmount: PropTypes.func,
    setLoanPaymentHistoryModal: PropTypes.func,
    totalDeductions: PropTypes.any,
    totalMonthPay: PropTypes.any,
    otAmount: PropTypes.any,

  };
  return (
    <div>
      <Form>
        <Row>
          <Col md="6">
            <ComponentCard title="Earnings">
              <Earnings
              payroll={payroll}
              handleInputs={handleInputs}
              handleDeductions={handleDeductions}
              handleEarnings={handleEarnings}
              handleOtAmount={handleOtAmount}
              setLoanPaymentHistoryModal={setLoanPaymentHistoryModal}
              totalMonthPay={totalMonthPay}
              totalDeductions={totalDeductions}
              otAmount={otAmount}
              />
            </ComponentCard>
          </Col>
          <Col md="6">
            <ComponentCard title="Deductions">
              <Deductions
               payroll={payroll}
               handleInputs={handleInputs}
               handleDeductions={handleDeductions}
               handleEarnings={handleEarnings}
               handleOtAmount={handleOtAmount}
               setLoanPaymentHistoryModal={setLoanPaymentHistoryModal}
               totalMonthPay={totalMonthPay}
               totalDeductions={totalDeductions}
               otAmount={otAmount}
              />
            </ComponentCard>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EarningDeductions;
