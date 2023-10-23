import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link,useParams } from 'react-router-dom';
import { Form, Modal, ModalBody, ModalHeader, FormGroup,Table } from 'reactstrap';
import api from '../../constants/api';
import message from '../Message';
import ComponentCard from '../ComponentCard';

export default function SupplierTable({ purchaseOrder ,getpurchaseOrder}) {
  SupplierTable.propTypes = {
    purchaseOrder: PropTypes.array,
    getpurchaseOrder:PropTypes.any,
  };
  const [history, setHistory] = useState();
  const { id } = useParams();
  
  // Get  By Id
  const getHistoryById = () => {
    api
      .post('/supplier/SupplierPayment', { purchase_order_id: id })
      .then((res) => {
        setHistory(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };
  const Supplier = (subConPaymentsId) => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: 'Do you like to cancel the receipt?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .put('/supplier/updateSupplierPaymentsAndPurchaseOrder', {
            supplier_receipt_id: subConPaymentsId,
            purchase_order_id: id,
          })
          .then(() => {
            Swal.fire('Cancelled!');
            getHistoryById();
          });
      }
    });
  };

  useEffect(() => {
    getHistoryById();
  }, []);

  const [viewLineModal, setViewLineModal] = useState(false);
  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  // structure of makesupplier payment tables
  const supplierTableColumn = [
    {
      name: 'PO Date',
    },
    {
      name: 'PO CODE',
    },
    {
      name: 'PO value',
    },
    {
      name: 'Balance',
    },
    {
      name: 'Payment Status',
    },
    {
      name: 'History',
    },
  ];

  return (
    <ComponentCard title="Purchase Order Linked">
      <Form>
        <div className="MainDiv">
          <div className="container">
            <Table id="example" className="display border border-secondary rounded">
              <thead>
                <tr>
                  {supplierTableColumn.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {purchaseOrder &&
                  purchaseOrder.map((element) => {
                    return (
                      <tr key={element.purchase_order_id}>
                        <td>{moment(element.po_date).format('YYYY-MM-DD')}</td>
                        <td>
                          <Link to={`/PurchaseOrderEdit/${element.purchase_order_id}`}>
                            {element.po_code}
                          </Link>
                        </td>
                        <td>{element.po_value}</td>
                        <td>
                          {parseFloat ? element.po_value - parseFloat(element.prev_amount) : 0}
                        </td>
                        <td>{element.payment_status}</td>
                        <td>
                          <Link to={`/SupplierHistory/${element.purchase_order_id}`}>
                            View History
                          </Link>
                        </td>
                        <td>
                          <u
                            onClick={() => {
                              getpurchaseOrder(element.purchase_order_id);

                              setViewLineModal(true);
                            }}
                          >
                            View History
                          </u>
                          <Modal
                            size="xl"
                            isOpen={viewLineModal}
                            toggle={viewLineToggle.bind(null)}
                          >
                            <ModalHeader toggle={viewLineToggle.bind(null)}>Line Items</ModalHeader>
                            <ModalBody>
                              <FormGroup>
                              
                                  <tbody>
                                    {history &&
                                      history.map((e) => {
                                        return (
                                          <tr key={e.supplier_receipt_id}>
                                            <td>{moment(e.date).format('YYYY-MM-DD')}</td>
                                            <td>{e.amount}</td>
                                            <td>{e.mode_of_payment}</td>
                                            <td>
                                              {e.receipt_status !== 'Cancelled' ? (
                                                <Link to="">
                                                  <span
                                                    onClick={() =>
                                                      Supplier(
                                                        e.supplier_receipt_id,
                                                        e.purchase_order_id,
                                                        e.supplier_id,
                                                      )
                                                    }
                                                  >
                                                    <u>Cancel</u>
                                                  </span>
                                                </Link>
                                              ) : (
                                                'Cancelled'
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                               
                              </FormGroup>
                            </ModalBody>
                          </Modal>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}
