import React from 'react';
import { CardTitle, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

export default function CreationModification({ details = null, title }) {
  CreationModification.propTypes = {
    details: PropTypes.object,
    title: PropTypes.string,
  };
  return (
    <>
      <CardTitle tag="h4" className="border-bottom px-4 py-3 mb-0">
        <Row>
          <Col>{title}</Col>
          {details && (
            <Col>
              <Row>
                <small style={{fontSize:'0.2', fontStyle:'normal'}}> Creation: {details && details.created_by} {details && details.creation_date}</small>
              </Row>
              <Row className="d-flex">
                <small style={{fontSize:'0.2'}}> Modified: {details && details.modified_by} {details && details.modification_date}</small>
              </Row>
            </Col>
          )}
        </Row>
      </CardTitle>
    </>
   );
}