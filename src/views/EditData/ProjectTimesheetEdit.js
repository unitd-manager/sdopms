import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
//import DeleteButton from '../../components/DeleteButton';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ApiButton from '../../components/ApiButton';

const ProjectTimesheetEdit = () => {
  //All state variable
  const [timeSheet, setProjectTimesheet] = useState();
  const [employeeTimesheet, setEmployeeTimesheet] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [description, setDescription] = useState('');


  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/TimesheetList');
  };

  // data in Description Modal
const handleDataEditor = (e, type) => {
  setProjectTimesheet({
    ...timeSheet,
    [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
  });
};

 //Description Modal
 const convertHtmlToDraft = (existingQuoteformal) => {
  const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    setDescription(editorState);
  }
};

  //timeSheet data in timeSheet
  const handleInputs = (e) => {
    setProjectTimesheet({ ...timeSheet, [e.target.name]: e.target.value });
  };

  //getting data from timeSheet by Id
  const getTimesheetById = () => {
    api.post('/projecttimesheet/getTimeSheetById', { project_timesheet_id: id }).then((res) => {
      const timeSheetData = res.data.data[0];
      setProjectTimesheet(timeSheetData);
      if (timeSheetData.description) {
        convertHtmlToDraft(timeSheetData.description);
      }
    });
  };  

   //  Gettind data from Job By Id
   const JobTime = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeTimesheet(res.data.data);
      })
      .catch(() => {});
  };
  //Update timeSheet
  const editTimesheet = () => {
    api
      .post('/projecttimesheet/editTimeSheet', timeSheet)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  useEffect(() => {
    getTimesheetById();
    JobTime();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
          <ApiButton
              editData={editTimesheet}
              navigate={navigate}
              applyChanges={editTimesheet}
              backToList={backToList}
              //deleteData={DeleteSection}
              module="ProjectTimesheet"
            ></ApiButton>
            {/* <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editTimesheet();
                    navigate('/TimesheetList');
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
                    editTimesheet();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={(e) => {
                    if (window.confirm('Are you sure you want to cancel? ')) {
                      navigate('/TimesheetList');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton
                  id={id}
                  columnname="project_timesheet_id"
                  tablename="project_timesheet"
                ></DeleteButton>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row> */}
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* timesheet Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="ProjectTimesheetDetails">
            {' '}
            <ToastContainer></ToastContainer>
            <div>
              <BreadCrumbs />

              <ComponentCard title="Timesheet">
                <Form>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <Label>Project Title</Label>
                        <br />
              <span>{timeSheet && timeSheet.title}</span>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Milestone Title</Label>
                        <br />
              <span>{timeSheet && timeSheet.milestone_title}</span>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Title</Label>
                        <br />
              <span>{timeSheet && timeSheet.task_title}</span>
                      </FormGroup>
                    </Col>


                    <Col md="3">
                      <FormGroup>
                        <Label>date</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(timeSheet && timeSheet.date).format(
                            'YYYY-MM-DD',
                          )}                           
                          name="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          type="select"
                          name="employee_id"
                          onChange={handleInputs}
                          value={timeSheet && timeSheet.employee_id}
                        >
                          <option value="" defaultValue="selected"></option>
                          {employeeTimesheet &&
                            employeeTimesheet.map((ele) => {
                              return (
                                <option key={ele.employee_id} value={ele.employee_id}>
                                  {ele.first_name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Hours</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={timeSheet && timeSheet.hours}
                          name="hours"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={timeSheet && timeSheet.status}
                          name="status"
                        >
                           <option value="" selected="selected">
                                          Please Select
                                        </option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Started">Started</option></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ComponentCard>
              <ComponentCard title="Description">
                <Editor
                  editorState={description}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'description');
                    setDescription(e);
                  }}
                />
              </ComponentCard>
              <Form>
                <FormGroup>
                  <ComponentCard title="Attachments">
                    <Row>
                      <Col xs="12" md="3" className="mb-3">
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            setRoomName('Timesheet');
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
                      roomName={roomName}
                      fileTypes={fileTypes}
                      altTagData="MilsestoneRelated Data"
                      recordType="RelatedPicture"
                      desc="TimesheetRelated Data"
                      modelType={attachmentData.modelType}
                      attachmentModal={attachmentModal}
                      setAttachmentModal={setAttachmentModal}
                    />
                    <ViewFileComponentV2
                      moduleId={id}
                      roomName="TimesheetList"
                      recordType="RelatedPicture"
                    />
                  </ComponentCard>
                </FormGroup>
              </Form>
            </div>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default ProjectTimesheetEdit;
