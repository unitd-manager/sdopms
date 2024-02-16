import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Row, Col } from 'reactstrap';
//import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';
import QuoteviewEditItem from './QuoteviewEditItem';

export default function QuotationViewLineItem  ({
  projectId,
  quote,
  quotationViewLineItem,
  setQuotationViewLineItem,
}) {
  QuotationViewLineItem.propTypes = {
    quotationViewLineItem: PropTypes.bool,
    setQuotationViewLineItem: PropTypes.func,
    projectId: PropTypes.any,
    quote: PropTypes.any,
  };

  const [quotation, setQuotationViewLineItems] = useState();
  const [quoteData, setQuoteData] = useState(false);
  const [quoteLine, setQuoteLine] = useState();
  const QuotationViewLine = () => {
    api
      .post('/project/getQuoteLineItemsById', {
        project_id: projectId,
        quote_id: quote,
      })
      .then((res) => {
        setQuotationViewLineItems(res.data.data);
      })
      .catch(() => {
        message(' LineItem Data not found', 'info');
      });
  };

  console.log('quotation', quotation);

  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${deleteID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/project/deleteEditItem', { quote_items_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
           // Remove the deleted record from the state
           setQuotationViewLineItems((prevQuotation) =>
           prevQuotation.filter((item) => item.quote_items_id !== deleteID)
         );
        });
      }
    });
  };
  useEffect(() => {
    QuotationViewLine();
  }, []);

  return (
    <>
      <Modal size="xl" isOpen={quotationViewLineItem}>
        <ModalHeader>View Line Items</ModalHeader>
        <ModalBody>
          <table className="lineitem border border-secondary rounded">
            <thead>
              <tr>
                <th scope="col">Title </th>
                <th scope="col">Description </th>
                <th scope="col">Qty</th>
                <th scope="col">UOM</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Amount</th>
                <th scope="col"></th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {quotation &&
                quotation.map((e) => {
                  return (
                    <tr>
                      <td>{e.title}</td>
                      <td>{e.description}</td>
                      <td>{e.quantity}</td>
                      <td>{e.unit}</td>
                      <td>{e.unit_price}</td>
                      <td>{e.amount} </td>

                      <td></td>

                      <td>
                        <Row>
                          <Col md="3">
                            <Label>
                              <span
                                onClick={() => {
                                  setQuoteLine(e);
                                  setQuoteData(true);
                                }}
                              >
                                <Icon.Edit />
                              </span>
                            </Label>
                          </Col>
                          <Col md="3">
                            <Label>
                              <span
                                
                                onClick={() => {
                                  deleteRecord(e.quote_items_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
                            </Label>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {quoteData && (
            <QuoteviewEditItem
              FetchLineItemData={quoteLine}
              QuotationViewLine={QuotationViewLine}
              quoteData={quoteData}
              setQuoteData={setQuoteData}
              quoteId={quote}
            ></QuoteviewEditItem>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setQuotationViewLineItem(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};


