import React, { useState  } from 'react';
import { FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { FileUploader } from 'react-drag-drop-files';
import api from '../../constants/api';
import message from '../Message';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';

const AttachmentModalV2 = ({
  attachmentModal,
  setAttachmentModal,
  moduleId,
  roomName,
  fileTypes,
  altTagData,
  desc,
  updateFile,
    setUpdateFile
}) => {
  AttachmentModalV2.propTypes = {
    attachmentModal: PropTypes.bool,
    setAttachmentModal: PropTypes.func,
    moduleId: PropTypes.string,
    roomName: PropTypes.string,
    altTagData: PropTypes.string,
    desc: PropTypes.string,
    fileTypes: PropTypes.any,
    updateFile:PropTypes.bool,
    setUpdateFile:PropTypes.func
  };

  const [file, setFile] = useState([]);
  const [handleValue, setHandleValue] = useState();
  const [uploaded, setUploaded] = useState(null);

  const [getFile, setGetFile] = useState(null);

  const getFiles = () => {
    api
      .post('/file/getListOfFiles', { record_id: moduleId, room_name: roomName })
      .then((res) => {
        setGetFile(res.data);
        // setTimeout(getFiles, 100);
      })
      .catch(() => {
        message('Unable to fetch files', 'info');
      });
  };

  const handleChange = (fiels) => {
    const arrayOfObj = Object.entries(fiels).map((e) => e[1]);

    setFile(fiels);
    setHandleValue(arrayOfObj);
    console.log(fiels);
  };

  const uploadFile = () => {
    if (file && Object.keys(file).length !== 0) {
      const data = new FormData();
      const arrayOfObj = Object.entries(file).map((e) => e[1]);
      arrayOfObj.forEach((ele) => {
        data.append(`files`, ele);
      });
      data.append('record_id', moduleId);
      data.append('room_name', roomName);
      data.append('alt_tag_data', altTagData);
      data.append('description', desc);

      api
        .post('/file/uploadFiles', data, {
          onUploadProgress: (filedata) => {
            console.log(Math.round((filedata.loaded / filedata.total) * 100));
            setUploaded(Math.round((filedata.loaded / filedata.total) * 100));
          },
        })
        .then(() => {
          message('Files Uploaded Successfully', 'success');
          setUpdateFile(!updateFile);
          setTimeout(() => {
            setAttachmentModal(false);
            getFiles()
          }, 100);
          
        })
        .catch(() => {
          message('Unable to upload File', 'error');
        });
    } else {
      message('No files selected', 'info');
    }
  };


  
  return (
    <div>
      <Modal isOpen={attachmentModal}>
        <ModalHeader>Upload Media</ModalHeader>
        <ModalBody>
          <FormGroup>
          
            <FileUploader multiple handleChange={handleChange} name="file" types={fileTypes} />
            {handleValue ? (
              handleValue.map((e) => (
                <div>
                  <span> Name: {e.name} </span>
                </div>
              ))
            ) : (
              <span>No file selected</span>
            )}
          </FormGroup>
          {uploaded && (
            <div className="progress mt-2">
              <div
                className="progress-bar h-4"
                role="progressbar"
                aria-valuenow={uploaded}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${uploaded}%` }}
              >
                {`${uploaded}% uploaded`}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              uploadFile();
            }}
          >
            Upload
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAttachmentModal(false);
            }}
          >
            Cancel
          </Button>
        
        </ModalFooter>
      </Modal>
      <ViewFileComponentV2
      getFile={getFile} 
      getFiles={getFiles} />
    </div>
  );
};

export default AttachmentModalV2;
