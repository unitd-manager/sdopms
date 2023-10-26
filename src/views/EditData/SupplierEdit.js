import React, { useState, useEffect } from 'react';
import {Row,Button} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import creationdatetime from '../../constants/creationdatetime';
import message from '../../components/Message';
import api from '../../constants/api';
import PurchaseOrderLinked from '../../components/SupplierModal/Purchaseorderlinked';
import SupplierTable from '../../components/SupplierModal/SupplierTable';
import SupplierDetails from '../../components/SupplierModal/SupplierDetails';
import ApiButton from '../../components/ApiButton';
import ComponentCard from '../../components/ComponentCard';
//import Tab from '../../components/ProjectTabs/Tab';

const SupplierEdit = () => {
  //all state variables
  const [supplier, setSupplier] = useState();
  //const [activeTab, setActiveTab] = useState('1');
  const [purchaseOrder, setPurchaseOrder] = useState();
  const [allCountries, setAllCountries] = useState();
  const [editPurchaseOrderLinked, setEditPurchaseOrderLinked] = useState(false);
  const [supplierStatus, setSupplierStatus] = useState();
  const [status, setStatus] = useState();

  //navigation and params
  const { id } = useParams();
  const navigate = useNavigate();
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Supplier');
  };
  const handleInputs = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };
  // Get Supplier By Id
  const editSupplierById = () => {
    api
      .post('/supplier/get-SupplierById', { supplier_id: id })
      .then((res) => {
        setSupplier(res.data.data[0]);
      })
      .catch(() => {
        //message('Supplier Data Not Found', 'info');
      });
  };
  // Start for tab refresh navigation
  // const tabs = [{ id: '1', name: 'Make Supplier Payment' }];
  // const toggle = (tab) => {
  //   setActiveTab(tab);
  // };
  //Logic for edit data in db
  const editSupplierData = () => {
    if (supplier.company_name !== '') {
      supplier.modification_date = creationdatetime;

      api
        .post('/supplier/edit-Supplier', supplier)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };
  //Logic for edit data in db
  const Status = () => {
    api
      .post('/supplier/getStatus', { supplier_id: id })
      .then((res) => {
        setStatus(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    editSupplierById();
  }, [id]);
  // Get purchaseOrder By Id

  const suppliereditdetails = () => {
    api
      .get('/supplier/getCountry')
      .then((res) => {
        setAllCountries(res.data.data);
      })
      .catch(() => {
        //message('Supplier Data Not Found', 'info');
      });
  };
  //Api call for getting Staff Type From Valuelist
  const getSupplierStatus = () => {
    api
      .get('/supplier/getValueList')
      .then((res) => {
        setSupplierStatus(res.data.data);
      })
      .catch(() => {
        //message('Status Data Not Found', 'info');
      });
  };

  const getpurchaseOrder = () => {
    api
      .post('/supplier/getPurchaseOrderLinkedss', { supplier_id: id })
      .then((res) => {
        setPurchaseOrder(res.data.data);
      })
      .catch(() => {
        //message('Supplier not found', 'info');
      });
  };
  useEffect(() => {
    getpurchaseOrder();
    suppliereditdetails();
    getSupplierStatus();
    Status();
  }, []);

  return (
    <>
      <BreadCrumbs heading={supplier && supplier.company_name} />

      <ApiButton
        editData={editSupplierData}
        navigate={navigate}
        applyChanges={editSupplierData}
        backToList={backToList}
        module="Supplier"
      ></ApiButton>

      <SupplierDetails
        handleInputs={handleInputs}
        supplier={supplier}
        allCountries={allCountries}
        supplierStatus={supplierStatus}
        status={status}
        setEditPurchaseOrderLinked={setEditPurchaseOrderLinked}
      ></SupplierDetails>
      <ToastContainer></ToastContainer>

      <ComponentCard title="More Details">           <Row>
                <div className="pt-1 mt-1 d-flex align-items-center gap-1">
                  <Button
                    className="shadow-none"
                    onClick={() => {
                      setEditPurchaseOrderLinked(true);
                    }}
                    color="primary"
                  >
                    Make Supplier Payment
                  </Button>
                </div>
              </Row>
              <br/>
            <PurchaseOrderLinked
              editPurchaseOrderLinked={editPurchaseOrderLinked}
              setEditPurchaseOrderLinked={setEditPurchaseOrderLinked}
              getpurchaseOrder={getpurchaseOrder}
            ></PurchaseOrderLinked>

            <SupplierTable
              purchaseOrder={purchaseOrder}
              getpurchaseOrder={getpurchaseOrder}
            ></SupplierTable>
          {/* </TabPane>
        </TabContent> */}
      </ComponentCard>
    </>
  );
};

export default SupplierEdit;
