import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { useNavigate} from 'react-router-dom';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs'
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';

const ContentDetails = () => {
  //All const variables
  const [content, setContent] = useState();
  const navigate = useNavigate()
  const [contentDetails, setContentDetails] = useState({
    title: "",
    creation_date:moment(),
    content_date:moment(),
    content_type:''
  });
  //setting data in contentDetails
  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  }
  //getting data from content
  const getContent = () => {
    api.get('/content/getContent')
      .then((res) => {
        setContent(res.data.data)
        console.log(content)
      })
  }
  //Insert Content Data
  const insertContentData = () => {  
    if (contentDetails.title !== ''){
      contentDetails.creation_date = creationdatetime
    api.post('/content/insertContent', contentDetails)
    .then((res) => {
      const insertedDataId= res.data.data.insertId
      message('Content inserted successfully.','success')
      setTimeout(()=> {
        navigate(`/ContentEdit/${insertedDataId}`)
      },300);     
    })
    .catch(() => {
      message('Network connection error.', 'error');
    });
  }else {
  message('Please fill all required fields.', 'warning');
}
};
  useEffect(() => {
    getContent();
  }, [])

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                <Col md="12">
                    <Label>Title<span className='required'>*</span></Label>
                    <Input type="text"
                      onChange={handleInputs}
                      value={contentDetails && (contentDetails.title)}
                      name="title" />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button className='shadow-none'
                    color="primary"
                    onClick={() => {
                      insertContentData();
                    }}>
                    Save
                  </Button>
                  <Button
                    className="shadow-none"
                    color="dark"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to cancel  \n  \n You will lose any changes made',
                        )
                      ) {
                        navigate(-1);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
}
export default ContentDetails