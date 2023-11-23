import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {

  Form,
  FormGroup
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import WorkSheetDetails from '../../components/WorkSheetTable/WorkSheetDetails';
import ErectionDismantle from '../../components/WorkSheetTable/ErectionDetection';
import ApiButton from '../../components/ApiButton';

//import Loan from '../smartconTables/Loan';

function WorkSheetEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worksheet, setWorkSheet] = useState({
    employee_name: '',
    pipe_erection:'',
  });

  //const [finalGrossPay, setFinalGrossPay] = useState(0);
   const [totalMonthPay, setTotalMonthPay] = useState();
   const [totalDeductions, setTotalDeductions] = useState();
//   const [otAmount, setOtAmount] = useState();
//   const [editTotalDeduction, setEditTotalDeduction] = useState(false);
  //handle inputs

  const backToList = () => {
    navigate('/WorkSheet');
  };
  

//   const handleOtAmount = (otRate, otHours) => {
//     if (!otRate) otRate = 0;
//     if (!otHours) otHours = 0;
//     setOtAmount(parseFloat(otRate) * parseFloat(otHours));
//   };

  // calculation Dismantle
  const handleDismantle = (
    DismantlePipe,
    DismantleVolume,
    DismantlePlanks,
    DismantleTB,
    DismantleOthers,
     
  ) => {
    /* eslint-disable */
    if (!DismantlePipe) DismantlePipe = 0;
    if (!DismantleVolume) DismantleVolume = 0;
    if (!DismantlePlanks) DismantlePlanks = 0;
    if (!DismantleTB) DismantleTB = 0;    
    if (!DismantleOthers) DismantleOthers = 0;
  

    setTotalDeductions(
        parseFloat(DismantlePipe) +
        parseFloat(DismantleVolume) +
        parseFloat(DismantlePlanks) +
        parseFloat(DismantleTB) +
        parseFloat(DismantleOthers) 
        
    );
    //setEditTotalDeduction(true);
  };
  // calculation earnings
  const handleErection = (
    
    erecVolume,
    erecPlank,
    erecOthers,
    erectb,
    erecpipe,
    
  ) => {
    /* eslint-disable */
   
    if (!erecpipe) erecpipe = 0;
    if (!erecVolume) erecVolume = 0;
    if (!erecPlank) erecPlank = 0;
    if (!erecOthers) erecOthers = 0;
    if (!erectb) erectb = 0;
    

    setTotalMonthPay(
     
        parseFloat(erecpipe) +
        parseFloat(erecVolume) +
        parseFloat(erecPlank) +
        parseFloat(erecOthers) +
        parseFloat(erectb) 
    );
  };

  const handleInputs = (e) => {
    setWorkSheet({ ...worksheet, [e.target.name]: e.target.value });
  };

  // Get payroll By Id
  const getPayroll = () => {
    api
      .post('/projecttask/getWorksheetById', { work_sheet_id: id })
      .then((res) => {
        setWorkSheet(res.data.data[0]);
      })
      .catch(() => {
        //message('Loan Data Not Found', 'info');
      });
  };

  const newTotalMonthPay =

  parseFloat(worksheet.pipe_erection || 0) +
  parseFloat(worksheet.volume_erection || 0) +
  parseFloat(worksheet.tb_erection || 0) +
  parseFloat(worksheet.plank_erection || 0) +
  parseFloat(worksheet.others_erection || 0);
// const newTotalMonthPay = finalGrossPay;
  // Edit Payroll Data Function
  const editPayrollData = () => {
    // if (editTotalDeduction) {
    //   payroll.total_deductions = totalDeductions;
    // }


    // const updatedPayrollData = {
    //   ...payroll,

    //   total_deductions: newTotalDeductions,
    //   net_total: newNetTotal,
    //   ot_amount: otAmount || (payroll && payroll.ot_amount) || 0, // Ensure ot_amount is always included
    // };

    const updatedPayrollData = {
      ...worksheet,

      total_erection_amount: newTotalMonthPay,
      // net_total: newNetTotal,
      // ot_amount: otAmount || (payroll && payroll.ot_amount) || 0, // Ensure ot_amount is always included
    };

    api
      .post('/worksheet/edit-WorkSheet', updatedPayrollData)
      .then(() => {
        message('Record edited successfully', 'success');
        //navigate(`/PayrollManagement?month=${payroll.payroll_month}&year=${payroll.payroll_year}`);
        getPayroll();
        //getPreviousEarlierLoan();
        //setEditTotalDeduction(false);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };



 
  const deletePayrollData = () => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/payrollmanagement/deletepayroll_management', { payroll_management_id: id })
          .then(() => {
            Swal.fire('Deleted!', 'Your payroll has been deleted.', 'success');
            //window.location.reload();
          });
      }
    });
  };
 
  useEffect(() => {
    //getlastmonthdates();
    getPayroll();
  }, [id]);
  

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
         
            {/* Save,Apply Buttons */}
            <ApiButton
              editData={editPayrollData}
              navigate={navigate}
              deleteData={deletePayrollData}
              //applyChanges={editPayrollData}
              backToList={backToList}
              module="WorkSheet"
            ></ApiButton>
        </FormGroup>
      </Form>
     
     
      <ComponentCard title="Main Details">
     
        {/* Payslip summary */}

        <WorkSheetDetails
          worksheet={worksheet}
          handleInputs={handleInputs}
          
        />
        {/* Earnings and deductions table */}
        <ErectionDismantle
          worksheet={worksheet}
          totalMonthPay={totalMonthPay}
          totalDeductions={totalDeductions}
          handleErection={handleErection}
          handleDismantle={handleDismantle}
          handleInputs={handleInputs}
          //newTotalMonthPay={newTotalMonthPay}
          //totalMonthPay={totalMonthPay}
        />
      
      </ComponentCard>
    </>
  );
}

export default WorkSheetEdit;
