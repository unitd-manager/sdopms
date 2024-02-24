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
  //   Form,
     Table
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as $ from 'jquery';
import random from 'random';
import moment from 'moment';
import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message';

const DeliveryInvoice1 = ({ projectId, addDeliveryInvoiceModal, setDeliveryInvoiceModal }) => {
  DeliveryInvoice1.propTypes = {
    addDeliveryInvoiceModal: PropTypes.bool,
    projectId: PropTypes.string,
    setDeliveryInvoiceModal: PropTypes.func,
  };

  const [deliveryInvoiceDetails, setdeliveryInvoiceDetails] = useState({
    invoice_date: '',
    invoice_code: '',
    purchase_order_id: '',
  });

  const [getProductValue, setProductValue] = useState();
  const [addMoreItem, setMoreItem] = useState([
    {
      id: random.int(1, 99).toString(),
      itemId: '',
      qty: '',
    },
    {
      id: random.int(0, 9999).toString(),
      itemId: '',

      qty: '',
    },
    {
      id: random.int(0, 9999).toString(),
      itemId: '',

      qty: '',
    },
  ]);

  //handle inputs
  const handleInputs = (e) => {
    setdeliveryInvoiceDetails({ ...deliveryInvoiceDetails, [e.target.name]: e.target.value });
  };

  const AddNewLineItem = () => {
    setMoreItem([
      ...addMoreItem,
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        qty: '',
      },
    ]);
  };

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

  // Materials Purchased

  //   const TabMaterialsPurchased = () => {
  //     api
  //       .get('/purchaseorder/TabPurchaseOrderLineItem')
  //       .then((res) => {
  //         const items = res.data.data;
  //         const finaldat = [];
  //         items.forEach((item) => {
  //           finaldat.push({ value: item.product_id, label: item.title });
  //         });
  //       })
  //       .catch(() => {
  //         message('Tab Purchase Order not found', 'info');
  //       });
  //   };

  const poProduct = (deliveryInvoiceId, itemObj) => {
    api
      .post('/purchaseorder/insertDeliveryInvoicehistory', {
        delivery_invoice_id: deliveryInvoiceId,
        item_title: itemObj.Item,
        quantity: Number(itemObj.qty).toFixed(2),
        // unit: itemObj.unit,
        // amount: itemObj.amount,
        // description: itemObj.description,
        // creation_date: new Date(),
        // modification_date: new Date(),
        // created_by: '1',
        // modified_by: '1',
        // status: 'In Progress',
        // cost_price: Number(itemObj.cost_price).toFixed(2),
        // selling_price: itemObj.mrp,
        // qty_updated: Number(0).toFixed(2),
        qty: parseInt(itemObj.qty, 10),
        product_id: parseInt(itemObj.itemId, 10),
        // supplier_id: insertPurchaseOrderData.supplier_id,
        // gst: Number(itemObj.gst).toFixed(2),
        // damage_qty: 0,
        // brand: '',
        // qty_requested: Number(0).toFixed(2),
        // qty_delivered: Number(0).toFixed(2),
        // price: Number(itemObj.price).toFixed(2),
      })
      .then(() => {
        //setDeliveryInvoiceModal(false);
        message('Product Added!', 'success');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 300);
      })
      .catch(() => {
        message('Unable to add Product!', 'error');
      });
  };

  const getAllValues = () => {
    const result = [];
    const oldArray = addMoreItem;
    $('.lineitem tbody tr').each(() => {
      const allValues = {};
      $(this)
        .find('input')
        .each(() => {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    deliveryInvoiceDetails.purchase_order_id = projectId;
    if (deliveryInvoiceDetails.invoice_date !== '' && deliveryInvoiceDetails.invoice_code !== '') {
      //deliveryInvoiceDetails.invoice_code = code;
      api.post('/purchaseorder/insertDeliveryInvoice', deliveryInvoiceDetails).then((res) => {
        //message('Purchase Order Added!', 'success');

        result.forEach((obj) => {
          if (obj.qty !== '' || !obj.qty) {
            poProduct(res.data.data.insertId, obj);
          }
        });

        // getProduct();
        oldArray.forEach((obj) => {
          if (obj.id) {
            /* eslint-disable */
            // const objId = parseInt(obj.id)
            const foundObj = oldArray.find((el) => el.id === obj.id);
            if (foundObj) {
              obj.product_id = foundObj.product_id;
              obj.title = foundObj.title;
              obj.item_title = foundObj.item_title;
            }
            if (obj.unit) {
              poProduct(res.data.data.insertId, foundObj);

              // setTimeout(()=>{
              //   setDeliveryInvoiceModal(false);
              //   window.location.reload()
              // },1300)
            }
          }
        });
        setTimeout(() => {
          setDeliveryInvoiceModal(false);
          window.location.reload();
        }, 1300);
      });
    } else {
      message('Please fill all required fields.', 'warning');
    }
    //setDeliveryInvoiceModal(false);
  };

  const generateCodes = () => {
    api
      .post('/tender/getCodeValue', { type: 'purchaseOrder' })
      .then((res) => {
        getAllValues(res.data.data);
      })
      .catch(() => {
        getAllValues('');
      });
  };
  //const [showPcItemsTable, setShowPcItemsTable] = useState(false);
  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...addMoreItem];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    copyDeliverOrderProducts[index] = updatedObject;
    setMoreItem(copyDeliverOrderProducts);
  }

  //   const [claimData, setClaimData] = useState([]);
  //   // Get ProjectClaim By ProjectId
  //   const getProjectClaimById = () => {
  //     api
  //       .post('/purchaseorder/getDeliveryInvoice', { purchase_order_id: projectId })
  //       .then((res) => {
  //         setClaimData(res.data.data[0]);
  //         console.log('234', res.data.data);
  //         console.log('claimData', claimData);
  //       })
  //       .catch(() => {
  //         message('Project claim not found', 'info');
  //       });
  //   };
  //   const [claimItemsData, setClaimItemsData] = useState([]);

  //   const getClaimPaymentById = (deliveryInvoiceId) => {
  //     api.post('/purchaseorder/getDeliveryInvoicehistory', { delivery_invoice_id: claimData.deliveryInvoiceId})
  //       .then((res) => {
  //         setClaimItemsData(res.data.data);
  //         console.log('2345', res.data.data);
  //         console.log('claimData1', claimItemsData);
  //       })
  //       .catch(() => {
  //         message("claim payment not found", "info");
  //       });
  //   }
  //   useEffect(()=>{
  //     getClaimPaymentById();
  //   },[])

  //   const viewPcItems = () => {
  //     getClaimPaymentById();
  //     setShowPcItemsTable(true);
  //   };

  useEffect(() => {
    getProduct();
    //getProjectClaimById();
    //getGstValue();
    //getMaxItemcode();
    //TabMaterialsPurchased();
    //getSupplier();
  }, [projectId]);
  useEffect(() => {
    setMoreItem([
      {
        id: random.int(1, 99).toString(),
        itemId: '',
        qty: '',
      },
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        qty: '',
      },
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        qty: '',
      },
    ]);
  }, [addDeliveryInvoiceModal]);

  const onchangeItem = (str, itemId) => {
    const element = addMoreItem.find((el) => el.id === itemId);
    element.Item = str.label;
    element.itemId = str.value;
    setMoreItem(addMoreItem);
  };

  // Clear row value
  const ClearValue = (ind) => {
    setMoreItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
  };
  const [testJsonData, setTestJsonData] = useState(null);
  useEffect(() => {
    api
      .post('/purchaseorder/getDeliveryInvoice', { purchase_order_id: projectId })
      .then((res) => {
        setTestJsonData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [projectId]);
// render table in group based on same id's
function groupBy(arr, key) {
    return arr.reduce((acc, item) => {
      const group = item[key];
      acc[group] = acc[group] || [];
      acc[group].push(item);
      return acc;
    }, {});
  }
  const groups = testJsonData && groupBy(testJsonData, 'purchase_order_id');
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
                {addMoreItem.map((el, index) => {
                  return (
                    <tr key={el.id}>
                      <td data-label="title">
                        <Select
                          key={el.id}
                          defaultValue={{ value: el.product_id, label: el.title }}
                          onChange={(e) => {
                            onchangeItem(e, el.id);
                          }}
                          options={getProductValue}
                        />
                        <Input
                          value={el.product_id}
                          type="hidden"
                          name="product_id"
                          onChange={(e) => updateState(index, 'product_id', e)}
                        ></Input>
                        <Input
                          value={el.title}
                          type="hidden"
                          name="title"
                          onChange={(e) => updateState(index, 'title', e)}
                        ></Input>
                      </td>
                      {/* <td data-label="ProductName"><Input type="text" name="item_title" value={el.item_title}  onChange={(e)=>updateState(index,"item_title",e)}/></td> */}

                      <td data-label="Qty">
                        <Input
                          type="text"
                          name="qty"
                          value={el.qty}
                          onChange={(e) => updateState(index, 'qty', e)}
                          //onBlur={(e) => updateAmount(index)}
                        />
                      </td>

                      <td data-label="Action">
                        <div className="anchor">
                          <span
                            onClick={() => {
                              ClearValue(el);
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
              generateCodes();
              getProduct();
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

      {/* <Row className="mb-4">
        <Col md="3">
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              setAddPurchaseOrderModal(true);
            }}
          >
            Add Purchase Order
          </Button>
        </Col>
        
        
      </Row> */}

      {testJsonData && (
        <>
          {Object.values(groups).map((group, index) => (
            <>
              <Row key={index.toString()}>
                <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
                  <Row>
                    <Col>{group[0].company_name}</Col>
                    <Col>{group[0].invoice_code}</Col>
                  </Row>
                </CardTitle>
              </Row>
              <Table
                key={group[0].purchase_order_id}
                id="example"
                className="display border border-secondary rounded"
              >
                <thead>
                  <tr>
                    <th>Product Title</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {group.map((item) => (
                    <tr key={item.po_product_id}>
                      <td>{item.item_title}</td>
                      <td>{item.quantity}</td>

                      <td> </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default DeliveryInvoice1;
