import React from 'react'
import { Row,Col,Form,Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

function EarningDeductions({payroll,handleInputs,handleDeductions,handleEarnings,handleOtAmount,setLoanPaymentHistoryModal,totalMonthPay,totalDeductions,otAmount}) {
    EarningDeductions.propTypes={
        payroll:PropTypes.object,
        handleDeductions:PropTypes.func,
        handleEarnings:PropTypes.func,
        handleInputs:PropTypes.func,
        handleOtAmount:PropTypes.func,
        setLoanPaymentHistoryModal:PropTypes.func,
        totalDeductions:PropTypes.any,
        totalMonthPay:PropTypes.any,
        otAmount:PropTypes.any
    }
    return (
    <div>
           <Form>
          <Row>
            <Col md="6">
              <ComponentCard title="Earnings">
                <Row>
                  <Col md="9">Gross Pay</Col>{' '}
                  <Col md="3">
                    <Input
                    disabled
                      name="basic_pay"
                      type="text"
                      value={payroll && payroll.basic_pay}
                      onChange={(e) => {
                        handleInputs(e);
                        handleEarnings(
                          e.target.value,
                          payroll.ot_amount,
                          payroll.allowance1,
                          payroll.allowance2,
                          payroll.allowance3,
                          payroll.allowance4,
                          payroll.allowance5,
                          payroll.total_basic_pay_for_month,
                        );
                      }}
                    />
                  </Col>{' '}
                </Row>
                <Row>
                  <Col md="9">Overtime Pay Rate/ Hour</Col>
                  <Col md="3">
                    <Input
                      name="overtime_pay_rate"
                      type="text"
                      value={payroll && payroll.overtime_pay_rate}
                      disabled
                      onChange={handleInputs}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">OT Hours</Col>
                  <Col md="3">
                    <Input
                      name="ot_hours"
                      type="text"
                      value={payroll && payroll.ot_hours}
                      onChange={(e) => {
                        handleInputs(e);
                        handleOtAmount(e.target.value, payroll.overtime_pay_rate);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Overtime Amount</Col>
                  <Col md="3">
                    <Input
                      name="ot_amount"
                      type="text"
                      value={otAmount || payroll && payroll.ot_amount}
                      onChange={(e) => {
                        handleInputs(e);
                        handleEarnings(
                          e.target.value,
                          payroll.basic_pay,
                          payroll.allowance1,
                          payroll.allowance2,
                          payroll.allowance3,
                          payroll.allowance4,
                          payroll.allowance5,
                          payroll.total_basic_pay_for_month,
                        );
                      }}
                      disabled
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Transport</Col>
                  <Col md="3">
                    <Input
                      name="allowance1"
                      type="text"
                      value={payroll && payroll.allowance1}
                      onChange={(e) => {
                        handleInputs(e);
                        handleEarnings(
                          e.target.value,
                          payroll.basic_pay,
                          payroll.ot_amount,
                          payroll.allowance2,
                          payroll.allowance3,
                          payroll.allowance4,
                          payroll.allowance5,
                          payroll.total_basic_pay_for_month,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Entertainment</Col>
                  <Col md="3">
                    <Input
                      name="allowance2"
                      type="text"
                      value={payroll && payroll.allowance2}
                      onChange={(e) => {
                        handleInputs(e);
                        handleEarnings(
                          e.target.value,
                          payroll.basic_pay,
                          payroll.allowance1,
                          payroll.ot_amount,
                          payroll.allowance3,
                          payroll.allowance4,
                          payroll.allowance5,
                          payroll.total_basic_pay_for_month,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Food</Col>
                  <Col md="3">
                    <Input
                      name="allowance3"
                      type="text"
                      value={payroll && payroll.allowance3}
                      onChange={(e) => {
                        handleInputs(e);
                        handleEarnings(
                          e.target.value,
                          payroll.basic_pay,
                          payroll.allowance1,
                          payroll.allowance2,
                          payroll.ot_amount,
                          payroll.allowance4,
                          payroll.allowance5,
                          payroll.total_basic_pay_for_month,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Shift Allowance</Col>
                  <Col md="3">
                    <Input
                      name="allowance4"
                      type="text"
                      value={payroll && payroll.allowance4}
                      onChange={(e) => {
                        handleInputs(e);
                        handleEarnings(
                          e.target.value,
                          payroll.basic_pay,
                          payroll.allowance1,
                          payroll.allowance2,
                          payroll.allowance3,
                          payroll.ot_amount,
                          payroll.allowance5,
                          payroll.total_basic_pay_for_month,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Others</Col>
                  <Col md="3">
                    <Input
                      name="allowance5"
                      type="text"
                      value={payroll && payroll.allowance5}
                      onChange={(e) => {
                        handleInputs(e);
                        handleEarnings(
                          e.target.value,
                          payroll.basic_pay,
                          payroll.allowance1,
                          payroll.allowance2,
                          payroll.allowance3,
                          payroll.allowance4,
                          payroll.ot_amount,
                          payroll.total_basic_pay_for_month,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">
                    <b>Gross Pay</b>
                  </Col>
                  <Col md="3">
                    <Input
                      name="total_basic_pay_for_month"
                      type="text"
                      value={ totalMonthPay || payroll.total_basic_pay_for_month}
                      onChange={(e) => {
                        handleInputs(e);
                        handleEarnings(
                          e.target.value,
                          payroll.basic_pay,
                          payroll.allowance1,
                          payroll.allowance2,
                          payroll.allowance3,
                          payroll.allowance4,
                          payroll.allowance5,
                          payroll.ot_amount,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">
                    <b>Other Additional Payment</b>
                  </Col>
                  <Col md="3"></Col>
                </Row>
                <Row>
                  <Col md="9">Reimbursement</Col>
                  <Col md="3">
                    <Input
                      name="reimbursement"
                      type="text"
                      value={payroll && payroll.reimbursement}
                      onChange={handleInputs}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Director Fees</Col>
                  <Col md="3">
                    <Input
                      name="director_fee"
                      type="text"
                      value={payroll && payroll.director_fee}
                      onChange={handleInputs}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">
                    <b>NET PAY</b>
                  </Col>
                  <Col md="3"></Col>
                </Row>
              </ComponentCard>
            </Col>
            <Col md="6">
              <ComponentCard title="Deductions">
                <Row>
                  <Col md="9">CPF-Employee</Col>
                  <Col md="3">
                    <Input
                    disabled
                      name="cpf_employee"
                      type="text"
                      value={payroll && payroll.cpf_employee}
                      onChange={(e) => {
                        handleInputs(e);
                        handleDeductions(
                          e.target.value,
                          payroll.income_tax_amount,
                          payroll.loan_amount,
                          payroll.deduction1,
                          payroll.deduction2,
                          payroll.deduction3,
                          payroll.deduction4,
                          payroll.sdl,
                          payroll.pay_eucf,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9"> SDL</Col>
                  <Col md="3">
                    <Input
                      name="sdl"
                      type="text"
                      value={payroll && payroll.sdl}
                      onChange={(e) => {
                        handleInputs(e);
                        handleDeductions(
                          e.target.value,
                          payroll.income_tax_amount,
                          payroll.loan_amount,
                          payroll.deduction1,
                          payroll.deduction2,
                          payroll.deduction3,
                          payroll.deduction4,
                          payroll.cpf_employee,
                          payroll.pay_eucf,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">
                    Advance / Loan{' '}
                    <span
                      onClick={() => {
                        setLoanPaymentHistoryModal(true);
                      }}
                    >
                      View loan breakup
                    </span>
                  </Col>
                  <Col md="3">
                    <Input
                      name="loan_deduction"
                      type="text"
                      value={payroll && payroll.loan_deduction}
                      onChange={(e) => {
                        handleInputs(e);
                        handleDeductions(
                          e.target.value,
                          payroll.income_tax_amount,
                          payroll.cpf_employee,
                          payroll.deduction1,
                          payroll.deduction2,
                          payroll.deduction3,
                          payroll.deduction4,
                          payroll.sdl,
                          payroll.pay_eucf,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Income Tax</Col>
                  <Col md="3">
                    <Input
                      name="income_tax_amount"
                      type="text"
                      value={payroll && payroll.income_tax_amount}
                      onChange={(e) => {
                        handleInputs(e);
                        handleDeductions(
                          e.target.value,
                          payroll.cpf_employee,
                          payroll.loan_amount,
                          payroll.deduction1,
                          payroll.deduction2,
                          payroll.deduction3,
                          payroll.deduction4,
                          payroll.sdl,
                          payroll.pay_eucf,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Housing</Col>
                  <Col md="3">
                    <Input
                      name="deduction1"
                      type="text"
                      value={payroll && payroll.deduction1}
                      onChange={(e) => {
                        handleInputs(e);
                        handleDeductions(
                          e.target.value,
                          payroll.income_tax_amount,
                          payroll.loan_amount,
                          payroll.cpf_employee,
                          payroll.deduction2,
                          payroll.deduction3,
                          payroll.deduction4,
                          payroll.sdl,
                          payroll.pay_eucf,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Transportation</Col>
                  <Col md="3">
                    <Input
                      name="deduction2"
                      type="text"
                      value={payroll && payroll.deduction2}
                      onChange={(e) => {
                        handleInputs(e);
                        handleDeductions(
                          e.target.value,
                          payroll.income_tax_amount,
                          payroll.loan_amount,
                          payroll.deduction1,
                          payroll.cpf_employee,
                          payroll.deduction3,
                          payroll.deduction4,
                          payroll.sdl,
                          payroll.pay_eucf,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Others</Col>
                  <Col md="3">
                    <Input
                      name="deduction3"
                      type="text"
                      value={payroll && payroll.deduction3}
                      onChange={(e) => {
                        handleInputs(e);
                        handleDeductions(
                          e.target.value,
                          payroll.income_tax_amount,
                          payroll.loan_amount,
                          payroll.deduction1,
                          payroll.deduction2,
                          payroll.cpf_employee,
                          payroll.deduction4,
                          payroll.sdl,
                          payroll.pay_eucf,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">Food</Col>
                  <Col md="3">
                    <Input
                      name="deduction4"
                      type="text"
                      value={payroll && payroll.deduction4}
                      onChange={(e) => {
                        handleInputs(e);
                        handleDeductions(
                          e.target.value,
                          payroll.income_tax_amount,
                          payroll.loan_amount,
                          payroll.deduction1,
                          payroll.deduction2,
                          payroll.deduction3,
                          payroll.cpf_employee,
                          payroll.sdl,
                          payroll.pay_eucf,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">
                    <br></br>
                  </Col>
                  <Col md="3"></Col>
                </Row>
                <Row>
                  <Col md="9">Pay EUCF</Col>
                  <Col md="3">
                    <Input
                      name="pay_eucf"
                      type="text"
                      value={payroll && payroll.pay_eucf}
                      onChange={(e) => {
                        handleInputs(e);
                        handleDeductions(
                          e.target.value,
                          payroll.income_tax_amount,
                          payroll.loan_amount,
                          payroll.deduction1,
                          payroll.deduction2,
                          payroll.deduction3,
                          payroll.deduction4,
                          payroll.sdl,
                          payroll.cpf_employee,
                        );
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9">
                    <b>Total Deductions</b>
                  </Col>
                  <Col md="3">
                    <Input
                    disabled
                      name="total_deductions"
                      type="text"
                      value={ totalDeductions || payroll.total_deductions}
                      onChange={handleInputs}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="9"></Col>
                  <Col md="3"></Col>
                </Row>
                <Row>
                  <Col md="9"></Col>
                  <Col md="3">
                    <Input name="" type="text" onChange={handleInputs} />
                  </Col>
                </Row>
                <Row>
                  <Col md="9"></Col>
                  <Col md="3">
                    <Input name="" type="text" onChange={handleInputs} />
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <Input value={payroll && payroll.net_total} disabled />
                  </Col>
                  <Col md="3"></Col>
                </Row>
              </ComponentCard>
            </Col>
          </Row>
        </Form>
    </div>
  )
}

export default EarningDeductions