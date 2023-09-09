import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button, Label, Card, CardBody, Col, Row, Input, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const ProjectTask = () => {
  //All state variable
  const [projectTask, setProjectTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [userSearchData, setUserSearchData] = useState('');
  const [employee, setEmployee] = useState();

  //getting data from projectTask
  const getProjectTask = () => {
    setLoading(true);
    api
      .get('/projecttask/getProjectTask')
      .then((res) => {
        setProjectTask(res.data.data);
        setUserSearchData(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          searching: true,
          buttons: [
            {
              extend: 'print',
              text: 'Print',
              className: 'shadow-none btn btn-primary',
            },
          ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/projecttask/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployee(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getProjectTask();
    editJobById();
  }, []);
  const handleSearch = () => {
    const newData = projectTask
      .filter((y) => y.first_name === (companyName === '' ? y.first_name : companyName))
      .filter((x) => x.status === (categoryName === '' ? x.status : categoryName));
    setUserSearchData(newData);
  };
  // const handleSearch = () => {

  //   const filteredData = projectTask.filter(
  //     (y) => y.employee_id === (companyName === '' ? y.employee_id : companyName),
  //   );
  //   console.log('Filtered Data:', filteredData);

  //   setProjectTask(filteredData);
  // };
  const [page, setPage] = useState(0);

  const employeesPerPage = 20;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = userSearchData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );
  console.log('displayEmployees', displayEmployees);
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  //structure of projectTask list view
  const columns = [
    {
      name: '#',
      selector: 'project_task_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Title',
      selector: 'task_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Start date',
      selector: 'start_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'End Date',
      selector: 'end_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Completion',
      selector: 'completion',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Task Type',
      selector: 'task_type',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Priority',
      selector: 'priority',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Actual Hours',
      selector: '',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Est Hours',
      selector: 'estimated_hours',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <Card>
          <CardBody>
            <Row>
              <Col md="2">
                <FormGroup>
                  <Label>Select Staff</Label>
                  <Input
                    type="select"
                    name="employee_id"
                    onChange={(e) => setCompanyName(e.target.value)} // Update companyName state
                  >
                    <option value="">Please Select</option>
                    {employee &&
                      employee.map((ele) => {
                        return (
                          // ele.e_count === 0 && (
                          <option key={ele.employee_id} value={ele.first_name}>
                            {ele.first_name}
                          </option>
                        );
                        // );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup>
                  <Label>Select Category</Label>
                  <Input
                    type="select"
                    name="status"
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    {' '}
                    <option value="">Select Category</option>
                    <option value="Pending">Pending</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Completed">Completed</option>
                    <option value="OnHold">OnHold</option>
                    {/* <option value="tenancy work">Tenancy Work</option>
                    <option value="maintenance">Maintenance</option> */}
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
       
            <CommonTable
              loading={loading}
              title="Task List"
              Button={
                <Link to="/ProjectTaskDetails">
                  <Button color="primary" className="shadow-none">
                    Add New
                  </Button>
                </Link>
              }
            >
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
                      <tr key={element.project_task_id}>
                        <td>{index + 1}</td>
                        <td>
                          <Link to={`/TaskEdit/${element.project_task_id}`}>
                            <Icon.Edit2 />
                          </Link>
                        </td>
                        <td>{element.task_title}</td>
                        <td>
                          {element.start_date
                            ? moment(element.start_date).format('DD-MM-YYYY')
                            : ''}
                        </td>
                        <td>
                          {element.end_date ? moment(element.end_date).format('DD-MM-YYYY') : ''}
                        </td>
                        <td>{element.completion}</td>
                        <td>{element.status}</td>
                        <td>{element.task_type}</td>
                        <td>{element.priority}</td>
                        <td>{element.actual_hours}</td>
                        <td>{element.estimated_hours}</td>
                        <td>{element.first_name}</td>
                        <td>{element.description}</td>
                      </tr>
                    );
                  })}
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
         </div>
    </div>
  );
};

export default ProjectTask;
