import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
  Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';
import api from '../../../constants/api';


moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const CalendarApp = ({
  id,
}) => {
  CalendarApp.propTypes = {
    
    id: PropTypes.any,
  };

  const [employees, setEmployees] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [slot, setSlot] = useState();
  const [color, setColor] = useState('default');
  const [update, setUpdate] = useState();

  const ColorVariation = [
    {
      id: 1,
      eColor: '#1a97f5',
      value: 'primary',
    },
    {
      id: 2,
      eColor: '#00ab55',
      value: 'success',
    },
    {
      id: 3,
      eColor: '#fc4b6c',
      value: 'danger',
    },
    {
      id: 4,
      eColor: '#1e4db7',
      value: 'info',
    },
    {
      id: 5,
      eColor: '#fdd43f',
      value: 'warning',
    },
  ];

  const addNewEventAlert = (slotInfo) => {
    setOpen(true);
    setSlot(slotInfo);
  };

  const editEvent = (event) => {
    setOpen(true);
    const newEditEvent = eventData.find((elem) => elem.title === event.title);
    setColor(event.color);
    setTitle(newEditEvent.title);
    setColor(newEditEvent.color);
    setUpdate(event);
  };

  const updateEvent = (e) => {
    e.preventDefault();

    setEventData(
      eventData.map((elem) => {
        if (elem.title === update.title) {
          return { ...elem, title, color };
        }
        return elem;
      }),
    );
    setOpen(false);
    setTitle('');
    setColor('');
    setUpdate(null);
  };

  const inputChangeHandler = (e) => setTitle(e.target.value);

  const selectinputChangeHandler = (Calendarid) => setColor(Calendarid);

  const submitHandler = (e) => {
    e.preventDefault();

    const newEvents = eventData;
    newEvents.push({
      title,
      start: slot.start,
      end: slot.end,
      color,
    });
    setOpen(false);
    e.target.reset();

    setEventData(newEvents);
    setTitle('');
  };

  const deleteHandler = (event) => {
    const updatedEvents = eventData.filter((ind) => ind.title !== event.title);
    setEventData(updatedEvents);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setUpdate(null);
  };

  const eventColors = (event) => {
    if (event.color) {
      return { className: `event-${event.color}` };
    }
    return { className: 'event-default' };
  };

  const getJobs = () => {
    api.post('projecttask/getEmployeeByID',{ project_id : id})
    .then((res) => {
      setEmployees(res.data.data);
      })
      .catch(() => {});
  };

  const CalendarId = (employeeId) => {
    api
      .post('/calendar/getCalendar',{ project_id: id , employee_id: employeeId  })
      .then((response) => {
        console.log('API Response:', response.data);
        const { data } = response.data;
        const newEventData = data.map((item) => ({
          title: item.task_title, // Assuming the title is available in the API response
          start: new Date(item.start_date), // Convert the from_date to a Date object
          end: new Date(item.end_date), // Convert the to_date to a Date object
          color: 'primary', // Set a default color for the events, you can modify this based on your use case
        }));
        console.log('New Event Data:', newEventData);
        setEventData(newEventData);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }
  useEffect(() => {
    getJobs();     
   }, [id]);
   useEffect(() => {
    if (employees.project_id) {
      // Use taskdetails.project_id directly to get the selected project ID
      const selectedTask = employees.project_id;
      CalendarId(selectedTask);
    }
  }, [employees.project_id]);

  
  return (
    <>
<Col md="4">
<FormGroup>
              <Label for="employeeSelect">Select Employee</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  CalendarId(selectedId);
                }}
              >
                <option value="">Select Employee</option>
                {employees &&
                  employees.map((element) => (
                    <option key={element.project_id} value={element.employee_id}>
                      {element.first_name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            </Col>
      <Card>
        <CardBody>
        <Calendar
  selectable
  events={eventData}
  defaultView="month"
  scrollToTime={new Date(1970, 1, 1, 6)}
  defaultDate={new Date()}
  localizer={localizer}
  style={{ height: 'calc(100vh - 350px)' }} // Adjust the height value
  onSelectEvent={(event) => editEvent(event)}
  onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
  eventPropGetter={(event) => eventColors(event)}
/>
          <Modal isOpen={open}>
            <ModalHeader toggle={handleClose}>{update ? 'Update Event' : 'Add Event'}</ModalHeader>
            <Form onSubmit={update ? updateEvent : submitHandler}>
              <ModalBody>
                <h6>Event Title</h6>
                <Input
                  id="Event Title"
                  placeholder="Enter Event Title"
                  value={title}
                  onChange={inputChangeHandler}
                />
                <br />
                <h6>Select Event Color</h6>
                <div className="button-group">
                  {ColorVariation.map((colorbg) => (
                    <Button
                      color={colorbg.value}
                      key={colorbg.eColor}
                      size="sm"
                      onClick={() => selectinputChangeHandler(colorbg.value)}
                    >
                      {colorbg.value === color ? (
                        <i className="bi bi-check" />
                      ) : (
                        <i className="bi bi-circle" />
                      )}
                    </Button>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                {update ? (
                  <Button
                    type="submit"
                    color="danger"
                    outline
                    onClick={() => deleteHandler(update)}
                  >
                    Delete
                  </Button>
                ) : (
                  ''
                )}
                <Button type="submit" color="success" disabled={!title}>
                  {update ? 'Update' : 'Add'}
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </CardBody>
      </Card>
    </>
  );
};

export default CalendarApp;
