import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Table, Label, FormGroup, Input } from 'reactstrap';
import api from '../../../constants/api';
import ComponentCard from '../../ComponentCard';

export default function CostingSummaryDetails() {
  const [projectYard, setProjectYard] = useState([]);
  const [works, setWorks] = useState([]);
  //const [summary, setSummary] = useState([]);
  const [projectWorkOrders, setProjectWorkOrders] = useState([]);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState('');
  const [pipeBalance, setPipeBalance] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [plankBalance, setPlankBalance] = useState(0);
  const [volumeBalance, setVolumeBalance] = useState(0);
  const [othersBalance, setOthersBalance] = useState(0);
  const [tbBalance, setTBBalance] = useState(0);
  const { id } = useParams();

  const getYard = () => {
    api
      .post('/projecttask/getYardsheetByProjectId', { project_id: id })
      .then((res) => {
        setProjectYard(res.data.data);
        console.log('rest', res.data.data);
      })
      .catch(() => {});
  };

  const getWork = () => {
    api
      .post('/projecttask/getWorkBytaskId', { project_id: id })
      .then((res) => {
        setWorks(res.data.data);
        console.log('resting', res.data.data);
      })
      .catch(() => {});
  };

  // const getWork1 = () => {
  //   api
  //     .post('/projecttask/getWorkByprojectId', { project_id: id })
  //     .then((res) => {
  //       setSummary(res.data.data);
  //       console.log('resting', res.data.data);
  //     })
  //     .catch(() => {});
  // };

  const [totalYardAmount, setTotalYardAmount] = useState(0);

  // ... (previous code)

  useEffect(() => {
    if (selectedWorkOrder) {
      // Filter projectYard based on the selected project_work_order
      const filteredYard = projectYard.filter((yard) => yard.work_order_no === selectedWorkOrder);

      // Calculate the total yard amount
      const totalYard = filteredYard.reduce(
        (total, yard) =>
          total +
          parseFloat(yard.pipe_erection_amount || 0) * parseFloat(yard.pipe_count || 0) +
          parseFloat(yard.plank_erection_amount || 0) * parseFloat(yard.plank_count || 0) +
          parseFloat(yard.tb_erection_amount || 0) * parseFloat(yard.tb_count || 0) +
          parseFloat(yard.volume_erection_amount || 0) * parseFloat(yard.volume_count || 0) +
          parseFloat(yard.others_erection_amount || 0) * parseFloat(yard.others_count || 0),
        0,
      );

      setTotalYardAmount(totalYard);
    }
  }, [selectedWorkOrder, projectYard]);

  const [totalAmountOfWork, setTotalAmountOfWork] = useState(0);

  // ... (previous code)

  useEffect(() => {
    if (selectedWorkOrder) {
      // Filter works based on the selected project_work_order
      const filteredWorks = works.filter((work) => work.project_work_order === selectedWorkOrder);

      // Calculate the total amount of work
      const totalWorkAmount = filteredWorks.reduce(
        (total, work) => total + parseFloat(work.total_amount),
        0,
      );

      setTotalAmountOfWork(totalWorkAmount);
    }
  }, [selectedWorkOrder, works, projectYard]);

  const handleWorkOrderChange = (e) => {
    setSelectedWorkOrder(e.target.value);
  };

  useEffect(() => {
    getWork();
    getYard();
    //getWork1();
  }, [id]);

  // getting data from Category
  const getWorkOrder = () => {
    api.post('/projecttask/getworkorderById', { project_id: id }).then((res) => {
      setProjectWorkOrders(res.data.data);
    });
  };
  useEffect(() => {
    getWorkOrder();
  }, []);

  useEffect(() => {
    if (selectedWorkOrder) {
      // Filter projectYard based on the selected project_work_order
      const filteredYard = projectYard.filter((yard) => yard.work_order_no === selectedWorkOrder);
      // Filter works based on the selected project_work_order
      const filteredWorks = works.filter((work) => work.project_work_order === selectedWorkOrder);

      const yardPipeCount = filteredYard.reduce(
        (total, yard) => total + parseFloat(yard.pipe_count || 0),
        0,
      );
      const workPipeCount = filteredWorks.reduce(
        (total, work) => total + parseFloat(work.pipe_count || 0),
        0,
      );

      const yardPlankCount = filteredYard.reduce(
        (total, yard) => total + parseFloat(yard.plank_count || 0),
        0,
      );
      const workPlankCount = filteredWorks.reduce(
        (total, work) => total + parseFloat(work.plank_count || 0),
        0,
      );

      const yardVolumeCount = filteredYard.reduce(
        (total, yard) => total + parseFloat(yard.volume_count || 0),
        0,
      );
      const workVolumeCount = filteredWorks.reduce(
        (total, work) => total + parseFloat(work.volume_count || 0),
        0,
      );

      const yardTBCount = filteredYard.reduce(
        (total, yard) => total + parseFloat(yard.tb_count || 0),
        0,
      );
      const workTBCount = filteredWorks.reduce(
        (total, work) => total + parseFloat(work.tb_count || 0),
        0,
      );

      const yardOthersCount = filteredYard.reduce(
        (total, yard) => total + parseFloat(yard.others_count || 0),
        0,
      );
      const workOthersCount = filteredWorks.reduce(
        (total, work) => total + parseFloat(work.others_count || 0),
        0,
      );

      const calculatedPipeBalance = yardPipeCount - workPipeCount;
      const calculatedPlankBalance = yardPlankCount - workPlankCount;
      const calculatedVolumeBalance = yardVolumeCount - workVolumeCount;
      const calculatedTBBalance = yardTBCount - workTBCount;
      const calculatedOthersBalance = yardOthersCount - workOthersCount;

      // Calculate the total yard amount
      const totalYard = filteredYard.reduce(
        (total, yard) =>
          total +
          parseFloat(yard.pipe_erection_amount || 0) * parseFloat(yard.pipe_count || 0) +
          parseFloat(yard.plank_erection_amount || 0) * parseFloat(yard.plank_count|| 0) +
          parseFloat(yard.tb_erection_amount || 0) * parseFloat(yard.tb_count || 0) +
          parseFloat(yard.volume_erection_amount || 0) * parseFloat(yard.volume_count || 0) +
          parseFloat(yard.others_erection_amount || 0) * parseFloat(yard.others_count || 0),
        0,
      );

        // Calculate the total amount of work
        const totalWorkAmount = filteredWorks.reduce(
          (total, work) => total + parseFloat(work.total_amount),
          0,
        );
        const calculatedProfit = totalYard - totalWorkAmount;

        
      setTotalProfit(calculatedProfit);
      setPipeBalance(calculatedPipeBalance);
      setPlankBalance(calculatedPlankBalance);
      setVolumeBalance(calculatedVolumeBalance);
      setTBBalance(calculatedTBBalance);
      setOthersBalance(calculatedOthersBalance);
    }
  }, [selectedWorkOrder, projectYard, works]);

  return (
    <>
      <Row>
        <Col md="12">
          <ComponentCard title="Yard Details">
            <Table
              id="example"
              className="display border border-secondary rounded"
              title="projectTask List"
              //className="lineitem border border-secondary rounded"
            >
              <thead className="lineitem1 border border-secondary rounded">
                <tr>
                  <th>#</th>
                  <th>WorkOrderNo</th>
                  <th>Pipe Amount</th>
                  <th>Plank Amount</th>
                  <th>Volume Amount</th>
                  <th>TB Amount</th>
                  <th>others Amount</th>
                  <th>Pipe Count</th>
                  <th>plank Count</th>
                  <th>volume Count</th>
                  <th>tb Count</th>
                  <th>others Count</th>
                </tr>
              </thead>
              <tbody>
                {projectYard &&
                  projectYard.map((element, index) => {
                    return (
                      <tr key={element.project_work_order_id}>
                        <td>{index + 1}</td>
                        <td>{element.work_order_no}</td>
                        <td>{parseFloat(element.pipe_erection_amount).toFixed(2)}</td>
                        <td>{parseFloat(element.plank_erection_amount).toFixed(2)}</td>
                        <td>{parseFloat(element.volume_erection_amount).toFixed(2)}</td>
                        <td>{parseFloat(element.tb_erection_amount).toFixed(2)}</td>
                        <td>{parseFloat(element.others_erection_amount).toFixed(2)}</td>
                        <td>{element.pipe_count}</td>
                        <td>{element.plank_count}</td>
                        <td>{element.volume_count}</td>
                        <td>{element.tb_count}</td>
                        <td>{element.others_count}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </ComponentCard>
        </Col>
        <Col md="12">
          <ComponentCard title="Work Details">
            <Table
              id="example"
              className="display border border-secondary rounded"
              title="projectTask List"
              //className="lineitem border border-secondary rounded"
            >
              <thead className="lineitem1 border border-secondary rounded">
                <tr>
                  <th>#</th>
                  <th>WorkOrderNo</th>
                  <th>Pipe Amount</th>
                  <th>Plank Amount</th>
                  <th>Volume Amount</th>
                  <th>TB Amount</th>
                  <th>others Amount</th>
                  <th>Pipe Count</th>
                  <th>plank Count</th>
                  <th>volume Count</th>
                  <th>tb Count</th>
                  <th>others Count</th>
                </tr>
              </thead>
              <tbody>
                {works &&
                  works.map((element, index) => {
                    return (
                      <tr key={element.yard_id}>
                        {/* <td style={{ borderRight: 1, borderWidth: 1 }}>{element.task_title}</td> */}
                        <td>{index + 1}</td>
                        <td>{element.project_work_order}</td>
                        <td>{parseFloat(element.pipe_value).toFixed(2)}</td>
                        <td>{parseFloat(element.plank_value).toFixed(2)}</td>
                        <td>{parseFloat(element.tb_value).toFixed(2)}</td>
                        <td>{parseFloat(element.volume_value).toFixed(2)}</td>
                        <td>{parseFloat(element.others_value).toFixed(2)}</td>

                        <td>{element.pipe_count}</td>
                        <td>{element.plank_count}</td>
                        <td>{element.volume_count}</td>
                        <td>{element.tb_count}</td>
                        <td>{element.others_count}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </ComponentCard>
          <ComponentCard title="Summary">
            <Col md="2">
              <FormGroup>
                <Label>Project Work Order</Label>
                <Input
                  type="select"
                  name="work_order_no"
                  value={selectedWorkOrder}
                  onChange={handleWorkOrderChange}
                >
                  <option value="">Please Select</option>
                  {projectWorkOrders.map((e) => (
                    <option key={e.work_order_id} value={e.work_order_no}>
                      {e.work_order_no}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <br />
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Total amount for Work($)</Label>
                  <br />
                  <span>{totalAmountOfWork}</span>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Total amount for yard($)</Label>
                  <br />
                  <span>{totalYardAmount}</span>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Profit Amount ($)</Label>
                  <br />
                  <span>{totalProfit}</span>
                </FormGroup>
              </Col>
              {/* <Col md="4">
                <FormGroup>
                  <Label>Profit Amount($)</Label>
                  <br />
                  <span>
                    {parseFloat(
                      parseFloat(
                        projectYard &&
                          parseFloat(projectYard?.pipe_erection_amount) *
                            parseFloat(projectYard?.pipe_count) +
                            parseFloat(projectYard?.plank_erection_amount) *
                              parseFloat(projectYard?.plank_count) +
                            parseFloat(projectYard?.tb_erection_amount) *
                              parseFloat(projectYard?.tb_count) +
                            parseFloat(projectYard?.volume_erection_amount) *
                              parseFloat(projectYard?.volume_count) +
                            parseFloat(projectYard?.others_erection_amount) *
                              parseFloat(projectYard?.others_count) +
                            parseFloat(projectYard?.pipe_dismantel_amount) *
                              parseFloat(projectYard?.pipe_count) +
                            parseFloat(projectYard?.plank_dismantel_amount) *
                              parseFloat(projectYard?.plank_count) +
                            parseFloat(projectYard?.tb_dismantel_amount) *
                              parseFloat(projectYard?.tb_count) +
                            parseFloat(projectYard?.volume_dismantel_amount) *
                              parseFloat(projectYard?.volume_count) +
                            parseFloat(projectYard?.others_dismantel_amount) *
                              parseFloat(projectYard?.others_count),
                      ) - parseFloat(summary && summary.total_amount),
                    )
                      ? parseFloat(
                          parseFloat(
                            projectYard &&
                              parseFloat(projectYard?.pipe_erection_amount) *
                                parseFloat(projectYard?.pipe_count) +
                                parseFloat(projectYard?.plank_erection_amount) *
                                  parseFloat(projectYard?.plank_count) +
                                parseFloat(projectYard?.tb_erection_amount) *
                                  parseFloat(projectYard?.tb_count) +
                                parseFloat(projectYard?.volume_erection_amount) *
                                  parseFloat(projectYard?.volume_count) +
                                parseFloat(projectYard?.others_erection_amount) *
                                  parseFloat(projectYard?.others_count) +
                                parseFloat(projectYard?.pipe_dismantel_amount) *
                                  parseFloat(projectYard?.pipe_count) +
                                parseFloat(projectYard?.plank_dismantel_amount) *
                                  parseFloat(projectYard?.plank_count) +
                                parseFloat(projectYard?.tb_dismantel_amount) *
                                  parseFloat(projectYard?.tb_count) +
                                parseFloat(projectYard?.volume_dismantel_amount) *
                                  parseFloat(projectYard?.volume_count) +
                                parseFloat(projectYard?.others_dismantel_amount) *
                                  parseFloat(projectYard?.others_count),
                          ) - parseFloat(summary && summary.total_amount),
                        )
                      : ''}
                  </span>
                </FormGroup>
              </Col> */}
              <Col md="4">
                <FormGroup>
                  <Label>Pipe balance($)</Label>
                  <br />
                  <span>{pipeBalance}</span>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Pipe balance($)</Label>
                  <br />
                  <span>{plankBalance}</span>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>volume balance($)</Label>
                  <br />
                  <span>{volumeBalance}</span>
                </FormGroup>
              </Col>
              
                <Col md="4">
                  <FormGroup>
                    <Label>TBb balance($)</Label>
                    <br />
                    <span>{tbBalance}</span>
                  </FormGroup>
                </Col>
                <Col md="4">
                <FormGroup>
                  <Label>Others balance($)</Label>
                  <br />
                  <span>{othersBalance}</span>
                </FormGroup>
              </Col>

              {/* <Col md="4">
                <FormGroup>
                  <Label>TB Balance</Label>
                  <br />
                  <span>
                    {parseFloat(projectYard && projectYard.tb_count) -
                    parseFloat(works && works.tb_count)
                      ? parseFloat(projectYard && projectYard.tb_count) -
                        parseFloat(works && works.tb_count)
                      : ''}
                  </span>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Volume Balance</Label>
                  <br />
                  <span>
                    {parseFloat(projectYard && projectYard.volume_count) -
                    parseFloat(works && works.volume_count)
                      ? parseFloat(projectYard && projectYard.volume_count) -
                        parseFloat(works && works.volume_count)
                      : ''}
                  </span>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Others Balance</Label>
                  <br />
                  <span>
                    {parseFloat(projectYard && projectYard.others_count) -
                    parseFloat(works && works.others_count)
                      ? parseFloat(projectYard && projectYard.others_count) -
                        parseFloat(works && works.others_count)
                      : ''}
                  </span>
                </FormGroup>
              </Col> */}
            </Row>
          </ComponentCard>
        </Col>

        <div></div>
      </Row>
    </>
  );
}
