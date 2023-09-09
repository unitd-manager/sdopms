import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';
import JobInformation from '../SupplierModal/JobInformationEditModal';
import PdfKET from '../PDF/PdfKET';
import ApiButton from '../ApiButton';

export default function Jobinformationedit({
    editJobData,id,
    applyChanges,
    navigate,
    insertJobInformation,
    JobInformationEditModal,
    setJobInformationEditModal,
}) {
    Jobinformationedit.propTypes = {
      applyChanges: PropTypes.func,
        editJobData: PropTypes.any,
        id: PropTypes.any,
        insertJobInformation: PropTypes.any,
        JobInformationEditModal: PropTypes.any,
        setJobInformationEditModal: PropTypes.any,
    navigate: PropTypes.any
  };
  const backToList=()=>{
    navigate('/JobInformation');
  }
  return (
 <Form>
 <FormGroup>
   <ComponentCardV2>
     <Row>
      <Col>
      <PdfKET></PdfKET>
      </Col>
      <ApiButton
              editData={editJobData}
              navigate={navigate}
              applyChanges={applyChanges}
              backToList={backToList}
             // deleteData={deleteLoanData}
              module="JobInformation"
            ></ApiButton>
       {/* <Col>
         <Button className='shadow-none'
           color="primary"
           onClick={() => {
             editJobData();
             navigate('/JobInformation')
            

             console.log('cancel process');
           }}
         >
           {' '}Save{' '}
         </Button>
       </Col>
       <Col>
         <Button className='shadow-none'
           color="primary"
           onClick={() => {
             editJobData();
             applyChanges();
             
             console.log('cancel process');
           }}>
           {' '}Apply{' '}
         </Button>
       </Col>
       <Col>
         <Button className='shadow-none'
           color="dark"
           onClick={() => {
             navigate('/JobInformation');
             console.log('back to list');
           }}>
           Back to List
         </Button>
       </Col> */}
       <Col>
         <Button className='shadow-none' onClick={() => insertJobInformation(id)} color="dark">
           Duplicate
         </Button>
         <JobInformation
           JobInformationEditModal={JobInformationEditModal}
           setJobInformationEditModal={setJobInformationEditModal}></JobInformation>
       </Col>
     </Row>
   </ComponentCardV2>
   </FormGroup>
   </Form>
  );
        }