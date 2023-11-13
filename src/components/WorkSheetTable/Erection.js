import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'reactstrap';
import PropTypes from 'prop-types';

function Erection({
  worksheet,
  handleInputs,
  handleErection,
  
}) {
    Erection.propTypes = {
    worksheet: PropTypes.object,
    handleErection: PropTypes.func,
    handleInputs: PropTypes.func,
    
  };

  const [grossPay, setGrossPay] = useState(0);

  // Calculate and update Gross Pay whenever relevant fields change
  useEffect(() => {
    const ErecPipe = parseFloat(worksheet.erec_pipe || 0);
    const ErecVolume = parseFloat(worksheet.erec_volume || 0);
    const ErecPlank = parseFloat(worksheet.erec_planks || 0);
    const ErecTB = parseFloat(worksheet.erec_t_b || 0);
    const Others = parseFloat(worksheet.others || 0);

    const newGrossPay = ErecPipe + ErecVolume + ErecPlank + ErecTB + Others;
    setGrossPay(newGrossPay);
  
  }, [
    worksheet.erec_pipe,
    worksheet.erec_volume,
    worksheet.erec_planks,
    worksheet.erec_t_b,
    worksheet.others
  ]);

  return (
    <div>
      <Row>
        <Col md="9">pipe</Col>
        <Col md="3">
          <Input
            name="erec_pipe"
            type="text"
            value={worksheet && worksheet.erec_pipe}
            onChange={(e) => {
              handleInputs(e);
              handleErection(
                e.target.value,
                worksheet.erec_t_b,
                worksheet.erec_planks,
                worksheet.others,
                worksheet.erec_volume,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">T/B</Col>
        <Col md="3">
          <Input
            name="erec_t_b"
            type="text"
            value={worksheet && worksheet.erec_t_b}
            onChange={(e) => {
              handleInputs(e);
              handleErection(
                e.target.value,
                worksheet.erec_pipe,
                worksheet.erec_planks,
                worksheet.others,
                worksheet.erec_volume,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">Planks</Col>
        <Col md="3">
          <Input
            name="erec_planks"
            type="text"
            value={worksheet && worksheet.erec_planks}
            onChange={(e) => {
              handleInputs(e);
              handleErection(
                e.target.value,
                worksheet.erec_pipe,
                worksheet.erec_t_b,
                worksheet.others,
                worksheet.erec_volume,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">Others</Col>
        <Col md="3">
          <Input
            name="others"
            type="text"
            value={worksheet && worksheet.others}
            onChange={(e) => {
              handleInputs(e);
              handleErection(
                e.target.value,
                worksheet.erec_pipe,
                worksheet.erec_t_b,
                worksheet.erec_planks,
                worksheet.erec_volume,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">Volume</Col>
        <Col md="3">
          <Input
            name="erec_volume"
            type="text"
            value={worksheet && worksheet.erec_volume}
            onChange={(e) => {
              handleInputs(e);
              handleErection(
                e.target.value,
                worksheet.erec_pipe,
                worksheet.erec_t_b,
                worksheet.erec_planks,
                worksheet.others,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">
          <b>Total Erection Amount</b>
        </Col>
        <Col md="3">
          <Input
            name="total_erec_amount"
            type="text"
            value={grossPay} // Use the calculated grossPay value here
            onChange={(e) => {
              // Update the basic_pay when needed
              handleInputs(e);
            }}
            disabled
          />
        </Col>
      </Row>
    
      {/* <Row>
        <Col md="9">
          <b>NET PAY</b>
        </Col>
        <Col md="3"></Col>
      </Row> */}
    </div>
  );
}

export default Erection;
