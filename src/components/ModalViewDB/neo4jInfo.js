
const Neo4jInfo = ({ show, onHide, selectedDb }) => {
  const [nodes, setNodes] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [activeTab, setActiveTab] = useState('nodes');
  const [formData, setFormData] = useState({
    nodes: { label: '', properties: '' },
    relationships: { type: '', startNodeId: '', endNodeId: '', properties: '' }
  });

  // API endpoint
  const API_BASE_URL = 'http://';

  useEffect(() => {
    if (show) {
      fetchNodes();
      fetchRelationships();
    }
  }, [show]);

  // CRUD Operations for Nodes
  const fetchNodes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/nodes`);
      setNodes(response.data);
    } catch (error) {
      console.error('Error fetching nodes:', error);
    }
  };

  const createNode = async () => {
    try {
      await axios.post(`${API_BASE_URL}/nodes`, formData.nodes);
      fetchNodes();
      setFormData({ ...formData, nodes: { label: '', properties: '' } });
    } catch (error) {
      console.error('Error creating node:', error);
    }
  };

  const updateNode = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/nodes/${id}`, formData.nodes);
      fetchNodes();
    } catch (error) {
      console.error('Error updating node:', error);
    }
  };

  const deleteNode = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/nodes/${id}`);
      fetchNodes();
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  // CRUD Operations for Relationships
  const fetchRelationships = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/relationships`);
      setRelationships(response.data);
    } catch (error) {
      console.error('Error fetching relationships:', error);
    }
  };

  const createRelationship = async () => {
    try {
      await axios.post(`${API_BASE_URL}/relationships`, formData.relationships);
      fetchRelationships();
      setFormData({ 
        ...formData, 
        relationships: { type: '', startNodeId: '', endNodeId: '', properties: '' } 
      });
    } catch (error) {
      console.error('Error creating relationship:', error);
    }
  };

  const updateRelationship = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/relationships/${id}`, formData.relationships);
      fetchRelationships();
    } catch (error) {
      console.error('Error updating relationship:', error);
    }
  };

  const deleteRelationship = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/relationships/${id}`);
      fetchRelationships();
    } catch (error) {
      console.error('Error deleting relationship:', error);
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
          <Tab eventKey="nodes" title="Nodes">
            {/* Nodes Form */}
            <Form className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Label</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.nodes.label}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nodes: { ...formData.nodes, label: e.target.value }
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Properties (JSON format)</Form.Label>
                <Form.Control
                  as="textarea"
                  value={formData.nodes.properties}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nodes: { ...formData.nodes, properties: e.target.value }
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" onClick={createNode}>Add Node</Button>
            </Form>

            {/* Nodes Table */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Properties</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((node) => (
                  <tr key={node.id}>
                    <td>{node.label}</td>
                    <td>{node.properties}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2"
                        onClick={() => updateNode(node.id)}>Edit</Button>
                      <Button variant="danger" size="sm"
                        onClick={() => deleteNode(node.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>

          <Tab eventKey="relationships" title="Relationships">
            {/* Relationships Form */}
            <Form className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.relationships.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relationships: { ...formData.relationships, type: e.target.value }
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Start Node ID</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.relationships.startNodeId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relationships: { ...formData.relationships, startNodeId: e.target.value }
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Node ID</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.relationships.endNodeId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relationships: { ...formData.relationships, endNodeId: e.target.value }
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Properties (JSON format)</Form.Label>
                <Form.Control
                  as="textarea"
                  value={formData.relationships.properties}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relationships: { ...formData.relationships, properties: e.target.value }
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" onClick={createRelationship}>Add Relationship</Button>
            </Form>

            {/* Relationships Table */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Start Node</th>
                  <th>End Node</th>
                  <th>Properties</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {relationships.map((rel) => (
                  <tr key={rel.id}>
                    <td>{rel.type}</td>
                    <td>{rel.startNodeId}</td>
                    <td>{rel.endNodeId}</td>
                    <td>{rel.properties}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2"
                        onClick={() => updateRelationship(rel.id)}>Edit</Button>
                      <Button variant="danger" size="sm"
                        onClick={() => deleteRelationship(rel.id)}>Delete</Button>
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

export default Neo4jInfo;
