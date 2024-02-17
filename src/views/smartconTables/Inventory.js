import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Input, Button, Row, Col,FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
//import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import readXlsxFile from 'read-excel-file';
import api from '../../constants/api';
import message from '../../components/Message';
import { columns } from '../../data/Tender/InventoryData';
import ViewAdjustStockHistoryModal from '../../components/InventoryTable/ViewAdjustStockHistoryModal';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import YardStockHistoryModal from '../../components/InventoryTable/YardStockHistoryModal';

function Inventory() {
  //statevariables
  const [stockinputOpen, setStockinputOpen] = useState(false);
  const [stockinputOpen1, setStockinputOpen1] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [modalId1, setModalId1] = useState(null);
  const [adjustStockHistoryModal, setAdjustStockHistoryModal] = useState(false);
  const [adjustStockHistoryModal1, setAdjustStockHistoryModal1] = useState(false);
  const [stockChangeId, setStockChangeId] = useState();
  const [stockChangeId1, setStockChangeId1] = useState();
  // New state variable for tracking the input value
  const [inventoryStock, setInventoryStock] = useState({
    inventory_id: null,
    stock: null,
    //yard_stock:null,
  });
  const [inventoryStock1, setInventoryStock1] = useState({
    inventory_id: null,
    yard_stock: null,
  });
  const [loading, setLoading] = useState(false);
  // Add state variables for dropdown selection and input values
const [selectedStatus, setSelectedStatus] = useState('');
// /const [yardToStoreValue, setYardToStoreValue] = useState('');

  const [adjuststockDetails, setAdjuststockDetails] = useState({
    inventory_id: null,
    product_id: null,
    adjust_stock: 0,
    //yard_stock:0,
    modified_by: '',
    created_by: '',
    current_stock: null,
  });

  const [adjuststockDetails1, setAdjuststockDetails1] = useState({
    inventory_id: null,
    product_id: null,
    //adjust_stock: 0,
    yard_stock: 0,
    modified_by: '',
    created_by: '',
    status:'',
    //current_stock: null,
  });
  //navigate
  const navigate = useNavigate();
  // Get All inventories
  const getAllinventories = () => {
    setLoading(false);
    api
      .get('/inventory/getinventoryMain')
      .then((res) => {
        setLoading(false);
        setInventories(res.data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  //handle change
  const handleStockinput = (e, element) => {
    setInventoryStock({
      inventory_id: element.inventory_id,
      stock: e.target.value,
      //yard_stock:e.target.value
    });

    const adjustedStockValue = parseFloat(e.target.value);
    //const yardStockValue = parseFloat(element.yard_stock) || 0;
    const currentStockValue = parseFloat(element.stock) || 0; // If element.stock is null, set it to 0

    const adjustStock = adjustedStockValue - currentStockValue;

    setAdjuststockDetails({
      inventory_id: element.inventory_id,
      product_id: element.productId,
      adjust_stock: adjustStock,
      modified_by: '',
      created_by: '',
      current_stock: currentStockValue,
      //yard_stock:yardStockValue
    });
  };
  const [validationMessage, setValidationMessage] = useState('');
  //adjust stock
  const adjuststock = () => {
    api
      .post('/inventory/insertadjust_stock_log', adjuststockDetails)
      .then(() => {
        message('Stock updated successfully', 'success');
        getAllinventories();
        navigate('/inventory');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  //update stock
  const updateStockinInventory = () => {
    api
      .post('/inventory/updateInventoryStock', inventoryStock)
      .then(() => {
        message('Stock updated successfully', 'success');
        getAllinventories();
        navigate('/inventory');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  // handleStockinput1 function
  const handleStockinput1 = (e, element) => {
    const newYardStockValue = parseFloat(e.target.value) || 0;
    const initialStockValue = parseFloat(element.stock) || 0;
    

    setInventoryStock1({
  inventory_id: element.inventory_id,
  yard_stock: selectedStatus === 'yardToStore' ?  (Number(element.yard_stock ||0)) -(newYardStockValue) :newYardStockValue + (Number(element.yard_stock) || 0) ,
  stock: selectedStatus === 'yardToStore' ? initialStockValue + newYardStockValue : initialStockValue - newYardStockValue,
});

    // Check if the new yard stock is greater than the actual stock
    if (newYardStockValue > initialStockValue) {
      setValidationMessage('Yard stock cannot be greater than the actual stock.');
      // Optionally, reset the input value to the previous valid value or 0
      setInventoryStock1({
        inventory_id: element.inventory_id,
        yard_stock: initialStockValue, // Reset to the initial stock value
        stock: 0,
      });
      return;
    }
    const status = selectedStatus === 'yardToStore' ? 'Yard to Store' : 'Store to Yard';

    setValidationMessage(''); // Reset validation message if valid
    setAdjuststockDetails1({
      inventory_id: element.inventory_id,
      product_id: element.productId,
      yard_stock: newYardStockValue + (Number(element.yard_stock) || 0),
       // Add previous yard_stock + element.yard_stock, // Add previous yard_stockrdStockValue, // Calculate the change in yard_stock
      modified_by: '',
      created_by: '',
      // actual_stock: initialStockValue - newYardStockValue,
      actual_stock: selectedStatus === 'Yard to Store' ? initialStockValue + newYardStockValue : initialStockValue,
      status_field:status
    });
  };

  const adjuststock1 = () => {
    api
      .post('/inventory/insertyard_stock_log', adjuststockDetails1)
      .then(() => {
        message('yard Stock inserted successfully', 'success');
        getAllinventories();
        navigate('/inventory');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //update stock

  // updateStockinInventory1 function
  const updateStockinInventory1 = () => {
    api
      .post('/inventory/updateInventoryStock1', inventoryStock1)
      .then(() => {
        //adjuststock1(); // Call the function to adjust stock based on the yard_stock change
        message('Yard stock updated successfully', 'success');
        getAllinventories();
        navigate('/inventory');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  // TRIGGER TO IMPORT EXCEL SHEET
  const importExcel = () => {
    $('#import_excel').trigger('click');
  };

  // UPLOAD FILE ON THER SERVER
  const uploadOnServer = (arr) => {
    api
      .post('/inventory/import/excel', { data: JSON.stringify(arr) })
      .then(() => {
        message('File uploaded successfully', 'success');
        $('#upload_file').val(null);
      })
      .catch((err) => {
        message('Failed to upload.', 'error');
        console.log(err.stack);
        console.log('err.response', err.response);
        console.log('err.request', err.request);
        console.log('err.config', err.config);
      });
  };

  // PROCESSING AND FORMATTING THE DATA
  const processData = (rows) => {
    const arr = [];
    rows.shift();

    for (let x = 0; x < rows.length; x++) {
      arr.push({
        ProductCode: rows[x][0],
        ProductName: rows[x][1],
        Description: rows[x][2],
        Price: rows[x][3],
        Unit: rows[x][4],
        Category: rows[x][5],
        Stock: rows[x][6],
      });
    }

    uploadOnServer(arr);
  };

  // IMPORTING EXCEL FILE
  const importExcelFile = (e) => {
    console.log(e.target.id);
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.readyState);
      if (reader.readyState === 2) {
        readXlsxFile(e.target.files[0])
          .then((rows) => {
            processData(rows);
            message('Uploading File On The Server', 'info');
          })
          .finally(() => {
            $('#upload_file').val(null);
          })
          .catch((err) => console.log(err));
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    getAllinventories();
  }, []);

  return (
    <div className="MainDiv">
      <ToastContainer></ToastContainer>
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="Inventory List"
          Button={
            <>
              <Row>
                <Col md="6">
                  <Button
                    color="primary"
                    className="shadow-none mr-2"
                    onClick={() => importExcel()}
                  >
                    Import
                  </Button>
                  {/* </Link> */}
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    id="import_excel"
                    onChange={importExcelFile}
                  />
                </Col>
                <Col md="6">
                  <a
                    href="http://43.228.126.245/smartco-api/storage/excelsheets/Inventory.xlsx"
                    download
                  >
                    <Button color="primary" className="shadow-none">
                      Sample
                    </Button>
                  </a>
                </Col>
              </Row>
            </>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.id}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {inventories &&
              inventories.map((element) => {
                return (
                  <tr key={element.inventory_id}>
                    <td>{element.inventory_id}</td>
                    <td>
                      <Link to={`/inventoryEdit/${element.inventory_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.inventory_code}</td>
                    <td>{element.product_name}</td>
                    <td>{element.product_type}</td>
                    <td>{element.item_code}</td>
                    <td>{element.unit}</td>
                    <td>{element.stock}</td>
                    {stockinputOpen && stockChangeId === element.inventory_id ? (
                      <td>
                        {' '}
                        <Input
                          type="text"
                          defaultValue={element.stock}
                          onChange={(e) => handleStockinput(e, element)}
                        />
                        <Button
                          color="primary"
                          className="shadow-none"
                          onClick={() => {
                            adjuststock(element);
                            updateStockinInventory();
                            setStockinputOpen(false);
                          }}
                        >
                          save
                        </Button>
                      </td>
                    ) : (
                      <td>
                        <span
                          onClick={() => {
                            setStockChangeId(element.inventory_id);
                            setStockinputOpen(true);
                          }}
                        >
                          <Link to="">Adjust Stock</Link>
                        </span>
                      </td>
                    )}
                    <td>
                      <span
                        onClick={() => {
                          setAdjustStockHistoryModal(true);
                          setModalId(element.inventory_id);
                        }}
                      >
                        <Link to="">view</Link>
                      </span>
                    </td>
                    {adjustStockHistoryModal && modalId === element.inventory_id && (
                      <ViewAdjustStockHistoryModal
                        adjustStockHistoryModal={adjustStockHistoryModal}
                        setAdjustStockHistoryModal={setAdjustStockHistoryModal}
                        inventoryId={modalId}
                      />
                    )}
                    <td>{element.minimum_order_level}</td>
                    <td>{element.yard_stock}</td>
                    {stockinputOpen1 && stockChangeId1 === element.inventory_id ? (
                      <td>
                        <Col>
                          <FormGroup>
                            <Input
                              type="select"
                              name="status"
                              value={selectedStatus}
                              defaultValue={element.status}
                              onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                              <option defaultValue="selected">Please Select</option>
                              <option value="YardToStore">Yard to Store</option>
                              <option value="storeToYard">Store to Yard</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        {selectedStatus && (
                          <>
                          
                              {' '}
                              <Input
                                type="text"
                                defaultValue={element.yard_stock}
                                onChange={(e) => handleStockinput1(e, element)}
                              />
                              {/* <Col md="6">
                                <Input
                                  type="text"
                                  name="yardToStoreValue"
                                  placeholder="Enter value"
                                  value={yardToStoreValue}
                                  onChange={(e) => setYardToStoreValue(e.target.value)}
                                />
                              </Col> */}
                              <Button
                                color="primary"
                                className="shadow-none"
                                onClick={() => {
                                  if (validationMessage) {
                                    message(validationMessage, 'error');
                                  } else {
                                    adjuststock1(element);
                                    updateStockinInventory1();
                                    setStockinputOpen1(false);
                                  }
                                }}
                              >
                                save
                              </Button>
                          
                          </>
                        )}
                        {/* {validationMessage && <div className="text-danger">{validationMessage}</div>} */}
                      </td>
                    ) : (
                      <td>
                        <span
                          onClick={() => {
                            setStockChangeId1(element.inventory_id);
                            setStockinputOpen1(true);
                          }}
                        >
                          <Link to="">Yard Stock</Link>
                        </span>
                      </td>
                    )}
                    <td>
                      <span
                        onClick={() => {
                          setAdjustStockHistoryModal1(true);
                          setModalId1(element.inventory_id);
                        }}
                      >
                        <Link to="">view</Link>
                      </span>
                    </td>
                    {adjustStockHistoryModal1 && modalId1 === element.inventory_id && (
                      <YardStockHistoryModal
                        adjustStockHistoryModal1={adjustStockHistoryModal1}
                        setAdjustStockHistoryModal1={setAdjustStockHistoryModal1}
                        inventoryId={modalId1}
                      />
                    )}
                    {/* <td> <Col >
                <FormGroup>
                  
                  <Input
                    type="select"
                    name="status"
                    //value={element.status}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    //onChange={handleInputs}
                    //disabled={isProjectCompleted}
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="WIP">Yard_store</option>
                    <option value="Billable">store_yard</option>
                 
                  </Input>
                </FormGroup>
              </Col>
              {selectedStatus === 'WIP' && (
                      <>
                      <Row>
                        <Col md="6">
                         
                            <Input
                              type="text"
                              name="yardToStoreValue"
                              placeholder="Enter value"
                              value={yardToStoreValue}
                              onChange={(e) => setYardToStoreValue(e.target.value)}
                            />
                          
                      </Col>
                      <Col md="6">
                          <Button
                            color="primary"
                            className="shadow-none"
                            onClick={() => {
                              // Perform actions when the "Save" button is clicked
                              console.log('Save clicked! Yard to Store Value:', yardToStoreValue);
                            }}
                          >
                            Save
                          </Button>
                        </Col>
                        </Row>
                      </>
                    )}</td> */}
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
}

export default Inventory;
