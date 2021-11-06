import axios from "axios";
import { React, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

//end websocket import
const ApplicationModal = ({ show, handleClose, postId, handleShowAlert }) => {
  const [state, setState] = useState("");

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    const payload = {
      degree: state,
    };

    createApplication(payload);
  };

  const createApplication = async (application) => {
    await axios
      .post(
        `https://match-making-jobhunter-api.herokuapp.com/api/application/post/${postId}`,
        application
      )
      .then((res) => {
        alert("successfull");
      })
      .catch((err) => {
        handleShowAlert();
        console.log(err.response.data);
      });
  };

  //end websocket
  return (
    <>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Bachelor degree:</Form.Label>
            <Form.Control value={state} onChange={handleChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ApplicationModal;
