import React, { useEffect, useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const PotentialCandidateModal = ({
  handleClose,
  show,
  candidates,
  loading,
}) => {
  const [showApplicant, setShowApplicant] = useState(false);
  const [data, setData] = useState({});

  const handleCloseCandidateInfo = () => {
    setShowApplicant(false);
  };

  useEffect(() => {}, [data]);

  return (
    <>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Potential candidates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {candidates?.map((candidate) => (
            <Row>
              {loading ? (
                <BeatLoader color="#7DCEA0" loading={loading} size={10} />
              ) : (
                <Button
                  style={{ marginLeft: "2em", marginRight: "3px" }}
                  variant="success"
                  onClick={() => {
                    setData({ ...candidate });
                    setShowApplicant(true);
                  }}
                >
                  {candidate.email}
                </Button>
              )}
            </Row>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
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
            {data?.firstname} {data?.lastname}
          </p>

          <h5>Skills:</h5>
          <p>
            {data?.background?.skills !== null
              ? data?.background?.skills
              : "Applicant did not provide skills."}
          </p>
          <h5>Phone number:</h5>
          <p>
            {data?.phone !== null
              ? data?.phone
              : "Applicant did not provide phone number."}
          </p>
          <Button
            style={{ marginTop: "3px" }}
            onClick={() => {
              axios({
                url: `https://match-making-jobhunter-api.herokuapp.com/api/auth/${data.id}/image/download`, //your url
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
    </>
  );
};

export default PotentialCandidateModal;
