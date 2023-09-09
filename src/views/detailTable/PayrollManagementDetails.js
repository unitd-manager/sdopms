import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
import { Row, Col, FormGroup, Button, Form, Table } from 'reactstrap';
import moment from 'moment';
import message from '../../components/Message';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ViewAnnualLeaveModal from '../../components/ParollManagementTable/AnnualLeaveModal';
import LoanPaymentHistoryModal from '../../components/ParollManagementTable/LoanPaymentHistoryModal';
import ViewMonthlyLeaveModal from '../../components/ParollManagementTable/MonthlyLeaveModal';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import PdfPaySlip from '../../components/PDF/PdfPaySlip';
import PdfTimeSheet from '../../components/PDF/PdfTimeSheet';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import PayslipSummary from '../../components/ParollManagementTable/PayslipSummary';
import EarningDeductions from '../../components/ParollManagementTable/EarningDeductions';


function PayrollManagementDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payroll, setPayroll] = useState({
    payroll_month: '',
    payslip_start_date: '',
    payslip_end_date: '',
    payroll_year: '',
    basic_pay: '',
    ot_amount: '',
    cpf_employer: '',
    cpf_employee: '',
    payroll_management_id: '',
    mode_of_payment: '',
    pay_sinda: '',
    loan_amount: '',
    working_days_in_month: '',
    actual_working_days: '',
    notes: '',
    pay_cdac: '',
    pay_mbmf: '',
    pay_eucf: '',
    department: '',
    flag: '',
    status: '',
    cpf_account_no: '',
    govt_donation: '',
    overtime_pay_rate: '',
    allowance1: '',
    allowance2: '',
    allowance3: '',
    allowance4: '',
    allowance5: '',
    allowance6: '',
    deduction1: '',
    deduction2: '',
    deduction3: '',
    deduction4: '',
    income_tax_amount: '',
    sdl: '',
    reimbursement: '',
    director_fee: '',
    generated_date: '',
    net_total: '',
    total_basic_pay_for_month: '',
    employee_name: '',
  });
  const [annualLeaveModal, setAnnualLeaveModal] = useState(false);
  const [monthlyLeaveModal, setMonthlyLeaveModal] = useState(false);
  const [loanPaymentHistoryModal, setLoanPaymentHistoryModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [leave, setLeave] = useState([]);
  const [loan, setLoan] = useState([]);
  const [totalMonthPay, setTotalMonthPay] = useState();
  const [totalDeductions, setTotalDeductions] = useState();
  const [otAmount, setOtAmount] = useState();
  const [filteredMonthData, setFilteredMonthData] = useState([]);
  const [filteredYearData, setFilteredYearData] = useState([]);
  const [absentLeaves, setAbsentLeaves] = useState();
  const [hospitalLeaves, setHospitalLeaves] = useState();
  const [sickLeaves, setSickLeaves] = useState();
  const [annualLeaves, setAnnualLeaves] = useState();
  const [monthlyAbsentLeaves, setMonthlyAbsentLeaves] = useState();
  const [monthlyHospitalLeaves, setMonthlyHospitalLeaves] = useState();
  const [monthlySickLeaves, setMonthlySickLeaves] = useState();
  const [monthlyAnnualLeaves, setMonthlyAnnualLeaves] = useState();

  //handle inputs
  const handleInputs = (e) => {
    setPayroll({ ...payroll, [e.target.name]: e.target.value });
  
  };

  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  const calculateYearlyLeaveTypes = (arr) => {
    let leaveannual = 0;
    let leaveabsent = 0;
    let leavesick = 0;
    let leavehospital = 0;

    arr.forEach((element) => {
      if (element.leave_type === 'Annual Leave') {
        leaveannual += element.no_of_days;
      }
      if (element.leave_type === 'Hospitalization Leave') {
        leavehospital += element.no_of_days;
      }
      if (element.leave_type === 'Sick Leave') {
        leavesick += element.no_of_days;
      }
      if (element.leave_type === 'Absent') {
        leaveabsent += element.no_of_days;
      }
    });
    setAbsentLeaves(leaveabsent);
    setAnnualLeaves(leaveannual);
    setHospitalLeaves(leavehospital);
    setSickLeaves(leavesick);
  };
  const calculateMonthlyLeaveTypes = (arr) => {
    let leaveannual = 0;
    let leaveabsent = 0;
    let leavesick = 0;
    let leavehospital = 0;

    arr.forEach((element) => {
      if (element.leave_type === 'Annual Leave') {
        leaveannual += element.no_of_days;
      }
      if (element.leave_type === 'Hospitalization Leave') {
        leavehospital += element.no_of_days;
      }
      if (element.leave_type === 'Sick Leave') {
        leavesick += element.no_of_days;
      }
      if (element.leave_type === 'Absent') {
        leaveabsent += element.no_of_days;
      }
    });
    setMonthlyAbsentLeaves(leaveabsent);
    setMonthlyAnnualLeaves(leaveannual);
    setMonthlyHospitalLeaves(leavehospital);
    setMonthlySickLeaves(leavesick);
  };

  //Leaves
  const getLeaves = async () => {
    api
      .post('/payrollmanagement/getPastLeaveHistory', { employee_id: id })
      .then((res) => {
        setLeave(res.data.data);
        // getAnnualLeave(res.data.data);
      })
      .catch(() => {
        message('Unable to get leave record.', 'error');
      });
  };

  const handleOtAmount = (otRate, otHours) => {
    if (!otRate) otRate = 0;
    if (!otHours) otHours = 0;
    setOtAmount(parseFloat(otRate) * parseFloat(otHours));
  };

  // calculation earnings
  const handleDeductions = (
    loanDeduction,
    cpf,
    sDl,
    euCf,
    incomeTax,
    deductions1,
    deductions2,
    deductions3,
    deductions4,
    totalDeduction,
  ) => {
    /* eslint-disable */
    if (!totalDeduction) totalDeduction = 0;
    if (!loanDeduction) loanDeduction = 0;
    if (!cpf) cpf = 0;
    if (!sDl) sDl = 0;
    if (!incomeTax) incomeTax = 0;
    if (!deductions1) deductions1 = 0;
    if (!deductions2) deductions2 = 0;
    if (!deductions3) deductions3 = 0;
    if (!deductions4) deductions4 = 0;
    if (!euCf) euCf = 0;

    setTotalDeductions(
      parseFloat(totalDeduction) +
        parseFloat(loanDeduction) +
        parseFloat(cpf) +
        parseFloat(sDl) +
        parseFloat(incomeTax) +
        parseFloat(deductions1) +
        parseFloat(deductions2) +
        parseFloat(deductions3) +
        parseFloat(deductions4) +
        parseFloat(euCf),
    );
  
  };
  // calculation earnings
  const handleEarnings = (
    basicPay,
    otAmount,
    allowances1,
    allowances2,
    allowances3,
    allowances4,
    allowances5,
    totalMonthPay,
  ) => {
    /* eslint-disable */
    if (!basicPay) basicPay = 0;
    if (!otAmount) otAmount = 0;
    if (!allowances1) allowances1 = 0;
    if (!allowances2) allowances2 = 0;
    if (!allowances3) allowances3 = 0;
    if (!allowances4) allowances4 = 0;
    if (!allowances5) allowances5 = 0;
    if (!totalMonthPay) totalMonthPay = 0;

    setTotalMonthPay(
      parseFloat(basicPay) +
        parseFloat(otAmount) +
        parseFloat(allowances1) +
        parseFloat(allowances2) +
        parseFloat(allowances3) +
        parseFloat(allowances4) +
        parseFloat(allowances5) +
        parseFloat(totalMonthPay),
    );
  
  };

  //edit payroll
  const editPayrollData = () => {
   
    payroll.total_basic_pay_for_month = totalMonthPay;
    payroll.total_deductions = totalDeductions;
    payroll.net_total =
      parseFloat(totalMonthPay) +
      parseFloat(payroll.director_fee) +
      parseFloat(payroll.reimbursement) -
      parseFloat(totalDeductions);

    
    api
      .post('/payrollmanagement/editpayrollmanagementMain', payroll)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  //getting lastmonth first and last date
  const getlastmonthdates = () => {
   
    const lastmonthfirstdate = moment(new Date())
      .subtract(1, 'months')
      .startOf('month')
      .format('DD-MM-YYYY');
  

   
    const lastmonthlastdate = moment(new Date())
      .subtract(1, 'months')
      .endOf('month')
      .format('DD-MM-YYYY');
  
  };
  //Method for getting data by LoanId and Employee Id
  const getPreviousEarlierLoan = (empId) => {
    api
      .post('/loan/TabPreviousEarlierLoanById', { employee_id: empId })
      .then((res) => {
        setLoan(res.data.data);
      })
      .catch(() => {
        message('Loan not found', 'info');
      });
  };

  // Get payroll By Id
  const getPayroll = () => {
    api
      .post('/payrollmanagement/getpayrollmanagementById', { payroll_management_id: id })
      .then((res) => {
        setPayroll(res.data.data[0]);

        getPreviousEarlierLoan(res.data.data[0].employee_id);
      })
      .catch(() => {
        message('Loan Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getlastmonthdates();
    getPayroll();
    getLeaves();
  }, [id]);
  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const filteredMonth = leave.filter((item) => {
      const itemDate = new Date(item.from_date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1;
      return itemYear === currentYear && itemMonth === currentMonth;
    });
    const filteredYear = leave.filter((item) => {
      const itemDate = new Date(item.from_date);
      const itemYear = itemDate.getFullYear();
      // const itemMonth = itemDate.getMonth() + 1;
      return itemYear === currentYear;
    });
    setFilteredMonthData(filteredMonth);
    setFilteredYearData(filteredYear);
    calculateYearlyLeaveTypes(filteredYear);
    calculateMonthlyLeaveTypes(filteredMonth);
  }, [leave]);

  return (
    <>
      <BreadCrumbs />

      <FormGroup>
        <Row>
          <Col md="12">
            <ComponentCardV2>
              <PdfPaySlip payroll={payroll}></PdfPaySlip>
              &nbsp;&nbsp;
              <PdfTimeSheet payroll={payroll}></PdfTimeSheet>
              &nbsp;&nbsp;
              <Button
                type="submit"
                color="primary"
                className="btn shadow-none mr-2"
                onClick={() => {
                  editPayrollData();
                  navigate('/PayrollManagement');
                }}
              >
                Save{' '}
              </Button>
              &nbsp;&nbsp;
              <Button
                type="submit"
                color="primary"
                className="btn shadow-none mr-2"
                onClick={() => {
                  editPayrollData();
                }}
              >
                Apply
              </Button>
              &nbsp;&nbsp;
              <Button
                type="submit"
                color="dark"
                className="btn shadow-none mr-2"
                onClick={() => navigate(-1)}
              >
                Back to List
              </Button>
              &nbsp;&nbsp;
            </ComponentCardV2>
          </Col>
        </Row>
      </FormGroup>

      <ComponentCard title="Main Details">
        <Form>
          <FormGroup>
            <ComponentCard title="Leave Summary">
              <Row>
                <Col md="8">
                  <Table>
                    <thead>
                      <tr>
                        <td>ANNUAL LEAVE AS PER MOM</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>1st year: 7 days</span>
                        </td>
                        <td>
                          <span>2nd year: 8 days</span>
                        </td>
                        <td>
                          <span>3rd year: 9 days</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>4th year: 10 days</span>
                        </td>
                        <td>
                          <span>5th year: 11 days</span>
                        </td>
                        <td>
                          <span>6th year: 12 days</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>7th year: 13 days</span>
                        </td>
                        <td>
                          <span>8th year thereafter: 14 days</span>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table>
                    <thead>
                      <tr>
                        <td>SICK LEAVE AS PER MOM</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>After 3 months: 5 days</span>
                        </td>
                        <td>
                          <span>After 4 months: 8 days</span>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <span>After 5 months: 11 days</span>
                        </td>
                        <td>
                          <span>6 months and thereafter: 14 days</span>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md="2">
                  <Table>
                    <thead>
                      <tr>
                        <td>Total No of leave taken this year</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>
                            Annual leave :{' '}
                            <span
                              onClick={() => {
                                setAnnualLeaveModal(true);
                              }}
                            >
                              {annualLeaves}
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {' '}
                          <span>
                            Sick leave :{' '}
                            <span
                              onClick={() => {
                                setAnnualLeaveModal(true);
                              }}
                            >
                              {sickLeaves}
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {' '}
                          <span>
                            Hospitalization leave :{' '}
                            <span
                              onClick={() => {
                                setAnnualLeaveModal(true);
                              }}
                            >
                              {hospitalLeaves}
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Absent leave :{' '}
                            <span
                              onClick={() => {
                                setAnnualLeaveModal(true);
                              }}
                            >
                              {absentLeaves}
                            </span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md="2">
                  <thead>
                    <tr>
                      <td>Total No of leave taken this Month</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {' '}
                        <span>
                          Annual leave :{' '}
                          <span
                            onClick={() => {
                              setMonthlyLeaveModal(true);
                            }}
                          >
                            {monthlyAnnualLeaves}
                          </span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {' '}
                        <span>
                          Sick leave :{' '}
                          <span
                            onClick={() => {
                              setMonthlyLeaveModal(true);
                            }}
                          >
                            {monthlySickLeaves}
                          </span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {' '}
                        <span>
                          Hospitalization leave :{' '}
                          <span
                            onClick={() => {
                              setMonthlyLeaveModal(true);
                            }}
                          >
                            {monthlyHospitalLeaves}
                          </span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          Absent leave :{' '}
                          <span
                            onClick={() => {
                              setMonthlyLeaveModal(true);
                            }}
                          >
                            {monthlyAbsentLeaves}
                          </span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Col>
              </Row>
            </ComponentCard>
          </FormGroup>
        </Form>

        {annualLeaveModal && (
          <ViewAnnualLeaveModal
            annualLeaveModal={annualLeaveModal}
            setAnnualLeaveModal={setAnnualLeaveModal}
            annualLeave={filteredYearData}
          />
        )}
        {monthlyLeaveModal && (
          <ViewMonthlyLeaveModal
            monthlyLeaveModal={monthlyLeaveModal}
            setMonthlyLeaveModal={setMonthlyLeaveModal}
            monthlyLeave={filteredMonthData}
          />
        )}
        {/* Payslip summary */}

        <PayslipSummary payroll={payroll} handleInputs={handleInputs} />
        {/* Earnings and deductions table */}
        <EarningDeductions
          payroll={payroll}
          handleDeductions={handleDeductions}
          handleEarnings={handleEarnings}
          handleInputs={handleInputs}
          handleOtAmount={handleOtAmount}
          otAmount={otAmount}
          totalDeductions={totalDeductions}
          totalMonthPay={totalMonthPay}
        />
        {loanPaymentHistoryModal && (
          <LoanPaymentHistoryModal
            loanPaymentHistoryModal={loanPaymentHistoryModal}
            setLoanPaymentHistoryModal={setLoanPaymentHistoryModal}
            loanHistories={loan}
          />
        )}

        {/* Notes */}
        <Form>
          <Row>
            <ComponentCard title="Add a note">
              <AddNote recordId={id} roomName="PayrollManagement" />
              <ViewNote recordId={id} roomName="PayrollManagement" />
            </ComponentCard>
          </Row>
        </Form>
      </ComponentCard>

      {/* Attachment */}
      <Row>
        <Form>
        <ComponentCard title="Add">
          <Row>
            <Col xs="12" md="10" className="mb-3">
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  setRoomName('PayrollAttachment');
                  setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                  dataForAttachment();
                  setAttachmentModal(true);
                }}
              >
                <Icon.File className="rounded-circle" width="20" />
              </Button>
            </Col>
          </Row>
          <AttachmentModalV2
            moduleId={id}
            roomName={roomName}
            fileTypes={fileTypes}
            altTagData="Payrollmanagement"
            recordType="PayrollAttachment"
            desc="Payrollmanagement"
            modelType={attachmentData.modelType}
            attachmentModal={attachmentModal}
            setAttachmentModal={setAttachmentModal}
          />
          <ViewFileComponentV2
            moduleId={id}
            roomName="PayrollAttachment"
            recordType="PayrollAttachment"
          />
        </ComponentCard>
        </Form>
      </Row>
    </>
  );
}

export default PayrollManagementDetails;