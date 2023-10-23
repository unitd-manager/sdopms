import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams, Link } from 'react-router-dom';
import {  Modal, ModalBody, ModalHeader, FormGroup} from 'reactstrap';
import ComponentCard from '../ComponentCard';
import message from '../Message';
import api from '../../constants/api';

const SupplierHistory = () => {
  const [history, setHistory] = useState();
  const { id } = useParams();
  const [viewLineModal, setViewLineModal] = useState(false);
  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
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

  useEffect(() => {
    getHistoryById();
  }, []);

  // const supplierHistoryColumn = [
  //   {
  //     name: 'Date',
  //   },
  //   {
  //     name: 'Amount',
  //   },
  //   {
  //     name: 'Mode Of Payment',
  //   },
  //   {
  //     name: 'Cancel',
  //   },
  // ];

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

  return (
    <>
      <ComponentCard>
        <ToastContainer></ToastContainer>
        <Modal size="xl" isOpen={viewLineModal} toggle={viewLineToggle.bind(null)}>
          <ModalHeader toggle={viewLineToggle.bind(null)}>Line Items</ModalHeader>
          <ModalBody>
            <FormGroup>
              <table className="lineitem border border-secondary rounded">
                <thead>
                  <tr>
                    <th scope="col">Title </th>
                    <th scope="col">Description </th>
                    <th scope="col">Qty </th>
                    <th scope="col">Unit Price </th>
                    <th scope="col">Amount</th>
                    <th scope="col">Updated By </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.map((element) => {
                      return (
                        <tr key={element.supplier_receipt_id}>
                          <td>{moment(element.date).format('YYYY-MM-DD')}</td>
                          <td>{element.amount}</td>
                          <td>{element.mode_of_payment}</td>
                          <td>
                            {element.receipt_status !== 'Cancelled' ? (
                              <Link to="">
                                <span
                                  onClick={() =>
                                    Supplier(
                                      element.supplier_receipt_id,
                                      element.purchase_order_id,
                                      element.supplier_id,
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
              </table>
            </FormGroup>
          </ModalBody>
        </Modal>
      </ComponentCard>
    </>
  );
};
export default SupplierHistory;
