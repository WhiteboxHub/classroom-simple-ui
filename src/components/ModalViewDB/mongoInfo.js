import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';

const MongoDBInfo = ({ show, onHide, selectedDb }) => {
  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState('records');
  const [formData, setFormData] = useState({
    records: { name: '', description: '' }
  });

  // API endpoint base URL - update this to your actual API base
  const API_BASE_URL = 'http://localhost/8000';

  useEffect(() => {
    if (show) {
      fetchRecords();
    }
  }, [show]);

  // CRUD Operations for MongoDB Records
  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/student/retrieve`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching MongoDB records:', error);
    }
  };

  const createRecord = async () => {
    try {
      await axios.post(`${API_BASE_URL}/student/update/{student_id}", response_model=dict
      setFormData({ ...formData, records: { name: '', description: '' } });
    } catch (error) {
      console.error('Error creating MongoDB record:', error);
    }
  };

  const updateRecord = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/mongodbrecords/${id}`, formData.records);
      fetchRecords();
    } catch (error) {
      console.error('Error updating MongoDB record:', error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/mongodbrecords/${id}`);
      fetchRecords();
    } catch (error) {
      console.error('Error deleting MongoDB record:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{selectedDb} Database Management</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          <Tab eventKey="records" title="Records">
            {/* Records Form */}
            <Form className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.records.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      records: { ...formData.records, name: e.target.value }
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={formData.records.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      records: { ...formData.records, description: e.target.value }
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" onClick={createRecord}>
                Add Record
              </Button>
            </Form>

            {/* Records Table */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.name}</td>
                    <td>{record.description}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => updateRecord(record.id)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => deleteRecord(record.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MongoDBInfo;