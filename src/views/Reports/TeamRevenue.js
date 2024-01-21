import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row, Modal, ModalBody, ModalHeader } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import CommonTable from '../../components/CommonTable';
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
  const [lineItem, setLineItem] = useState([]);
  const [viewLineModal, setViewLineModal] = useState(false);


  //Get data from Training table
  const getProject = () => {
    api
      .get('/reports/getheadcount')
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
  const getLineItem = (taskID) => {
    api.post('/projecttask/getteamEmployeeById2', { task_history_id: taskID })
      .then((res) => {
        setLineItem(res.data.data);
        console.log("12", res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching employee names:', error);
      });
  };
  // const getLineItem = () => {
  //   api.get('/projecttask/getteamEmployeeById' ).then((res) => {
  //     setLineItem(res.data.data);
  //     console.log("1", res.data.data);
  //   });
  // };

  const viewLineToggle = (taskID) => {
    setViewLineModal(!viewLineModal);
    if (viewLineModal) {
      setLineItem([]); // Clear previous data
    } else {
      getLineItem(taskID); // Pass teamTitle as an argument
    }
  };
  // const viewLineToggle = (taskId, teamTitle) => {
  //   setViewLineModal(!viewLineModal);
  //   if (viewLineModal) {
  //     setLineItem([]); // Clear previous data
  //   } else {
  //     getLineItem(taskId, teamTitle);
  //   }
  // };
  // const [showRevenuePerHead, setShowRevenuePerHead] = useState(true);
  // // ... (other state variables)

  // // ... (other functions)

  // // Handle toggling visibility of "Revenue Per Head" column
  // const toggleRevenuePerHead = () => {
  //   setShowRevenuePerHead(!showRevenuePerHead);
  // };

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
    getLineItem();
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
    {
      name: 'Team Size',
      selector: 'headcount',
      //onClick: toggleRevenuePerHead, // Toggle visibility on click
    },
    {
      name: 'Revenue Per Head',
      selector: '',
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
                        <Col md="2">
                          <Label>

                            {/* <u onClick={() => {
                            // viewLineToggle(element.task_history_id);
                            viewLineToggle(element.task_history_id, element.team_title);
                            getLineItem(element.task_history_id);
                            setViewLineModal(true)
                          }}
                          > */}
                            <u onClick={() => {
                              viewLineToggle(element.task_history_id);
                              getLineItem(element.task_history_id);
                              setViewLineModal(true);
                            }}
                            >
                              {/* {element.date} */}

                              {element.headcount}
                            </u>
                          </Label>
                        </Col>
                      </td>
                      <td className="">{!Number.isNaN(parseFloat(element.SharePerHead)) ? parseFloat(element.SharePerHead).toFixed(2) : ''}</td>
                      <td className="">{!Number.isNaN(parseFloat(element.total)) ? parseFloat(element.total).toFixed(2) : ''}</td>
                    </tr>
                  );
                })}
            </tbody>
            <Modal size="xl" isOpen={viewLineModal} toggle={viewLineToggle.bind(null)}>
              <ModalHeader style={{ backgroundColor: ' #0096FF', color: 'white' }} toggle={viewLineToggle.bind(null)}>Employee Details</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <table className="lineitem border border-secondary rounded">
                    <thead >
                      <tr>
                        <th scope="col">SN.No </th>
                        <th scope="col">Employee Name </th>
                        {/* <th scope="col">Date </th> */}
                        <th scope="col">Share Amount($)</th>

                      </tr>
                    </thead>
                    <tbody>
                      {lineItem &&
                        lineItem.map((e, index) => {
                          return (
                            <tr>
                              <td data-label="SN.No">{index + 1}</td>
                              <td data-label="Employee Name">{e.employee_name || e.first_name}</td>
                              {/* <td data-label="Date">{e.date ? moment(e.date).format('DD-MM-YYYY') : ''}</td> */}
                              {/* <td data-label="Date">{e.date}</td> */}
                              <td data-label="Share Per Head">{!Number.isNaN(parseFloat(e.share_per_head)) ? parseFloat(e.share_per_head).toFixed(2) : ''}</td>


                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </FormGroup>
              </ModalBody>
            </Modal>
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
export default OverAllReport;
