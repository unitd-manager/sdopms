import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'reactstrap';
import PropTypes from 'prop-types';

function Dismantle({
  worksheet,
  handleInputs,
  handleDismantle,

}) {
  // Initialize totalDeductions with the default value

  Dismantle.propTypes = {
    worksheet: PropTypes.object,
    handleDismantle: PropTypes.func,
    handleInputs: PropTypes.func,
   
  };

  // Function to calculate the total deduction based on default values
  const [totalDeductionsAmount, setTotalDeductionsAmount] = useState(0);

  // Use useEffect to update totalDeductions whenever relevant fields change
  useEffect(() => {
    const DismantlePipe = parseFloat(worksheet.pipe_dismantel || 0);
    const DismantleVolume = parseFloat(worksheet.volume_dismantel || 0);
    const DismantlePlanks = parseFloat(worksheet.plank_dismantel || 0);
    const DismantleTB = parseFloat(worksheet.tb_dismantel || 0);
    const DismantleOthers = parseFloat(worksheet.others_dismantel || 0);

    const newGrossPay =
      DismantlePipe + DismantleVolume + DismantlePlanks + DismantleTB + DismantleOthers;

    setTotalDeductionsAmount(newGrossPay);
  }, [
    worksheet.pipe_dismantel,
    worksheet.volume_dismantel,
    worksheet.plank_dismantel,
    worksheet.tb_dismantel,
    worksheet.others_dismantel,
  ]);


  return (
    <div>
      <Row>
        <Col md="9">Pipe</Col>
        <Col md="3">
          <Input
            
            name="pipe_dismantel"
            type="text"
            value={worksheet && worksheet.pipe_dismantel}
            onChange={(e) => {
              handleInputs(e);
              handleDismantle(
                e.target.value,
                worksheet.tb_dismantel,
                worksheet.plank_dismantel,
                worksheet.others_dismantel,
                worksheet.volume_dismantel,
               
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9"> T/B</Col>
        <Col md="3">
          <Input
            name="tb_dismantel"
            type="text"
            value={worksheet && worksheet.tb_dismantel}
            onChange={(e) => {
              handleInputs(e);
              handleDismantle(
                e.target.value,
                worksheet.pipe_dismantel,
                worksheet.plank_dismantel,
                worksheet.others_dismantel,
                worksheet.volume_dismantel,
              );
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col md="9">Planks</Col>
        <Col md="3">
          <Input
            name="plank_dismantel"
            type="text"
            value={worksheet && worksheet.plank_dismantel}
            onChange={(e) => {
              handleInputs(e);
              handleDismantle(
                e.target.value,
                worksheet.pipe_dismantel,
                worksheet.tb_dismantel,
                worksheet.others_dismantel,
                worksheet.volume_dismantel,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">Others</Col>
        <Col md="3">
          <Input
            name="others_dismantel"
            type="text"
            value={worksheet && worksheet.others_dismantel}
            onChange={(e) => {
              handleInputs(e);
              handleDismantle(
                e.target.value,
                worksheet.pipe_dismantel,
                worksheet.tb_dismantel,
                worksheet.plank_dismantel,
                worksheet.volume_dismantel,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">Volume</Col>
        <Col md="3">
          <Input
            name="volume_dismantel"
            type="text"
            value={worksheet && worksheet.volume_dismantel}
            onChange={(e) => {
              handleInputs(e);
              handleDismantle(
                e.target.value,
                worksheet.pipe_dismantel,
                worksheet.tb_dismantel,
                worksheet.plank_dismantel,
                worksheet.others_dismantel,
              );
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col md="9">
          <b>Total Dismantle Amount</b>
        </Col>
        <Col md="3">
          <Input
            disabled
            name="total_dismantle_amount"
            type="text"
            value={totalDeductionsAmount}
            onChange={handleInputs}
          />
        </Col>
      </Row>
      {/* <Row>
        <Col md="9"></Col>
        <Col md="3"></Col>
      </Row> */}
      {/* <Row>
        <Col md="9"></Col>
        <Col md="3">
          <Input name="" type="text" onChange={handleInputs}  disabled/>
         
        </Col>
      </Row>
      <Row>
        <Col md="9"></Col>
        <Col md="3">
          <Input name="" type="text" onChange={handleInputs}
          disabled />
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Input value={totalDedAmount} disabled />
        </Col>
        <Col md="3"></Col>
      </Row> */}
    </div>
  );
}

export default Dismantle;
