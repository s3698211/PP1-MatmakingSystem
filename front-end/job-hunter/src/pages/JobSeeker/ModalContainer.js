import React, { useEffect } from "react";
import JobDetailModal from "../../components/jobseeker/JobDetailModal";

const ModalContainer = ({ post, show, handleClose, handleShowAlert }) => {
  return (
    <JobDetailModal
      post={post}
      show={show}
      handleClose={handleClose}
      handleShowAlert={handleShowAlert}
    />
  );
};

export default ModalContainer;
