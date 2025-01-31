import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import elasticImage from './Images/elastic.png';
import redisImage from './Images/redis.png';
import vectorImage from './Images/vector.png';
import sqlImage from './Images/sql.png';
import mongoImage from './Images/mongo.png';
import neoImage from './Images/neo.png';

const About = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <Image src={mongoImage} fluid />
        </Col>
        <Col md={6}>
          <h2>MongoDB</h2>
          <p>
            MongoDB is a NoSQL database for storing JSON-like documents. It is designed for scalability and flexibility, making it a popular choice for modern applications.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center mb-4">
        <Col md={6} className="order-md-2">
          <Image src={sqlImage} fluid />
        </Col>
        <Col md={6} className="order-md-1">
          <h2>SQL</h2>
          <p>
            SQL is a relational database for structured data. It uses structured query language (SQL) for defining and manipulating data, making it a powerful tool for data management.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <Image src={neoImage} fluid />
        </Col>
        <Col md={6}>
          <h2>Neo4j</h2>
          <p>
            Neo4j is a graph database for connected data. It is designed to handle highly interconnected data and provides powerful tools for querying and analyzing graph data.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center mb-4">
        <Col md={6} className="order-md-2">
          <Image src={redisImage} fluid />
        </Col>
        <Col md={6} className="order-md-1">
          <h2>Redis</h2>
          <p>
            Redis is an in-memory data structure store, used as a database, cache, and message broker. It is known for its high performance and support for various data structures.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <Image src={vectorImage} fluid />
        </Col>
        <Col md={6}>
          <h2>Vector</h2>
          <p>
            Vector is a high-performance, end-to-end observability data pipeline. It is designed to collect, transform, and route logs, metrics, and traces to various destinations.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center mb-4">
        <Col md={6} className="order-md-2">
          <Image src={elasticImage} fluid />
        </Col>
        <Col md={6} className="order-md-1">
          <h2>Elastic DB</h2>
          <p>
            Elastic DB is a distributed, RESTful search and analytics engine. It is designed for horizontal scalability, reliability, and real-time search capabilities.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
