import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Row, Col } from "react-bootstrap";
const ModalFilterSeeker = ({ show, handleClose }) => {
  const [data, setData] = useState({});
  const [seekerList, setSeekerList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showApplicant, setShowApplicant] = useState(false);

  useEffect(() => {
    getAllSeekers();
  }, []);

  useEffect(() => {}, [...seekerList]);

  useEffect(() => {}, [filter]);

  const getAllSeekers = async () => {
    await axios
      .get("https://match-making-jobhunter-api.herokuapp.com/api/auth/seekers/")
      .then((res) => {
        setSeekerList(res.data);
      })
      .catch((err) => alert(err.response.data));
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
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
          <Modal.Title>
            <Row>
              <Col>
                <Button
                  style={{ width: "100%" }}
                  value="All"
                  onClick={handleChange}
                >
                  All
                </Button>
              </Col>
              <Col>
                <Button
                  value="Information & Technology"
                  variant="danger"
                  style={{ width: "100%" }}
                  onClick={handleChange}
                >
                  IT
                </Button>
              </Col>
              <Col>
                <Button
                  value="Business"
                  variant="warning"
                  style={{ width: "100%" }}
                  onClick={handleChange}
                >
                  Business
                </Button>
              </Col>
              <Col>
                <Button
                  value="Education"
                  variant="success"
                  style={{ width: "100%" }}
                  onClick={handleChange}
                >
                  Education
                </Button>
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {filter !== "All"
              ? seekerList
                  .filter((seeker) => seeker.background?.category === filter)
                  .map((seeker, key) => (
                    <Button
                      key={key}
                      style={{
                        marginLeft: "2em",
                        marginTop: "3px",
                        fontSize: "small",
                      }}
                      variant="light"
                      onClick={() => {
                        setData({ ...seeker });
                        setShowApplicant(true);
                        //   setShowApplicant(true);
                      }}
                    >
                      {seeker.username}
                    </Button>
                  ))
              : seekerList.map((seeker, key) => (
                  <Button
                    key={key}
                    style={{
                      marginLeft: "2em",
                      marginTop: "3px",
                      fontSize: "small",
                    }}
                    variant="light"
                    onClick={() => {
                      setData({ ...seeker });
                      setShowApplicant(true);
                      //   setShowApplicant(true);
                    }}
                  >
                    {seeker.username}
                  </Button>
                ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* the data.candidates object only exist when we click the view button.
      Therefore, we have to set up a ?operator to avoid exeception. */}
      <Modal
        show={showApplicant}
        onHide={() => setShowApplicant(false)}
        centered
      >
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
                    alert("Candidate has not uploaded CV yet.");
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
          <Button
            variant="secondary"
            onClick={() => {
              setShowApplicant(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFilterSeeker;
