import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form,FormGroup } from 'reactstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import LoanMoreDetails from '../../components/LoanTable/LoanMoreDetails';
import LoanDetailComp from '../../components/LoanTable/LoanDetailComp';
//import ComponentCardV2 from '../../components/ComponentCardV2';
//import LoanButtons from '../../components/LoanTable/LoanButton';
import ApiButton from '../../components/ApiButton';

const LoanEdit = () => {
  //All state variables
  const [loan, setLoan] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const [loanDetails, setLoanDetails] = useState([]);
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

  const addpaymentToggle = () => {
    setAddPaymentModal(!addpaymentModal);
  };

  // Button Save Apply Back List
  //const applyChanges = () => {};
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
  const [recordEdited, setRecordEdited] = useState(false); // Add this state variable

  // ...

  // Edit loan data
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
          if (loanDetails && loanDetails.status === 'Active') {
            api.post('/loan/editLoanStartDate', { loan_id: id });
            getLoanById();
          }
          if (!recordEdited) {
            message('Record edited successfully', 'success');
            setRecordEdited(true); // Set the state variable to true to indicate that the message has been shown
          }
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  useEffect(() => {
    // Check if the amount_payable becomes 0 and the closing date is not already set
    if (loanDetails.amount_payable === 0 && !loanDetails.loan_closing_date) {
      // Create the closing date as the current date
      const closingDate = moment().format('YYYY-MM-DD');

      // Update the loanDetails with the closing date
      // When amount_payable becomes 0, change the status to 'Closed'

      setLoanDetails({
        ...loanDetails,
        loan_closing_date: closingDate,
        status: 'Closed',
      });

      api
        .post('/loan/editLoanClosingDate', { loan_id: id, closing_date: closingDate })
        .then(() => {
          // Handle the API call success
          console.log('Loan closing date updated successfully.');
        })
        .catch((error) => {
          // Handle the API call error
          console.error('Failed to update loan closing date:', error);
        });
    }
  }, [loanDetails.amount_payable, loanDetails.loan_closing_date, loanDetails.status]);

  // const editLoanClosingData = () => {
  //   if (loanDetails && loanDetails.status === 'Closed') {
  //     api
  //       .post('/loan/editLoanClosingDate', { loan_id: id })
  //       .then(() => {})
  //       .catch(() => {
  //         message('Unable to edit record.', 'error');
  //       });
  //   }
  // };

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
  const getRemainingAmount = () => {
    let paid = 0;
    if (paymentdetails && paymentdetails.length > 0) {
      paymentdetails.forEach((element) => {
        paid += parseFloat(element.loan_repayment_amount_per_month);
      });
      const rem = parseFloat(loanDetails.amount) - parseFloat(paid);
      return rem;
    }
    if (loanDetails) {
      return loanDetails.amount;
    }
    return 0;
  };
  const remainingAmount = getRemainingAmount();
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
    if (newLoanId.loan_repayment_amount_per_month > remainingAmount) {
      message('The Amount you entered is more than the amoiunt you need to pay', 'warning');
    } else {
      api
        .post('/loan/insertLoanRepaymenthistory', newLoanId)
        .then(() => {
          message('payment inserted successfully.', 'success');
          setNewPaymentData({
            loan_id: '',
            payment_date: '',
            loan_repayment_amount_per_month: '',
            remarks: '',
          });
          addpaymentToggle(false);
          getPaymentById();
          getLoanById();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    }
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
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
         
            {/* Button */}

            <ApiButton
              saveChanges={saveChanges}
              editData={editLoanData}
              navigate={navigate}
              //applyChanges={editLoanData}
              backToList={backToList}
              deleteData={deleteLoanData}
              module="Loan"
            ></ApiButton>
         
        </FormGroup>
      </Form>
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
        setActiveTab={setActiveTab}
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
        loanDetails={loanDetails}
      ></LoanMoreDetails>
    </>
  );
};

export default LoanEdit;
