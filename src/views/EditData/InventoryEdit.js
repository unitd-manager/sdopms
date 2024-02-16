import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import api from '../../constants/api';
import message from '../../components/Message';
import ComponentCard from '../../components/ComponentCard';
import InventoryEditPart from '../../components/InventoryTable/InventoryEditPart';
import InventoryEditTables from '../../components/InventoryTable/InventoryEditTables';
import creationdatetime from '../../constants/creationdatetime';

const Test = () => {
  //state variables
  const [tabPurchaseOrdersLinked, setTabPurchaseOrdersLinked] = useState();
  const [projectsLinked, setProjectsLinked] = useState([]);
  // const [ setProductQty] = useState({});
  const [inventoryDetails, setInventoryDetails] = useState({
    inventory_code: '',
    inventory_id: '',
    minimum_order_level: '',
    productId: '',
    product_type: '',
    company_name: '',
    product_name: '',
    item_code: '',
    unit: '',
    notes: '',
    product_code: '',
  });

 
  const [adjuststockDetails1, setAdjuststockDetails1] = useState({
    inventory_id: null,
    product_id: null,
    //adjust_stock: 0,
    yard_stock:0,
    modified_by: '',
    created_by: '',
    //current_stock: null,
  });
  //params and routing
  const { id } = useParams();
  const { loggedInuser } = useContext(AppContext);
  const [stockLogs, setStockLogs] = useState([]);
  const [adjustStocks, setAdjustStocks] = useState([]);
  const [changedStock, setChangedStock] = useState();
  const [shipToYard, setShipToYard] = useState(0);
  const [movedToShip, setMovedToShip] = useState(0);
  const [shipStock, setShipStock] = useState(0);
   const [totalQty, setTotalQty] = useState(0);
  console.log('shipstock',shipStock)
  console.log('shipToYard',shipToYard)
  console.log('movedToShip',movedToShip)
  const [inventoryStock1, setInventoryStock1] = useState({
    inventory_id: null,
    yard_stock:null,
  });
  const [validationMessage, setValidationMessage] = useState('');
  
  const getAdjustStocklogsById = () => {
    api
      .post('/inventory/getAdjustStock', { inventory_id: id })
      .then((res) => {
        setAdjustStocks(res.data.data);
      })
      .catch(() => {
        message('adjuststock logs Data Not Found', 'info');
      });
  };

  //handle input change
  const handleInputs = (e) => {
    setInventoryDetails({ ...inventoryDetails, [e.target.name]: e.target.value, inventory_id: id });
  };
   //get inventoryby product id
   const getInventoryData = () => {
    api
      .post('/inventory/getinventoryById', { inventory_id: id })
      .then((res) => {
        setInventoryDetails(res.data.data[0]);
        console.log('inventorydetails',res.data.data[0])
      })
      .catch(() => {
        message('Unable to get inventory data.', 'error');
      });
  };
  //get data for purchaseorder table
  const getAllpurchaseOrdersLinked = () => {
    api
      .post('/inventory/gettabPurchaseOrderLinkedById', { product_id: inventoryDetails && inventoryDetails.productId })
      .then((res) => {
        setTabPurchaseOrdersLinked(res.data.data);
      })
      .catch(() => {
        message('Unable to get purchase order data.', 'error');
      });
  };

  const getStockExchangelogs = () => {
    api
      .post('/projecttabmaterialusedportal/getstockExchangeLogsByProductId', { product_id: inventoryDetails && inventoryDetails.productId })
      .then((res) => {
        setStockLogs(res.data.data);
        let ship=0;
        let yard=0;
        res.data.data.forEach((el)=>{
          console.log('el',el)
if(el.stock_move==="YardToShip"){
ship += parseFloat(el.quantity ||0)
}
if(el.stock_move==="ShipToYard"){
  yard+=parseFloat(el.quantity ||0)
}
        })
        console.log('ship',ship)
        console.log('yard',yard)
setMovedToShip(ship);
setShipToYard(yard);
const shipstock=parseFloat(ship)-parseFloat(yard)
setShipStock(shipstock)
setTotalQty(parseFloat(inventoryDetails&&inventoryDetails.stock)+parseFloat(inventoryDetails&&inventoryDetails.yard_stock)+parseFloat(shipstock))
      })
      .catch(() => {
      
      });
  };

  console.log("productId", tabPurchaseOrdersLinked)

  //get data for projects table
  const getAllProjectsLinked = () => {
    api
      .post('/inventory/getTabProjectLinkedById', {product_id: inventoryDetails && inventoryDetails.productId })
      .then((res) => {
        setProjectsLinked(res.data.data);
      })
      .catch(() => {
        message('Unable to get projects data.', 'error');
      });
  };

  //get product purchasedquantity and sold qty
  const getproductquantity = () => {
    api
      .post('/inventory/getProductQuantity', {product_id: inventoryDetails && inventoryDetails.productId })
      .then(() => {
        //setProductQty(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to get productqty data.', 'error');
      });
  };


   //Yard stock
 const handleStockinput1 = (e) => {
  const newYardStockValue = parseFloat(e.target.value) || 0;
  const initialStockValue = parseFloat(inventoryDetails.stock) || 0;
  // Check if the new yard stock is greater than the actual stock
  if (newYardStockValue > initialStockValue) {
    message('Yard stock cannot be greater than the actual stock.', 'error');
    // Optionally, reset the input value to the previous valid value or 0
    e.target.value = initialStockValue;
    return;
  }

  setInventoryStock1({
    inventory_id: inventoryDetails.inventory_id,
    yard_stock: newYardStockValue,
    stock: initialStockValue - newYardStockValue,
  });
   // Check if the new yard stock is greater than the actual stock
 if (newYardStockValue > initialStockValue) {
  setValidationMessage('Yard stock cannot be greater than the actual stock.');
  // Optionally, reset the input value to the previous valid value or 0
  setInventoryStock1({
    inventory_id: inventoryDetails.inventory_id,
    yard_stock: initialStockValue, // Reset to the initial stock value
    stock: 0,
  });
  return;
}
setValidationMessage(''); // Reset validation message if valid

  setAdjuststockDetails1({
    inventory_id: inventoryDetails.inventory_id,
    product_id: inventoryDetails.productId,
    yard_stock: newYardStockValue, // Calculate the change in yard_stock
    modified_by: '',
    created_by: '',
    actual_stock:initialStockValue - newYardStockValue,
    
  });
 };
  

  const adjuststock1 = () => {
    api
      .post('/inventory/insertyard_stock_log', adjuststockDetails1)
      .then(() => {
        message('yard Stock inserted successfully', 'success');
        getInventoryData();
        //navigate('/inventory');
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
      //getAllinventories();
      //navigate('/inventory');
    })
    .catch(() => {
      message('Unable to edit record.', 'error');
    });
};
 
  //update Inventory
  const editinventoryData = () => {
    inventoryDetails.modification_date = creationdatetime;
    inventoryDetails.modified_by = loggedInuser.first_name;
    api
      .post('/inventory/editinventoryMain', inventoryDetails)
      .then(() => {
        //adjuststock1();
        //updateStockinInventory1();
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    getInventoryData();
    getAllpurchaseOrdersLinked();
    getStockExchangelogs();
    getAllProjectsLinked();
  getAdjustStocklogsById();
    getproductquantity( inventoryDetails && inventoryDetails.productId);
  }, [ inventoryDetails && inventoryDetails.productId]);

  useEffect(() => {
    let changes=0;
    adjustStocks.forEach((el)=>{
changes +=parseFloat(el.adjust_stock);
    })
    setChangedStock(changes)
  }, [ adjustStocks]);
  return (
      <>
        <ToastContainer></ToastContainer>
        <InventoryEditPart
          inventoryDetails={inventoryDetails}
          handleInputs={handleInputs}
          editinventoryData={editinventoryData}
          handleStockinput1={handleStockinput1}
          validationMessage={validationMessage}
          adjuststock1={adjuststock1}
          updateStockinInventory1={updateStockinInventory1}
        />
        <Row>
          <Form>
            <ComponentCard title="Stock Details">
              <Row>
                <Col xs="12" md="2">
                  <Row>
                    <h5>Stock in Store</h5>
                  </Row>
                  <span>{inventoryDetails &&inventoryDetails.stock ||0}</span>
                  <Row></Row>
                </Col>
                <Col xs="12" md="2">
                  <Row>
                    <h5>Stock in Yard</h5>
                  </Row>
                  <span>{inventoryDetails &&inventoryDetails.yard_stock ||0}</span>
                  <Row></Row>
                </Col>
                <Col xs="12" md="2">
                  <Row>
                    <h5>Stock in Ships</h5>
                  </Row>
                  <span>{shipStock&&shipStock ||0}</span>
                  <Row></Row>
                </Col>
                <Col xs="12" md="2">
                  <Row>
                    <h5>Adjusted quantity</h5>
                  </Row>
                  <span>{changedStock&&changedStock ||0}</span>
                  <Row></Row>
                </Col>
                
                <Col xs="12" md="2">
                  <Row>
                    <h5>Total quantity</h5>
                  </Row>
                  <span>{totalQty && totalQty||0}</span>

                  <Row></Row>
                </Col>
              </Row>
            </ComponentCard>
          </Form>
        </Row>
        <InventoryEditTables
          tabPurchaseOrdersLinked={tabPurchaseOrdersLinked}
          projectsLinked={projectsLinked}
          stockLogs={stockLogs}
        />
      </>
  );
};

export default Test;
