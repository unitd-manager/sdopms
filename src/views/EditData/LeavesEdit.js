import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import LeavePastHistory from '../../components/LeaveTable/LeavePastHistory';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
import LeaveMainDetails from '../../components/LeaveTable/LeaveMainDetails';
import ApiButton from '../../components/ApiButton';

const LeavesEdit = () => {
  //Const Variables
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [leavesDetails, setLeavesDetails] = useState({});
  const [PastleavesDetails, setPastLeavesDetails] = useState();
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [difference, setDifference] = useState();

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  // Button Save Apply Back List
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Leave');
  };
  // TOGGLE Tab
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  //  get Leave Past history
  const LeavePastHistoryById = (empId) => {
    api
      .post('/leave/getPastLeaveHistoryById', { employee_id: empId })
      .then((res) => {
        setPastLeavesDetails(res.data.data);
      })
      .catch(() => {
        message('leaves Data Not Found', 'info');
      });
  };

  // Get Leaves By Id
  const editLeavesById = () => {
    api
      .post('/leave/getLeaveByid', { leave_id: id })
      .then((res) => {
        setLeavesDetails(res.data.data[0]);
        LeavePastHistoryById(res.data.data[0].employee_id);
        const fromMonth = moment(res.data.data[0].from_date).format('MM');
        const toMonth = moment(res.data.data[0].to_date).format('MM');
        const diff = fromMonth - toMonth;

        setDifference(diff);
      })
      .catch(() => {
        message('leaves Data Not Found', 'info');
      });
  };
  //Leave Functions/Methods
  const handleInputs = (e) => {
    setLeavesDetails({ ...leavesDetails, [e.target.name]: e.target.value });
  };
  // Attachment
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  //Logic for edit data in db
  const editLeavesData = () => {
    if (
      leavesDetails.from_date &&
      leavesDetails.to_date &&
      leavesDetails.leave_type &&
      leavesDetails.no_of_days
    ) {
      api
        .post('/leave/editleave', leavesDetails)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  useEffect(() => {
    editLeavesById();
  }, [id]);

  return (
    <>
      {/* BreadCrumbs */}
      <BreadCrumbs heading={leavesDetails && leavesDetails.employee_name} />
      {/* Button */}
      <ApiButton
        editData={editLeavesData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        module="Leave"
      ></ApiButton>
  
      {/* Main Details */}
      <LeaveMainDetails
        handleInputs={handleInputs}
        leavesDetails={leavesDetails}
        difference={difference}
      ></LeaveMainDetails>

      {/* Nav tab */}
      <ComponentCard>
        <ToastContainer></ToastContainer>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Attachment
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Past Leave HIstory
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          {/* Attachment */}
          <TabPane tabId="1">
            <Form>
              <FormGroup>
                <ComponentCard title="Attachments">
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Leave');
                          setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
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
                    altTagData="LeaveRelated Data"
                    desc="LeaveRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="Leave" recordType="RelatedPicture" />
                </ComponentCard>
              </FormGroup>
            </Form>
          </TabPane>
          {/* Past Leave history */}
          <TabPane tabId="2">
            <LeavePastHistory PastleavesDetails={PastleavesDetails}></LeavePastHistory>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default LeavesEdit;
