import React,{useState} from 'react';
import { Row, Col, FormGroup, Label, Input, Form,Button } from 'reactstrap';
import { useNavigate,Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../ComponentCard';
import message from '../Message';
import YardStockHistoryModal from './YardStockHistoryModal';
//import ComponentCardV2 from '../ComponentCardV2';
import ApiButton from '../ApiButton';
import DamagedStockLogModal from './DamagedStockLogModal';

function InventoryEditPart({ inventoryDetails, handleInputs, editinventoryData,handleStockinput1,validationMessage,updateStockinInventory1,adjuststock1,handleStockinput2,updateStockinInventory2,adjuststock2 }) {
  InventoryEditPart.propTypes = {
    inventoryDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    editinventoryData: PropTypes.func,
    handleStockinput1:PropTypes.func,
    validationMessage:PropTypes.any,
    updateStockinInventory1:PropTypes.any,
    adjuststock1:PropTypes.any,
    handleStockinput2:PropTypes.func,
    updateStockinInventory2:PropTypes.any,
    adjuststock2:PropTypes.any
  };
  //navigation
  const navigate = useNavigate();
  // Route Change
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Inventory');
  };

  const [stockinputOpen1, setStockinputOpen1] = useState(false);
  
  const [stockinputOpen2, setStockinputOpen2] = useState(false);
  const [modalId1, setModalId1] = useState(null);
  const [adjustStockHistoryModal1, setAdjustStockHistoryModal1] = useState(false);
  const [modalId2, setModalId2] = useState(null);
  const [adjustStockHistoryModal2, setAdjustStockHistoryModal2] = useState(false);
  const [stockChangeId1, setStockChangeId1] = useState();
  const [stockChangeId2, setStockChangeId2] = useState();
  return (
    <div>
      <Row>
        <BreadCrumbs heading={inventoryDetails && inventoryDetails.title} disabled />
        <ToastContainer></ToastContainer>
        <Form>
          <FormGroup>
          
            <ApiButton
              editData={editinventoryData}
              navigate={navigate}
              applyChanges={applyChanges}
              backToList={backToList}
             // deleteData={deleteLoanData}
              module="Inventory"
            ></ApiButton>
              {/* <Row>
                <Col>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      editinventoryData();
                      navigate(`/Inventory`);
                    }}
                  >
                    Save
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      editinventoryData();
                      applyChanges();
                    }}
                  >
                    Apply
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="shadow-none"
                    color="dark"
                    onClick={() => {
                      backToList();
                    }}
                  >
                    {' '}
                    Back to List{' '}
                  </Button>
                </Col>
              </Row> */}
           
           
            <ComponentCard title="Product Details" righttitle={<Row>
                <Col className='fs-10 small'>
                  <small>Creation :</small>
                  <small>
                    {inventoryDetails && inventoryDetails.created_by}
                    {inventoryDetails &&
                      inventoryDetails.creation_date}
                  </small>
                </Col>

                  <Col className="fs-10 small">
                    <small>Modification :</small>

                    <small>
                      {inventoryDetails && inventoryDetails.modified_by}
                      {inventoryDetails && inventoryDetails.modification_date}
                    </small>
                  </Col>
                </Row>
              }
            >
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Label>Inventory Code</Label>
                    <Input
                      type="text"
                      value={inventoryDetails && inventoryDetails.inventory_code}
                      name="inventory_code"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Product Name</Label>
                    <Input
                      type="text"
                      value={inventoryDetails && inventoryDetails.product_name}
                      onChange={handleInputs}
                      name="product_name"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Product Type</Label>
                    <Input
                      type="text"
                      value={inventoryDetails && inventoryDetails.product_type}
                      name="product_type"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Item Code</Label>
                    <Input
                      type="text"
                      value={inventoryDetails && inventoryDetails.item_code}
                      name="item_code"
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Label>UOM</Label>
                    <Input
                      type="text"
                      value={inventoryDetails && inventoryDetails.unit}
                      name="unit"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>MOL</Label>
                    <Input
                      type="text"
                      defaultValue={inventoryDetails && inventoryDetails.minimum_order_level}
                      onChange={handleInputs}
                      name="minimum_order_level"
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Notes</Label>
                    <Input
                      onChange={handleInputs}
                      type="textarea"
                      defaultValue={inventoryDetails && inventoryDetails.notes}
                      name="notes"
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Yard Stock</Label>
                    <Input
                      onChange={handleStockinput1}
                      type="text"
                      defaultValue={inventoryDetails && inventoryDetails.yard_stock}
                      name="yard_stock"
                      disabled
                    ></Input>
                  </FormGroup>
                </Col>
                <Row>
                <Col md="3">
                  <FormGroup>
                    <Label>Damaged Stock</Label>
                    <Input
                      onChange={handleStockinput1}
                      type="text"
                      defaultValue={inventoryDetails && inventoryDetails.damaged_stock}
                      name="yard_stock"
                      disabled
                    ></Input>
                  </FormGroup>
                </Col>
                </Row>
                {stockinputOpen1 && stockChangeId1 === inventoryDetails.inventory_id ? (
                      <Col md='3'>
                        {' '}
                        <Input
                          type="text"
                          //defaultValue={inventoryDetails&& inventoryDetails.yard_stock}
                          onChange={(e) => handleStockinput1(e, )}
                        />
                        <Button
                          color="primary"
                          className="shadow-none"
                          onClick={() => {
                            if (validationMessage) {
                              message(validationMessage, 'error');
                            } else {
                              adjuststock1(inventoryDetails);
                              updateStockinInventory1();
                              setStockinputOpen1(false);
                            }
                          
                          }}
                        >
                          save
                        </Button>
                        {/* {validationMessage && <div className="text-danger">{validationMessage}</div>} */}
                      </Col>
                    ) : 
                    (
                     <Col>
                        <span
                          onClick={() => {
                            setStockChangeId1(inventoryDetails.inventory_id);
                            setStockinputOpen1(true);
                          }}
                        >
                          <Link to="">Yard Stock</Link>
                        </span>
                   </Col>
                    )}
                 <Col>
                      <span
                        onClick={() => {
                          setAdjustStockHistoryModal1(true);
                          setModalId1(inventoryDetails.inventory_id);
                        }}
                      >
                        <Link to="">view</Link>
                      </span>
                      {adjustStockHistoryModal1 && (modalId1===inventoryDetails.inventory_id) && <YardStockHistoryModal
                      adjustStockHistoryModal1={adjustStockHistoryModal1}
                      setAdjustStockHistoryModal1={setAdjustStockHistoryModal1}
                      inventoryId={modalId1}
                    />} 
                    </Col>
              </Row>
              <Row>
              {stockinputOpen2 && stockChangeId2 === inventoryDetails.inventory_id ? (
                      <Col md='3'>
                        {' '}
                        <Input
                          type="text"
                          //defaultValue={inventoryDetails&& inventoryDetails.damaged_stock}
                          onChange={(e) => handleStockinput2(e, )}
                        />
                        <Button
                          color="primary"
                          className="shadow-none"
                          onClick={() => {
                            if (validationMessage) {
                              message(validationMessage, 'error');
                            } else {
                              adjuststock2(inventoryDetails);
                              updateStockinInventory2();
                              setStockinputOpen2(false);
                            }
                          
                          }}
                        >
                          save
                        </Button>
                        {/* {validationMessage && <div className="text-danger">{validationMessage}</div>} */}
                      </Col>
                    ) : 
                    (
                     <Col>
                        <span
                          onClick={() => {
                            setStockChangeId2(inventoryDetails.inventory_id);
                            setStockinputOpen2(true);
                          }}
                        >
                          <Link to="">Damaged Stock</Link>
                        </span>
                   </Col>
                    )}
                 <Col>
                      <span
                        onClick={() => {
                          setAdjustStockHistoryModal2(true);
                          setModalId2(inventoryDetails.inventory_id);
                        }}
                      >
                        <Link to="">view</Link>
                      </span>
                      {adjustStockHistoryModal2 && (modalId2===inventoryDetails.inventory_id) && <DamagedStockLogModal
                      damagedStockLogModal={adjustStockHistoryModal2}
                      setDamagedStockLogModal={setAdjustStockHistoryModal2}
                      inventoryId={modalId2}
                    />} 
                    </Col>
              </Row>
            </ComponentCard>
          </FormGroup>
        </Form>
      </Row>
    </div>
  );
}

export default InventoryEditPart;
