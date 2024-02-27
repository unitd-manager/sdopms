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

function ViewAdjustStockHistoryModal({
  adjustStockHistoryModal,
  setAdjustStockHistoryModal,
  inventoryId,
}) {
  ViewAdjustStockHistoryModal.propTypes = {
    adjustStockHistoryModal: PropTypes.bool,
    setAdjustStockHistoryModal: PropTypes.func,
    inventoryId: PropTypes.any,
  };

  const [adjustStocks, setAdjustStocks] = useState([]);

  const getAdjustStocklogsById = () => {
    api
      .post('/inventory/getAdjustStock', { inventory_id: inventoryId })
      .then((res) => {
        setAdjustStocks(res.data.data);
      })
      .catch(() => {
      });
  };

  const alcolumns = [
    {
      name: 'Adjust Stock',
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
      <Modal isOpen={adjustStockHistoryModal}>
        <ModalHeader>Adjust Stock History <Button
            color="secondary"
            onClick={() => {
              setAdjustStockHistoryModal(false);
            }}
          >
            X
          </Button> </ModalHeader>
        <ModalBody  style={{overflowY:'scroll',maxHeight:'500px'}}>
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
                            <tr key={element.adjust_stock_log_id}>
                              <td>{element.adjust_stock}</td>
                              <td>{element.current_stock}</td>
                              <td>
                                {element.date
                                  ? moment(element.date).format('YYYY-MM-DD  hh:mm:ss')
                                  : element.creation_date
                                  ? moment(element.creation_date).format('YYYY-MM-DD  hh:mm:ss'):''}
                              
                                {element.created_by}
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
              setAdjustStockHistoryModal(false);
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

export default ViewAdjustStockHistoryModal;
