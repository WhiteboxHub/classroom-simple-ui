import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';

const RedisInfo = ({ show, onHide, selectedDb }) => {
  const [cacheEntries, setCacheEntries] = useState([]);
  const [formData, setFormData] = useState({
    key: '',
    value: ''
  });
  // For simplicity, we will use the key as the unique identifier for an entry

  // API endpoint - update the base URL as needed.
  const API_BASE_URL = 'http://your-api-base-url';

  // Fetch all cache entries when the modal is shown
  useEffect(() => {
    if (show) {
      fetchCacheEntries();
    }
  }, [show]);

  // CRUD Operation: Read / Fetch Redis cache entries
  const fetchCacheEntries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/redis`);
      setCacheEntries(response.data);
    } catch (error) {
      console.error('Error fetching Redis entries:', error);
    }
  };

  // CRUD Operation: Create a new Redis cache entry
  const createCacheEntry = async () => {
    try {
      await axios.post(`${API_BASE_URL}/redis`, formData);
      fetchCacheEntries();
      setFormData({ key: '', value: '' });
    } catch (error) {
      console.error('Error creating Redis entry:', error);
    }
  };

  // CRUD Operation: Update an existing Redis cache entry
  const updateCacheEntry = async (entryKey) => {
    try {
      await axios.put(`${API_BASE_URL}/redis/${entryKey}`, formData);
      fetchCacheEntries();
      setFormData({ key: '', value: '' });
    } catch (error) {
      console.error('Error updating Redis entry:', error);
    }
  };

  // CRUD Operation: Delete a Redis cache entry
  const deleteCacheEntry = async (entryKey) => {
    try {
      await axios.delete(`${API_BASE_URL}/redis/${entryKey}`);
      fetchCacheEntries();
    } catch (error) {
      console.error('Error deleting Redis entry:', error);
    }
  };

  // Handler to populate the form for editing an existing entry.
  const handleEdit = (entry) => {
    setFormData({
      key: entry.key,
      value: entry.value
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{selectedDb} Cache Management</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form for Adding/Editing a Redis Cache Entry */}
        <Form className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Key</Form.Label>
            <Form.Control
              type="text"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              placeholder="Enter cache key"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="text"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="Enter cache value"
            />
          </Form.Group>
          <Button variant="primary" onClick={createCacheEntry} className="me-2">
            Add Cache Entry
          </Button>
          {/* If you want to support updating, use the same fields.
              Here we call updateCacheEntry using the current key as identifier. */}
          <Button
            variant="warning"
            onClick={() => updateCacheEntry(formData.key)}
            className="me-2"
          >
            Update Cache Entry
          </Button>
        </Form>

        {/* Table showing cache entries */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cacheEntries.map((entry) => (
              <tr key={entry.key}>
                <td>{entry.key}</td>
                <td>{entry.value}</td>
                <td>
                  <Button variant="secondary" size="sm" className="me-2" onClick={() => handleEdit(entry)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => deleteCacheEntry(entry.key)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RedisInfo;