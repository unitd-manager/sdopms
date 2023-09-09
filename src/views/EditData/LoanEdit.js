import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import LoanMoreDetails from '../../components/LoanTable/LoanMoreDetails';
import LoanDetailComp from '../../components/LoanTable/LoanDetailComp';
import LoanButtons from '../../components/LoanTable/LoanButton';
import ApiButton from '../../components/ApiButton';

const LoanEdit = () => {
  //All state variables
  const [loan, setLoan] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const [loanDetails, setLoanDetails] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [paymentdetails, setPaymentDetails] = useState();
  const [addpaymentModal, setAddPaymentModal] = useState(false);
  const [loanStatus, setLoanStatus] = useState();

  //  AttachmentModal
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });

  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  // TOGGLE Tab
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const addpaymentToggle = () => {
    setAddPaymentModal(!addpaymentModal);
  };

  // Button Save Apply Back List
  const applyChanges = () => {};
  const saveChanges = () => {
    if (
      loanDetails.type &&
      loanDetails.type !== '' &&
      loanDetails.amount !== '' &&
      loanDetails.month_amount !== ''
    ) {
      navigate('/Loan');
    }
  };
  const backToList = () => {
    navigate('/Loan');
  };

  //All functions/Methods

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

  // Get Loan By Id
  const getLoanById = () => {
    api
      .post('/loan/getLoanById', { loan_id: id })
      .then((res) => {
        setLoanDetails(res.data.data[0]);
        setLoanStatus(res.data.data[0].status);
        getPreviousEarlierLoan(res.data.data[0].employee_id);
      })
      .catch(() => {
        message('Loan Data Not Found', 'info');
      });
  };

  //Setting Data in Loan Details
  const handleInputs = (e) => {
    setLoanDetails({ ...loanDetails, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db
  const editLoanData = () => {
    if (
      loanDetails.type &&
      loanDetails.type !== '' &&
      loanDetails.amount !== '' &&
      loanDetails.month_amount !== ''
    ) {
      api
        .post('/loan/edit-Loan', loanDetails)
        .then(() => {
          //navigate('/Loan');
          message('Record editted successfully', 'success');
          getLoanById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  const editLoanStartData = () => {
    if (loanDetails && loanDetails.status === 'Active') {
      api
        .post('/loan/editLoanStartDate', { loan_id: id })
        .then(() => {})
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    }
  };

  const editLoanClosingData = () => {
    if (loanDetails && loanDetails.status === 'Closed') {
      api
        .post('/loan/editLoanClosingDate', { loan_id: id })
        .then(() => {})
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    }
  };

  //for deleting the data
  const deleteLoanData = () => {
    api
      .post('/loan/deleteLoan', { loan_id: id })
      .then(() => {
        message('Record deteled successfully', 'success');
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };

  //getting payment data By Loan Id
  const getPaymentById = () => {
    api
      .post('/loan/TabPaymentHistoryById', { loan_id: id })
      .then((res) => {
        setPaymentDetails(res.data.data);
      })
      .catch(() => {
        message('Loan Data Not Found', 'info');
      });
  };

  //Add payment data
  const [newpaymentData, setNewPaymentData] = useState({
    loan_id: '',
    payment_date: '',
    loan_repayment_amount_per_month: '',
    remarks: '',
  });

  const handlePaymentInputs = (e) => {
    setNewPaymentData({ ...newpaymentData, [e.target.name]: e.target.value });
  };

  const insertPayment = () => {
    newpaymentData.generated_date = moment();
    const newLoanId = newpaymentData;
    newLoanId.loan_id = id;
    api
      .post('/loan/insertLoanRepaymenthistory', newLoanId)
      .then(() => {
        message('payment inserted successfully.', 'success');
        addpaymentToggle(false);
        getPaymentById();
        // window.location.reload();
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };

  //attachment for upload file
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  useEffect(() => {
    getLoanById();
    getPaymentById();
    getPreviousEarlierLoan();
  }, [id]);

  const columns1 = [
    {
      name: '#',
    },
    {
      name: 'Date',
    },
    {
      name: 'Amount',
    },
    {
      name: 'Remarks',
    },
  ];

  return (
    <>
      <BreadCrumbs />
      <ToastContainer />

      {/* Button */}
      <LoanButtons
        applyChanges={applyChanges}
        saveChanges={saveChanges}
        editLoanData={editLoanData}
        editLoanStartData={editLoanStartData}
        editLoanClosingData={editLoanClosingData}
        navigate={navigate}
        backToList={backToList}
        deleteLoanData={deleteLoanData}
        id={id}
      ></LoanButtons>
<ApiButton
              editData={editLoanData}
              navigate={navigate}
              applyChanges={editLoanData}
              backToList={backToList}
              deleteData={deleteLoanData}
              module="Loan"
            ></ApiButton>
      {/*Main Details*/}
      <LoanDetailComp
        handleInputs={handleInputs}
        loanStatus={loanStatus}
        loanDetails={loanDetails}
      ></LoanDetailComp>

      <LoanMoreDetails
        setAttachmentModal={setAttachmentModal}
        attachmentModal={attachmentModal}
        activeTab={activeTab}
        toggle={toggle}
        id={id}
        columns1={columns1}
        dataForAttachment={dataForAttachment}
        paymentdetails={paymentdetails}
        attachmentData={attachmentData}
        addpaymentToggle={addpaymentToggle}
        handlePaymentInputs={handlePaymentInputs}
        insertPayment={insertPayment}
        newpaymentData={newpaymentData}
        addpaymentModal={addpaymentModal}
        loan={loan}
      ></LoanMoreDetails>
    </>
  );
};

export default LoanEdit;
