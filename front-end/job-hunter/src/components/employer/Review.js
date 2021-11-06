import React from "react";
import { Card } from "react-bootstrap";
const Review = ({ post }) => {
  return (
    <div>
      <Card>
        <Card.Title>{post.jobTitle}</Card.Title>
        <Card.Body>
          <span style={{ fontWeight: "bold" }}>Category:</span> {post.category}{" "}
          <br />
          <span style={{ fontWeight: "bold" }}>Location: </span>
          {post.location}
          <br />
          <span style={{ fontWeight: "bold" }}>Job type:</span> {post.jobType}
          <br />
          <span style={{ fontWeight: "bold" }}>Salary: </span>
          {post.salary}
          <br />
          <span style={{ fontWeight: "bold" }}>Details:</span> <br />
          <p>{post.jobDescription}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Review;
