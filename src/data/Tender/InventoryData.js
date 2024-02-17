import React from 'react';

export const columns = [
    {
      id:1,
      name: "#",
      selector: "id",
      sortable: true,
      grow: 0,
      width: 'auto',
    },
    {
      id:2,
      name: "",
      selector: "edit",
      sortable: true,
      grow: 0,
      width: 'auto',
      wrap: true
    },
   
    {
      id:3,
      name: "Inventory Code",
      selector: "code",
      sortable: true
    },
    {
      id:4,
      name: "Name",
      selector: "code",
      sortable: true
    },
    {
      id:5,
      name: "Product Type",
      selector: "project",
      sortable: true,
      cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      id:6,
      name: "Item Code",
      selector: "ref",
      sortable: true
    },
    {
      id:7,
      name: "UOM",
      selector: "ref",
      sortable: true
    },
    {
      id:8,
      name: "Store Stock",
      selector: "ref",
      sortable: true
    },
    {
      id:9,
      name: "Adjust Stock",
      selector: "ref",
      sortable: true
    },
    {
      id:10,
      name: "Ship Stock",
      selector: "ship_stock",
      sortable: true
    },
    {
      id:11,
      name: "Yard",
      selector: "yard_stock",
      sortable: true
    },
    {
      id:12,
      name: "yard",
      selector: "yard_stock",
      sortable: true
    },
    {
      id:14,
      name: "Adjust Stock",
      selector: "ref",
      sortable: true
    },
    {
      id:15,
      name: "",
      selector: "ref",
      sortable: true
    },
  ];

  export const pocolumns = [
    {
      name: "PO Code",
     
    },
   
    {
      name: "Date",
      
    },
    {
      name: "Project Title",
      
    },
    {
      name: "Client Name",
     
    },
    {
        name: "Amount",
        
      },
      {
        name: "Qty",
       
      },
      {
        name: "Supplier",
        
      }
  ]

 export const plcolumns = [
        
       
    {
      name: "Date",
      
    },
    
    {
      name: "Project Title",
      
    },
    {
      name: "Client Name",
     
    },
    {
        name: "Numbers",
      }
    ]

    
 export const stcolumns = [
        
       
  {
    name: "Date",
    
  },
  
  {
    name: "Project Title",
    
  },
  {
    name: "Stock Move",
   
  },
  {
      name: "Quantity",
    }
  ]