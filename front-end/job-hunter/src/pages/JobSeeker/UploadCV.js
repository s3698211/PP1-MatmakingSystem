import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useHistory } from "react-router";

// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
const UploadCV = () => {
  const userId = useSelector((state) => state.security.user.id);
  const history = useHistory();
  const [hasFile, setHasFile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://match-making-jobhunter-api.herokuapp.com/auth/${userId}/image/download`
      )
      .then((res) => {
        setHasFile(true);
      });
  }, []);

  useEffect(() => {}, [loading]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
    const formData = new FormData();

    formData.append("file", file);
    axios
      .post(
        `https://match-making-jobhunter-api.herokuapp.com/api/auth/${userId}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        console.log("File uploaded successfully");
        setHasFile(true);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <center>
      <div
        style={{
          marginTop: "10px",
          paddingTop: "10px",
          borderStyle: "dotted",
          width: "30vw",
        }}
        {...getRootProps()}
      >
        <center>
          Upload your cv (optional)
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop some files here, or click to select files</p>
          )}
          {loading ? (
            <BeatLoader color="black" loading={loading} size={20} />
          ) : (
            ""
          )}
          <br />
          {hasFile
            ? "CV was saved. Click download button to review it"
            : "Please upload a PDF file."}
          <br />
        </center>
      </div>

      <div>
        <Button
          style={{ marginTop: "3px" }}
          onClick={() => {
            setLoading(true);
            axios({
              url: `https://match-making-jobhunter-api.herokuapp.com/api/auth/${userId}/image/download`, //your url
              method: "GET",
              responseType: "blob", // important
            }).then((response) => {
              setLoading(false);
              if (response.data) {
                const url = window.URL.createObjectURL(
                  new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "file.pdf"); //or any other extension
                document.body.appendChild(link);
                link.click();
              } else {
                alert("There is no cv");
              }
            });
          }}
        >
          Download
        </Button>
      </div>
    </center>
  );
};

export default UploadCV;
