import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
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
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
// import { useParams } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
//  import * as $ from 'jquery';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

const InvoiceModal = ({ editInvoiceModal, editModal, setEditModal,invoiceDatas }) => {
  InvoiceModal.propTypes = {
    editInvoiceModal: PropTypes.any,
    editModal: PropTypes.bool,
    setEditModal: PropTypes.func,
    invoiceDatas:PropTypes.func,
  };
  console.log('gst',editInvoiceModal)
  //All state variable
  //const [totalAmount, setTotalAmount] = useState(0);
  
  const [conditions, setConditions] = useState('');
  const [invoiceData, setInvoiceData] = useState(invoiceDatas);

  // const [invoiceData, setInvoiceData] = useState({});
  // const { id } = useParams();
  //Add Line Item
  const [addLineItem, setAddLineItem] = useState();

  //setting value in invoiceData
  const handleInputs = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const handleLineInputs = (e) => {
    setAddLineItem({ ...addLineItem, [e.target.name]: e.target.value });
  };
  // const handleDataEditor = (e, type) => {
  //   SetInvoiceData({
  //     ...invoiceData,
  //     [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
  //   });
  // };
  const handleDataEditor = (e, type) => {
    setInvoiceData({ ...invoiceData, [type]: draftToHtml(convertToRaw(e.getCurrentContent())) });
  };
  const convertHtmlToDraftcondition = (existingQuoteformal) => {
    if (existingQuoteformal && existingQuoteformal.payment_terms) {
      const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal.payment_terms);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setConditions(editorState);
      }
    }
  };
  //getting data from invoice id
  const getInvoice = () => {
    api
      .post('/invoice/getInvoiceByInvoiceId', { invoice_id: editInvoiceModal.invoice_id })
      .then((res) => {
        setInvoiceData(res.data.data);
      });
  };
  //get invoice line item
  const getLineItem = () => {
    api
      .post('/invoice/getInvoiceItemsById', { invoice_id: editInvoiceModal.invoice_id })
      .then((res) => {
        setAddLineItem(res.data.data[0]);
      })
      .catch(() => {
        message('Line Items not found', 'info');
      });
  };
  //Edit invoice
  const editInvoice = () => {
    //invoiceData.invoice_amount = totalAmount + (7 / 100) * totalAmount;
    // invoiceData.order_id = id;
    api
      .post('/finance/editInvoicePortalDisplay', invoiceData)
      .then(() => {
        window.location.reload();
        message('Invoice edited successfully.', 'success');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  //editlineitem
  const editLineItemApi = () => {
    // invoiceData.invoice_id = id;
    api
      .post('/finance/editInvoiceItem', addLineItem)
      .then(() => {
        message('Line Item Edited Successfully', 'sucess');
      })
      .catch(() => {
        message('Cannot Edit Line Items', 'error');
      });
  };

 console.log('amountInvoice',addLineItem)
  useEffect(() => {
    getLineItem();
    getInvoice();
    convertHtmlToDraftcondition(invoiceDatas);
    setInvoiceData(editInvoiceModal);
  }, [invoiceDatas,editInvoiceModal]);
  return (
    <>
      <Modal size="xl" isOpen={editModal}>
        <ModalHeader>
          Create Invoice
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Form>
                    <Card>
                      <Row>
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Label>Invoice Code</Label>
                              <Input
                                type="text"
                                value={invoiceData && invoiceData.invoice_code}
                                onChange={handleInputs}
                                name="invoice_code"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Discount</Label>
                              <Input
                                type="text"
                                value={invoiceData && invoiceData.discount}
                                onChange={handleInputs}
                                name="discount"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Quote Code</Label>
                              <Input
                                type="text"
                                value={invoiceData && invoiceData.quote_code}
                                onChange={handleInputs}
                                name="quote_code"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>PO Number</Label>
                              <Input
                                type="text"
                                value={invoiceData && invoiceData.po_number}
                                onChange={handleInputs}
                                name="po_number"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Gst Percentage</Label>
                              <Input
                                type="number"
                                value={invoiceData && invoiceData.gst_percentage}
                                onChange={handleInputs}
                                name="gst_percentage"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Project Reference</Label>
                              <Input
                                type="text"
                                value={invoiceData && invoiceData.project_reference}
                                onChange={handleInputs}
                                name="project_reference"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Invoice date</Label>
                              <Input
                                type="date"
                                value={moment(invoiceData && invoiceData.invoice_date).format(
                                  'YYYY-MM-DD',
                                )}
                                onChange={handleInputs}
                                name="invoice_date"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Code</Label>
                              <Input
                                type="text"
                                value={invoiceData && invoiceData.code}
                                onChange={handleInputs}
                                name="code"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>SO Ref Number</Label>
                              <Input
                                type="text"
                                value={invoiceData && invoiceData.so_ref_no}
                                onChange={handleInputs}
                                name="so_ref_no"
                              />
                            </FormGroup>
                          </Col>

                          <Col md="4">
                            <FormGroup>
                              <Label>Site Code</Label>
                              <Input
                                type="text"
                                value={invoiceData && invoiceData.site_code}
                                onChange={handleInputs}
                                name="site_code"
                              />
                            </FormGroup>
                          </Col>

                          <Col md="4">
                            <FormGroup>
                              <Label>Attention</Label>
                              <Input
                                type="text"
                                value={invoiceData && invoiceData.attention}
                                onChange={handleInputs}
                                name="attention"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Reference</Label>
                              <Input
                                type="textarea"
                                value={invoiceData && invoiceData.reference}
                                onChange={handleInputs}
                                name="reference"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="8">
                            <FormGroup>
                              <Label>Invoice Terms</Label>
                              <Input
                                type="text"
                                value={invoiceData && invoiceData.invoice_terms}
                                onChange={handleInputs}
                                name="invoice_terms"
                              />
                            </FormGroup>
                          </Col>
                          <Editor
                  editorState={conditions}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'payment_terms');
                    setConditions(e);
                  }}
                />


                          {/* <Editor
                            editorState={paymentTerms}
                            wrapperClassName="demo-wrapper mb-0"
                            editorClassName="demo-editor border mb-4 edi-height"
                            onEditorStateChange={(e) => {
                              handleDataEditor(e, 'payment_terms');
                              setPaymentTerms(e);
                            }}
                          /> */}
                        </Row>
                        <Table bordered className="lineitem">
                          <thead>
                            <tr>
                              <th scope="col">Title</th>
                              <th scope="col">Description</th>
                              <th scope="col">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td data-label="Item">
                                <Input
                                  type="text"
                                  name="item_title"
                                  defaultValue={addLineItem && addLineItem.item_title}
                                  onChange={handleLineInputs}
                                />
                              </td>
                              <td data-label="Description">
                                <Input
                                  defaultValue={addLineItem && addLineItem.description}
                                  type="text"
                                  name="description"
                                  onChange={handleLineInputs}
                                />
                              </td>
                              <td data-label="Amount">
                                <Input
                                  value={addLineItem && addLineItem.total_cost}
                                  type="text"
                                  name="total_cost"
                                  onChange={handleLineInputs}
                                  disabled
                                />
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        {/*                       
                            <Row>
                            <Col md="3">
                              <FormGroup>
                                <Label>Title</Label>
                                <Input
                                  type="text"
                                  name="item_title"
                                  defaultValue={addLineItem && addLineItem.item_title}
                                  onChange={handleLineInputs}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="3">
                              <FormGroup>
                              <Label>Description</Label>
                              <Input
                                defaultValue={addLineItem && addLineItem.description}
                                type="text"
                                name="description"
                                onChange={handleLineInputs}
                              />
                              </FormGroup>
                            </Col>

                            <Col md='3'>
                              <Label>Amount</Label>
                              <Input
                                value={addLineItem && addLineItem.amount}
                                type="text"
                                name="amount"
                                onChange={handleLineInputs}
                              />
                            </Col>
                            </Row> */}

                        <ModalFooter>
                          <Button
                            className="shadow-none"
                            color="primary"
                            onClick={() => {
                              editInvoice();
                              editLineItemApi();
                              //addLineItemApi();
                              //getAllValues();
                            }}
                          >
                            {' '}
                            Submit{' '}
                          </Button>
                          <Button
                            className="shadow-none"
                            color="secondary"
                            onClick={() => {
                              setEditModal(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Row>
                    </Card>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default InvoiceModal;