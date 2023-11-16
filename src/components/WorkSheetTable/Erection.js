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
    const ErecPipe = parseFloat(worksheet.pipe_erection || 0);
    const ErecVolume = parseFloat(worksheet.volume_erection || 0);
    const ErecPlank = parseFloat(worksheet.plank_erection || 0);
    const ErecTB = parseFloat(worksheet.tb_erection || 0);
    const Others = parseFloat(worksheet.others_erection || 0);

    const newGrossPay = ErecPipe + ErecVolume + ErecPlank + ErecTB + Others;
    setGrossPay(newGrossPay);
  
  }, [
    worksheet.pipe_erection,
    worksheet.volume_erection,
    worksheet.plank_erection,
    worksheet.tb_erection,
    worksheet.others_erection
  ]);

  return (
    <div>
      <Row>
        <Col md="9">pipe</Col>
        <Col md="3">
          <Input
            name="pipe_erection"
            type="text"
            value={worksheet && worksheet.pipe_erection}
            onChange={(e) => {
              handleInputs(e);
              handleErection(
                e.target.value,
                worksheet.tb_erection,
                worksheet.plank_erection,
                worksheet.others_erection,
                worksheet.volume_erection,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">T/B</Col>
        <Col md="3">
          <Input
            name="tb_erection"
            type="text"
            value={worksheet && worksheet.tb_erection}
            onChange={(e) => {
              handleInputs(e);
              handleErection(
                e.target.value,
                worksheet.pipe_erection,
                worksheet.plank_erection,
                worksheet.others_erection,
                worksheet.volume_erection,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">Planks</Col>
        <Col md="3">
          <Input
            name="plank_erection"
            type="text"
            value={worksheet && worksheet.plank_erection}
            onChange={(e) => {
              handleInputs(e);
              handleErection(
                e.target.value,
                worksheet.pipe_erection,
                worksheet.tb_erection,
                worksheet.others_erection,
                worksheet.volume_erection,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">Others</Col>
        <Col md="3">
          <Input
            name="others_erection"
            type="text"
            value={worksheet && worksheet.others_erection}
            onChange={(e) => {
              handleInputs(e);
              handleErection(
                e.target.value,
                worksheet.pipe_erection,
                worksheet.tb_erection,
                worksheet.plank_erection,
                worksheet.volume_erection,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">Volume</Col>
        <Col md="3">
          <Input
            name="volume_erection"
            type="text"
            value={worksheet && worksheet.volume_erection}
            onChange={(e) => {
              handleInputs(e);
              handleErection(
                e.target.value,
                worksheet.pipe_erection,
                worksheet.tb_erection,
                worksheet.plank_erection,
                worksheet.others_erection,
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
            name="total_erection_amount"
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
