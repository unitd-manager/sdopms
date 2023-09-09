import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ComponentCard from '../../components/ComponentCard';
//import AccountsButton from '../../components/AccountTable/AccountsButton';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
import AccountsMainEdit from '../../components/AccountTable/AccountsMainEdit';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import creationdatetime from '../../constants/creationdatetime';
import ApiButton from '../../components/ApiButton';

const AccountsEdit = () => {
  //Const Variables
  const [totalAmount, setTotalAmount] = useState('');
  const [AccountsDetails, setAccountsDetails] = useState();
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
 // Button
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Accounts');
  };
  // calculation connect with radio button
  const handleRadioGst = (radioVal, totalAmountF, gstValue, serviceCharge) => {
    /* eslint-disable */
    if (serviceCharge == '') {
      serviceCharge = 0;
    }
    if (totalAmountF == '') {
      totalAmountF = 0;
    }
    if (gstValue == '') {
      gstValue = 0;
    }
    if (radioVal === '1') {
      setTotalAmount(
        parseFloat(totalAmountF) +
          (parseFloat(gstValue) / 100) * parseFloat(totalAmountF) +
          parseFloat(serviceCharge),
      );
    } else {
      setTotalAmount(parseFloat(totalAmountF));
    }
  };
  //All Functions/Methods
  /* eslint-disable */
  const handleInputs = (e) => {
    setAccountsDetails({ ...AccountsDetails, [e.target.name]: e.target.value });
  };
 // Get Accounts By Id
  const editAccountsById = () => {
    api
      .post('/accounts/getAccountsById', { expense_id: id })
      .then((res) => {
        setAccountsDetails(res.data.data[0]);
        setTotalAmount(res.data.data[0].total_amount)

      })
      .catch(() => {
        message('Accounts Data Not Found', 'info');
      });
  };
 // Edit Accounts Data
  const editAccountsData = () => {
    AccountsDetails.total_amount = totalAmount
    // AccountsDetails.date = moment()
    AccountsDetails.modification_date = creationdatetime
    
    api
      .post('/accounts/editAccounts', AccountsDetails)
      .then(() => {
        message('Record editted successfully', 'success');
        editAccountsById()
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  // Delete Expense
  const deleteExpense = () => {
    api
      .post('/accounts/deleteExpense', { expense_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  useEffect(() => {
    editAccountsById();
  }, [id]);
  return (
    <>
     <BreadCrumbs heading={AccountsDetails && AccountsDetails.expense_id} />
      {/* Button */}
      {/* <AccountsButton
        id={id} editAccountsData={editAccountsData}navigate={navigate}applyChanges={applyChanges}deleteExpense={deleteExpense}backToList={backToList}></AccountsButton> */}
      {/* Main Details */}
      <ApiButton
              editData={editAccountsData}
              navigate={navigate}
              applyChanges={applyChanges}
              backToList={backToList}
             deleteData={deleteExpense}
              module="Account"
            ></ApiButton>
      <ToastContainer></ToastContainer>
      <Form>
        <FormGroup>
        <ComponentCard
            title="Account Details"
            creationModificationDate={AccountsDetails}
          
          > 
           
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Date <span className="required"> *</span>
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={AccountsDetails && moment(AccountsDetails.date,'YYYY-MM-DD').format('YYYY-MM-DD')}
                    name="date"/>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Head</Label>
                  <br />
                  <span>{AccountsDetails && AccountsDetails.group_name}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Sub Head</Label>
                  <br />
                  <span>{AccountsDetails && AccountsDetails.sub_group}</span>
                </FormGroup>
              </Col>
              {/* Radio button */}
              <Col md="3">
                <Label>GST</Label>
                <FormGroup check>
                  <Input
                    name="gst"
                    value="1"
                    onChange={(e) => {
                      handleInputs(e); handleRadioGst(
                        e.target.value,
                        AccountsDetails.amount,
                        AccountsDetails.gst_amount,
                        AccountsDetails.service_charge,);}}
                    defaultChecked={AccountsDetails && AccountsDetails.gst === 1 && true}
                    type="radio"/>
                  <Label check>Yes</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="gst"
                    value="0"
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        e.target.value,
                        AccountsDetails.amount,
                        AccountsDetails.gst_amount,
                        AccountsDetails.service_charge,);}}
                    defaultChecked={AccountsDetails && AccountsDetails.gst === 0 && true}
                    type="radio"/>{' '}
                  <Label check> No </Label>
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Amount before GST</Label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        AccountsDetails.gst,
                        e.target.value,
                        AccountsDetails.gst_amount,
                        AccountsDetails.service_charge,);}}
                    name="amount"
                    value={AccountsDetails && AccountsDetails.amount}/>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>GST Amount </Label>
                  <Input
                    type="number"
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        AccountsDetails.gst,
                        AccountsDetails.amount,
                        e.target.value,
                        AccountsDetails.service_charge,);}}
                    name="gst_amount"
                    value={AccountsDetails && AccountsDetails.gst_amount}/>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Service Charges</Label>
                  <Input
                    type="number"
                    min={0}
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        AccountsDetails.gst,
                        AccountsDetails.amount,
                        AccountsDetails.gst_amount,
                        e.target.value,);}}
                    value={AccountsDetails && AccountsDetails.service_charge}
                    name="service_charge"/>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Total Amount </Label>
                  <Input
                  disabled
                    type="text"
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                    value={totalAmount}
                    name="total_amount"/>
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <AccountsMainEdit handleInputs={handleInputs} AccountsDetails={AccountsDetails}></AccountsMainEdit>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    
      {/* ADD NOTE */}

      <ComponentCard title="Add a note">
        <AddNote recordId={id} roomName="AccountEdit" />
        <ViewNote recordId={id} roomName="AccountEdit" />
      </ComponentCard>
    </>
  );
};
export default AccountsEdit;
