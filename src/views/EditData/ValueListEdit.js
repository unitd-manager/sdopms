import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../form-editor/editor.scss';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
//import ValueListButton from '../../components/ValueListTable/ValueListButton';
import ValueListEditDetails from '../../components/ValueListTable/ValueListEditDetails';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import ApiButton from '../../components/ApiButton';

const ValueListEdit = () => {
  // All state variables
  const [valuelisteditdetails, setValueListEDitDetails] = useState();
  const [valuelistname, setValueListName] = useState();

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //All Functions/Methods
  //Setting Data in ValueList Details
  const handleInputs = (e) => {
    setValueListEDitDetails({ ...valuelisteditdetails, [e.target.name]: e.target.value });
  };

  // Route Change
  // const applyChanges = () => {};
  // const saveChanges = () => {
  //   if (valuelisteditdetails.key_text !== '' && valuelisteditdetails.value !== '') {
  //     navigate('/ValueList');
  //   }
  //   window.location.reload();
  // };
  const backToList = () => {
    navigate('/ValueList');
  };

  //Api call for getting ValueList By Id
  const getValueListById = () => {
    api
      .post('/valuelist/getValueListById', { valuelist_id: id })
      .then((res) => {
        setValueListEDitDetails(res.data.data[0]);
      })
      .catch(() => {
        message('ValueList Data Not Found', 'info');
      });
  };

  //Api call for  getting ValueList
  const getValueListName = () => {
    api
      .get('/valuelist/getValueListDropdown')
      .then((res) => {
        setValueListName(res.data.data);
      })
      .catch(() => {
        message('ValueList Data Not Found', 'info');
      });
  };

  //Api call for  Editting ValueList
  const editValueListData = () => {
    if (valuelisteditdetails.key_text !== '' && valuelisteditdetails.value !== '') {
      valuelisteditdetails.modification_date = creationdatetime;
      api
        .post('/valuelist/editValueList', valuelisteditdetails)
        .then(() => {
          message('Record editted successfully', 'success');
          getValueListById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'error');
    }
  };
  const deleteValueListData = () => {
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
        api.post('/valuelist/deleteValueList', { valuelist_id: id }).then(() => {
          Swal.fire('Deleted!', 'Your Valuelist has been deleted.', 'success');
         
        });
      }
    });
  };

  // //Api call for  Deletting ValueList
  // const deleteValueListData = () => {
  //   api
  //     .post('/valuelist/deleteValueList', { valuelist_id: id })
  //     .then(() => {
  //       message('Record editted successfully', 'success');
  //     })
  //     .catch(() => {
  //       message('Unable to edit record.', 'error');
  //     });
  // };

  useEffect(() => {
    getValueListName();
    getValueListById();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>

      {/* ValueList Button Details */}
      {/* <ValueListButton
        saveChanges={saveChanges}
        applyChanges={applyChanges}
        backToList={backToList}
        editValueListData={editValueListData}
        deleteValueListData={deleteValueListData}
        navigate={navigate}
        id={id}
      ></ValueListButton> */}
        <ApiButton
              editData={editValueListData}
              navigate={navigate}
              applyChanges={editValueListData}
              backToList={backToList}
              deleteData={deleteValueListData}
              module="Vehicle"
            ></ApiButton>

      {/* ValueList Edit Details */}
      <ValueListEditDetails
        valuelisteditdetails={valuelisteditdetails}
        handleInputs={handleInputs}
        valuelistname={valuelistname}
        id={id}
      ></ValueListEditDetails>
    </>
  );
};
export default ValueListEdit;
