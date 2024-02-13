import React from 'react';
import PropTypes from 'prop-types';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import moment from 'moment';
//import Converter from 'number-to-words';
import api from '../../constants/api';
import message from '../Message';
// import PdfFooter from './PdfFooter';
// import PdfHeader from './PdfHeader';
//import PdfHeader2 from './PdfHeader2';

const PdfCreateInvoice = ({ invoiceId, projectDetail }) => {
  PdfCreateInvoice.propTypes = {
    invoiceId: PropTypes.any,
    projectDetail: PropTypes.any,
  };
  const [hfdata, setHeaderFooterData] = React.useState();
  // const [hfdata1, setHeaderFooterData1] = React.useState();
  const [cancelInvoice, setCancelInvoice] = React.useState([]);
  const [createInvoice, setCreateInvoice] = React.useState();
  const [gTotal, setGtotal] = React.useState(0);

  //const [gstTotal, setGstTotal] = React.useState(0);
  //const [Total, setTotal] = React.useState(0);

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);
  // React.useEffect(() => {
  //   api.get('/setting/getSettingsForCompany1').then((res) => {
  //     setHeaderFooterData1(res.data.data);
  //   });
  // }, []);

  console.log('companyInvoice', projectDetail);
  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };

  // Gettind data from Job By Id
  const getInvoiceById = () => {
    api
      .post('/invoice/getInvoiceByInvoiceId', { invoice_id: invoiceId })
      .then((res) => {
        setCreateInvoice(res.data.data);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };
  const calculateTotal = () => {
    const grandTotal = cancelInvoice.reduce((acc, element) => acc + element.amount, 0);
    const gstValue = createInvoice.gst_value || 0;
    const total = grandTotal + gstValue;
    return total;
  };
  //console.log('2', gstTotal);
  const getInvoiceItemById = () => {
    api
      .post('/invoice/getInvoiceItemByInvoiceId', { invoice_id: invoiceId })
      .then((res) => {
        setCancelInvoice(res.data.data);
        let grandTotal = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.amount;
        });

        setGtotal(grandTotal);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };
  React.useEffect(() => {
    getInvoiceItemById();
    getInvoiceById();
  }, []);

  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'S/NO',
          style: 'tableHead',
          alignment: 'center',
        },
        {
          text: ' Job Description',
          style: 'tableHead',
          alignment: 'center',
        },
        {
          text: 'Quantity',
          style: 'tableHead',
          alignment: 'center',
        },
        {
          text: 'Unit Price($)',
          style: 'tableHead',
          alignment: 'right',
        },
        {
          text: 'Amount',
          style: 'tableHead',
          alignment: 'right',
        },
      ],
    ];
    cancelInvoice.forEach((element, index) => {
      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          alignment: 'center',
        },
        {
          text: `${element.item_title ? element.item_title : ''}`,
          style: 'tableBody',
          alignment: 'center',
        },
        // {
        //   text: `${element.unit ? element.unit : ''}`,
        //   style: 'tableBody',
        //   alignment: 'center',
        // },
        {
          text: `${element.qty ? element.qty : ''}`,
          style: 'tableBody',
          alignment: 'center',
        },
        {
          text: `${element.unit_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          margin: [0, 5, 0, 5],
          style: 'tableBody1',
          alignment: 'right',

        },
        {
          text: `${element.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          margin: [0, 5, 0, 5],
          style: 'tableBody1',
        },
      ]);
    });

    const dd = {
      pageSize: 'A4',
      // header: PdfHeader({ findCompany }),
      pageMargins: [40, 40, 30, 0],

      // footer: PdfFooter,
      content: [
        {
          columns: [
            {
              image: `${findCompany("cp.companyLogo")}`,
              style: 'logo', width: 80, alignment: 'left', margin: [0, -20, 0, 0]
            },

            { text: `${findCompany("cp.companyName")}`, alignment: 'center', bold: true, fontSize: 17, color: 'green', margin: [0, -20, 80, 0] },
          ],
        },


        {
          text: `${findCompany("cp.companyAddress1")}, ${findCompany("cp.companyAddress2")}, ${findCompany("cp.companyAddress3")}`,
          alignment: 'center', fontSize: 11, color: 'blue', margin: [55, 0, 50, 10],
        },
        {
          text: `Tel No:${findCompany("cp.companyPhone")}, Fax:${findCompany("cp.companyEmail")}, Email:${findCompany("cp.companyEmail")}`,
          style: 'textSize',
          margin: [45, -8, 50, 10],
          color: 'blue',
          alignment: 'center', fontSize: 11
        },
        {
          text: `Registration No:${findCompany("cp.companyUEN")}, ${findCompany("cp.gstNumber")}`,
          style: 'textSize',
          margin: [45, -8, 50, 10],
          color: 'blue',
          alignment: 'center', fontSize: 11
        },

        '\n',
        {
          text: `TAX INVOICE`,
          alignment: 'center',
          fontSize: 12,
          decoration: 'underline', // Underline added here
          style: 'tableHead',
        },
        '\n',

        {
          columns: [
            {
              stack: [
                {
                  text: `To :${createInvoice.company_name ? createInvoice.company_name : ''}\n${createInvoice.cust_address1 ? createInvoice.cust_address1 : ''
                    }\n ${createInvoice.cust_address2 ? createInvoice.cust_address2 : ''}\n${createInvoice.cust_address_country ? createInvoice.cust_address_country : ''
                    }\n${createInvoice.cust_address_po_code ? createInvoice.cust_address_po_code : ''
                    }`,
                  style: ['textSize'],
                  margin: [0, 0, 0, 0],
                },
                '\n',
              ],
            },
            {
              stack: [

                {
                  text: ` Date :${moment(
                    createInvoice.invoice_date ? createInvoice.invoice_date : '',
                  ).format('DD-MM-YYYY')}  `,
                  style: ['textSize'],
                  margin: [100, 0, 0, 0],
                },
                {
                  text: ` Invoice No:${createInvoice.invoice_code ? createInvoice.invoice_code : ''
                    } `,
                  style: ['textSize'],
                  margin: [100, 0, 0, 0],
                },
                {
                  text: `WO NO/REV :${createInvoice.code ? createInvoice.code : ''} `,
                  style: ['textSize'],
                  margin: [100, 0, 0, 0],
                },
                {
                  text: `JOB/DEPT NO :${createInvoice.so_ref_no ? createInvoice.so_ref_no : ''} `,
                  style: ['textSize'],
                  margin: [100, 0, 0, 0],
                },
                {
                  text: ` JOB DEPT NAME:${createInvoice.po_number ? createInvoice.po_number : ''} `,
                  style: ['textSize'],
                  margin: [100, 0, 0, 0],
                },
                {
                  text: `DEPT NO:${createInvoice.po_number ? createInvoice.po_number : ''} `,
                  style: ['textSize'],
                  margin: [100, 0, 0, 0],
                },
                '\n',
              ],
            },
          ],
        },
        '\n',

        {
          columns: [
            {
              text: `JOB Scope : ${createInvoice.job_scope ? createInvoice.job_scope : ''}`,
              fontSize: 10,
              bold:true,
              decoration: 'underline',
              margin: [0, 5, 0, 0],
              style: ['notesText', 'textSize'],
            },
          ],
        },
        '\n',

        {
          layout: {
            defaultBorder: true,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return 'black';
              }
              return 'black';
            },
            vLineColor: (i) => {
              if (i === 1 || i === 0) {
                return 'black';
              }
              return 'black';
            },
            hLineStyle: () => {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return 'white';
            },
          },
          table: {
            headerRows: 1,
            widths: ['10%', '30%', '20%', '24%', '20%', '20%'],

            body: productItems
          },
        },
        '\n\n',
        {
          columns: [
            {
              text: ``,
              alignment: 'left',
              style: ['invoiceAdd', 'textSize'],
            },
            {
              stack: [
                {
                  text: `TOTAL $ : ${gTotal.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}`,
                  style: ['textSize'],
                  margin: [20, 0, 0, 0],
                  alignment:'right',
                  bold:true
                },
                '\n',
                // {
                //   text: `Discount : ${createInvoice.discount ? createInvoice.discount : ''}`,
                //   style: ['textSize'],
                //   margin: [145, 0, 0, 0],
                // },
             
                {
                  text: `GST 8% :  ${createInvoice.gst_value ? createInvoice.gst_value : ''}`,
                  style: ['textSize'],
                  alignment:'right',
                  margin: [20, 0, 0, 0],
                  bold:true
                },
                '\n',
                {
                  text: `GRAND TOTAL ($) : ${calculateTotal().toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
                  style: ['textSize'],
                  margin: [20, 0, 0, 0],
                  alignment:'right',
                  bold:true
                },
              ],
            },
          ],
        },
        '\n',
        //{ text: `Total $ :${Converter.toWords(Total)}` },
        '\n',

        {
          text: 'Terms and conditions : \n\n 1.The above rates are in Singapore Dollars. \n\n 2. Payment Terms 30 days from the date of Invoice \n\n  3.Payment should be made in favor of " CUBOSALE ENGINEERING PTE LTD " \n\n 4.Any discrepancies please write to us within 3 days from the date of invoice  \n\n\n 5. For Account transfer \n\n \n\n',
          style: 'textSize',
        },
        {
          text: 'UNITED OVERSEAS BANK \n ACCT NAME: CUBOSALE ENGINEERING PTE LTD \n ACCT NO.:- 3923023427 \n Paynow By UEN : 201222688M   \n\n',
          style: 'textSize',
          bold: true,
        },

        '\n\n',
      ],
      margin: [0, 50, 50, 50],

      styles: {
        logo: {
          margin: [-20, 20, 0, 0],
        },
        address: {
          margin: [-10, 20, 0, 0],
        },
        invoice: {
          margin: [0, 30, 0, 10],
          alignment: 'right',
        },
        invoiceAdd: {
          alignment: 'right',
        },
        textSize: {
          fontSize: 10,
        },
        notesTitle: {
          bold: true,
          margin: [0, 50, 0, 3],
        },
        tableHead: {
          border: [false, true, false, true],
          fillColor: '#eaf2f5',
          margin: [0, 5, 0, 5],
          fontSize: 10,
          bold: 'true',
        },
        tableBody: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
          fontSize: 10,
        },
        tableBody1: {
          border: [false, false, false, true],
          margin: [10, 5, 0, 5],
          alignment: 'right',
          fontSize: 10,
        },
        tableBody2: {
          border: [false, false, false, true],
          margin: [15, 5, 0, 5],
          alignment: 'center',
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };

  return (
    <>
      <Button type="button" className="btn btn-dark mr-2" onClick={GetPdf}>
        Print Invoice
      </Button>
    </>
  );
};

export default PdfCreateInvoice;