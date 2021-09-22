import React from "react";
import { Card } from "react-bootstrap";
const Review = ({ post }) => {
  return (
    <div>
      <Card>
        <Card.Title>{post.jobTitle}</Card.Title>
        <Card.Body>
          <bold>Category:</bold> {post.category} <br />
          <br />
          <bold>Contact:</bold> {post.employerUsername} <br />
          <br />
          <bold>Location: </bold>
          {post.location}
          <br />
          <bold>Job type:</bold> {post.jobType}
          <br />
          <bold>Salary: </bold>
          {post.salary}
          <br />
          <bold>Details:</bold> <br />
          <p>{post.jobDescription}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Review;
