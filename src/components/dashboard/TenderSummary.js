import React, { useEffect, useState } from 'react';
import CommonTable from "../CommonTable";
import api from "../../constants/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const TenderSummary = () => {

  const [projectTask, setProjectTask] = useState();

  useEffect(() => {
    api.get('/projecttask/getAllCurrentTask').then((res) => {
      console.log("projecttask",res.data.data)
      setProjectTask(res.data.data);
    });
  }, []);

  const columns = [
    {
      name: "Name",
      selector: "first_name",
      grow: 0,
      wrap: true,
    },
    {
      name: "Project",
      selector: "project_title",
      grow: 0,
      width: "auto",
      button: true,
      sortable: false,
    },
    {
      name: "Task",
      selector: "task_title",
      grow: 0,
      width: "auto",
      wrap: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: "Hrs",
      selector: "estimated_hours",
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "Total Hrs",
      selector: "",
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: "Creation ",
      selector: "",
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: "Modification",
      selector: "",
      sortable: true,
      grow: 0,
      wrap: true,
    },
  ];

  return (
    <>
      <CommonTable title="Employee Task List">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
          {projectTask &&
                projectTask.map((element) => {
                  return (
                    <tr key={element.employee_id}>
                      <td>{element.first_name}</td>
                      <td>{element.title}</td>
                      <td>{element.task_title}</td>
                      <td>{element.date}</td>
                      <td>{element.hours}</td>
                      <td>{element.description}</td>
                      <td>{element.actual_hours}</td>
                      <td>{element.creation_date}</td>
                      <td>{element.modification_date}</td>    
                    </tr>
                  );
                })}
          </tbody>
      </CommonTable>
    </>
  );
}

export default TenderSummary;