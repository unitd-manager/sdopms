import React, { useState, useEffect } from 'react';
import {
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';

function DamagedStockLogModal({
    damagedStockLogModal,
    setDamagedStockLogModal,
  inventoryId,
}) {
  DamagedStockLogModal.propTypes = {
    damagedStockLogModal: PropTypes.bool,
    setDamagedStockLogModal: PropTypes.func,
    inventoryId: PropTypes.any,
  };

  const [adjustStocks, setAdjustStocks] = useState([]);

  const getAdjustStocklogsById = () => {
    api
      .post('/inventory/getDamagedStock', { inventory_id: inventoryId })
      .then((res) => {
        setAdjustStocks(res.data.data);
      })
      .catch(() => {
      });
  };

  const alcolumns = [
    {
      name: 'Yard Stock',
    },
    {
      name: 'Actual Stock',
    },
    {
      name: 'Created/Updated By',
    },
  ];
  useEffect(() => {
    getAdjustStocklogsById();
  }, [inventoryId]);

  return (
    <>
      <Modal isOpen={damagedStockLogModal}>
        <ModalHeader>Damaged Stock History</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
                <CardBody>
                  <Table id="example" className="display">
                    <thead>
                      <tr>
                        {alcolumns.map((cell) => {
                          return <td key={cell.name}>{cell.name}</td>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {adjustStocks &&
                        adjustStocks.map((element) => {
                          return (
                            <tr key={element.damaged_stock_log_id}>
                              <td>{element.damaged_stock}</td>
                              <td>{element.actual_stock}</td>
                              <td>
                                {element.creation_date
                                  ? moment(element.creation_date).format('YYYY-MM-DD  hh:mm:ss')
                                  : ''}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setDamagedStockLogModal(false);
            }}
          >
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DamagedStockLogModal;
