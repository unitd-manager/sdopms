import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col,Table,Label,FormGroup } from 'reactstrap';
import api from '../../../constants/api';
import ComponentCard from '../../ComponentCard';


export default function CostingSummary() {
  
  const [projectYard, setProjectYard] = useState({});
  const [works, setWorks] = useState({});
  const { id } = useParams();
  //Api call for getting Vehicle Fuel Data By ID

  const columns = [
    // {
    //   name: 'ID',
    //   style:{ backgroundColor: ' #0096FF', color: 'white' }
    // },
    
    {
      name: 'Pipe Amount($)',
      sortable: true,
    },
    {
      name: 'Plank Amount($)',
    },
    {
      name: 'TB Amount($)',
    },
    {
      name: 'Volume Amount($)',
      sortable: true,
    },
    {
        name: 'Others Amount($)',
        sortable: true,
      },
        
      {
        name: 'Pipe Count',
        sortable: true,
      },
      {
        name: 'Plank Count',
      },
      {
        name: 'TB Count',
      },
      {
        name: 'Volume Count',
        sortable: true,
      },
      {
          name: 'Others Count',
          sortable: true,
        },
   
  ];

  
  const getYard = () => {
    api
      .post('/projecttask/getYardsheetByProjectId', { project_id: id })
      .then((res) => {
        setProjectYard(res.data.data[0]);
        console.log('rest',res.data.data)
      })
      .catch(() => {});
  };
  
  const getWork = () => {
    api
      .post('/projecttask/getWorkByProjectId', { project_id: id })
      .then((res) => {
        setWorks(res.data.data[0]);
        console.log('resting',res.data.data)
      })
      .catch(() => {});
  };
  
  // useEffect(() => {
  //   projectYard.total_amount=((parseFloat(projectYard?.pipe_erection_amount)*parseFloat(projectYard?.pipe_count))+(parseFloat(projectYard?.plank_erection_amount)*parseFloat(projectYard?.plank_count))+(parseFloat(projectYard?.tb_erection_amount)*parseFloat(projectYard?.tb_count))+(parseFloat(projectYard?.volume_erection_amount)*parseFloat(projectYard?.volume_count))+(parseFloat(projectYard?.others_erection_amount)*parseFloat(projectYard?.others_count))+(parseFloat(projectYard?.pipe_dismantel_amount)*parseFloat(projectYard?.pipe_count))+(parseFloat(projectYard?.plank_dismantel_amount)*parseFloat(projectYard?.plank_count))+(parseFloat(projectYard?.tb_dismantel_amount)*parseFloat(projectYard?.tb_count))+(parseFloat(projectYard?.volume_dismantel_amount)*parseFloat(projectYard?.volume_count))+(parseFloat(projectYard?.others_dismantel_amount)*parseFloat(projectYard?.others_count)))
  // }, [projectYard]);
  useEffect(() => {
    getWork();
    getYard();
  }, [id]);

  return (
    <>
     <Row>
                <Col md="12">
                <ComponentCard title="Yard Details">
                      {/* <Form>
                        <Row>
                        <Col md="4">
                            <FormGroup>
                              <Label>Pipe Erection</Label>
                              <Input
                           type="text"
                           name="pipe_erection_amount"
                           defaultValue={projectYard && projectYard.pipe_erection_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank Erection</Label>
                              <Input
                           type="text"
                           name="plank_erection_amount"
                           defaultValue={projectYard && projectYard.plank_erection_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB Erection</Label>
                              <Input
                           type="text"
                           name="tb_erection_amount"
                           defaultValue={projectYard && projectYard.tb_erection_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Erection</Label>
                              <Input
                           type="text"
                           name="volume_erection_amount"
                           defaultValue={projectYard && projectYard.volume_erection_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others Erection</Label>
                              <Input
                           type="text"
                           name="others_erection_amount"
                           defaultValue={projectYard && projectYard.others_erection_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Pipe Dismantel</Label>
                              <Input
                           type="text"
                           name="pipe_dismantel_amount"
                           defaultValue={projectYard && projectYard.pipe_dismantel_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank Dismantel</Label>
                              <Input
                           type="text"
                           name="plank_dismantel_amount"
                           defaultValue={projectYard && projectYard.plank_dismantel_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB Dismantel</Label>
                              <Input
                           type="text"
                           name="tb_dismantel_amount"
                           defaultValue={projectYard && projectYard.tb_dismantel_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Dismantel</Label>
                              <Input
                           type="text"
                           name="volume_dismantel_amount"
                           defaultValue={projectYard && projectYard.volume_dismantel_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others Dismantel</Label>
                              <Input
                           type="text"
                           name="others_dismantel_amount"
                           defaultValue={projectYard && projectYard.others_dismantel_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                        
                        <Col md="4">
                            <FormGroup>
                              <Label>Pipe Count</Label>
                              <Input
                           type="text"
                           name="pipe_count"
                           defaultValue={projectYard && projectYard.pipe_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank Count</Label>
                              <Input
                           type="text"
                           name="plank_count"
                           defaultValue={projectYard && projectYard.plank_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB Count</Label>
                              <Input
                           type="text"
                           name="tb_count"
                           defaultValue={projectYard && projectYard.tb_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Count</Label>
                              <Input
                           type="text"
                           name="volume_count"
                           defaultValue={projectYard && projectYard.volume_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others Count</Label>
                              <Input
                           type="text"
                           name="others_count"
                           defaultValue={projectYard && projectYard.others_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                         <Row>
                         <Col md="4">
                            <FormGroup>
                              <Label>Total amount</Label>
                              <Input
                           type="text"
                           name="others_count"
                           defaultValue={projectYard && projectYard.total_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                         </Row>
                        </Row>
                      </Form> */}
                      <Table
            id="example"
            className="display border border-secondary rounded"
            title="projectTask List"
            //className="lineitem border border-secondary rounded"
          >
            <thead className="lineitem1 border border-secondary rounded">
              <tr>
                {columns.map((cell) => {
                  return (
                    
                    <th key={cell.name} >
                      {/* {cell.name} */}
                      {/* <span style={{ color: ['ID', 'Edit', 'New','View','Title','Task Type','Head Count','Status','Employees'].includes(cell.name) ? 'blue' : 'inherit' }}> */}
                      {cell.name}
                    </th>
                  );
                  // return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
             
                      <tr key={projectYard?.yard_id}>
                        
                       
                        {/* <td style={{ borderRight: 1, borderWidth: 1 }}>{element.task_title}</td> */}
                        <td>{projectYard?.pipe_erection_amount}</td>
                        <td>{projectYard?.plank_erection_amount}</td>
                        <td>{projectYard?.tb_erection_amount}</td>
                        <td>{projectYard?.volume_erection_amount}</td>
                        <td>{projectYard?.others_erection_amount}</td>
                        
                        <td>{projectYard?.pipe_count}</td>
                        <td>{projectYard?.plank_count}</td>
                        <td>{projectYard?.tb_count}</td>
                        <td>{projectYard?.volume_count}</td>
                        <td>{projectYard?.others_count}</td>
                      </tr>
                      <tr>

                        
                      </tr>
                   
            </tbody>
            
          </Table>
                    </ComponentCard>
                </Col>
                <Col md="12">
                  <ComponentCard title="Work Details">
                      {/* <Form>
                        <Row>
                        <Col md="4">
                            <FormGroup>
                              <Label>Pipe Erection</Label>
                              <Input
                           type="text"
                           name="pipe_value"
                           defaultValue={works && works.pipe_value}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank Erection</Label>
                              <Input
                           type="text"
                           name="plank_value"
                           defaultValue={works && works.plank_value}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB Erection</Label>
                              <Input
                           type="text"
                           name="tb_value"
                           defaultValue={works && works.tb_value}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Erection</Label>
                              <Input
                           type="text"
                           name="volume_value"
                           defaultValue={works && works.volume_value}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others Erection</Label>
                              <Input
                           type="text"
                           name="others_value"
                           defaultValue={works && works.others_value}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Pipe</Label>
                              <Input
                           type="text"
                           name="pipe_count"
                           defaultValue={works && works.pipe_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank </Label>
                              <Input
                           type="text"
                           name="plank_count"
                           defaultValue={works && works.plank_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB </Label>
                              <Input
                           type="text"
                           name="tb_count"
                           defaultValue={works && works.tb_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume </Label>
                              <Input
                           type="text"
                           name="volume_count"
                           defaultValue={works && works.volume_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others </Label>
                              <Input
                           type="text"
                           name="others_count"
                           defaultValue={works && works.others_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                        
                        <Col md="4">
                            <FormGroup>
                              <Label>Pipe Count</Label>
                              <Input
                           type="text"
                           name="pipe_count"
                           defaultValue={works && works.pipe_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank Count</Label>
                              <Input
                           type="text"
                           name="plank_count"
                           defaultValue={works && works.plank_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB Count</Label>
                              <Input
                           type="text"
                           name="tb_count"
                           defaultValue={works && works.tb_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Count</Label>
                              <Input
                           type="text"
                           name="volume_count"
                           defaultValue={works && works.volume_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others Count</Label>
                              <Input
                           type="text"
                           name="others_count"
                           defaultValue={works && works.others_count}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>total Amount</Label>
                              <Input
                           type="text"
                           name="total_amount"
                           defaultValue={works && works.total_amount}
                           disabled
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form> */}
                        <Table
            id="example"
            className="display border border-secondary rounded"
            title="projectTask List"
            //className="lineitem border border-secondary rounded"
          >
            <thead className="lineitem1 border border-secondary rounded">
              <tr>
                {columns.map((cell) => {
                  return (
                    
                    <th key={cell.name} >
                      {/* {cell.name} */}
                      {/* <span style={{ color: ['ID', 'Edit', 'New','View','Title','Task Type','Head Count','Status','Employees'].includes(cell.name) ? 'blue' : 'inherit' }}> */}
                      {cell.name}
                    </th>
                  );
                  // return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              
                      <tr key={works?.yard_id}>
                       
                       
                        {/* <td style={{ borderRight: 1, borderWidth: 1 }}>{works?.task_title}</td> */}
                        <td>{works?.pipe_value}</td>
                        <td>{works?.plank_value}</td>
                        <td>{works?.tb_value}</td>
                        <td>{works?.volume_value}</td>
                        <td>{works?.others_value}</td>
                        
                        <td>{works?.pipe_count}</td>
                        <td>{works?.plank_count}</td>
                        <td>{works?.tb_count}</td>
                        <td>{works?.volume_count}</td>
                        <td>{works?.others_count}</td>
                      </tr>
                      <tr>

                        
                      </tr>
                    
            </tbody>
            
          </Table>
                    </ComponentCard>
<ComponentCard title="Summary">
    <Row>
    <Col md="4">
                            <FormGroup>
                              <Label>Total yard amount($)</Label>
                              <br/>
                             <span>{projectYard && ((parseFloat(projectYard?.pipe_erection_amount)*parseFloat(projectYard?.pipe_count))+(parseFloat(projectYard?.plank_erection_amount)*parseFloat(projectYard?.plank_count))+(parseFloat(projectYard?.tb_erection_amount)*parseFloat(projectYard?.tb_count))+(parseFloat(projectYard?.volume_erection_amount)*parseFloat(projectYard?.volume_count))+(parseFloat(projectYard?.others_erection_amount)*parseFloat(projectYard?.others_count))+(parseFloat(projectYard?.pipe_erection_amount)*parseFloat(projectYard?.pipe_count))+(parseFloat(projectYard?.plank_erection_amount)*parseFloat(projectYard?.plank_count))+(parseFloat(projectYard?.tb_erection_amount)*parseFloat(projectYard?.tb_count))+(parseFloat(projectYard?.volume_erection_amount)*parseFloat(projectYard?.volume_count))+(parseFloat(projectYard?.others_erection_amount)*parseFloat(projectYard?.others_count)))}</span>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Total amount for Work($)</Label>
                              <br/>
                             <span>{works && works.total_amount}</span>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Profit Amount($)</Label>
                              <br/>
                             <span>{(parseFloat(parseFloat(projectYard &&  ((parseFloat(projectYard?.pipe_erection_amount)*parseFloat(projectYard?.pipe_count))+(parseFloat(projectYard?.plank_erection_amount)*parseFloat(projectYard?.plank_count))+(parseFloat(projectYard?.tb_erection_amount)*parseFloat(projectYard?.tb_count))+(parseFloat(projectYard?.volume_erection_amount)*parseFloat(projectYard?.volume_count))+(parseFloat(projectYard?.others_erection_amount)*parseFloat(projectYard?.others_count))+(parseFloat(projectYard?.pipe_dismantel_amount)*parseFloat(projectYard?.pipe_count))+(parseFloat(projectYard?.plank_dismantel_amount)*parseFloat(projectYard?.plank_count))+(parseFloat(projectYard?.tb_dismantel_amount)*parseFloat(projectYard?.tb_count))+(parseFloat(projectYard?.volume_dismantel_amount)*parseFloat(projectYard?.volume_count))+(parseFloat(projectYard?.others_dismantel_amount)*parseFloat(projectYard?.others_count))))-parseFloat(works && works.total_amount)))?(parseFloat(parseFloat(projectYard &&  ((parseFloat(projectYard?.pipe_erection_amount)*parseFloat(projectYard?.pipe_count))+(parseFloat(projectYard?.plank_erection_amount)*parseFloat(projectYard?.plank_count))+(parseFloat(projectYard?.tb_erection_amount)*parseFloat(projectYard?.tb_count))+(parseFloat(projectYard?.volume_erection_amount)*parseFloat(projectYard?.volume_count))+(parseFloat(projectYard?.others_erection_amount)*parseFloat(projectYard?.others_count))+(parseFloat(projectYard?.pipe_dismantel_amount)*parseFloat(projectYard?.pipe_count))+(parseFloat(projectYard?.plank_dismantel_amount)*parseFloat(projectYard?.plank_count))+(parseFloat(projectYard?.tb_dismantel_amount)*parseFloat(projectYard?.tb_count))+(parseFloat(projectYard?.volume_dismantel_amount)*parseFloat(projectYard?.volume_count))+(parseFloat(projectYard?.others_dismantel_amount)*parseFloat(projectYard?.others_count))))-parseFloat(works && works.total_amount))) :''}</span>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Pipes Balance</Label>
                              <br/>
                             <span>{parseFloat(parseFloat(projectYard && projectYard.pipe_count)-parseFloat(works && works.pipe_count))?parseFloat(parseFloat(projectYard && projectYard.pipe_count)-parseFloat(works && works.pipe_count)):''}</span>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Planks Balance</Label>
                              <br/>
                             <span>{parseFloat(projectYard && projectYard.plank_count)-parseFloat(works && works.plank_count)?parseFloat(projectYard && projectYard.plank_count)-parseFloat(works && works.plank_count):''}</span>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB Balance</Label>
                              <br/>
                             <span>{parseFloat(projectYard && projectYard.tb_count)-parseFloat(works && works.tb_count)?parseFloat(projectYard && projectYard.tb_count)-parseFloat(works && works.tb_count):''}</span>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Balance</Label>
                              <br/>
                             <span>{parseFloat(projectYard && projectYard.volume_count)-parseFloat(works && works.volume_count)?parseFloat(projectYard && projectYard.volume_count)-parseFloat(works && works.volume_count):''}</span>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others Balance</Label>
                              <br/>
                             <span>{parseFloat(projectYard && projectYard.others_count)-parseFloat(works && works.others_count)?parseFloat(projectYard && projectYard.others_count)-parseFloat(works && works.others_count):''}</span>
                            </FormGroup>
                          </Col>
                          
    </Row>
    </ComponentCard>
                    
                    </Col>
             
                <div>
                 
                      
                </div>
              </Row>
    </>
  );
}
