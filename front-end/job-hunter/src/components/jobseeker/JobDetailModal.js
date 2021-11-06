import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ApplicationModal from "./ApplicationModal";
const JobDetailModal = ({ post, handleClose, show, handleShowAlert }) => {
  const [showApplication, setShowApplication] = useState(false);

  const handleCloseApplication = () => setShowApplication(false);

  const handleShowApplication = () => {
    handleClose();
    console.log("PostAppliedId", post.id);
    setShowApplication(true);
  };

  return (
    <React.Fragment>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title> {post?.jobTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Description:</h5>
          <p>
            {post?.jobDescription !== null
              ? post?.jobDescription
              : "This is job detail"}
          </p>
          <h5>Skills requirement:</h5>
          <p>{post?.skills !== null ? post?.skills : "This is job skills"}</p>
          <h5>Working-type:</h5>
          <p>{post?.jobType !== null ? post?.jobType : "This is job type"}</p>
          <h5>Salary:</h5>
          <p>{post?.salary !== null ? post?.salary : "This is job salary"}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShowApplication}>
            Applied
          </Button>
        </Modal.Footer>
      </Modal>
      <ApplicationModal
        show={showApplication}
        handleClose={handleCloseApplication}
        postId={post?.id}
        handleShowAlert={handleShowAlert}
      />
    </React.Fragment>
  );
};
export default JobDetailModal;
