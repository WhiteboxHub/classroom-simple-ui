import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';

const ElasticInfo = ({ show, onHide, selectedDb }) => {
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('documents');
  const [formData, setFormData] = useState({
    documents: { title: '', content: '' }
  });

  // API endpoints(no apis created in backend                                                                                                                                                                                                                                                                                                       a)
  const API_BASE_URL = 'http://example.api';

  useEffect(() => {
    if (show) {
      fetchDocuments();
    }
  }, [show]);

  // CRUD Operations for Documents
  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const createDocument = async () => {
    try {
      await axios.post(`${API_BASE_URL}/documents`, formData.documents);
      fetchDocuments();
      setFormData({ ...formData, documents: { title: '', content: '' } });
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const updateDocument = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/documents/${id}`, formData.documents);
      fetchDocuments();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/documents/${id}`);
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{selectedDb} Database Management</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="documents" title="Documents">
            {/* Documents Form */}
            <Form className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.documents.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    documents: { ...formData.documents, title: e.target.value }
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  value={formData.documents.content}
                  onChange={(e) => setFormData({
                    ...formData,
                    documents: { ...formData.documents, content: e.target.value }
                  })}
                />
              </Form.Group>
              <Button variant="primary" onClick={createDocument}>Add Document</Button>
            </Form>

            {/* Documents Table */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document) => (
                  <tr key={document.id}>
                    <td>{document.title}</td>
                    <td>{document.content}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2"
                        onClick={() => updateDocument(document.id)}>Edit</Button>
                      <Button variant="danger" size="sm"
                        onClick={() => deleteDocument(document.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ElasticInfo;
