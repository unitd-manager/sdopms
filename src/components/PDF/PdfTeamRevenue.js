import React from 'react'; 
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfTeamRevenue = ({searchData}) => {
  PdfTeamRevenue.propTypes = {
    searchData: PropTypes.any,
    
  };
  const [hfdata, setHeaderFooterData] = React.useState();
  // const [lineItems, setLineItem] = useState([]);
  // const [product, setProduct] = React. useState();
  // const [gTotal, setGtotal] = React. useState(0);

  
  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
     
    });
  }, []);

 const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };


  // const getProject = () => {
  //   api
  //     .get('/reports/getTaskEmployeeRevenue')
  //     .then((res) => {
  //       setLineItem(res.data.data);
  //       setSearchData(res.data.data);
  //     })
  //     .catch(() => {
  //       // message('Over all sales Data Not Found', 'info');
  //     });
  // };
  
  
  
  //   useEffect(() => {
  //     getProject();
  //   }, []);
 


  const GetPdf = () => {
    
    const productItems = [
      [
        {
          text: 'SN',
          style: 'tableHead',
        },
        {
          text: 'Team Title',
          style: 'tableHead',
        },
        {
          text: 'Date',
          style: 'tableHead',
        },
        {
          text: 'Size',
          style: 'tableHead',
        },
        {
          text: 'Team Total Revenue($)',
          style: 'tableHead',
        },
        {
          text: 'Employee Name',
          style: 'tableHead',
        },
        {
          text: 'Share Amount($)',
          style: 'tableHead',
        },
        
       
      ],

    ];
   
    let taskHistoryId = 0
    searchData.forEach((element, index) => {
      
    
      if(taskHistoryId !== element.task_history_id){
        productItems.push([
          {
            text: `${index + 1}`,
            style: 'tableBody',
            border: [false, false, false, true],
          },
          {
            text: `${element.team_title ? element.team_title : ''}`,
            border: [false, false, false, true],
            style: 'tableBody2',
          },
          {
            text: `${(element.date)? moment(element.date).format('DD-MM-YYYY'):''}`,
            border: [false, false, false, true],
            style: 'tableBody2',
          },
          {
            text: `${element.headcount ? element.headcount : ''}`,
            border: [false, false, false, true],
            style: 'tableBody2',
          },
          {
            text: `${parseFloat(element.total) ? parseFloat(element.total).toFixed(2):''}`,
            border: [false, false, false, true],
            style: 'tableBody2',
          },
          {
            text: `${element.employee_name ? element.employee_name : ''}`,
            border: [false, false, false, true],
            style: 'tableBody',
          },
          {
            text: `${parseFloat(element.SharePerHead) ? parseFloat(element.SharePerHead).toFixed(2):''}`,
            border: [false, false, false, true],
            style: 'tableBody2',
          },
          
        ]);

      }else{

        productItems.push([
          {
            text: `${index + 1}`,
            style: 'tableBody',
            border: [false, false, false, true],
          },
           {
            text: ``,
            border: [false, false, false, true],
            style: 'tableBody2',
          },
          {
            text: ``,
            border: [false, false, false, true],
            style: 'tableBody2',
          },
          {
            text: ``,
            border: [false, false, false, true],
            style: 'tableBody2',
          },
          {
            text: ``,
            border: [false, false, false, true],
            style: 'tableBody2',
          },
          {
            text: `${element.employee_name ? element.employee_name : ''}`,
            border: [false, false, false, true],
            style: 'tableBody',
          },
          {
            text: `${parseFloat(element.SharePerHead) ? parseFloat(element.SharePerHead).toFixed(2):''}`,
            border: [false, false, false, true],
            style: 'tableBody2',
          },
          
          
          
        ]);

      }
      
      taskHistoryId = element.task_history_id
      
    });
   
    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 150, 40, 80],
      footer: PdfFooter,
      content: [
        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
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
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['105%',],

            body: [
              [
                {
                  text: `Team Revenue`,
                  alignment: 'center',
                  style: 'tableHead',
                },
              ],
            ],
          },
        },
        '\n',

        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
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
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: [17, 40, 70, 20,55,130,60],

            body: productItems,
          },
          
        },
        
        
        '\n\n',
        '\n\n',
        '\n\n',
        '\n\n',
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
          alignment: 'center',
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
      <Button type="submit" className="btn btn-blue mr-2" onClick={GetPdf}>
        Team Revenue PDF
      </Button>
    </>
  );
};

export default PdfTeamRevenue;
