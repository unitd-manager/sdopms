import React, { useEffect, useState } from 'react';
import { Col, Table, FormGroup, Label,Row,Form } from 'reactstrap';
// import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import 'react-data-table-component-extensions/dist/index.css';
// import { useParams } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api';
// import CommonTable from '../CommonTable';

const ProjectWorksheet = ({
 WorkSheet,
 getDeliveryInvoiceById
}) => {
  ProjectWorksheet.propTypes = {
    WorkSheet: PropTypes.object,
    getDeliveryInvoiceById: PropTypes.func
  };
  // const { id } = useParams();
  // const [WorkSheet, setWorkSheet] = useState(null);
  const [lineItem, setLineItem] = useState();
  // const [selectedItemId, setSelectedItemId] = useState(null); // State to store the selected item ID
  const [viewLineModal, setViewLineModal] = useState(false);
  const [showPcItemsTable,setShowPcItemsTable]=useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  
   
 
  const getLineItem = (taskId) => {
    api.post('/purchaseorder/getDeliveryInvoicehistory1', { delivery_invoice_id: taskId }).then((res) => {
      setLineItem(res.data.data);
      console.log("1", res.data.data);
    });
  };

  //console.log(selectedItemId);
//   const viewLineToggle = () => {
//     setViewLineModal(!viewLineModal);
//   };
  // const viewLineToggle = () => {
  //   setViewLineModal(!viewLineModal);
  // };

 
  const viewLineToggle = (taskId) => {
    setSelectedInvoiceId(taskId);

    if (viewLineModal) {
      setShowPcItemsTable(!showPcItemsTable);  // Toggle visibility of line items
      setLineItem([]);
    } else {
      setShowPcItemsTable(true);
      getLineItem(taskId);
    }

    setViewLineModal(!viewLineModal);
  };
  useEffect(() => {
    if (selectedInvoiceId) {
      getLineItem(selectedInvoiceId);
    }
  }, [selectedInvoiceId]);
  
  useEffect(() => {
    getLineItem();
    getDeliveryInvoiceById();
  }, []);
 
  

  return (
    // <div className="MainDiv">
    //   <div className=" pt-xs-25">
       

    <Form className="mt-4">
    <Row className="border-bottom mb-3">
      <Col>
        <FormGroup>
          <Label>Invoice Code</Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>Invoice Date</Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>Action</Label>
        </FormGroup>
      </Col>
    </Row>

    {WorkSheet &&
      WorkSheet.map((element) => {
        return (
          <Row>
            <Col>
              <FormGroup>
                <span>{element.invoice_code}</span>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <span>
                  {element.invoice_date
                    ? moment(element.invoice_date).format('DD-MM-YYYY')
                    : ''}
                </span>
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label>
                  <div className="anchor">
                    <span
                      onClick={() => {
                        // setQuotationViewLineItem(true);
                        // setQuote(element.delivery_invoice_id);
                        setShowPcItemsTable(!showPcItemsTable);
                        viewLineToggle(element.delivery_invoice_id);
                        getLineItem(element.delivery_invoice_id);
                        setViewLineModal(true)
                    
                      }}
                    >
                      <u> View Items</u>
                    </span>
                  </div>
                </Label>
              </FormGroup>
              {showPcItemsTable && selectedInvoiceId === element.delivery_invoice_id && (
                <Table className="lineitem border border-secondary rounded">
                  <thead >
                    <tr>
                      <th scope="col">SN.No </th>
                      <th scope="col">Product Name </th>

                      <th scope="col">qty </th>
                   
                    </tr>
                  </thead>
                  <tbody>
                    {lineItem &&
                      lineItem.map((e, index) => {
                        return (
                          <tr>
                            <td data-label="SN.No">{index + 1}</td>
                            <td data-label="Product Name">{e.title} </td>
                            <td data-label="Quantity">{e.qty} </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
           )}
         </Col>
         </Row>
              
            );
          })}
          
      </Form>  
  
  );
}

export default ProjectWorksheet;
