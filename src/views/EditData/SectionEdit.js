import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, TabContent, TabPane } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
//import SectionButton from '../../components/SectionTable/SectionButton';
import creationdatetime from '../../constants/creationdatetime';
import ApiButton from '../../components/ApiButton';
import Tab from '../../components/ProjectTabs/Tab';

const SectionEdit = () => {
  //Const Variables
  const [section, setSection] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [valuelist, setValuelist] = useState();
  const [update, setUpdate] = useState(false);

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  //  toggle Expense
  const tabs = [{ id: '1', name: 'Attachment' }];
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  //  AttachmentModal
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  //attachment for upload file
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //  button position
  // const applyChanges = () => {};

  const backToList = () => {
    navigate('/Section');
  };
  //  Get section by id
  const editSectionyId = () => {
    api
      .post('/section/getSectionById', { section_id: id })
      .then((res) => {
        setSection(res.data.data[0]);
      })
      .catch(() => {
        message('Section Data Not Found', 'info');
      });
  };
  //Section Functions/Methods
  const handleInputs = (e) => {
    setSection({ ...section, [e.target.name]: e.target.value });
  };
  //Logic for section edit data in db
  const editSectionData = () => {
    if (section.section_title !== '') {
      section.modification_date = creationdatetime;
      api
        .post('/section/editSection', section)
        .then(() => {
          message('Record editted successfully', 'success');
          editSectionyId();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  // delete section
  const DeleteSection = () => {
    api
      .post('/section/deleteSection', { section_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };
  //Api call for getting valuelist dropdown
  const getValuelist = () => {
    api
      .get('/section/getValueList')
      .then((res) => {
        setValuelist(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };
  useEffect(() => {
    editSectionyId();
    getValuelist();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={section && section.section_title} />
      {/* Button */}
      {/* <SectionButton
        editSectionData={editSectionData}
        navigate={navigate}
        applyChanges={applyChanges}
        DeleteSection={DeleteSection}
        backToList={backToList}
        id={id}
      ></SectionButton> */}
      <ApiButton
        editData={editSectionData}
        navigate={navigate}
        applyChanges={editSectionData}
        backToList={backToList}
        deleteData={DeleteSection}
        module="Menu"
      ></ApiButton>
      {/* Main Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Section Details" creationModificationDate={section}>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>
                    Title<span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={section && section.section_title}
                    name="section_title"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Section Type</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={section && section.section_type}
                    name="section_type"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {valuelist &&
                      valuelist.map((e) => {
                        return (
                          <option key={e.value} value={e.value}>
                            {e.value}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Button Position</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={section && section.button_position}
                    name="button_position"
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="Top">Top</option>
                    <option value="Admin">Admin</option>
                    <option value="Reports">Reports</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Groups</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={section && section.groups}
                    name="groups"
                  >
                    <option defaultValue="selected">Please Select</option>
                   
                    <option value="Home">Home</option>
                    <option value="Project">Project</option>
                    {/* <option value="Finance/Admin/Purchase">Finance/Admin/Purchase</option> */}
                    <option value="Finance/Purchase">Finance/Purchase</option>
                    <option value="Payroll">Payroll</option>
                    <option value="Admin">Admin</option>
                    <option value="Reports">Reports</option>
                    {/* <option value="MileStone">Milestone</option> */}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Routes</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={section && section.routes}
                    name="routes"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Number Of Rows</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={section && section.number_of_rows}
                    name="number_of_rows"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <Label>Published</Label>
                <FormGroup>
                  <Input
                    type="radio"
                    name="published"
                    value="1"
                    onChange={handleInputs}
                    defaultChecked={section && section.published === 1 && true}
                  />
                  <Label>Yes</Label>

                  <Input
                    type="radio"
                    name="published"
                    value="0"
                    onChange={handleInputs}
                    defaultChecked={section && section.published === 0 && true}
                  />
                  <Label>No</Label>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      {/* Tab start */}

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('Staff');
                    setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}
                >
                  <Icon.File className="rounded-circle" width="20" />
                </Button>
              </Col>
            </Row>
            <AttachmentModalV2
              moduleId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
              roomName={RoomName}
              fileTypes={fileTypes}
              altTagData="StaffRelated Data"
              desc="StaffRelated Data"
              recordType="RelatedPicture"
              mediaType={attachmentData.modelType}
              update={update}
              setUpdate={setUpdate}
            />
            <ViewFileComponentV2
              moduleId={id}
              roomName="Staff"
              recordType="RelatedPicture"
              update={update}
              setUpdate={setUpdate}
            />
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default SectionEdit;
