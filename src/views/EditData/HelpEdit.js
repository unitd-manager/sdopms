import React, { useEffect, useState } from 'react';
import { Row,  Form, FormGroup} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import ApiButton from '../../components/ApiButton';

const ContentUpdate = () => {
  // All state variables
  const [lineItem] = useState(null);
  const [contentDetails, setContentDetails] = useState();


  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
const backToList=()=>{
  navigate('/Help')
}
  //Setting data in contentDetails
  // Get content data By content id
  const getContentById = () => {
    api
      .post('/content/getContentById', { content_id: id })
      .then((res) => {
        setContentDetails(res.data.data);
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
      });
  };

 
  useEffect(() => {
  
    getContentById();
    console.log(lineItem);
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={contentDetails && contentDetails.title} />
      <Form>
        <FormGroup>
          <ComponentCardV2>
          <ApiButton
            backToList={backToList}
           ></ApiButton>
          
          </ComponentCardV2>
          {/* Content Details Form */}
          <ComponentCard title="Module Flow">
            <ToastContainer></ToastContainer>
            <Row>
            <div
                    dangerouslySetInnerHTML={{ __html: contentDetails && contentDetails.description }}
                  ></div>
              
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      {/* Picture and Attachments Form */}
           <br />
    </>
  );
};
export default ContentUpdate;
