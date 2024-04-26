import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, Col, FormGroup, Input, Label, Row ,Button} from 'reactstrap';
import ReactPaginate from 'react-paginate';
//import { useParams } from 'react-router-dom';
import CommonTable from '../../components/CommonTable';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';


const ErectionDismantelReport = () => {
  const [Report, setReport] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [workOrderNo, setworkOrderNo] = useState('');

  const [project, setProject] = useState([]);
  const [userSearchData, setUserSearchData] = useState('');
  const [projectWorkOrders, setProjectWorkOrders] = useState([]);
  //const [pipeCount, setPipecount] = useState();

  const getProject = () => {
    api
      .get('/projecttask/getreports1')
      .then((res) => {
        setReport(res.data.data);
        setUserSearchData(res.data.data);
        // let totalPipeCount = 0;

        // res.data.data.forEach((el) => {
        //   totalPipeCount += el.pipe;
        // });

        // setPipecount(totalPipeCount);
      })
      .catch(() => {
        message('Reports Data Not Found', 'info');
      });
  };

  const getCompany = () => {
    api.get('/projecttask/getprojects', project).then((res) => {
      setProject(res.data.data);
      console.log('', project);
    });
  };

  // getting data from Category
  const getWorkOrder = (sectionId) => {
    api.post('/projecttask/getreports', { project_id: sectionId }).then((res) => {
      setProjectWorkOrders(res.data.data);
    });
  };
  useEffect(() => {
    if (selectedProject) {
      getWorkOrder(selectedProject);
    }
  }, [selectedProject]);

  const handleSearch = () => {
    const newData = Report
      .filter((y) => y.title === (projectName === '' ? y.title : projectName))
      .filter((x) => x.project_work_order === (workOrderNo === '' ? x.project_work_order : workOrderNo))
    setUserSearchData(newData);
  };

  console.log(setUserSearchData);
  useEffect(() => {
    getWorkOrder();
    getCompany();
    getProject();
  }, []);
  const [page, setPage] = useState(0);

  const employeesPerPage = 20;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = userSearchData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const totalPipeCount = displayEmployees && displayEmployees.reduce((total, element) => total + (Number(element.pipe) || 0), 0);
  const totalPlankCount = displayEmployees && displayEmployees.reduce((total, element) => total + (Number(element.plankCount) || 0), 0);
  const totalTbCount = displayEmployees && displayEmployees.reduce((total, element) => total + (Number(element.tbCount) || 0), 0);
  const totalothersCount = displayEmployees && displayEmployees.reduce((total, element) => total + (Number(element.othersCount) || 0), 0);
  const totalVolumeCount = displayEmployees && displayEmployees.reduce((total, element) => total + (Number(element.volumeCount) || 0), 0);


  

  // Modify the calculation of pipeCount
// Modify the calculation of pipeCount

  //structure of Training list view
  const columns = [
    {
      name: 'SN',
      selector: 's_no',
    },
    {
      name: 'Project Name',
      selector: 'title',
    },
    {
      name: 'Date',
      selector: 'date',
    },
    {
      name: 'Work Order No',
      selector: 'project_work_order',
    },
    {
      name: 'Task Type',
      selector: 'task_type',
      //onClick: toggleRevenuePerHead, // Toggle visibility on click
    },
    {
      name: 'Pipe Count',
      selector: 'pipe',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Plank Count',
      selector: 'plankCount',
    },

   
    {
      name: 'TB Count',
      selector: 'tbCount',
    },
    {
      name: 'Others Count',
      selector: 'othersCount',
    },
    {
      name: 'Volume Count',
      selector: 'volumeCount',
    },
    
    
  ];
 

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Card>
        <CardBody>
          <Row>
            <Col md="4">
              <Label>Project Name</Label>
              <FormGroup>
                <Input
                  type="select"
                  name="project_id"
                  onChange={(e) => {
                    //setSelectedProject(e.target.value);
                    setSelectedProject(e.target.value);
                    setProjectName(e.target.options[e.target.selectedIndex].text);
                    }}
                >
                  <option value="">Please Select</option>
                  {project.map((e) => (
                    <option key={e.project_id} value={e.project_id}>
                      {e.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Project Work Order</Label>
                <Input type="select" name="work_order_no"
                 onChange={(e) => 
                
                  setworkOrderNo(e.target.value)}
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
            <Col md="1" className="mt-3">
              <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>
                Go
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Label>
                <b>Project:</b> {projectName}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b>Work Order No:</b> {workOrderNo}
              </Label>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row>
            <Col>
              <ExportReport columns={columns} data={userSearchData} />
            </Col>
          </Row>
        </CardBody>

        <CardBody>
          <CommonTable>
            <thead>
              <tr>
                {columns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {displayEmployees &&
                displayEmployees.map((element, index) => {
                  return (
                    <tr key={element.task_history_id}>
                      <td>{index + 1}</td>
                      <td>{element.title}</td>
                      <td>{element.date}</td>
                      <td>{element.project_work_order}</td>
                      <td>{element.task_type}</td>
                      <td>{element.pipe}</td>
                      <td>{element.plankCount}</td>
                      <td>{element.tbCount}</td>
                      <td>{element.othersCount}</td>
                      <td>{element.volumeCount}</td>
                     
                    </tr>
                  );
                })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                <td>
                  <b>Total</b>
                </td>
                <td>
                  <b><b>{totalPipeCount}</b></b>
                </td>
                <td>
                  <b><b>{totalPlankCount}</b></b>
                </td>
                <td>
                  <b>{totalTbCount}</b>
                </td>
                <td>
                  <b>{totalothersCount}</b>
                </td>
                <td>
                  <b>{totalVolumeCount}</b>
                </td>
               
              </tr>
               
            </tbody>
          </CommonTable>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={totalPages}
            onPageChange={changePage}
            containerClassName="navigationButtons"
            previousLinkClassName="previousButton"
            nextLinkClassName="nextButton"
            disabledClassName="navigationDisabled"
            activeClassName="navigationActive"
          />
        </CardBody>
      </Card>
    </>
  );
};
export default ErectionDismantelReport;
