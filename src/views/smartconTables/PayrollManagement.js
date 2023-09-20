import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import { Row, Col, Button, Card, Badge, Input, CardBody, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';
import message from '../../components/Message';
import 'datatables.net-buttons/js/buttons.colVis';
// import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import TerminatingPayslipModal from '../../components/PayrollManagementTable/TerminatingPayslipModal';
import UpdateOtModal from '../../components/PayrollManagementTable/updateOtModal';
import PrintPayslipModal from '../../components/PayrollManagementTable/PrintPayslipModal';
import { columns } from '../../data/PayrollHR/PayrollColumn';
import PdfPaySlipList from '../../components/PDF/PdfPaySlipList';

const Payrollmanagement = () => {
  //state variables
  const [payrollManagementsdata, setPayrollManagementsdata] = useState([]);
  const [jobInformationRecords, setJobInformationRecords] = useState([]);
  const [terminatingPayslipModal, setTerminatingPayslipModal] = useState(false);
  const [updateOtModal, setUpdateOtModal] = useState(false);
  const [terminatingPayslip, setTerminatingPayslip] = useState([]);
  const [printPayslipModal, setPrintPayslipModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [empWithoutJobInfo, setEmpWithoutJobInfo] = useState([]);
  //handleinputs

  const handleInputs = (e) => {
    setPayrollManagementsdata({ ...payrollManagementsdata, [e.target.name]: e.target.value });
  };
  // Initialize default values for month and year
  const defaultMonth = moment(new Date()).subtract(1, 'months').format('MM');
  const defaultYear = moment(new Date()).format('YYYY');

  const [filterPeriod, setFilterPeriod] = useState({
    month: defaultMonth,
    year: defaultYear,
  });

  const handleFilterInputs = (e) => {
    setFilterPeriod({ ...filterPeriod, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const month = queryParams.get('month');
    const year = queryParams.get('year');

    if (month && year) {
      // Fetch data based on the query parameters
      setFilterPeriod({ month, year });
      // You can also call your fetch data function here if needed.
      // Example: getAllPayrollManagements();
    }
  }, [location.search]);

  //edit update ot
  //edit payroll
  const editPayrollManagementData = () => {
    navigate(`/PayrollManagement?month=${filterPeriod.month}&year=${filterPeriod.year}`);
    const grossPay =
      parseFloat(payrollManagementsdata.basicPay) +
      parseFloat(payrollManagementsdata.allowance1) +
      parseFloat(payrollManagementsdata.allowance2) +
      parseFloat(payrollManagementsdata.allowance3) +
      parseFloat(payrollManagementsdata.allowance4) +
      parseFloat(payrollManagementsdata.allowance5) +
      parseFloat(payrollManagementsdata.allowance6).parseFloat(payrollManagementsdata.ot_amount);
    const totalDeductions =
      parseFloat(payrollManagementsdata.deduction1) +
      parseFloat(payrollManagementsdata.deduction2) +
      parseFloat(payrollManagementsdata.deduction3) +
      parseFloat(payrollManagementsdata.deduction4) +
      parseFloat(payrollManagementsdata.cpf_employee) +
      parseFloat(payrollManagementsdata.loan_deduction) +
      parseFloat(payrollManagementsdata.income_tax_amount) +
      parseFloat(payrollManagementsdata.sdl) +
      parseFloat(payrollManagementsdata.pay_eucf);
    payrollManagementsdata.total_basic_pay_for_month = grossPay;
    payrollManagementsdata.net_total = grossPay - totalDeductions;
    api
      .post('/payrollmanagement/editpayrollmanagementMain', payrollManagementsdata)
      .then(() => {
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //get all records
  const getAllPayrollManagements = () => {
    setLoading(true);
    api
      .get('/payrollmanagement/getpayrollmanagementMain', {
        params: {
          month: filterPeriod.month,
          year: filterPeriod.year,
        },
      })
      .then((res) => {
        res.data.data.forEach((element) => {
          const totalallowance = element.allowance1
            ? parseFloat(element.allowance1)
            : 0 + element.allowance2
            ? parseFloat(element.allowance2)
            : 0 + element.allowance3
            ? parseFloat(element.allowance3)
            : 0 + element.allowance4
            ? parseFloat(element.allowance4)
            : 0 + element.allowance5
            ? parseFloat(element.allowance5)
            : 0 + element.allowance6
            ? parseFloat(element.allowance6)
            : 0;
          element.total_allowance = totalallowance ? parseFloat(totalallowance) : '';
        });
        setPayrollManagementsdata(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',         
        });
        setLoading(false);
      })
      .catch(() => {
        message('Payrollmanagement Data Not Found', 'info');
        setLoading(false);
      });
  };
  //get allarchive employee
  const getArchiveEmployees = () => {
    api
      .get('/payrollmanagement/getJobInformationTerminationPayroll')
      .then((res) => {
        setTerminatingPayslip(res.data.data);
      })
      .catch(() => {
        message('Payrollmanagement Data Not Found', 'info');
      });
  };
  const lastmonthfirst = moment(new Date())
    .subtract(1, 'months')
    .startOf('month')
    .format('YYYY-MM-DD');

  const lastmonthlast = moment(new Date())
    .subtract(1, 'months')
    .endOf('month')
    .format('YYYY-MM-DD');

  console.log('last month first date', lastmonthfirst);
  console.log('last month last date', lastmonthlast);
  //create payroll api
  const createPayrollManagements = async (Arr) => {
    const lastmonthfirstdate = moment(new Date())
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');

    const lastmonthlastdate = moment(new Date())
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');
    const payrollMonth = moment(lastmonthfirstdate).format('MM');
    const payrollYear = moment(lastmonthfirstdate).format('YYYY');
    console.log('last month first date', lastmonthfirstdate);
    console.log('last month last date', lastmonthlastdate);

    console.log('filtered', Arr);
    await Arr.forEach(async (obj) => {
      obj.payslip_start_date = lastmonthfirstdate;
      obj.payslip_end_date = lastmonthlastdate;
      obj.payroll_month = payrollMonth;
      obj.payroll_year = payrollYear;
      obj.status = 'generated';

      await api
        .post('/payrollmanagement/insertpayroll_management', obj)
        .then(() => {
          message('Payrolls created successfully.', 'success');
          // setLoading(false);
        })
        .catch(() => {
          message('Unable to create record', 'info');
        });
    });
  };

  // generate payslip
  const generateTerminatingPayslips = () => {
    api.get('/payrollmanagement/getJobInformationTerminationPayroll').then((res) => {
      setJobInformationRecords(res.data.data);
      createPayrollManagements(res.data.data);
    });
  };

  // generate payslip
  const generatePayslips = () => {
    navigate(`/PayrollManagement?month=${filterPeriod.month}&year=${filterPeriod.year}`);
    // setLoading(true);
    api.get('/payrollmanagement/getJobInformationPayroll').then((res) => {
      setJobInformationRecords(res.data.data);
      console.log('jobinformationrecords', res.data.data);
      console.log('jobinformationrecords', jobInformationRecords);
      createPayrollManagements(res.data.data);
    });
  };

  //getting employee list not having jobinformation record
  const getEmployeesWithoutJobInformation = () => {
    api
      .get('/payrollmanagement/getEmployeeWithoutJobinfo')
      .then((res) => {
        setEmpWithoutJobInfo(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    let table;

    const initializeDataTable = () => {
      table = $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        searching: true,
      });
    };

    initializeDataTable();

    getAllPayrollManagements();
    getArchiveEmployees();
    getEmployeesWithoutJobInformation();

    // Make sure to destroy the DataTable before reinitializing it
    return () => {
      if (table) {
        table.destroy();
      }
    };
  }, [filterPeriod]);

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <Card className="p-2">
          <CardBody>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Input
                    name="month"
                    type="select"
                    value={filterPeriod.month}
                    onChange={handleFilterInputs}
                  >
                    <option value="">Please Select</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <Input
                  type="select"
                  name="year"
                  value={filterPeriod.year}
                  onChange={handleFilterInputs}
                >
                  <option value="">Select Year</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </Input>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card style={{ padding: '10px' }}>
          <div>
            <h5>
              Please create Job information records for the below employees to make them appear in
              payroll.
            </h5>
            {empWithoutJobInfo.map((el) => {
              return (
                <span style={{ marginRight: '5px' }}>
                  <Badge> {el.first_name}</Badge>
                </span>
              );
            })}
          </div>
        </Card>

        <Card className="p-2">
          <Row>
            <Col md="2">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => {
                  if (window.confirm('Are you sure you want to generate Payslips?')) {
                    generatePayslips();
                    // setTimeout(() => {
                    //   window.location.reload();
                    // }, 1500);
                  }
                }}
              >
                Generate Payslips
              </Button>
            </Col>
            <Col md="2">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => {
                  setPrintPayslipModal(true);
                }}
              >
                All Payslip
              </Button>
            </Col>
            <Col md="3">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => setTerminatingPayslipModal(true)}
              >
                Generate Terminating Payslip
              </Button>
            </Col>
            <Col md="3">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => setUpdateOtModal(true)}
              >
                Update OT
              </Button>
            </Col>
          </Row>
        </Card>
        {terminatingPayslipModal && (
          <TerminatingPayslipModal
            terminatingPayslipModal={terminatingPayslipModal}
            setTerminatingPayslipModal={setTerminatingPayslipModal}
            terminatingPayslip={terminatingPayslip}
            generateTerminatingPayslips={generateTerminatingPayslips}
          />
        )}
        {updateOtModal && (
          <UpdateOtModal
            updateOtModal={updateOtModal}
            setUpdateOtModal={setUpdateOtModal}
            payrollManagementsData={payrollManagementsdata}
            handleInputs={handleInputs}
            editPayrollManagementData={editPayrollManagementData}
          />
        )}
        {printPayslipModal && (
          <PrintPayslipModal
            printPayslipModal={printPayslipModal}
            setPrintPayslipModal={setPrintPayslipModal}
            payrollManagementsdata={payrollManagementsdata}
          />
        )}
        <CommonTable
          loading={loading}
          title="Payroll Management List"
          Button={
            <div>
              <Row>
                <Col md="6">
                  <Link to="">
                    <Button color="primary" className="shadow-none">
                      Import
                    </Button>
                  </Link>
                </Col>
                <Col md="6">
                  <a
                    href="http://43.228.126.245/smartco-api/storage/excelsheets/PayrollManagement.xlsx"
                    download
                  >
                    <Button color="primary" className="shadow-none">
                      Sample
                    </Button>
                  </a>
                </Col>
              </Row>
            </div>
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
            {payrollManagementsdata &&
              payrollManagementsdata.map((element, index) => {
                return (
                  <tr key={element.payroll_management_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/PayrollManagementDetails/${element.payroll_management_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.first_name}</td>
                    <td>
                      <PdfPaySlipList payroll={element}></PdfPaySlipList>
                    </td>
                    <td>{element.payroll_month}</td>
                    <td>{element.payroll_year}</td>
                    <td>{element.basic_pay}</td>
                    <td>{element.ot_amount}</td>
                    <td>{element.cpf_employer}</td>
                    <td>{element.cpf_employee}</td>
                    <td>{element.total_alowance}</td>
                    <td>{element.total_deductions}</td>
                    <td>{element.net_total}</td>
                    <td>{element.status}</td>
                    <td>{element.payroll_management_id}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Payrollmanagement;
