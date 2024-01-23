import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import CommonTable from '../../components/CommonTable';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const ErectionDismantelReport = () => {
  const [Report, setReport] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [workOrderNo, setworkOrderNo] = useState('');
  const [workorder, setWorkOrder] = useState('');
  const [project, setProject] = useState();
  const [userSearchData, setUserSearchData] = useState('');

  //Get data from Training table
  const getProject = () => {
    api
      .get('/reports/getTeamRevenue')
      .then((res) => {
        setReport(res.data.data);
        setUserSearchData(res.data.data);
      })
      .catch(() => {
        message('Over all sales Data Not Found', 'info');
      });
  };

  const getCompany = () => {
    api.get('/project/getProject').then((res) => {
      setProject(res.data.data);
    });
  };

  const handleSearch = () => {
    const newData = Report.filter(
      (y) => y.team_title === (workOrderNo === '' ? y.team_title : workOrderNo),
    ).filter((x) => x.date === (projectName === '' ? x.date : projectName));
    setUserSearchData(newData);
  };

  useEffect(() => {
    getProject();
    getCompany();
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

  //structure of Training list view
  const columns = [
    {
      name: 'SN',
      selector: 's_no',
    },
    {
      name: 'Date',
      selector: 'date',
    },
    {
      name: 'Team',
      selector: 'team_title',
    },
    {
      name: 'Team Size',
      selector: 'headcount',
      //onClick: toggleRevenuePerHead, // Toggle visibility on click
    },
    {
      name: 'Revenue Per Head',
      selector: 'SharePerHead',
      sortable: true,
      grow: 0,
      wrap: true,

      // visible: showRevenuePerHead, // Set visibility based on state
      //visible: showRevenuePerHead,
    },
    //  {
    //   name: 'Pipe Value',
    //   selector: 'pipe_value',
    // },
    // {
    //   name: 'Plank Value',
    //   selector: 'plank_value',
    // },

    // {
    //   name: 'Volume Value',
    //   selector: 'volume_value',
    // },
    // {
    //   name: 'TB Value',
    //   selector: 'tb_value',
    // },
    // {
    //   name: 'Others Value',
    //   selector: 'others_value',
    // },
    {
      name: 'Total',
      selector: 'total',
    },
  ];
  //Getting data from milestone
  const getWorkOrder = () => {
    api
      .get('/projecttask/getworkorder')
      .then((res) => {
        setWorkOrder(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getWorkOrder();
  }, []);
  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label>Project Name</Label>
                <Input type="select" name="title" onChange={(e) => setProjectName(e.target.value)}>
                  <option value="">Please Select</option>
                  {project &&
                    project.map((ele) => {
                      return (
                        <option key={ele.project_id} value={ele.title}>
                          {ele.title}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label>Worker Order No</Label>
                <Input
                  type="select"
                  name="work_order_no"
                  onChange={(e) => setworkOrderNo(e.target.value)}
                >
                  <option value="">Please Select</option>
                  {workorder &&
                    workorder.map((ele) => (
                      <option key={ele.work_order_id} value={ele.work_order_no}>
                        {ele.work_order_no}
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
                <b>Team:</b> {workOrderNo}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b>Date:</b> {projectName}
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
                      <td>{element.date}</td>
                      <td>{element.team_title}</td>

                      <td>
                        {/* {element.date} */}

                        {element.headcount}
                      </td>
                      <td className="">
                        {!Number.isNaN(parseFloat(element.SharePerHead))
                          ? parseFloat(element.SharePerHead).toFixed(2)
                          : ''}
                      </td>
                      <td className="">
                        {!Number.isNaN(parseFloat(element.total))
                          ? parseFloat(element.total).toFixed(2)
                          : ''}
                      </td>
                    </tr>
                  );
                })}
            </tbody>

            {/* <tr>
              <td><b>Total:</b></td>
              <td></td>
              <td></td>
              <td></td>
               <td><b>{totalinvoiceAmount}</b></td>
               <td><b>{totalgsts}</b></td>
               <td><b>{totaltotals}</b></td>
               <td></td>
               <td></td>
              </tr> */}
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
