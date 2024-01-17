import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const OverAllReport = () => {
  //All state variable
  // const [totalinvoiceAmount, setInvoiceAmount] = useState();
  // const [totalgsts, setGst] = useState();
  // const [totaltotals, setTotal] = useState();
  const [salesReport, setSalesReport] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [company, setCompany] = useState();
  const [userSearchData, setUserSearchData] = useState('');

  //Get data from Training table
  const getProject = () => {
    api
      .get('/reports/gettaskhistory')
      .then((res) => {
        setSalesReport(res.data.data);
        setUserSearchData(res.data.data);
        // let invoiceAmount = 0;
        // let gst = 0;
        // let total = 0;
        // res.data.data.forEach((el) => {
        //   invoiceAmount += el.invoiceAmount;
        //   gst += el.gst;
        //   total += el.total;
        // });
        // setInvoiceAmount(invoiceAmount.toFixed(2));  
        // setGst(gst.toFixed(2));  
        // setTotal(total.toFixed(2));  
      })
      .catch(() => {
        message('Over all sales Data Not Found', 'info');
      });
  };

  const getCompany = () => {
    api.get('/projectteam/getTeams').then((res) => {
      setCompany(res.data.data);
    });
  };

  const handleSearch = () => {
    const newData = salesReport
      .filter((y) => y.team_title === (companyName === '' ? y.team_title : companyName))
      .filter((x) => x.date === (startDate === '' ? x.date : startDate))
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

    },
    {
      name: 'Date',
      selector: 'date',
    },
    {
      name: 'Team',
      selector: 'team_title',
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
      selector: 'totals',
    },
  ];
  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label>Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormGroup>
            </Col>
           
            <Col>
              <FormGroup>
                <Label>Select Team</Label>
                <Input
                  type="select"
                  name="project_team_id"
                  onChange={(e) => setCompanyName(e.target.value)}
                >
                  <option value="">Please Select</option>
                  {company &&
                    company.map((ele) => {
                      return (
                        <option key={ele.project_team_id} value={ele.team_title}>
                          {ele.team_title}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="1" className="mt-3">
              <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>Go</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Label>
                <b>Team:</b> {companyName}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b>Date:</b> {startDate}
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
          <Table>
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
                     {/* <td>{element.pipe_value}</td>
                      <td>{element.plank_value}</td>
                      <td>{element.volume_valuee}</td>
                      <td>{element.tb_value}</td>
                      <td>{element.others_value}</td> */}
                      <td>{element.totals}</td>
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
          </Table>
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
export default OverAllReport;
