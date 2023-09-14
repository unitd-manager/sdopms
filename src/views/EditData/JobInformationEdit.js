import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  CardTitle,
  TabContent,
  TabPane,
} from 'reactstrap';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import message from '../../components/Message';
import api from '../../constants/api';
import Jobinformationedit from '../../components/JobInformation/Jobinformationedit';
import JobKeyDetails from '../../components/JobInformation/JobKeyDetails';
import JobLeaveandMedical from '../../components/JobInformation/JobLeaveandMedical';
import JobWorkingHours from '../../components/JobInformation/JobWorkingHours';
import JobProbation from '../../components/JobInformation/JobProbation';
import JobSalary from '../../components/JobInformation/JobSalary';
import JobInformationSalary from '../../components/JobInformation/JobInformationSalary';
import ViewNote from '../../components/Tender/ViewNote';
import AddNote from '../../components/Tender/AddNote';
import JobTermination from '../../components/JobInformation/JobInformationTermination';
import JobBank from '../../components/JobInformation/Job';
import Tab from '../../components/ProjectTabs/Tab';


const JobInformationEdit = () => {
  //All state variable
  const [activeTab, setActiveTab] = useState('1');
  const [job, setJob] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [JobInformationEditModal, setJobInformationEditModal] = useState(false);
  const [overTimeRate, setOverTimeRate] = useState('');
  const [allBank, setAllBank] = useState();
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
const[update,setUpdate]=useState(false);

  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();
  //Button fuctions
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/JobInformation');
  };
  // Getting data from jobinformation By Id
  const editJobById = () => {
    api
      .post('/jobinformation/EditjobinformationById', { job_information_id: id })
      .then((res) => {
        setJob(res.data.data[0]);
        setOverTimeRate(res.data.data[0].overtime_pay_rate);
      })
      .catch(() => {
        message('JobInformation Data Not Found', 'info');
      });
  };
  //jobinformation data in jobinformationDetails
  const handleInputsJobInformation = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };
  //Calculation for gst
  const handleRadioGst = (radioVal, overtimeRate, basicPay) => {
    /* eslint-disable */
    if (basicPay == '') {
      basicPay = 0;
    }
    if (overtimeRate == '') {
      overtimeRate = 0;
    }
    if (radioVal === '1') {
      setOverTimeRate((parseFloat(basicPay) / 30) * parseFloat(1 / 8) * parseFloat(overtimeRate));
    } else {
      setOverTimeRate(0);
    }
  };
  //Logic for editting data in db
  const editJobData = () => {
    job.overtime_pay_rate = overTimeRate;
    if (job.working_days && job.basic_pay && job.join_date && job.govt_donation) {
      api
        .post('/jobinformation/edit-jobinformation', job)
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

  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Working hours' },
    { id: '2', name: 'Leave and Medical' },
    { id: '3', name: 'Probation Details (KET)' },
    { id: '4', name: 'Salary Information' },
    { id: '5', name: 'CPF Information' },
    { id: '6', name: 'Bank Information' },
    { id: '7', name: 'Termination Information' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation #Renuka 1-06-23

  //for duplicating job information
  const insertJobInformation = () => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: 'Do you wish to duplicate the job information',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/jobinformation/edit-jobinformation', { job_information_id: id }).then(() => {
          Swal.fire('Your Job Information duplicated successfully', 'success').then(() => {
            setJobInformationEditModal(true);
          });
          editJobData();
        });
      }
    });
  };

  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  const BankDetails = () => {
    api
      .get('/bank/getBank')
      .then((res) => {
        setAllBank(res.data.data);
      })
      .catch(() => {
        message('JobInformation Data Not Found', 'info');
      });
  };

  useEffect(() => {
    BankDetails();
    editJobById();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <CardTitle>Step 1 (Job Information)</CardTitle>
      <CardTitle>
        <Label>Employee Name:</Label>
        {job && job.first_name}
      </CardTitle>
      <CardTitle>
        <Label>NRIC no:</Label>
        {job && job.nric_no}
      </CardTitle>
      <ToastContainer></ToastContainer>
      <Jobinformationedit
        editJobData={editJobData}
        id={id}
        applyChanges={applyChanges}
        navigate={navigate}
        backToList={backToList}
        insertJobInformation={insertJobInformation}
        JobInformationEditModal={JobInformationEditModal}
        setJobInformationEditModal={setJobInformationEditModal}
      ></Jobinformationedit>
      <Form>
        <FormGroup>
          {/* JobInformation Details */}
          <JobKeyDetails
            handleInputsJobInformation={handleInputsJobInformation}
            job={job}
          ></JobKeyDetails>

          <ComponentCard title="More Details">
            <Tab toggle={toggle} tabs={tabs} />
            <TabContent className="p-4" activeTab={activeTab}>
              <TabPane tabId="1">
                <JobWorkingHours
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobWorkingHours>
              </TabPane>
              <TabPane tabId="2">
                <JobLeaveandMedical
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobLeaveandMedical>
              </TabPane>
              <TabPane tabId="3">
                <JobProbation
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobProbation>
              </TabPane>
              <TabPane tabId="4">
                <JobInformationSalary
                  handleInputsJobInformation={handleInputsJobInformation}
                  handleRadioGst={handleRadioGst}
                  job={job}
                  overTimeRate={overTimeRate}
                ></JobInformationSalary>
              </TabPane>
              <TabPane tabId="5">
                <JobSalary
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobSalary>
              </TabPane>
              <TabPane tabId="6">
                <JobBank
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                  allBank={allBank}
                ></JobBank>
              </TabPane>
              <TabPane tabId="7">
                <JobTermination
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobTermination>
              </TabPane>
            </TabContent>
          </ComponentCard>
        </FormGroup>
      </Form>

      <Form>
        <FormGroup>
          <ComponentCard title="Attachments">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('Booking');
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
              roomName={roomName}
              fileTypes={fileTypes}
              altTagData="BookingRelated Data"
              desc="BookingRelated Data"
              recordType="RelatedPicture"
              mediaType={attachmentData.modelType}
              update={update}
              setUpdate={setUpdate}
            />
            <ViewFileComponentV2 moduleId={id} roomName="Booking" recordType="RelatedPicture"  update={update}
              setUpdate={setUpdate} />
          </ComponentCard>
        </FormGroup>
      </Form>
      {/* ADD NOTE */}
      <ComponentCard title="Add a note">
        <AddNote recordId={id} roomName="JobInfoEdit" />
        <ViewNote recordId={id} roomName="JobInfoEdit" />
      </ComponentCard>
    </>
  );
};
export default JobInformationEdit;
