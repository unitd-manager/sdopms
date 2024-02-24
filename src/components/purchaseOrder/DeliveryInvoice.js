import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  CardTitle,
  //   Table
} from 'reactstrap';
import PropTypes from 'prop-types';
// import * as $ from 'jquery';
import random from 'random';
import moment from 'moment';
import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message';
import DeliveryInvoiceItems from './DeliveryInvoiceItems';

const DeliveryInvoice = ({ projectId, addDeliveryInvoiceModal, setDeliveryInvoiceModal }) => {
  DeliveryInvoice.propTypes = {
    addDeliveryInvoiceModal: PropTypes.bool,
    projectId: PropTypes.string,
    setDeliveryInvoiceModal: PropTypes.func,
    // products:PropTypes.func,
  };

  const [getProductValue, setProductValue] = useState();

  const [deliveryInvoiceDetails, setdeliveryInvoiceDetails] = useState({
    invoice_date: '',
    invoice_code: '',
    purchase_order_id: '',
  });
  //handle inputs
  const handleInputs = (e) => {
    setdeliveryInvoiceDetails({ ...deliveryInvoiceDetails, [e.target.name]: e.target.value });
  };
  //   const [productDetail, setProductDetail] = useState({
  //    category_id: null,
  //    sub_category_id: null,
  //    title: '',
  //    product_code: '',
  //    qty_in_stock: null,
  //    price: null,
  //    published: 0,
  //  });
  const [addMoreItem, setMoreItem] = useState([
    {
      id: random.int(1, 99).toString(),
      itemId: '',
      unit: '',
      qty: '',
      price: '',
      mrp: '',
      gst: '',
      description: '',
    },
    // {
    //   id: random.int(0, 9999).toString(),
    //   itemId: '',
    //   unit: '',
    //   qty: '',
    //   price: '',
    //   mrp: '',
    //   gst: '',
    //   description: '',
    // },
    // {
    //   id: random.int(0, 9999).toString(),
    //   itemId: '',
    //   unit: '',
    //   qty: '',
    //   price: '',
    //   mrp: '',
    //   gst: '',
    //   description: '',
    // },
  ]);

  // const [query, setQuery] = useState('');
  // const [filteredOptions, setFilteredOptions] = useState([]);

  // const handleInputChange = async (event) => {
  //   const inputQuery = event.target.value;
  //   setQuery(inputQuery);

  //   try {
  //     if (inputQuery.trim() === '') {
  //       setFilteredOptions([]);
  //     } else {
  //       api.post('/product/getProductsbySearchFilter',{keyword:inputQuery}).then((res) => {
  //         const items = res.data.data;
  //         const finaldat = [];
  //         items.forEach((item) => {
  //           finaldat.push({ value: item.product_id, label: item.title });
  //         });
  //         console.log('productsearchdata',finaldat)
  //         console.log('finaldat',finaldat)
  //         // setProductValue(finaldat);
  //         setFilteredOptions(finaldat);
  //       });

  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const handleSelectOption = (selectedOption,itemId) => {
  //   setQuery(selectedOption);
  //   const element = addMoreItem.find((el) => el.id === itemId);
  //   element.title = selectedOption.label;
  //   element.item_title = selectedOption.label;
  //   element.product_id = selectedOption.value.toString();
  //   setMoreItem(addMoreItem);
  //   setFilteredOptions([]); // Clear the suggestions when an option is selected
  //   // Additional actions to perform when an option is selected
  //   console.log('selectedoption',selectedOption)
  // };

  const AddNewLineItem = () => {
    setMoreItem([
      ...addMoreItem,
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        unit: '',
        qty: '',
        price: '',
        mrp: '',
        gst: '',
        description: '',
      },
    ]);
  };

  const [insertPurchaseOrderData] = useState({
    po_code: '',
    contact_id_supplier: '',
    delivery_terms: '',
    status: 'test',
    project_id: projectId,
    flag: 1,
    creation_date: new Date(),
    modification_date: new Date(),
    created_by: '1',
    modified_by: '1',
    supplier_reference_no: '',
    our_reference_no: '',
    shipping_method: '',
    payment_terms: '',
    delivery_date: '',
    po_date: '',
    shipping_address_flat: '',
    shipping_address_street: '',
    shipping_address_country: '',
    shipping_address_po_code: '',
    expense_id: 0,
    staff_id: 0,
    purchase_order_date: new Date(),
    payment_status: '0',
    title: 'Purchase Order',
    priority: '1',
    follow_up_date: new Date(),
    notes: 'test',
    supplier_inv_code: '',
    gst: 0,
    gst_percentage: '10%',
    delivery_to: '',
    contact: '',
    mobile: '',
    payment: '0',
    project: '',
  });

  //   Get Products
  const getProduct = () => {
    api.get('/product/getProducts').then((res) => {
      const items = res.data.data;
      const finaldat = [];
      items.forEach((item) => {
        finaldat.push({ value: item.product_id, label: item.title });
      });
      setProductValue(finaldat);
    });
  };

  const [products, setProducts] = useState();
  // Gettind data from Job By Id
  const [poProductIds1, setPoProductIds] = useState([]);
  console.log("poProductIds1",poProductIds1)

  // ...

  // Materials Purchased
  const TabMaterialsPurchased = () => {
    api
      .get('/purchaseorder/TabPurchaseOrderLineItem')
      .then((res) => {
        const items = res.data.data;
        const finaldat = [];
        items.forEach((item) => {
          finaldat.push({ value: item.product_id, label: item.title });
        });
      })
      .catch(() => {
        message('Tab Purchase Order not found', 'info');
      });
  };
 

  const getPoProduct = () => {
    api
      .post('/Purchaseorder/TabPurchaseOrderLineItemById', { purchase_order_id: projectId })
      .then((res) => {
        const items = res.data.data;
        console.log('items',items)
        const finaldat = [];
        items.forEach((item) => {
          finaldat.push({ value: item.product_id, label: item.title,...item });
        });
        setProducts(finaldat);
        console.log('finaldat',finaldat)
        const poProductIds = res.data.data.map((item) => item.po_product_id);
      setPoProductIds(poProductIds); // Store po_product_ids

      setMoreItem((prevItems) =>
        prevItems.map((item, index) => ({
          ...item,
          po_product_id: poProductIds[index], // Use poProductIds directly
        }))
      );
    })
    .catch(() => {
      message('Products Data Not Found', 'info');
    });
};
    

  useEffect(() => {
    getPoProduct();
  }, []);
  console.log('pro', products);
  

  const poProduct = (itemObj, deliveryInvoiceId) => {
    console.log("All Products:", products);
    console.log("All itemobj:", itemObj);
    const currentProduct = products.find((product) => product.po_product_id === itemObj.po_product_id);
    console.log("All Products1:", products);
    console.log("currentProduct",currentProduct)
    if (currentProduct) {
      const newYardStockValue = parseFloat(itemObj.qty) || 0;
      const initialStockValue = parseFloat(currentProduct.qty) || 0;

      const initialStockValue1 = parseFloat(currentProduct.stock) || 0;
      const initialStock = initialStockValue1+newYardStockValue
      
      // Validate that newYardStockValue is not greater than initialStockValue
      if (newYardStockValue > initialStockValue) {
        // Display alert message
        message('New qty should not be greater than initial qty value', 'error');
        return; // Stop further execution
      }
      // Now you can use newYardStockValue and initialStockValue for your calculations
      console.log('new', newYardStockValue);
      console.log('initial', initialStockValue);
      console.log("initial1",initialStockValue1);
      console.log("initial1=2",initialStock);

      api
        .post('/purchaseorder/insertDeliveryInvoicehistory', {
          purchase_order_id: projectId,
          delivery_invoice_id: deliveryInvoiceId,
          item_title: itemObj.title,
          po_product_id: itemObj.po_product_id,
          quantity: itemObj.qty,
          qty: parseInt(itemObj.qty, 10),
          product_id: itemObj.product_id,
        })

        .then(() => {
          // Update qty_to_stock in product table
          api
            .post('/product/edit-ProductQty', {
              product_id: itemObj.product_id,
              qty_in_stock: itemObj.qty,
            })
            .then(() => {
              message('Product and Inventory records updated successfully.', 'success');
            });
          //const deliveredQuantity = parseInt(itemObj.qty, 10);
          // After updating the product and inventory records, call the edit-inventory endpoint
          api
            .post('/inventory/editInventoryqty', {
              product_id: itemObj.product_id, // Add the inventory_id to the itemObj
              actual_stock: initialStock // Set actual_stock to the entered qty
            })
            .then(() => {
              message('Inventory updated successfully.', 'success');
            })

            .catch(() => {
              message('Unable to update product qty_to_stock.', 'error');
            });
        })
        .catch(() => {
          message('Unable to create inventory record.', 'error');
        });
    }
  };
console.log('addMoreItem',addMoreItem);
console.log('getProductValue',getProductValue);
  const getAllValues = async () => {

     // Validate invoice_date and invoice_code
  if (!deliveryInvoiceDetails.invoice_date || !deliveryInvoiceDetails.invoice_code) {
    message('Please enter Invoice Date and Invoice Code', 'error');
    return;
  }

  
    deliveryInvoiceDetails.purchase_order_id = projectId;
    try {
      const response = await api.post(
        '/purchaseorder/insertDeliveryInvoice',
        deliveryInvoiceDetails,
      );
      message('Purchase Order Added!', 'success');

      const deliveryInvoiceId = response.data.data.insertId;

      addMoreItem.forEach((item) => {
        if (item.qty !== '' || !item.qty) {
          console.log('item')
          poProduct(item, deliveryInvoiceId);
        }
      });
      // Validate each line item
  const isValid = addMoreItem.every((item) => {
    if (!item.product_id || !item.qty) {
      message('Please fill in all required fields for line items', 'error');
      return false;
    }
    return true;
  });
  if (!isValid) {
    return;
  }
    } catch (error) {
      console.error('Error inserting delivery invoice:', error);
    }
  };

  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...addMoreItem];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    copyDeliverOrderProducts[index] = updatedObject;
    setMoreItem(copyDeliverOrderProducts);
  }

  useEffect(() => {
    setMoreItem([
      {
        id: random.int(1, 99).toString(),
        itemId: '',
        unit: '',
        qty: '',
        price: '',
        mrp: '',
        gst: '',
        description: '',
      },
      //   {
      //     id: random.int(0, 9999).toString(),
      //     itemId: '',
      //     unit: '',
      //     qty: '',
      //     price: '',
      //     mrp: '',
      //     gst: '',
      //     description: '',
      //   },
      //   {
      //     id: random.int(0, 9999).toString(),
      //     itemId: '',
      //     unit: '',
      //     qty: '',
      //     price: '',
      //     mrp: '',
      //     gst: '',
      //     description: '',
      //   },
    ]);
  }, [addDeliveryInvoiceModal]);

  const onchangeItem = (str, itemId) => {
    const element = addMoreItem.find((el) => el.id === itemId);
    element.title = str.label;
    element.item_title = str.label;
    element.product_id = str.value.toString();
    element.po_product_id = str.po_product_id;
    element.stock = str.stock;
    element.qty_in_stock = str.qty_in_stock;
    setMoreItem(addMoreItem);
  };
  const [unitOptions, setUnitOptions] = useState([]);

  // Fetch data from API for unit options
  const getUnitOptions = () => {
    api.get('/product/getUnitFromValueList', unitOptions).then((res) => {
      const items = res.data.data;
      const finaldat = [];
      items.forEach((item) => {
        finaldat.push({ value: item.value, label: item.value });
      });
      setUnitOptions(finaldat);
    });
  };
  //   const onchangeItem1 = (selectedValue, index) => {
  //     const copyAddMoreItem = [...addMoreItem];
  //     copyAddMoreItem[index].unit = selectedValue.value;
  //     setMoreItem(copyAddMoreItem);
  //   };

  useEffect(() => {
    getProduct();
    TabMaterialsPurchased();
    getUnitOptions(); // Fetch unit options
  }, []);
  // Clear row value
  const ClearValue = (ind) => {
    setMoreItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
  };

  const [WorkSheet, setWorkOrderById] = useState([]);

  // Get ProjectClaim By ProjectId
  const getDeliveryInvoiceById = () => {
    api
      .post('/purchaseorder/getDeliveryInvoice', { purchase_order_id: projectId })
      .then((res) => {
        setWorkOrderById(res.data.data);
        console.log('234', res.data.data);
        console.log('claimData', WorkSheet);
      })
      .catch(() => {
        message('Project claim not found', 'info');
      });
  };


  useEffect(() => {
    getDeliveryInvoiceById();
   
  }, []);
 
  return (
    <>
      <Col md="3">
        <Button
          color="primary"
          className="shadow-none"
          onClick={() => {
            setDeliveryInvoiceModal(true);
          }}
        >
          Add DI
        </Button>
      </Col>
      <br />
      <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
        {' '}
        Delivery Invoice{' '}
      </CardTitle>
      <Modal size="xl" isOpen={addDeliveryInvoiceModal}>
        <ModalHeader>Add Delivery Invoice</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  {/* <Col md="2">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        setAddNewProductModal(true);
                      }}
                    >
                      Add New Product
                    </Button>
                  </Col> */}
                  <Col md="2">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        AddNewLineItem();
                      }}
                    >
                      Add Item
                    </Button>
                  </Col>

                  <Col md="2">
                    <FormGroup>
                      <Label>
                        Invoice Date <span className="required"> *</span>
                      </Label>
                      <Input
                        type="date"
                        name="invoice_date"
                        value={moment(
                          deliveryInvoiceDetails && deliveryInvoiceDetails.invoice_date,
                        ).format('YYYY-MM-DD')}
                        onChange={handleInputs}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <FormGroup>
                      <Label>
                        Invoice No <span className="required"> *</span>
                      </Label>
                      <Input
                        type="text"
                        name="invoice_code"
                        value={deliveryInvoiceDetails && deliveryInvoiceDetails.invoice_code}
                        onChange={handleInputs}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                {/* <Row>
                  <FormGroup className="mt-3">
                    {' '}
                    Total Amount : {getTotalOfPurchase() || 0}{' '}
                  </FormGroup>
                </Row> */}
              </Col>
            </Row>

            <table className="lineitem">
              <thead>
                <tr>
                  <th scope="col">
                    Product <span className="required"> *</span>
                  </th>
                  <th scope="col">Quantity</th>

                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {addMoreItem.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td data-label="title">
                        <Select
                          key={item.id}
                          defaultValue={{ value: item.product_id, label: item.title,product_id:item.product_id, po_product_id:item.po_product_id }}
                          onChange={(e) => {
                            onchangeItem(e, item.id);
                          }}
                          options={products}
                        />
                        <Input value={item.product_id} type="hidden" name="product_id"></Input>
                        <Input value={item.title} type="hidden" name="title"></Input>
                      </td>

                      <td data-label="Qty">
                        <Input
                          defaultValue={item.qty}
                          type="number"
                          name="qty"
                          onChange={(e) => updateState(index, 'qty', e)}
                          value={insertPurchaseOrderData && insertPurchaseOrderData.qty}
                        />
                      </td>
                      <td data-label="Action">
                        <div className="anchor">
                          <span
                            onClick={() => {
                              ClearValue(item);
                            }}
                          >
                            Clear
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              //generateCodes();
              //insertPurchaseOrderData();
              getAllValues();
              getProduct();
              poProduct();
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setDeliveryInvoiceModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <DeliveryInvoiceItems
        WorkSheet={WorkSheet}
        getDeliveryInvoiceById={getDeliveryInvoiceById}
        //   id={id}
      />

      {/* </Col>
              </Row>
              
            );
          })}
          
      </Form>  */}
      {/* {showPcItemsTable && (
        <Table className="lineitem border border-secondary rounded">
          <thead>
            <tr>
              <th scope="col">Product title </th>
              <th scope="col">Quantity </th>
            </tr>
          </thead>

          <tbody>
            {claimItemsData &&
              claimItemsData.map((e) => {
                return (
                  <tr>
                    <td>{e.item_title}</td>
                    <td>{e.qty}</td>
                    <td></td>

                    <td>
                      <Row></Row>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
       )}  */}

      {/* {showPcItemsTable && (
        <Table>
          <FormGroup>
            <table className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Product Title</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {claimItemsData &&
                  claimItemsData.map((res) => {
                    return (
                      <>
                        <tr key={res.item_id}>
                          <td>{res.product_id}</td>
                          <td>{res.quantity}</td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </FormGroup>
        </Table>
      )} */}
      {/* <Row>
        <CardTitle tag="h4" className="border-bottom bg-dark p-2 mb-0 text-white">
          Delivery Invoice
        </CardTitle>
      </Row>

      <Form className="mt-4">
        <Row className="border-bottom mb-3">
          <Col>
            <FormGroup>
              <Label>Invoice Code</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Invoice Date</Label>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Action</Label>{' '}
            </FormGroup>
          </Col>
          <Col></Col>
        </Row> */}

      {/* <Row>
          <Col>
            <FormGroup>{claimData.invoice_code}</FormGroup>{' '}
          </Col>
          <Col>
            <FormGroup>
              {claimData.invoice_date ? moment(claimData.invoice_date).format('DD-MM-YYYY') : ''}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>
                <div className="anchor">
                  <span
                  onClick={() => {
                    setShowPcItemsTable(!showPcItemsTable);
                    if (claimData && claimData.delivery_invoice_id) {
                      // Assuming you have a function to handle viewing PC items by delivery_invoice_id
                      viewPcItems(claimData.delivery_invoice_id);
                    }
                  }} */}
      {/* // onClick={() => {
                        
                    //   //   setPcId(claimData.project_claim_id);
                    //   //   setPcItems(!pcItems);
                    // }}
        //           >
        //             View Pc items
        //           </span>
        //         </div>
        //       </Label>
        //     </FormGroup>
        //   </Col> */}

      {/* <Col></Col> */}
      {/* <Col>
            <FormGroup>
              <Label>
                <div className="anchor">
                  <span
                    onClick={() => {
                      setPcId(claimData.project_claim_id);
                      setEditPcModal(true);
                    }}
                  >
                    Edit Pc
                  </span>
                </div>
              </Label>
            </FormGroup>
          </Col> */}
      {/* </Row>
        {showPcItemsTable && (
          <Table>
            <FormGroup>
              <table className="lineitem">
                <thead>
                  <tr>
                    <th scope="col">Product Title</th>
                    <th scope="col">Quantity</th> */}
      {/* <th scope="col">Amount</th>
                <th scope="col">Status</th>
                 <th scope="col">Edit</th>
                <th scope="col">Print</th> */}
      {/* </tr>
                </thead>
                <tbody>
                  {claimItemsData &&
                    claimItemsData.map((res) => {
                      return (
                        <>
                          <tr key={res.item_id}>
                          
                            <td>{res.quantity}</td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </FormGroup>
          </Table>
        )}
      </Form> */}
      {/* </>
      )} */}
      {/* {editClaimModal && (
        <EditClaimModal
          projectId={projectId}
          projectClaimId={pcId}
          editClaimModal={editClaimModal}
          setEditClaimModal={setEditClaimModal}
          pc={pc}
        />
      )}
      {editPcModal && (
        <EditPc
          editPcModal={editPcModal}
          setEditPcModal={setEditPcModal}
          pc={projectDetail}
          projectClaimId={pcId}
        />
      )} */}
      {/* {pcItems && (
        <ClaimItems
          projectId={projectId}
          projectClaimId={pcId}
          checkId={checkId}
          POId={POId}
          projectDetail={projectDetail}
          deliveryData={deliveryData}
          editPo={editPo}
        />
      )} */}
    </>
  );
};

export default DeliveryInvoice;
