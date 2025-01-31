import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';

const DatabaseModal = ({ show, onHide, selectedDb }) => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [formData, setFormData] = useState({
    courses: { name: '', description: '', duration: '' },
    subjects: { name: '', courseId: '', credits: '' }
  });

  // API endpoints
  const API_BASE_URL = 'http://localhost:8000/sql/';
  
  useEffect(() => {
    if (show) {
      fetchCourses();
      fetchSubjects();
    }
  }, [show]);

  // CRUD Operations for Courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const createCourse = async () => {
    try {
      await axios.post(`${API_BASE_URL}/courses`, formData.courses);
      fetchCourses();
      setFormData({ ...formData, courses: { name: '', description: '', duration: '' } });
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const updateCourse = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/courses/${id}`, formData.courses);
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // CRUD Operations for Subjects
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/subjects`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const createSubject = async () => {
    try {
      await axios.post(`${API_BASE_URL}/subjects`, formData.subjects);
      fetchSubjects();
      setFormData({ ...formData, subjects: { name: '', courseId: '', credits: '' } });
    } catch (error) {
      console.error('Error creating subject:', error);
    }
  };

  const updateSubject = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/subjects/${id}`, formData.subjects);
      fetchSubjects();
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const deleteSubject = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error('Error deleting subject:', error);
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
          <Tab eventKey="courses" title="Courses">
            {/* Courses Form */}
            <Form className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.courses.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    courses: { ...formData.courses, name: e.target.value }
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={formData.courses.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    courses: { ...formData.courses, description: e.target.value }
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Duration (months)</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.courses.duration}
                  onChange={(e) => setFormData({
                    ...formData,
                    courses: { ...formData.courses, duration: e.target.value }
                  })}
                />
              </Form.Group>
              <Button variant="primary" onClick={createCourse}>Add Course</Button>
            </Form>

            {/* Courses Table */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>{course.description}</td>
                    <td>{course.duration}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2"
                        onClick={() => updateCourse(course.id)}>Edit</Button>
                      <Button variant="danger" size="sm"
                        onClick={() => deleteCourse(course.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>

          <Tab eventKey="subjects" title="Subjects">
            {/* Subjects Form */}
            <Form className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Subject Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.subjects.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    subjects: { ...formData.subjects, name: e.target.value }
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Course ID</Form.Label>
                <Form.Select
                  value={formData.subjects.courseId}
                  onChange={(e) => setFormData({
                    ...formData,
                    subjects: { ...formData.subjects, courseId: e.target.value }
                  })}
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Credits</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.subjects.credits}
                  onChange={(e) => setFormData({
                    ...formData,
                    subjects: { ...formData.subjects, credits: e.target.value }
                  })}
                />
              </Form.Group>
              <Button variant="primary" onClick={createSubject}>Add Subject</Button>
            </Form>

            {/* Subjects Table */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Credits</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td>{subject.name}</td>
                    <td>{courses.find(c => c.id === subject.courseId)?.name}</td>
                    <td>{subject.credits}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2"
                        onClick={() => updateSubject(subject.id)}>Edit</Button>
                      <Button variant="danger" size="sm"
                        onClick={() => deleteSubject(subject.id)}>Delete</Button>
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

export default DatabaseModal;