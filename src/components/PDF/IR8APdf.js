import React, { useState } from 'react';
//import { useParams } from 'react-router-dom';
import pdfMake from 'pdfmake';
import PropTypes from 'prop-types';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
//import moment from 'moment';
import api from '../../constants/api';
// import PdfFooter from './PdfFooter';
// import PdfHeader from './PdfHeader';

const IR8Pdf = ({ payrollsYear }) => {
  IR8Pdf.propTypes = {
    payrollsYear: PropTypes.any,
  };
  const [payrollss, setPayrolls] = useState([]);
  // Define the current year and month

  //   // Gettind data from Job By Id
  const getPayslip = () => {
    api
      .post('/PayrollManagement/getpayrollmanagementFilterYear', {
        year: payrollsYear,
      })
      .then((res) => {
        setPayrolls(res.data.data);
      })
      .catch(() => {
        // Handle error
      });
  };

  React.useEffect(() => {
    getPayslip();
  }, []);

  const generatePayslipPdf = (payrolls) => {
    const contents = [];
    payrolls.forEach((payroll) => {
      contents.push(
        {
          columns: [
            {
              text: '2023',
              style: 'header',
            },
            {
              text: 'FORM IR8A (Electronic)',
              style: 'header',
              margin: [-50, 0, 0, 0],
            },
          ],
        },
        {
          text: '\nEmployee`s Remuneration for the Year Ended 31 Dec 2022',
          style: 'header',
          alignment: 'center',
          margin: [0, -4, 0, 0],
        },
        {
          text: 'This statement can only be issued by an employer in the Auto-Inclusion Scheme (AIS) and is for your retention. The information in this statement will be automatically included in your income tax return, so you need not declare them in your tax form. You can check if your employer is in the AIS at IRAS website, https://go.gov.sg/iras-ais-search.',
          style: 'small',
          alignment: 'center',
          italics: true,
        },
        '\n',
        {
          columns: [
            {
              text: 'Employer`s Tax Ref No    :',
              style: 'header1',
              fontSize: 9,
            },
            [
              {
                text: `Full Name of Employee \n as per NRIC/FIN                   `,
                style: 'header1',
                fontSize: 9,
              },

              {
                text: `: ${payroll.employee_name ? payroll.employee_name : ''}`,
                style: 'header1',
                fontSize: 9,
                alignment: 'right',
                margin: [0, -17, 83, 0],
              },
            ],
          ],
        },
        {
          columns: [
            {
              stack: [
                {
                  text: `Employee's Tax Ref No    : `,
                  style: 'header1',
                  fontSize: 9,
                  margin: [0, 0, 0, 0],
                },

                payroll.nric_no && {
                  text: `NRIC ${payroll.nric_no ? payroll.nric_no : ''}`,

                  style: 'header1',
                  fontSize: 9,
                  alignment: 'right',
                  margin: [0, -11, 85, 0],
                },

                payroll.fin_no && {
                  text: `FIN ${payroll.fin_no ? payroll.fin_no : ''}`,
                  alignment: 'right',
                  style: 'header1',
                  fontSize: 9,
                  margin: [0, -11, 85, 0],
                },
              ],
            },
            {
              text: `Gender                                  : ${
                payroll.gender ? payroll.gender : ''
              }`,
              style: 'header1',
              fontSize: 9,
              alignment: 'left',
              margin: [0, 8, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              text: `Citizenship                         : ${
                payroll.nationality ? payroll.nationality : ''
              }`,
              style: 'header1',
              fontSize: 9,
              margin: [0, -5, 0, 0],
            },
            {
              text: `Date of Birth                        : ${payroll.dob ? payroll.dob : ''}`,
              style: 'header1',
              fontSize: 9,
              margin: [0, 5, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              text: `Designation                       : ${
                payroll.designation ? payroll.designation : ''
              }`,
              style: 'header1',
              fontSize: 9,
              margin: [0, -5, 0, 0],
            },
            {
              text: 'Date of Cessation               :',
              style: 'header1',
              fontSize: 9,
              margin: [0, 5, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date of Commencement :',
              style: 'header1',
              fontSize: 9,
              margin: [0, -5, 0, 0],
            },
            {
              text: 'Postal Code                         :',
              style: 'header1',
              fontSize: 9,
              margin: [0, 5, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Bank Salary Credited to   :',
              style: 'header1',
              fontSize: 9,
              margin: [0, -5, 0, 0],
            },
            {
              text: '',
              style: 'header2',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Residential Address         :',
              style: 'header1',
              fontSize: 9,
              margin: [0, 5, 0, 0],
            },
            {
              text: '',
              style: 'header2',
            },
          ],
        },
        {
          text: 'INCOME        ',
          style: 'header',
          margin: [0, 6, 0, 0],
        },

        [
          {
            text: `a)    Gross Salary, Leave pay, Wages and Overtime Pay    :           `,
            style: 'header',
            fontSize: 9,
            margin: [0, 5, 0, 0],
          },

          {
            text: `${
              payroll.total_basic_pay_for_month
                ? payroll.total_basic_pay_for_month.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })
                : 0.0
            }`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        // {

        // 	table: {
        // 	    widths: [15],
        // 	    heights:[5],

        // 		body: [
        // 			[''],
        // 		],
        //         margin: [100, 2, 0, 0],
        // 	}

        // },
        // {columns: [
        //     {text:`a) Gross Salary, Fees, Leave Pay, Wages and Overtime Pay`,fontSize:8,margin:[10,5,0,0],bold:true},
        //     {
        //       stack: [
        //         {text:`${report.gross_salary?report.gross_salary:''}`,fontSize:6,margin:[220,0,0,0],alignment: 'center'},

        //         {canvas: [ { type: 'line', x1: 50, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[220,0,0,0]}
        //       ],
        //     },
        //    ],
        //    },
        [
          {
            text: 'b)    Bonus (non-contractual bonus paid on and/or contractual bonus for service rendered in 2022)        ',
            style: 'header',
            fontSize: 9,
            margin: [0, 4, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: ' c)    Director`s fees approved at the company`s AGM/EGM on:       ',
            style: 'header',
            fontSize: 9,
            margin: [0, 4, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],

        {
          text: 'd)    Others        ',
          style: 'header',
          fontSize: 9,
          bold: true,
          margin: [0, 4, 0, 0],
        },

        [
          {
            text: '1.    Allowances: (i) Transport  0.00 (ii) Entertainment  0.00 (iii) Others  0.00         ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 6, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: '2.    Gross Commission for the period to       ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: '3.    Pension       ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: '4i.   Gratuity/ Notice Pay/ Ex-gratia payment/ Others       ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        {
          text: '4ii.  Compensation for loss of office amount',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [20, 3, 0, 0],
        },
        [
          {
            text: '(Approval obtianed from IRAS: , Date of approval:)',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [38, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        {
          text: '5.    Retirement benefits including gratuities/pension/commutation of pension/lump sum payments, ',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [20, 3, 0, 0],
        },
        {
          text: '  etc from Pension/Provident Fund:     ',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [38, 3, 0, 0],
        },
        [
          {
            text: '(Amount accrued up to 31 dec 1992 0.00) Amount accrued from 1993:     ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [38, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: '6.    Contributions made by employer to any Pension/Provident Fund constituted outside Singapore:     ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: '7.    Excess/Voluntary contribution to CPF by employer (less amount refunded/to be refunded):     ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: '8i.   Gains and profits from share option for sec. 10(1)(b)    ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: '8ii.  Gains and profits from share option for sec. 10(1)(g)   ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: '9.    Value of Benefits-in-kind     ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: 'Total of item d1 to d9 (excluding 4ii & 8ii)    ',
            style: 'header',
            fontSize: 9,
            bold: true,
            alignment: 'right',
            margin: [0, 3, 50, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        {
          text: 'e).    Remission/ Overseas Posting/ Exempt Indicator :    ',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [0, 3, 0, 0],
        },
        [
          {
            text: 'Amount of income for the Remission/ Overseas Posting/ Exempt Indicator selected :    ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        {
          text: `f) Employee's income tax borne by employer:     `,
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [0, 3, 0, 0],
        },
        [
          {
            text: '(i) Amount of employment income for which tax is borne by employer:     ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        [
          {
            text: '(ii) Fixed amount of income tax for which tax is borne by employee:   ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [20, 3, 0, 0],
          },
          {
            text: `0.00`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],

        {
          text: 'DEDUCTIONS  ',
          style: 'header',
          bold: true,
          fontSize: 9,
          margin: [0, 7, 0, 0],
        },

        {
          text: 'EMPLOYEES COMPULSORY contribution to CPF/Designated Pension/Provident Fund      ',
          style: 'header',
          bold: false,
          fontSize: 9,
          margin: [0, 8, 0, 0],
        },
        [
          {
            text: '(Less amount refunded/to be refunded)    ',
            style: 'header',
            fontSize: 9,
            bold: true,
            margin: [0, 2, 0, 0],
          },
          {
            text: ` ${
              payroll.cpf_employee
                ? payroll.cpf_employee.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })
                : 0.0
            }`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        {
          text: 'DONATIONS    ',
          style: 'header',
          fontSize: 9,
          bold: true,
          margin: [0, 8, 0, 0],
        },
        {
          text: 'deducted through salaries for Yayasan Mendaki Fund/ Community Chest of Singapore     ',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [55, -10, 0, 0],
        },
        [
          {
            text: '/ SINDA/ CDAC/ Other Tax Exempt donations     ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [0, 2, 0, 0],
          },
          {
            text: `0`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        {
          text: 'CONTRIBUTIONS    ',
          style: 'header',
          fontSize: 9,
          bold: true,
          margin: [0, 8, 0, 0],
        },
        [
          {
            text: 'deducted through salaries to Mosque Building Fund      ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [75, -11, 0, 0],
          },
          {
            text: `0`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],

        {
          text: 'LIFE INSURANCE PREMIUMS    ',
          style: 'header',
          fontSize: 9,
          bold: true,
          margin: [0, 8, 0, 0],
        },
        [
          {
            text: 'deducted through salaries     ',
            style: 'header',
            fontSize: 9,
            bold: false,
            margin: [125, -11, 0, 0],
          },
          {
            text: `0`,
            style: 'header',
            fontSize: 9,
            alignment: 'right',
            margin: [0, -10, 0, 0],
          },
        ],
        {
          text: 'DECLARATIONS    ',
          style: 'header',
          fontSize: 9,
          bold: true,
          margin: [0, 10, 0, 0],
        },

        {
          text: 'Name of Employer     : ',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [0, 9, 0, 0],
        },
        {
          text: 'Name of Authorised    ',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [0, 5, 0, 0],
        },
        {
          text: 'person making the     :  ',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [0, 2, 0, 0],
        },
        {
          text: 'declaration       ',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [0, 2, 0, 0],
        },
        {
          text: 'Designation                 :',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [0, 6, 0, 0],
        },
        {
          text: 'Telephone                    : ',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [0, 5, 0, 0],
        },
        {
          text: 'Email Address             :',
          style: 'header',
          fontSize: 9,
          bold: false,
          margin: [0, 5, 0, 0],
        },
        {
          text: 'There are penalties for failing to give a return or furnishing an incorrect or late return.    ',
          style: 'header',
          alignment: 'center',
          fontSize: 11,
          bold: true,
          margin: [0, 6, 0, 0],
        },
      );
    });
    const dd = {
      //pageSize: 'A4',
      //header: PdfHeader({ findCompany }),
      pageMargins: [30, 30, 30, 0],
      //footer: PdfFooter,
      content: contents,
      margin: [0, 0, 0, 20],

      styles: {
        header: {
          fontSize: 10,

          bold: true,
        },
        header1: {
          fontSize: 10,
          alignment: 'Left',
        },
        header2: {
          fontSize: 10,
          alignment: 'Left',
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 8,
          alignment: 'center',
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const pdfDocGenerator = pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs);

    pdfDocGenerator.getDataUrl((dataUrl) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `pdf-IR8A.pdf`;
      downloadLink.click();
    });
  };

  const handleGenerateAllPdfs = () => {
    generatePayslipPdf(payrollss);
  };
  return (
    <>
      <Button type="button" className="btn btn-dark mr-2" onClick={handleGenerateAllPdfs}>
        Generate IR8A Pdf
      </Button>
    </>
  );
};

export default IR8Pdf;
