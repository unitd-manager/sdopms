import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
//import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
//import DeleteButton from '../../components/DeleteButton';
import ApiButton from '../../components/ApiButton';

const SettingEdit = () => {
  //All state variable
  const [settingdetails, setSettingDetails] = useState();
  const [valueType, setValueType] = useState();
  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Setting');
  };
  //setting data in settingDetails
  const handleInputs = (e) => {
    setSettingDetails({ ...settingdetails, [e.target.name]: e.target.value });
  };
  //getting data from setting by Id
  const getSettingById = () => {
    api
      .post('/setting/getSettings', { setting_id: id })
      .then((res) => {
        setSettingDetails(res.data.data[0]);
        setValueType(res.data.data[0].value_type);
      })
      .catch(() => {
        message('setting Data Not Found', 'info');
      });
  };
  //Update Setting
  const editSettingData = () => {
    settingdetails.modification_date = creationdatetime;
    if (settingdetails.key_text !== '') {
      api
        .post('/setting/editSetting', settingdetails)
        .then(() => {
          message('Record editted successfully', 'success');
          getSettingById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };

  useEffect(() => {
    getSettingById();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>

      <ApiButton
        editData={editSettingData}
        navigate={navigate}
        applyChanges={editSettingData}
        backToList={backToList}
        // deleteData={deleteStaffData}
        module="Setting"
      ></ApiButton>

      {/* Setting Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Setting Details" creationModificationDate={settingdetails}>
            {' '}
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Key Text</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={settingdetails && settingdetails.key_text}
                    name="key_text"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={settingdetails && settingdetails.description}
                    name="description"
                  />
                </FormGroup>
              </Col>
              {valueType && valueType === 'Text Area' && (
                <Col md="4">
                  <FormGroup>
                    <Label>Value</Label>
                    <Input
                      type="textarea"
                      onChange={handleInputs}
                      value={settingdetails && settingdetails.value}
                      name="value"
                    />
                  </FormGroup>
                </Col>
              )}
              {valueType && valueType === 'Yes No' && (
                <Col md="4">
                  <FormGroup>
                    <Label> Value</Label>
                    <br></br>
                    <Label> Yes </Label>
                    <Input
                      name="value"
                      value="1"
                      type="radio"
                      defaultChecked={settingdetails && settingdetails.value === '1' && true}
                      onChange={handleInputs}
                    />
                    <Label> No </Label>
                    <Input
                      name="value"
                      value="0"
                      type="radio"
                      defaultChecked={settingdetails && settingdetails.value === '0' && true}
                      onChange={handleInputs}
                    />
                  </FormGroup>
                </Col>
              )}
              {valueType && valueType === 'Text field' && (
                <Col md="4">
                  <FormGroup>
                    <Label>Value</Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={settingdetails && settingdetails.value}
                      name="value"
                    />
                  </FormGroup>
                </Col>
              )}
              {valueType && valueType === '' && (
                <Col md="4">
                  <FormGroup>
                    <Label>Value</Label>
                    <Input
                      type="textarea"
                      onChange={handleInputs}
                      value={settingdetails && settingdetails.value}
                      name="value"
                    />
                  </FormGroup>
                </Col>
              )}
              {valueType && valueType === 'Number Field' && (
                <Col md="4">
                  <FormGroup>
                    <Label>Value</Label>
                    <Input
                      type="numbers"
                      onChange={handleInputs}
                      value={settingdetails && settingdetails.value}
                      name="value"
                    />
                  </FormGroup>
                </Col>
              )}
              {!valueType && (
                <Col md="4">
                  <FormGroup>
                    <Label>Value</Label>
                    <Input
                      type="textarea"
                      onChange={handleInputs}
                      value={settingdetails && settingdetails.value}
                      name="value"
                    />
                  </FormGroup>
                </Col>
              )}
              <Col md="4">
                <FormGroup>
                  <Label>Value Text</Label>
                  <Input
                    type="select"
                    value={settingdetails && settingdetails.value_type}
                    name="value_type"
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="Yes No">Yes No</option>
                    <option value="Text field">Text field</option>
                    <option value="Text Area">Text Area</option>
                    <option value="Number Field">Number Field</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default SettingEdit;
