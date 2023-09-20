import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
import { Row, Col, FormGroup, Button, Form } from 'reactstrap';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import LoanPaymentHistoryModal from '../../components/PayrollManagementTable/LoanPaymentHistoryModal';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import PdfPaySlip from '../../components/PDF/PdfPaySlip';
import PdfTimeSheet from '../../components/PDF/PdfTimeSheet';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import PayslipSummary from '../../components/PayrollManagementTable/PayslipSummary';
import EarningDeductions from '../../components/PayrollManagementTable/EarningDeductions';
import PayrollLeaveSummary from '../../components/PayrollManagementTable/PayrollLeaveSummary';


function PayrollManagementDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payroll, setPayroll] = useState({
    payroll_month: '',
    payslip_start_date: '',
    payslip_end_date: '',
    payroll_year: '',
    basic_pay: '',
    ot_hours:'',
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

  const [loanPaymentHistoryModal, setLoanPaymentHistoryModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [loan, setLoan] = useState([]);
  const [totalMonthPay, setTotalMonthPay] = useState();
  const [totalDeductions, setTotalDeductions] = useState();
  const [otAmount, setOtAmount] = useState();
  const [update, setUpdate] = useState(false);
  const[leave,setLeave]=useState([])
  const [editTotalDeduction, setEditTotalDeduction] = useState(false);
  //handle inputs
  const handleInputs = (e) => {
    setPayroll({ ...payroll, [e.target.name]: e.target.value });
  };

  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
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
    cdac,
    mbmf,
    sinda,
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
    if (!sinda) sinda = 0;
    if (!cdac) cdac = 0;
    if (!mbmf) mbmf = 0;

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
        parseFloat(euCf)+
        parseFloat(cdac)+
        parseFloat(sinda)+
        parseFloat(mbmf),
    );
    setEditTotalDeduction(true)
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


  // Calculate and update Gross Pay whenever relevant fields change
  useEffect(() => {
    const basicPay = parseFloat(payroll.basic_pay) || 0;
    const allowance1 = parseFloat(payroll.allowance1) || 0;
    const allowance2 = parseFloat(payroll.allowance2) || 0;
    const allowance3 = parseFloat(payroll.allowance3) || 0;
    const allowance4 = parseFloat(payroll.allowance4) || 0;
    const allowance5 = parseFloat(payroll.allowance5) || 0;
    const otAmountValue = parseFloat(otAmount || (payroll && payroll.ot_amount)) || 0;

    const newGrossPay =
      basicPay +
      allowance1 +
      allowance2 +
      allowance3 +
      allowance4 +
      allowance5 +
      otAmountValue;

      setTotalMonthPay(newGrossPay);
  }, [payroll.basic_pay, payroll.allowance1, payroll.allowance2, payroll.allowance3, payroll.allowance4, payroll.allowance5, otAmount || (payroll && payroll.ot_amount)]);



  //edit payroll
  const editPayrollData = () => {
    payroll.total_basic_pay_for_month = totalMonthPay;
    if(editTotalDeduction){
      payroll.total_deductions = totalDeductions;
    }
    
    payroll.net_total =
      parseFloat(totalMonthPay) +
      parseFloat(payroll.director_fee) +
      parseFloat(payroll.reimbursement) -
      parseFloat(totalDeductions);
      payroll.ot_amount = otAmount;
    api
      .post('/payrollmanagement/editpayrollmanagementMain', payroll)
      .then(() => {
        message('Record editted successfully', 'success');
        navigate(`/PayrollManagement?month=${payroll.payroll_month}&year=${payroll.payroll_year}`);
        getPayroll();
        setEditTotalDeduction(false)
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
        setEditTotalDeduction(false)
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
      .post('/payrollmanagement/TabPreviousEarlierLoanById', { employee_id: empId })
      .then((res) => {
        setLoan(res.data.data);
        setOtAmount(res.data.data[0].ot_amount);
        
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
        getLeaves(res.data.data[0].employee_id)
      })
      .catch(() => {
        //message('Loan Data Not Found', 'info');
      });
  };

  const getLeaves = async (empid) => {
    api
      .post('/payrollmanagement/getPastLeaveHistory', { employee_id: empid })
      .then((res) => {
        setLeave(res.data.data);
      })
      .catch(() => {
        message('Unable to get leave record.', 'error');
      });
  };

  useEffect(() => {
    getlastmonthdates();
    getPayroll();
  }, [id]);

  return (
    <>
      <BreadCrumbs />

      <FormGroup>
      <ToastContainer/>
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
                  setTimeout(()=>{
                    navigate('/PayrollManagement');
                  },1000)
                 
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
                onClick={() =>navigate(`/PayrollManagement?month=${payroll.payroll_month}&year=${payroll.payroll_year}`)}
              >
                Back to List
              </Button>
              &nbsp;&nbsp;
            </ComponentCardV2>
          </Col>
        </Row>
      </FormGroup>

      <ComponentCard title="Main Details">
        <PayrollLeaveSummary leave={leave}/>

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
          setLoanPaymentHistoryModal={setLoanPaymentHistoryModal}
        />
        {loanPaymentHistoryModal && (
          <LoanPaymentHistoryModal
            loanPaymentHistoryModal={loanPaymentHistoryModal}
            setLoanPaymentHistoryModal={setLoanPaymentHistoryModal}
            loanHistories={loan}
            payroll={payroll}
            editPayrollData={editPayrollData}
            handleInputs={handleInputs}
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
              update={update}
              setUpdate={setUpdate}
            />
            <ViewFileComponentV2
              moduleId={id}
              roomName="PayrollAttachment"
              recordType="PayrollAttachment"
              update={update}
              setUpdate={setUpdate}
            />
          </ComponentCard>
        </Form>
      </Row>
    </>
  );
}

export default PayrollManagementDetails;
