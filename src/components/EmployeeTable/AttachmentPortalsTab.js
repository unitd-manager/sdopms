import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import AttachmentModal from './AttachmentModal';
import ViewFileComponent from './ViewFileComponent';

function AttachmentPortalsTab({
  dataForPicture,
  dataForAttachment,
  setAttachmentModal,
  id,
  attachmentModal,
  pictureData,
  attachmentData,
}) {
  AttachmentPortalsTab.propTypes = {
    dataForPicture: PropTypes.any,
    dataForAttachment: PropTypes.func,
    setAttachmentModal: PropTypes.func,
    id: PropTypes.any,
    attachmentModal: PropTypes.bool,
    pictureData: PropTypes.any,
    attachmentData: PropTypes.any,
  };
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
 const[update,setUpdate]=useState(false);

  // const[empPicUpdate,setEmpPicUpdate]=useState(false);
  // const[workPermitUpdate,setWorkPermitUpdate]=useState(false);
  // const[otherFilesUpdate,setOtherFilesUpdate]=useState(false);
  // const[csocUpdate,setCsocUpdate]=useState(false);
  // const[wsqUpdate,setWsqUpdate]=useState(false);
  // const[housingUpdate,setHousingUpdate]=useState(false);
  // const[digitalSignUpdate,setDigitalSignUpdate]=useState(false);

  return (
    <div>
      <Row>
        <Form>
          <FormGroup>
            <Row>
              <Col md="6">
                <ComponentCard title="Picture">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            setRoomName('EmployeePicture');
                            setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF']);
                            dataForPicture();
                            setAttachmentModal(true);
                          }}
                        >
                          <Icon.Image className="rounded-circle" width="20" />
                        </Button>
                     
                    </Col>
                  </Row>
                  <AttachmentModal
                    moduleId={id}
                    recordType="EmployeePicture"
                    roomName={roomName}
                    altTagData="EmployeePicData"
                    desc="EmployeePicData"
                    fileTypes={fileTypes}
                    modelType={pictureData.modelType}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponent
                    moduleId={id}
                    roomName="Employeepicture"
                    recordType="EmployeePicture"
                    update={update}
                    setUpdate={setUpdate}
                  />
                </ComponentCard>
              </Col>
              <Col md="6">
                <ComponentCard title="Work Permit">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Employeeworkpermit');
                          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModal
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="WorkPermit"
                    desc="workPermit"
                    recordType="Employeeworkpermit"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponent
                    moduleId={id}
                    roomName="Employeeworkpermit"
                    recordType="Employeeworkpermit"
                    update={update}
                    setUpdate={setUpdate}
                  />
                </ComponentCard>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Row>
      <Row>
        {/* Picture and Attachments Form */}
        <Form>
          <FormGroup>
            <Row>
              <Col md="6">
                <ComponentCard title="WSQ">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('wsq');
                          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModal
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="wsq Data"
                    desc="wsq Data"
                    recordType="WsqAttachment"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponent moduleId={id} roomName="wsq" recordType="WsqAttachment"  update={update}
                    setUpdate={setUpdate}/>
                </ComponentCard>
              </Col>
              <Col md="6">
                <ComponentCard title="Digital Sign">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('digitalSign');
                          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModal
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="digitalSign Data"
                    desc="digitalSign Data"
                    recordType="digitalSign"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponent
                    moduleId={id}
                    roomName="digitalSign"
                    recordType="digitalSign"
                    update={update}
                    setUpdate={setUpdate}
                  />
                </ComponentCard>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Row>

      <Row>
        {/* Picture and Attachments Form */}
        <Form>
          <FormGroup>
            <Row>
              <Col md="6">
                <ComponentCard title="CSOC">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('csoc');
                          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModal
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="csoc Data"
                    desc="csoc Data"
                    recordType="csoc"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponent moduleId={id} roomName="csoc" recordType="csoc"  update={update}
                    setUpdate={setUpdate}/>
                </ComponentCard>
              </Col>
              <Col md="6">
                <ComponentCard title="Other Files">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('EmployeeOtherFiles');
                          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModal
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="otherFiles Data"
                    desc="otherFiles Data"
                    recordType="EmployeeOtherFiles"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponent
                    moduleId={id}
                    roomName="EmployeeOtherFiles"
                    recordType="EmployeeOtherFiles"
                    update={update}
                    setUpdate={setUpdate}
                  />
                </ComponentCard>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Row>
      <Row>
        {/* Picture and Attachments Form */}
        <Form>
          <FormGroup>
            <ComponentCard title="Housing / Accommodation">
              <Row>
                <Col xs="5" md="5" className="mb-3">
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      setRoomName('housing');
                      setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                      dataForAttachment();
                      setAttachmentModal(true);
                    }}
                  >
                    <Icon.File className="rounded-circle" width="20" />
                  </Button>
                </Col>
              </Row>
              <AttachmentModal
                moduleId={id}
                attachmentModal={attachmentModal}
                setAttachmentModal={setAttachmentModal}
                roomName={roomName}
                fileTypes={fileTypes}
                altTagData="housing Data"
                desc="housing Data"
                recordType="housing"
                mediaType={attachmentData.modelType}
                update={update}
                    setUpdate={setUpdate}
              />
              <ViewFileComponent moduleId={id} roomName="housing" recordType="housing" update={update}
                    setUpdate={setUpdate}/>
            </ComponentCard>
          </FormGroup>
        </Form>
      </Row>
    </div>
  );
}

export default AttachmentPortalsTab;
