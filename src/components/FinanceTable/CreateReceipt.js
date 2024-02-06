import React, { useEffect, useState,useContext } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const CreateReceipt = ({ editCreateReceipt, setEditCreateReceipt, orderId }) => {
  CreateReceipt.propTypes = {
    editCreateReceipt: PropTypes.bool,
    setEditCreateReceipt: PropTypes.func,
    orderId: PropTypes.any,
  };
  //All const Variable
  const [invoiceReceipt, setInvoiceReceipt] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const [totalAmount, setTotalAmount] = useState(0);
  const [createReceipt, setCreateReceipt] = useState({
    amount: 0,
    order_id: id,
    receipt_status: "Paid",
    receipt_date: moment(),
    receipt_code: '',
  });
    //get staff details
const { loggedInuser } = useContext(AppContext);
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  //Setting Data in createReceipt
  const handleInputreceipt = (e) => {
    if (e.target.name === 'amount') {
      // eslint-disable-next-line
      setTotalAmount(parseInt(e.target.value))
    }
    setCreateReceipt({ ...createReceipt, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // Function to set the receipt date to today's date when the modal is opened
    const setTodayDate = () => {
      setCreateReceipt({
        ...createReceipt,
        receipt_date: moment().format('YYYY-MM-DD'), // Set the receipt_date to today's date
      });
    };

    if (editCreateReceipt) {
      setTodayDate(); // Set the receipt date when the modal is opened
    }
  }, [editCreateReceipt]); 

  const insertReceiptHistory = (createReceiptHistory) => {
    // Round the amount to two decimal places
    createReceiptHistory.amount = parseFloat(createReceiptHistory.amount).toFixed(2);
    
    api
      .post('/finance/insertInvoiceReceiptHistory', createReceiptHistory)
      .then(() => {
        message('Data inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  

  const editInvoiceStatus = (invoiceId, Status) => {
    api
      .post('/invoice/editInvoiceStatus', {
        invoice_id: invoiceId,
        status: Status,
      })
      .then(() => {
        message('data inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  const editInvoicePartialStatus = (invoiceId, Status) => {
    api
      .post('/invoice/editInvoicePartialStatus', {
        invoice_id: invoiceId,
        status: Status,
      })
      .then(() => {
        message('data inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };

  //Logic for deducting receipt amount
  const finalCalculation = (receipt) => {
    let leftamount = totalAmount;
  
    // Calculate the total invoice amount
    const totalInvoiceAmount = selectedInvoice.reduce((total, invoice) => total + parseFloat(invoice.remainingAmount), 0);
  
    if (leftamount < totalInvoiceAmount) {
      // If total amount paid is less than total invoice amount, call partial payment API
      for (let j = 0; j < selectedInvoice.length; j++) {
        if (selectedInvoice[j].remainingAmount <= leftamount) {
          leftamount = parseFloat(leftamount) - selectedInvoice[j].remainingAmount;
          selectedInvoice[j].paid = true;
          editInvoiceStatus(selectedInvoice[j].invoice_id, 'Paid');
          insertReceiptHistory({
            invoice_id: selectedInvoice[j].invoice_id,
            receipt_id: receipt,
            published: '1',
            flag: '1',
            creation_date: '',
            modification_date: '',
            created_by: '',
            modified_by: '',
            amount: selectedInvoice[j].remainingAmount,
            site_id: '1'
          });
        } else {
          selectedInvoice[j].partiallyPaid = true;
          editInvoicePartialStatus(selectedInvoice[j].invoice_id, 'Partial Payment');
          insertReceiptHistory({
            invoice_id: selectedInvoice[j].invoice_id,
            receipt_id: receipt,
            published: '1',
            flag: '1',
            creation_date: '',
            modification_date: '',
            created_by: '',
            modified_by: '',
            amount: leftamount,
            site_id: '1',
          });
        }
      }
    } else {
      // If total amount paid matches total invoice amount, mark invoices as fully paid
      selectedInvoice.forEach(invoice => {
        invoice.paid = true;
        editInvoiceStatus(invoice.invoice_id, 'Paid');
        insertReceiptHistory({
          invoice_id: invoice.invoice_id,
          receipt_id: receipt,
          published: '1',
          flag: '1',
          creation_date: '',
          modification_date: '',
          created_by: '',
          modified_by: '',
          amount: invoice.remainingAmount,
          site_id: '1'
        });
      });
    }
  };
  
  console.log('totalAmount', totalAmount)
  //Insert Receipt
  const insertReceipt = async (code) => {
    createReceipt.receipt_code = code;
    createReceipt.creation_date = creationdatetime;
    createReceipt.created_by = loggedInuser.first_name;
  
    if (createReceipt.mode_of_payment && selectedInvoice.length > 0) {
      // Calculate total remaining amount of selected invoices
      const totalInvoiceAmount = selectedInvoice.reduce((total, invoice) => total + parseFloat(invoice.remainingAmount));
      console.log("realamount",totalInvoiceAmount); // Log the real amount in the console
      // Check if the amount entered in the receipt is less than or equal to the total invoice amount
      if (parseFloat(createReceipt.amount).toFixed(2) <= totalInvoiceAmount) {
        api
          .post('/finance/insertreceipt', createReceipt)
          .then((res) => {
            message('Data inserted successfully.');
            finalCalculation(res.data.data.insertId);
          })
          .catch(() => {
            message('Network connection error.');
          })
          .finally(() => {
            setSubmitting(false); // Reset the submitting state after the API call completes (success or error).
          });
      } else {
        message('Amount should not be greater than the total invoice amount.', 'warning');
      }
    } else {
      message('Please fill mode of payment fields', 'warning');
      setSubmitting(false);
    }
  };
  
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'receipt' })
      .then((res) => {
        insertReceipt(res.data.data);
      })
      .catch(() => {
        insertReceipt('');
      });
  };

  //   const removeObjectWithId = (arr, invoiceId) => {
  //     console.log("array",arr);
  //     console.log("invid",invoiceId);
  //     const objWithIdIndex = arr.findIndex((obj) => obj.invoice_id === invoiceId);
  // console.log('objithid',objWithIdIndex);
  //     if (objWithIdIndex > -1) {
  //       arr.splice(objWithIdIndex, 1);
  //     }

  //     return arr;
  //   };

  const getInvoices = (event, invObj) => {
    const { checked } = event.target;
  
    // Calculate the remaining amount with 2 decimal places
    const formattedRemainingAmount = invObj.remainingAmount.toFixed(2);
  
    if (checked) {
      // If the checkbox is checked, add the invoice object to the selectedInvoice array
      setSelectedInvoice([...selectedInvoice, { ...invObj, remainingAmount: formattedRemainingAmount }]);
    } else {
      // If the checkbox is unchecked, remove the invoice object from the selectedInvoice array
      const updatedSelectedInvoice = selectedInvoice.filter(item => item.invoice_id !== invObj.invoice_id);
      setSelectedInvoice(updatedSelectedInvoice);
    }
  };
  
   console.log('selectedInvoice', selectedInvoice)


  // const insertInvoices = () => {
  //   invoices.forEach((obj) => {
  //     insertReceiptHistory(obj);
  //   });
  // };

  //Getting receipt data by order id
  const getinvoiceReceipt = () => {
    api.post('/invoice/getInvoiceReceiptById', { order_id: orderId }).then((res) => {
      const datafromapi = res.data.data
      datafromapi.forEach(element => {
        element.remainingAmount = element.invoice_amount - element.prev_amount
      });
      const result = datafromapi.filter(el => { return el.invoice_amount !== el.prev_amount });
      setInvoiceReceipt(result);
    });
  };
  //Calculation for Invoice checkbox amount
//  const result = [];
const addAndDeductAmount = (checkboxVal, receiptObj) => {
  const remainingAmount = receiptObj.invoice_amount - receiptObj.prev_amount;
  const parsedTotalAmount = parseFloat(totalAmount);
  const parsedCreateReceiptAmount = parseFloat(createReceipt.amount);

  if (checkboxVal.target.checked) {
    const updatedTotalAmount = (parsedTotalAmount + remainingAmount).toFixed(2); // Round to 2 decimal places
    const updatedCreateReceiptAmount = (parsedCreateReceiptAmount + remainingAmount).toFixed(2); // Round to 2 decimal places

    if (!Number.isNaN(updatedTotalAmount) && !Number.isNaN(updatedCreateReceiptAmount)) {
            setTotalAmount(updatedTotalAmount);
      setCreateReceipt((prevReceipt) => ({
        ...prevReceipt,
        amount: updatedCreateReceiptAmount.toString(),
      }));
    } else {
      setTotalAmount('0.00'); // Reset to zero if calculation results in NaN
      setCreateReceipt((prevReceipt) => ({
        ...prevReceipt,
        amount: '0.00',
      }));
    }
  } else {
    const updatedTotalAmount = (parsedTotalAmount - remainingAmount).toFixed(2); // Round to 2 decimal places
    const updatedCreateReceiptAmount = (parsedCreateReceiptAmount - remainingAmount).toFixed(2); // Round to 2 decimal places

      if (!Number.isNaN(updatedTotalAmount) && !Number.isNaN(updatedCreateReceiptAmount)) {
      setTotalAmount(updatedTotalAmount >= 0 ? updatedTotalAmount : '0.00'); // Ensure non-negative result
      setCreateReceipt((prevReceipt) => ({
        ...prevReceipt,
        amount: updatedCreateReceiptAmount >= 0 ? updatedCreateReceiptAmount.toString() : '0.00',
      }));
    } else {
      setTotalAmount('0.00'); // Reset to zero if calculation results in NaN
      setCreateReceipt((prevReceipt) => ({
        ...prevReceipt,
        amount: '0.00',
      }));
    }
  }
};

  

  useEffect(() => {
    getinvoiceReceipt();
  }, [id]);
  return (
    <>
      <Modal size="md=6" isOpen={editCreateReceipt}>
        <ModalHeader>
          Create Receipt
          <Button className='shadow-none'
            color="secondary"
            onClick={() => {
              setEditCreateReceipt(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
                {invoiceReceipt &&
                  invoiceReceipt.map((singleInvoiceObj) => {
                    return (
                      <Row key={singleInvoiceObj.invoice_id}>
                        <Col md="12">
                          <FormGroup check>
                            <Input
                              onChange={(e) => {
                                addAndDeductAmount(e, singleInvoiceObj);
                                getInvoices(e, singleInvoiceObj);
                              }}
                              name="invoice_code(prev_amount)"
                              type="checkbox"
                            />
                          <span>
  {singleInvoiceObj.invoice_code}({singleInvoiceObj.invoice_amount.toFixed(2)})
  Paid - {singleInvoiceObj.prev_amount}
</span>
                          </FormGroup>
                        </Col>
                      </Row>
                    );
                  })}
                <br></br>
                {invoiceReceipt && invoiceReceipt.length > 0 ?
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Amount</Label>
                        <Input
                          type="text"
                          onChange={handleInputreceipt}
                          value={createReceipt && createReceipt.amount}
                          defaultValue={totalAmount.toString()}
                          name="amount"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label>Date</Label>
                        <Input
                          type="date"
                          onChange={handleInputreceipt}
                          //value={createReceipt && moment(createReceipt.receipt_date).format('YYYY-MM-DD')}
                          defaultValue={createReceipt && createReceipt.receipt_date}
                          name="receipt_date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label>{' '}Mode Of Payment <span className="required">*</span>{' '}</Label>
                        <Input type="select" name="mode_of_payment" onChange={handleInputreceipt}>
                          <option value="" selected="selected">
                            Please Select
                          </option>
                          <option value="cash">Cash</option>
                          <option value="cheque">Cheque</option>
                          <option value="giro">Giro</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    {createReceipt && createReceipt.mode_of_payment === 'cheque' && (
                      <Col md="12">
                        <FormGroup>
                          <Label>Check No</Label>
                          <Input
                            type="numbers"
                            onChange={handleInputreceipt}
                            value={createReceipt && createReceipt.cheque_no}
                            name="cheque_no"
                          />
                        </FormGroup>
                      </Col>
                    )}
                    {createReceipt && createReceipt.mode_of_payment === 'cheque' && (
                      <Col md="12">
                        <FormGroup>
                          <Label>Check date</Label>
                          <Input
                            type="date"
                            onChange={handleInputreceipt}
                            value={createReceipt && createReceipt.cheque_date}
                            name="cheque_date"
                          />
                        </FormGroup>
                      </Col>
                    )}
                    {createReceipt && createReceipt.mode_of_payment === 'cheque' && (
                      <Col md="12">
                        <FormGroup>
                          <Label>Bank</Label>
                          <Input
                            type="numbers"
                            onChange={handleInputreceipt}
                            value={createReceipt && createReceipt.bank_name}
                            name="bank_name"
                          />
                        </FormGroup>
                      </Col>
                    )}
                    <Col md="12">
                      <FormGroup>
                        <Label>Notes</Label>
                        <Input
                          type="text"
                          onChange={handleInputreceipt}
                          defaultValue={createReceipt && createReceipt.remarks}
                          name="remarks"
                        />
                      </FormGroup>
                    </Col>
                  </Row> : <span>No Invoice</span>}
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className='shadow-none'
            color="primary"
            onClick={() => {
              if (!submitting) {
                setSubmitting(true);
                //generateCode();
                if (parseFloat(createReceipt.amount) > 0) {
                  if (createReceipt.mode_of_payment && createReceipt.mode_of_payment !== 'Please Select') {
                    const totalInvoiceAmount = selectedInvoice.reduce((total, invoice) => total + invoice.remainingAmount);
                    console.log("realamount",totalInvoiceAmount); // Log the real amount in the console

      if (parseFloat(createReceipt.amount).toFixed(2) <= totalInvoiceAmount) {
                      generateCode();
                    } else {
                      // Show an error message indicating that the amount should not exceed the invoice amount
                      message('Amount should not be greater than the total invoice amount.', 'warning');
                      setSubmitting(false); // Reset submitting state
                    }
                  } else {
                    // Set the amount validation error message
                    alert('Please select a valid mode of payment');
                    setSubmitting(false); // Reset submitting state
                  }
                } else {
                  // Show an error message indicating that the amount should be greater than 0
                  message('Pls select atleast one Invoice', 'warning');
                  setSubmitting(false); // Reset submitting state
                }

              }
            }}
            disabled={submitting}
          >
            {' '}
            Sumit111{' '}
          </Button>
          <Button className='shadow-none'
            color="secondary"
            onClick={() => {
              setEditCreateReceipt(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateReceipt;