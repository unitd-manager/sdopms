import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { useParams,useNavigate } from 'react-router-dom';
import api from '../../constants/api';
import message from '../../components/Message';
import ComponentCard from '../../components/ComponentCard';
import InventoryEditPart from '../../components/InventoryTable/InventoryEditPart';
import InventoryEditTables from '../../components/InventoryTable/InventoryEditTables';
import creationdatetime from '../../constants/creationdatetime';
import ApiButton from '../../components/ApiButton';

const Test = () => {
  //state variables
  const [tabPurchaseOrdersLinked, setTabPurchaseOrdersLinked] = useState([]);
  const [projectsLinked, setProjectsLinked] = useState([]);
  const [productQty, setProductQty] = useState({});
  const [adjustedStocks, setAdjustedStocks] = useState([]);
  const [damagedStock, setDamagedStock] = useState(0);
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

  //params and routing
  const { id } = useParams();
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/inventory');
  };
  //handle input change
  const handleInputs = (e) => {
    setInventoryDetails({ ...inventoryDetails, [e.target.name]: e.target.value, inventory_id: id });
  };
  // //get data for purchaseorder table
  // const getInventoryData = (inventoryid) => {
  //   api
  //     .post(`inventory/getinventoryById`, { inventory_id: inventoryid })
  //     .then(({ data }) => {
  //       setInventoryDetails(data.data[0]);
  //     })
  //     .catch(() => {
  //       message('Unable to get inventory data.', 'error');
  //     });
  // };

  const getAllpurchaseOrdersLinked = (productid) => {
    api
      .post(`inventory/gettabPurchaseOrderLinkedById`, { product_id: productid })
      .then(({ data }) => {
        setTabPurchaseOrdersLinked(data.data);
      })
      .catch(() => {
        message('Unable to get purchase order data.', 'error');
      });
  };

  const getAllProjectsLinked = (productid) => {
    api
      .post(`inventory/getTabProjectLinkedById`, { product_id: productid })
      .then(({ data }) => {
        setProjectsLinked(data.data);
      })
      .catch(() => {
        message('Unable to get projects data.', 'error');
      });
  };

  const getproductquantity = (productid) => {
    api
      .post(`inventory/getProductQuantity`, { product_id: productid })
      .then((res) => {
        setProductQty(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to get product qty data.', 'error');
      });
  };
  //get inventoryby product id
  const getInventoryData = () => {
    api
      .post('/inventory/getinventoryById', { productId: id })
      .then((res) => {
        setInventoryDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to get inventory data.', 'error');
      });
  };


  const getAdjustHistory = () => {
    api
      .post('/inventory/getAdjustStockHistory', { product_id: id })
      .then((res) => {
        setAdjustedStocks(res.data.data);
        console.log('stockchanges',res.data.data)
        let changestock=0;
        res.data.data.forEach(element => {
          if(element.adjust_stock){
          changestock += parseFloat(element.adjust_stock)
          console.log('changeStocklog',changestock)
          }
        });
        setDamagedStock(changestock);
        console.log(adjustedStocks)
        console.log('changeStock',changestock)
      })
      .catch(() => {
        message('Unable to get inventory data.', 'error');
      });
  };

  //update Inventory
  const editinventoryData = () => {
    inventoryDetails.modification_date = creationdatetime;

    api
      .post('/inventory/editinventoryMain', inventoryDetails)
      .then(() => {
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
    getAdjustHistory();
    getInventoryData();
    getAllpurchaseOrdersLinked();
    getAllProjectsLinked();
    getproductquantity(id);
  }, [id]);

  useEffect(() => {
    const { productId } = inventoryDetails;
    if (productId) {
      getAllpurchaseOrdersLinked(productId);
      getAllProjectsLinked(productId);
      getproductquantity(productId);
    }
  }, [inventoryDetails]);



  return (
      <>
        <ToastContainer></ToastContainer>
        <ApiButton
              editData={editinventoryData}
              navigate={navigate}
              applyChanges={editinventoryData}
              backToList={backToList}
              module="Inventory"
            ></ApiButton>
        <InventoryEditPart
          inventoryDetails={inventoryDetails}
          handleInputs={handleInputs}
          editinventoryData={editinventoryData}
        />
        <Row>
          <Form>
            <ComponentCard title="Stock Details">
              <Row>
                <Col xs="12" md="3">
                  <Row>
                    <h5>Total Purchased quantity</h5>
                  </Row>
                  <span>{productQty && productQty.materials_purchased}</span>
                  <Row></Row>
                </Col>
                <Col xs="12" md="3">
                  <Row>
                    <h5>Sold quantity</h5>
                  </Row>
                  <span>{productQty && productQty.materials_used}</span>
                  <Row></Row>
                </Col>
                <Col xs="12" md="3">
                  <Row>
                    <h5>Changed quantity</h5>
                  </Row>
                  <span>
                    {damagedStock}
                  </span>
                  <Row></Row>
                </Col>
                <Col xs="12" md="3">
                  <Row>
                    <h5>Remaining Purchased quantity</h5>
                  </Row>
                  <span>
                    {productQty && productQty.materials_purchased - productQty.materials_used + parseFloat(damagedStock)}
                  </span>
                  <Row></Row>
                </Col>
              </Row>
            </ComponentCard>
          </Form>
        </Row>
        <InventoryEditTables
          tabPurchaseOrdersLinked={tabPurchaseOrdersLinked}
          projectsLinked={projectsLinked}
        />
      </>
  );
};

export default Test;
