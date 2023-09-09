import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Form, Table } from 'reactstrap';
import PdfCreateInvoice from '../PDF/PdfCreateInvoice';
// import api from '../../constants/api';
// import message from '../Message';


export default function CustomerFinanceInvoice({
  createInvoice,
  cancelInvoice,
  invoiceCancel,
  setEditInvoiceModal,
  setEditModal,
  
}) {
  CustomerFinanceInvoice.propTypes = {
    createInvoice: PropTypes.array,
    cancelInvoice: PropTypes.array,
    invoiceCancel: PropTypes.func,
    setEditInvoiceModal: PropTypes.func,
    setEditModal: PropTypes.func,
  };
  // const [setCreateInvoice ] = useState();

  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Invoice Code' },
    { name: 'Status' },
    { name: 'Invoice Date' },
    { name: 'Amount' },
    { name: 'Print' },
    { name: 'Edit' },
    { name: 'Cancel' },
  ];

  return (
    // Invoice Tab
   
      <Form>
        <div className="MainDiv">
          <div className="container">
            <Table id="example">
              <thead>
                <tr>
                  {invoiceTableColumns.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {createInvoice &&
                  createInvoice.map((element) => {
                    return (
                      <tr key={element.invoice_id}>
                        <td>{element.invoice_code}</td>
                        <td>{element.status}</td>
                        <td>{moment(element.invoice_date).format('YYYY-MM-DD')}</td>
                        <td>{element.invoice_amount}</td>
                        <td>
                        <PdfCreateInvoice
                  createInvoice = {createInvoice}
                  cancelInvoice = {cancelInvoice}
                  invoiceId = {element.invoice_id}
                 ></PdfCreateInvoice>
         
                       </td>
                        <td>
                          <Link to="">
                            <span
                              onClick={() => {
                                setEditInvoiceModal(element);
                                setEditModal(true);
                              }}
                            >
                              Edit
                            </span>
                          </Link>
                        </td>
                        <td> <span
                              onClick={() => {
                                invoiceCancel(element); }}
                            >
                              Cancel
                            </span></td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <Table id="example">
              <thead>
                <tr>
                  {invoiceTableColumns.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {cancelInvoice &&
                  cancelInvoice.map((element) => {
                    return (
                      <tr key={element.invoice_id}>
                        <td>{element.invoice_code}</td>
                        <td>{element.status}</td>
                        <td>{moment(element.invoice_date).format('YYYY-MM-DD')}</td>
                        <td>{element.invoice_amount}</td>
                        <td>
                          <Link to="">Print</Link>
                    
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </Form>
  );
}
