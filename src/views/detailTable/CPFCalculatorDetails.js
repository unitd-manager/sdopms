import React from 'react';
import {Row,Col,Form,FormGroup,Label,Input,Button } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const JobInformationDetails = () => {
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>FROM Age</Label>
                    <Input type="text"/>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                    <Col md="12">
                        <Label>To Age</Label>
                        <Input type="text"/>
                    </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button color="primary" type="submit" className="btn mr-2 shadow-none">
                        Save & Continue
                        </Button>
                        <Button type="submit" className="btn btn-dark shadow-none">
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
};

export default JobInformationDetails;
