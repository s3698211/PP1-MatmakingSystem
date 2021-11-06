import axios from "axios";
import { BeatLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

const LargeJobDetailModal = ({
  show,
  handleClose,
  post,
  candidates,
  loading,
}) => {
  const [showApplicant, setShowApplicant] = useState(false);
  const [data, setData] = useState({});

  const handleShowCandidateInfo = () => {
    setShowApplicant(true);
  };
  const handleCloseCandidateInfo = () => {
    setShowApplicant(false);
  };

  useEffect(() => {}, [data]);
  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontWeight: "bold",
            }}
            id="example-modal-sizes-title-lg"
          >
            {post.jobTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
              {post.category} <br />
              <br />
              <span style={{ fontWeight: "bold" }}>Location: </span>
              {post.location}
              <br />
              <span style={{ fontWeight: "bold" }}>Job type:</span>{" "}
              {post.jobType}
              <br />
              <span style={{ fontWeight: "bold" }}>Salary: </span>
              {post.salary}
              <br />
              <span style={{ fontWeight: "bold" }}>Details:</span> <br />
              <p>{post.jobDescription}</p>
            </Col>
            <Col>
              {loading ? (
                <BeatLoader color="grey" loading={loading} size={10} />
              ) : (
                <>
                  <span style={{ fontWeight: "bold" }}>Applicants list:</span>
                  <br />
                  {candidates.map((candidate) => (
                    <>
                      <Button
                        variant="light"
                        onClick={() => {
                          handleShowCandidateInfo();
                          setData({ ...candidate });
                        }}
                      >
                        {candidate.candidate.email}{" "}
                      </Button>

                      <br />
                    </>
                  ))}
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/* the data.candidates object only exist when we click the view button.
      Therefore, we have to set up a ?operator to avoid exeception. */}
      <Modal show={showApplicant} onHide={handleCloseCandidateInfo} centered>
        <Modal.Header closeButton>
          <Modal.Title>Candidate Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Full name: </h5>
          <p>
            {data.candidate?.firstname} {data.candidate?.lastname}
          </p>
          <h5>Degree:</h5>
          <p>
            {data?.degree !== null
              ? data?.degree
              : "Applicant did not provide degree."}
          </p>
          <h5>Skills:</h5>
          <p>
            {data?.skills !== null
              ? data?.skills
              : "Applicant did not provide skills."}
          </p>
          <h5>Phone number:</h5>
          <p>
            {data?.phone !== null
              ? data.candidate?.phone
              : "Applicant did not provide phone number."}
          </p>
          <Button
            style={{ marginTop: "3px" }}
            onClick={() => {
              axios({
                url: `https://match-making-jobhunter-api.herokuapp.com/api/auth/${data.candidate?.id}/image/download`, //your url
                method: "GET",
                responseType: "blob", // important
              })
                .then((response) => {
                  console.log(response.data);
                  if (response.data.size == 0) {
                    alert("User hasn't uploaded cv yet.");
                    return;
                  }
                  const url = window.URL.createObjectURL(
                    new Blob([response.data])
                  );
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", "file.pdf"); //or any other extension
                  document.body.appendChild(link);
                  link.click();
                })
                .catch(() => {
                  alert("Candidate has not upload CV yet.");
                });
            }}
          >
            Download CV
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCandidateInfo}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default LargeJobDetailModal;
