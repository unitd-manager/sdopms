import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import { Row, Col, Button,Card } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';
import message from '../../components/Message';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import TerminatingPayslipModal from '../../components/ParollManagementTable/TerminatingPayslipModal';
import UpdateOtModal from '../../components/ParollManagementTable/updateOtModal';
import PrintPayslipModal from '../../components/ParollManagementTable/PrintPayslipModal';

const Payrollmanagement = () => {
  //state variables
  const [payrollManagementsdata, setPayrollManagementsdata] = useState([]);
  const [jobInformationRecords, setJobInformationRecords] = useState([]);
  const [terminatingPayslipModal, setTerminatingPayslipModal] = useState(false);
  const [updateOtModal, setUpdateOtModal] = useState(false);
  const [terminatingPayslip, setTerminatingPayslip] = useState([]);
  const [printPayslipModal, setPrintPayslipModal] = useState(false);
  const [loading, setLoading] = useState(false)
  //handleinputs

  const handleInputs = (e) => {
    setPayrollManagementsdata({ ...payrollManagementsdata, [e.target.name]: e.target.value });
  };

  //edit update ot
  //edit payroll
  const editPayrollManagementData = () => {
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
          // window.location.reload()
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //get all records
  const getAllPayrollManagements = () => {
    setLoading(true)
    api
      .get('/payrollmanagement/getpayrollmanagementMain')
      .then((res) => {
        setPayrollManagementsdata(res.data.data);
        setLoading(false)
      })
      .catch(() => {
        message('Payrollmanagement Data Not Found', 'info');
        setLoading(false)
      });
  };
  //get allarchive employee
  const getArchiveEmployees = () => {
    api
      .get('/payrollmanagement/getJobinfoArchiveEmployee')
      .then((res) => {
        setTerminatingPayslip(res.data.data);
      })
      .catch(() => {
        message('Payrollmanagement Data Not Found', 'info');
      });
  };
  //create payroll api
  const createPayrollManagements = (Arr) => {
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
 
      const filtered = Arr.filter(el => {
         return payrollManagementsdata.indexOf(el) === -1;
      });

      Arr.forEach((obj)=>{
        obj.payslip_start_date = lastmonthfirstdate;
        obj.payslip_end_date = lastmonthlastdate;
        obj.payroll_month = payrollMonth;
        obj.payroll_year = payrollYear;
        obj.status = 'generated';
      })
      const result = Arr.filter(ad => 
        payrollManagementsdata.every(fd => fd.employee_id !== ad.employee_id &&  fd.payroll_month !== ad.payroll_month ));
         

  console.log('filtered',filtered)
    result.forEach((obj) => {
      obj.payslip_start_date = lastmonthfirstdate;
      obj.payslip_end_date = lastmonthlastdate;
      obj.payroll_month = payrollMonth;
      obj.payroll_year = payrollYear;
      obj.status = 'generated';

              api
        .post('/payrollmanagement/insertpayroll_management', obj)
        .then(() => {
          message('Payrolls created successfully.', 'success');
          setLoading(false)
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
    // setTimeout(()=>{window.location.reload()},300)
    console.log('jobinformationrecs', jobInformationRecords);
    console.log('payrollrecs', payrollManagementsdata);
  };

  // generate payslip
  const generatePayslips = () => {
    setLoading(true)
    api.get('/payrollmanagement/getJobInformationPayroll').then((res) => {
      setJobInformationRecords(res.data.data);
      console.log('jobinformationrecords', jobInformationRecords);
     createPayrollManagements(res.data.data);
    });
    
  };

  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'print',
            text: 'Print',
            className: 'shadow-none btn btn-primary',
          },
        ],

        searching: true,
      });
    }, 1000);

    getAllPayrollManagements();
    getArchiveEmployees();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      grow: 0,
      width: 'auto',
    },
    {
      name: 'edit',
      selector: 'edit',
      sortable: true,
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Employee Name',
      selector: 'code',
      sortable: true,
      grow: 1,
    },
    {
      name: 'Pay slip print',
      selector: 'code',
      sortable: true,
      grow: 1,
    },
    {
      name: 'Month',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: 'Year',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: 'Basic Pay',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: 'OT',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: 'CPF(Employer)',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: 'CPF(Employee)',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: 'Allowance',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: 'Deductions',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: 'Net Pay',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: 'Status',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: 'ID',
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <Card  className="p-2">
          <Row>
            <Col md="2">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() =>{  if (
                  window.confirm(
                    'Are you sure you want to generate Payslips?',
                  )
                ) {generatePayslips(); setTimeout(()=>{window.location.reload()},400)}}}
              >
                Generate Payslips
              </Button>
            </Col>
            <Col md="2">
              <Button type="submit" className="border btn-dark rounded"
              onClick={()=>{setPrintPayslipModal(true)}}>
                Print All Payslip
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
  />
)

}
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
             <a href="http://43.228.126.245/pms-shimi/storage/excelsheets/PayrollManagement.xlsx" download>
             <Button color="primary" className="shadow-none" >
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
                      <span>Print Payslip</span>
                    </td>
                    <td>{element.payroll_month}</td>
                    <td>{element.payroll_year}</td>
                    <td>{element.basic_pay}</td>
                    <td>{element.ot_amount}</td>
                    <td>{element.cpf_employer}</td>
                    <td>{element.cpf_employee}</td>
                    <td>{element.total_allowance}</td>
                    <td>{element.total_deduction}</td>
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
