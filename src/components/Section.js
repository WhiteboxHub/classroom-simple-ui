import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import elasticImage from './Images/elastic.png';
import redisImage from './Images/redis.png';
import vectorImage from './Images/vector.png';
import sqlImage from './Images/sql.png';
import mongoImage from './Images/mongo.png';
import neoImage from './Images/neo.png';

const Section = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Carousel className="mt-5" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={mongoImage}
                alt="MongoDB"
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>MongoDB</h3>
                <p>A NoSQL database for storing JSON-like documents.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={sqlImage}
                alt="SQL"
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>SQL</h3>
                <p>A relational database for structured data.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={neoImage}
                alt="Neo4j"
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>Neo4j</h3>
                <p>A graph database for connected data.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={redisImage}
                alt="Redis"
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>Redis</h3>
                <p>An in-memory data structure store, used as a database, cache, and message broker.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={vectorImage}
                alt="Vector"
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>Vector</h3>
                <p>A high-performance, end-to-end observability data pipeline.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={elasticImage}
                alt="Elastic DB"
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>Elastic DB</h3>
                <p>A distributed, RESTful search and analytics engine.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Section;
