import React,{useState} from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Table,
  FormGroup,
  Label,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Card,
  CardBody,
} from 'reactstrap';
import moment from 'moment';
import * as Icon from 'react-feather';
import ComponentCard from '../ComponentCard';
import PreviousEarlierLoan from './PreviousEarlierLoan';
import AttachmentModalV2 from '../Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';

export default function LoanMoreDetails({
  activeTab,
  toggle,
  dataForAttachment,
  setAttachmentModal,
  attachmentModal,
  id,
  columns1,
  paymentdetails,
  attachmentData,
  addpaymentToggle,
  handlePaymentInputs,
  insertPayment,
  newpaymentData,
  addpaymentModal,
  loan,
}) {
  LoanMoreDetails.propTypes = {
    activeTab: PropTypes.string,
    toggle: PropTypes.func,
    dataForAttachment: PropTypes.func,
    setAttachmentModal: PropTypes.func,
    attachmentModal: PropTypes.bool,
    id: PropTypes.any,
    columns1: PropTypes.array,
    paymentdetails: PropTypes.array,
    attachmentData: PropTypes.any,
    addpaymentToggle: PropTypes.func,
    handlePaymentInputs: PropTypes.func,
    insertPayment: PropTypes.func,
    newpaymentData: PropTypes.any,
    addpaymentModal: PropTypes.bool,
    loan: PropTypes.any,
  };

  const [RoomName, setRoomName] = useState('')
  const [fileTypes, setFileTypes] = useState('')
  return (
    <ComponentCard title="More Details">
      <ToastContainer></ToastContainer>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active' : ''}
            onClick={() => {
              toggle('1');
            }}
          >
            Attachment
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => {
              toggle('2');
            }}
          >
            Payment History
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '3' ? 'active' : ''}
            onClick={() => {
              toggle('3');
            }}
          >
            Previous/EarlierLoan
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="p-4" activeTab={activeTab}>
        <TabPane tabId="1">
        <ComponentCard title="Attachments">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('Booking')
                    setFileTypes(["JPG", "PNG", "GIF","PDF"]);
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}><Icon.File className="rounded-circle" width="20" /></Button>
              </Col>
            </Row>
            <AttachmentModalV2
              moduleId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
              roomName={RoomName}
              fileTypes={fileTypes}
              altTagData="BookingRelated Data"
              desc="BookingRelated Data"
              recordType="RelatedPicture"
              mediaType={attachmentData.modelType}
            />
            <ViewFileComponentV2 moduleId={id} roomName="Booking" recordType="RelatedPicture" />
        
          </ComponentCard>
        </TabPane>
        <TabPane tabId="2">
          <ComponentCard title="Payment History">
            <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns1.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {paymentdetails &&
                      paymentdetails.map((element,index) => {
                        return (
                          <tr key={element.loan__repayment_history_id}>
                            <td>{index + 1}</td>
                            <td>{element.payment_date ? element.payment_date : ''}</td>
                            <td>{element.loan_repayment_amount_per_month}</td>
                            <td>{element.remarks}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
            <Row>
              <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addpaymentToggle.bind(null)}
                >
                  Payment History
                </Button>
              </Col>
            </Row>
            <Modal size="l" isOpen={addpaymentModal} toggle={addpaymentToggle.bind(null)}>
              <ModalHeader toggle={addpaymentToggle.bind(null)}>Payment Details</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Form>
                          <Row>
                            <FormGroup>
                              <Label>Date</Label>
                              <Input
                                type="date"
                                name="generated_date"
                                onChange={handlePaymentInputs}
                                value={
                                  newpaymentData &&
                                  moment(newpaymentData.generated_date).format('YYYY-MM-DD')
                                }
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label>Amount</Label>
                              <Input
                                type="number"
                                name="loan_repayment_amount_per_month"
                                onChange={handlePaymentInputs}
                                value={
                                  newpaymentData && newpaymentData.loan_repayment_amount_per_month
                                }
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label>Remarks</Label>
                              <Input
                                type="textarea"
                                name="remarks"
                                onChange={handlePaymentInputs}
                                value={newpaymentData && newpaymentData.remarks}
                              />
                            </FormGroup>
                          </Row>
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
                    insertPayment();
                  }}
                >
                  Save & Continue
                </Button>
                <Button
                  className="shadow-none"
                  color="secondary"
                  onClick={addpaymentToggle.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ComponentCard>
        </TabPane>
        <TabPane tabId="3">
          <PreviousEarlierLoan loan={loan}></PreviousEarlierLoan>
        </TabPane>
      </TabContent>
    </ComponentCard>
  );
}
