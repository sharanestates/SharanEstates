import React, { useState, useEffect, useRef } from 'react';
import AdminLogin from './AdminLogin';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' or 'inquiries'
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form states for Property modal/form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState('create'); // 'create' or 'edit'
  const [editingId, setEditingId] = useState(null);
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
    beds: 0,
    baths: 0,
    size: '',
    category: 'villas',
    type: 'buy',
    location: 'Prime District',
    status: 'Available',
    floors: []
  });

  // State for dragging status & reference to file input
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // States for dynamic levels and flats manager
  const [newLevel, setNewLevel] = useState({ id: '', name: '' });
  const [flatForms, setFlatForms] = useState({}); // Stores inputs for adding flats index by Level ID

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  // Sanitizes levels/floors configuration to guarantee it is always a parsed Array
  const sanitizeFloorsArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
        return [];
      } catch (e) {
        console.warn("Failed to parse floors:", e);
        return [];
      }
    }
    return [];
  };

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchData(token);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const getHeaders = (token) => {
    const activeToken = token || localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeToken}`
    };
  };

  const fetchData = async (token) => {
    setLoading(true);
    setError('');
    try {
      // Fetch Properties
      const propsRes = await fetch(`${API_BASE}/properties`);
      if (!propsRes.ok) throw new Error('Failed to fetch properties');
      const propsData = await propsRes.json();
      setProperties(propsData);

      // Fetch Inquiries
      const inqRes = await fetch(`${API_BASE}/inquiries`, {
        headers: getHeaders(token)
      });
      if (!inqRes.ok) {
        if (inqRes.status === 401 || inqRes.status === 403) {
          handleLogout();
          throw new Error('Session expired. Please log in again.');
        }
        throw new Error('Failed to fetch inquiries');
      }
      const inqData = await inqRes.json();
      setInquiries(inqData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Property Actions
  const handleOpenCreateForm = () => {
    setPropertyForm({
      title: '',
      price: '',
      image: '',
      description: '',
      beds: 0,
      baths: 0,
      size: '',
      category: 'villas',
      type: 'buy',
      location: 'Prime District',
      status: 'Available',
      floors: []
    });
    setFlatForms({});
    setNewLevel({ id: '', name: '' });
    setFormType('create');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (prop) => {
    setPropertyForm({
      title: prop.title,
      price: prop.price,
      image: prop.image,
      description: prop.description || '',
      beds: prop.beds || 0,
      baths: prop.baths || 0,
      size: prop.size || '',
      category: prop.category,
      type: prop.type,
      location: prop.location || 'Prime District',
      status: prop.status || 'Available',
      floors: sanitizeFloorsArray(prop.floors)
    });
    setFlatForms({});
    setNewLevel({ id: '', name: '' });
    setEditingId(prop.id);
    setFormType('edit');
    setIsFormOpen(true);
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = formType === 'create' 
        ? `${API_BASE}/properties` 
        : `${API_BASE}/properties/${editingId}`;
      const method = formType === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method: method,
        headers: getHeaders(),
        body: JSON.stringify(propertyForm)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save property');

      showSuccess(`Property "${data.title}" saved successfully.`);
      setIsFormOpen(false);
      fetchData(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePropertyDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    setError('');
    try {
      const res = await fetch(`${API_BASE}/properties/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete property');
      }
      showSuccess(`Property "${title}" deleted.`);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  // Process files from either click or drop
  const handleFileProcessing = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (jpg, png, webp, etc.)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPropertyForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Image upload triggers
  const handleImageUpload = (e) => {
    handleFileProcessing(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcessing(e.dataTransfer.files[0]);
    }
  };

  // Floors & Building Structure Manager
  const handleAddLevel = (e) => {
    if (e) e.preventDefault();
    if (!newLevel.id || !newLevel.name) {
      alert("Please fill in Level ID and Level Name.");
      return;
    }

    const lvlId = parseInt(newLevel.id);
    const currentFloors = sanitizeFloorsArray(propertyForm.floors);

    if (currentFloors.some(lvl => lvl.id === lvlId)) {
      alert("A level with this numeric ID already exists.");
      return;
    }

    const newLvlObj = {
      id: lvlId,
      name: newLevel.name,
      flats: []
    };

    // Sort levels descending (highest ID at the top)
    const updatedFloors = [...currentFloors, newLvlObj].sort((a, b) => b.id - a.id);

    setPropertyForm({
      ...propertyForm,
      floors: updatedFloors
    });

    setNewLevel({ id: '', name: '' });
  };

  const handleRemoveLevel = (levelId, e) => {
    if (e) e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this level and all its flats?")) return;
    const currentFloors = sanitizeFloorsArray(propertyForm.floors);
    const updatedFloors = currentFloors.filter(lvl => lvl.id !== levelId);
    setPropertyForm({
      ...propertyForm,
      floors: updatedFloors
    });
  };

  const updateFlatForm = (levelId, field, value) => {
    setFlatForms(prev => ({
      ...prev,
      [levelId]: {
        ...prev[levelId],
        [field]: value
      }
    }));
  };

  const handleAddFlat = (levelId, e) => {
    if (e) e.preventDefault();
    const form = flatForms[levelId];
    if (!form || !form.name || !form.price) {
      alert("Please fill in at least Flat Name and Price.");
      return;
    }

    const newFlatObj = {
      name: form.name,
      price: form.price,
      size: form.size || 'N/A',
      beds: parseInt(form.beds) || 0,
      baths: parseInt(form.baths) || 0,
      status: form.status || 'Available'
    };

    const currentFloors = sanitizeFloorsArray(propertyForm.floors);
    const updatedFloors = currentFloors.map(lvl => {
      if (lvl.id === levelId) {
        return {
          ...lvl,
          flats: [...(lvl.flats || []), newFlatObj]
        };
      }
      return lvl;
    });

    setPropertyForm({
      ...propertyForm,
      floors: updatedFloors
    });

    // Reset flat form input for this level
    setFlatForms(prev => ({
      ...prev,
      [levelId]: {
        name: '',
        price: '',
        size: '',
        beds: '',
        baths: '',
        status: 'Available'
      }
    }));
  };

  const handleRemoveFlat = (levelId, flatIndex, e) => {
    if (e) e.preventDefault();
    const currentFloors = sanitizeFloorsArray(propertyForm.floors);
    const updatedFloors = currentFloors.map(lvl => {
      if (lvl.id === levelId) {
        return {
          ...lvl,
          flats: (lvl.flats || []).filter((_, idx) => idx !== flatIndex)
        };
      }
      return lvl;
    });
    setPropertyForm({
      ...propertyForm,
      floors: updatedFloors
    });
  };

  // Pre-populate standard structure to save manual typing
  const handlePrepopulateFloors = (e) => {
    if (e) e.preventDefault();
    const defaultStructure = [
      { id: 3, name: 'Level 3', flats: [] },
      { id: 2, name: 'Level 2', flats: [] },
      { id: 1, name: 'Level 1', flats: [] }
    ];
    setPropertyForm({
      ...propertyForm,
      floors: defaultStructure
    });
  };

  // Inquiry Actions
  const handleInquiryStatusChange = async (id, newStatus) => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update status');
      }
      showSuccess(`Inquiry status updated to ${newStatus}.`);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInquiryDelete = async (id, clientName) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from "${clientName}"?`)) return;
    setError('');
    try {
      const res = await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete inquiry');
      }
      showSuccess(`Inquiry from "${clientName}" deleted.`);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={checkAuth} />;
  }

  // Count stats
  const totalProperties = properties.length;
  const totalInquiries = inquiries.length;
  const activeProperties = properties.filter(p => p.status === 'Available').length;
  
  const propertyInquiries = inquiries.filter(i => i.property_type !== 'consultancy');
  const consultationInquiries = inquiries.filter(i => i.property_type === 'consultancy');

  const pendingInquiriesCount = propertyInquiries.filter(i => i.status === 'Pending' || i.status === 'New').length;
  const pendingConsultationsCount = consultationInquiries.filter(i => i.status === 'Pending' || i.status === 'New').length;

  const totalPendingInquiries = pendingInquiriesCount + pendingConsultationsCount;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)' }}>Admin Console</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your luxury property listings and respond to client inquiries.</p>
          </div>
          <button onClick={handleLogout} className="btn-solid" style={{ background: '#737373' }}>
            LOGOUT
          </button>
        </div>

        {/* Alert Messages */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>Error:</strong> {error}</span>
            <button onClick={() => setError('')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444', fontWeight: 'bold' }}>&times;</button>
          </div>
        )}
        {successMsg && (
          <div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', color: '#15803d', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>✓ {successMsg}</span>
            <button onClick={() => setSuccessMsg('')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#15803d', fontWeight: 'bold' }}>&times;</button>
          </div>
        )}

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Total Properties</span>
            <strong style={{ fontSize: '2.2rem', marginTop: '0.5rem', color: 'var(--text-dark)' }}>{totalProperties}</strong>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Active Listings</span>
            <strong style={{ fontSize: '2.2rem', marginTop: '0.5rem', color: 'var(--primary-dark)' }}>{activeProperties}</strong>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Total Inquiries</span>
            <strong style={{ fontSize: '2.2rem', marginTop: '0.5rem', color: 'var(--text-dark)' }}>{totalInquiries}</strong>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Pending Follow-ups</span>
            <strong style={{ fontSize: '2.2rem', marginTop: '0.5rem', color: '#B59B6A' }}>{totalPendingInquiries}</strong>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tab-container" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <span 
            className={`tab ${activeTab === 'listings' ? 'active' : ''}`} 
            onClick={() => setActiveTab('listings')}
            style={{ fontSize: '1rem', paddingBottom: '0.8rem', marginRight: '2rem' }}
          >
            Manage Listings
          </span>
          <span 
            className={`tab ${activeTab === 'inquiries' ? 'active' : ''}`} 
            onClick={() => setActiveTab('inquiries')}
            style={{ fontSize: '1rem', paddingBottom: '0.8rem' }}
          >
            Client Inquiries ({totalPendingInquiries})
          </span>
        </div>

        {/* Content Panels */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>Retrieving data from Render Database...</p>
          </div>
        ) : (
          <div>
            {activeTab === 'listings' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>Property Inventory</h3>
                  <button onClick={handleOpenCreateForm} className="btn-solid">
                    + ADD PROPERTY
                  </button>
                </div>

                <div className="glass-panel" style={{ overflowX: 'auto', padding: '1rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '1rem' }}>Property</th>
                        <th style={{ padding: '1rem' }}>Category</th>
                        <th style={{ padding: '1rem' }}>Type</th>
                        <th style={{ padding: '1rem' }}>Location</th>
                        <th style={{ padding: '1rem' }}>Price</th>
                        <th style={{ padding: '1rem' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No properties found. Add your first property!</td>
                        </tr>
                      ) : (
                        properties.map((prop) => {
                          const floorsArray = sanitizeFloorsArray(prop.floors);
                          let totalFlats = 0;
                          floorsArray.forEach(lvl => {
                            if (lvl.flats && Array.isArray(lvl.flats)) {
                              totalFlats += lvl.flats.length;
                            }
                          });

                          return (
                            <tr key={prop.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem' }}>
                              <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={prop.image} alt={prop.title} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} onError={(e) => { e.target.src = '/listing_villa.png' }} />
                                <div>
                                  <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{prop.title}</div>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    🛏️ {prop.beds} Beds | 🚿 {prop.baths} Baths{prop.size ? ` | 📏 ${prop.size}` : ''} | 🏢 {totalFlats} Total Flats
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{prop.category}</td>
                              <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{prop.type}</td>
                              <td style={{ padding: '1rem' }}>{prop.location}</td>
                              <td style={{ padding: '1rem', fontWeight: 600 }}>{prop.price}</td>
                              <td style={{ padding: '1rem' }}>
                                <span style={{
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '20px',
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  background: prop.status === 'Available' ? '#d1fae5' : prop.status === 'Sold' ? '#f3f4f6' : '#fef3c7',
                                  color: prop.status === 'Available' ? '#065f46' : prop.status === 'Sold' ? '#374151' : '#92400e'
                                }}>
                                  {prop.status}
                                </span>
                              </td>
                              <td style={{ padding: '1rem', textAlign: 'right' }}>
                                <button 
                                  onClick={() => handleOpenEditForm(prop)} 
                                  style={{ marginRight: '0.5rem', background: 'transparent', border: '1px solid var(--primary-color)', color: 'var(--primary-dark)', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handlePropertyDelete(prop.id, prop.title)} 
                                  style={{ background: 'transparent', border: '1px solid #fca5a5', color: '#ef4444', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div>
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>Property Inquiries ({propertyInquiries.length})</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Inquiries from clients interested in specific property types.</p>
                
                <div className="glass-panel" style={{ overflowX: 'auto', padding: '1rem', marginBottom: '3rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '1rem' }}>Client</th>
                        <th style={{ padding: '1rem' }}>Contact Info</th>
                        <th style={{ padding: '1rem' }}>Interest Type</th>
                        <th style={{ padding: '1rem' }}>Date Received</th>
                        <th style={{ padding: '1rem' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {propertyInquiries.length === 0 ? (
                        <tr>
                          <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No property inquiries found.</td>
                        </tr>
                      ) : (
                        propertyInquiries.map((inq) => (
                          <tr key={inq.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem' }}>
                            <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-dark)' }}>{inq.name}</td>
                            <td style={{ padding: '1rem' }}>
                              <div>✉ {inq.email}</div>
                              {inq.phone && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>☎ {inq.phone}</div>}
                            </td>
                            <td style={{ padding: '1rem', textTransform: 'capitalize' }}>
                              {inq.property_type === 'villa' ? 'Luxury Villas' : 
                               inq.property_type === 'apartment' ? 'Apartments' : 
                               inq.property_type === 'offplan' ? 'Off-Plan' : 
                               inq.property_type === 'commercial' ? 'Commercial' : inq.property_type}
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                              {new Date(inq.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <select 
                                value={inq.status} 
                                onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                                style={{
                                  padding: '0.3rem 0.6rem',
                                  borderRadius: '6px',
                                  border: '1px solid var(--border-color)',
                                  fontSize: '0.85rem',
                                  background: (inq.status === 'Pending' || inq.status === 'New') ? '#fef3c7' : inq.status === 'Contacted' ? '#dbeafe' : '#d1fae5',
                                  color: (inq.status === 'Pending' || inq.status === 'New') ? '#92400e' : inq.status === 'Contacted' ? '#1e40af' : '#065f46',
                                  fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <button 
                                onClick={() => handleInquiryDelete(inq.id, inq.name)} 
                                style={{ background: 'transparent', border: '1px solid #fca5a5', color: '#ef4444', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>Consultation Requests ({consultationInquiries.length})</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Private advisor booking requests from the portfolio consultation form.</p>
                
                <div className="glass-panel" style={{ overflowX: 'auto', padding: '1rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '1rem' }}>Client</th>
                        <th style={{ padding: '1rem' }}>Contact Info</th>
                        <th style={{ padding: '1rem' }}>Requested Details</th>
                        <th style={{ padding: '1rem' }}>Date Received</th>
                        <th style={{ padding: '1rem' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultationInquiries.length === 0 ? (
                        <tr>
                          <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No consultation requests found.</td>
                        </tr>
                      ) : (
                        consultationInquiries.map((inq) => {
                          const details = getConsultationDetails(inq.message);
                          return (
                            <tr key={inq.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem' }}>
                              <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-dark)' }}>{inq.name}</td>
                              <td style={{ padding: '1rem' }}>
                                <div>✉ {inq.email}</div>
                                {inq.phone && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>☎ {inq.phone}</div>}
                              </td>
                              <td style={{ padding: '1rem' }}>
                                {details.rawMessage ? (
                                  <div style={{ color: 'var(--text-dark)', fontSize: '0.9rem' }}>{details.rawMessage}</div>
                                ) : (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                    <div style={{ fontSize: '0.9rem' }}>💰 <strong>Budget:</strong> {details.budget}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{details.mode}</div>
                                  </div>
                                )}
                              </td>
                              <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                {new Date(inq.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                              </td>
                              <td style={{ padding: '1rem' }}>
                                <select 
                                  value={inq.status} 
                                  onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                                  style={{
                                    padding: '0.3rem 0.6rem',
                                    borderRadius: '6px',
                                    border: '1px solid var(--border-color)',
                                    fontSize: '0.85rem',
                                    background: (inq.status === 'Pending' || inq.status === 'New') ? '#fef3c7' : inq.status === 'Contacted' ? '#dbeafe' : '#d1fae5',
                                    color: (inq.status === 'Pending' || inq.status === 'New') ? '#92400e' : inq.status === 'Contacted' ? '#1e40af' : '#065f46',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                  }}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Closed">Closed</option>
                                </select>
                              </td>
                              <td style={{ padding: '1rem', textAlign: 'right' }}>
                                <button 
                                  onClick={() => handleInquiryDelete(inq.id, inq.name)} 
                                  style={{ background: 'transparent', border: '1px solid #fca5a5', color: '#ef4444', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal / Slider for Add/Edit Property */}
        {isFormOpen && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100vh',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
            zIndex: 1100, display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '1rem'
          }} onClick={() => setIsFormOpen(false)}>
            <div 
              className="glass-panel" 
              style={{
                background: '#FFFFFF', padding: '2.5rem', width: '100%', maxWidth: '600px',
                maxHeight: '90vh', overflowY: 'auto', position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                style={{ position: 'absolute', top: '1rem', right: '1.5rem', background: 'transparent', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                &times;
              </button>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '1.5rem' }}>
                {formType === 'create' ? 'Add New Listing' : 'Edit Listing'}
              </h2>

              <form onSubmit={handlePropertySubmit}>
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 2, minWidth: '200px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Title</label>
                    <input 
                      type="text" required placeholder="The Oasis Villa"
                      value={propertyForm.title} 
                      onChange={(e) => setPropertyForm({...propertyForm, title: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: '120px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Price (e.g. $4.5M)</label>
                    <input 
                      type="text" required placeholder="$4,500,000"
                      value={propertyForm.price} 
                      onChange={(e) => setPropertyForm({...propertyForm, price: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Image Source</label>
                  
                  {/* Drag and Drop Zone */}
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                    style={{
                      border: isDragging ? '2px dashed var(--primary-color)' : '2px dashed var(--border-color)',
                      background: isDragging ? 'rgba(211, 185, 138, 0.08)' : '#fafafa',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginBottom: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '140px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      style={{ display: 'none' }} 
                    />
                    
                    {propertyForm.image ? (
                      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <img 
                          src={propertyForm.image} 
                          alt="Preview" 
                          style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'contain', borderRadius: '8px' }} 
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--primary-dark)', fontWeight: 600 }}>
                          Click or drag to replace image
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', opacity: 0.3 }}>📸</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: 600 }}>Drag & drop image here</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>or click to browse files (Max 2MB)</div>
                      </div>
                    )}
                  </div>

                  {/* Fallback URL input */}
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Or paste direct Image URL:</label>
                  <input 
                    type="text" required placeholder="/listing_villa.png or paste image URL or upload above"
                    value={propertyForm.image} 
                    onChange={(e) => setPropertyForm({...propertyForm, image: e.target.value})}
                    style={inputStyle}
                  />
                  {propertyForm.image && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#15803d', fontSize: '0.8rem', fontWeight: 600 }}>✓ Image loaded</span>
                      <button type="button" onClick={() => setPropertyForm({ ...propertyForm, image: '' })} style={{ border: 'none', background: 'transparent', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>Clear</button>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Category</label>
                    <select 
                      value={propertyForm.category} 
                      onChange={(e) => setPropertyForm({...propertyForm, category: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="villas">Villas</option>
                      <option value="apartments">Apartments</option>
                      <option value="penthouses">Penthouses</option>
                      <option value="plots">Plots</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Type</label>
                    <select 
                      value={propertyForm.type} 
                      onChange={(e) => setPropertyForm({...propertyForm, type: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="buy">For Sale</option>
                      <option value="rent">For Rent</option>
                      <option value="off-plan">Off-Plan</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Overall Beds</label>
                    <input 
                      type="number" min="0" required
                      value={propertyForm.beds} 
                      onChange={(e) => setPropertyForm({...propertyForm, beds: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Overall Baths</label>
                    <input 
                      type="number" min="0" required
                      value={propertyForm.baths} 
                      onChange={(e) => setPropertyForm({...propertyForm, baths: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Overall Size</label>
                    <input 
                      type="text" placeholder="1,250 Sq. Ft."
                      value={propertyForm.size || ''} 
                      onChange={(e) => setPropertyForm({...propertyForm, size: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Location Area</label>
                    <input 
                      type="text" required placeholder="Prime District, Downtown"
                      value={propertyForm.location} 
                      onChange={(e) => setPropertyForm({...propertyForm, location: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Status</label>
                    <select 
                      value={propertyForm.status} 
                      onChange={(e) => setPropertyForm({...propertyForm, status: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="Available">Available</option>
                      <option value="Off-Plan">Under Construction</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Description</label>
                  <textarea 
                    rows="4" required placeholder="A solid architectural masterpiece..."
                    value={propertyForm.description} 
                    onChange={(e) => setPropertyForm({...propertyForm, description: e.target.value})}
                    style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>

                {/* Floors & Dynamic Flats schematic manager */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Building Structure Manager</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                    Define the levels of this building and add individual flats/units to each level with their own size, price, rooms, and availability status.
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <button type="button" onClick={handlePrepopulateFloors} className="btn-solid" style={{ background: '#737373', fontSize: '0.8rem', padding: '0.5rem 1rem', borderRadius: '6px', width: 'auto' }}>
                      ⚡ Pre-populate Standard Levels (1 to 3)
                    </button>
                  </div>

                  {/* List of current levels and flats */}
                  {sanitizeFloorsArray(propertyForm.floors).length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                      {sanitizeFloorsArray(propertyForm.floors).map((level) => (
                        <div key={level.id} style={{ background: '#fafafa', padding: '1.2rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                              🏢 {level.name} <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--text-muted)' }}>(ID: {level.id})</span>
                            </span>
                            <button type="button" onClick={(e) => handleRemoveLevel(level.id, e)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                              Delete Level
                            </button>
                          </div>

                          {/* List flats in this level */}
                          {level.flats && level.flats.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                              {level.flats.map((flat, fIdx) => (
                                <div key={fIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #eee', fontSize: '0.8rem' }}>
                                  <div>
                                    <strong>{flat.name}</strong> | <span style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>{flat.price}</span> | {flat.size} | {flat.beds}b/{flat.baths}ba | <span style={{ fontWeight: 600, color: flat.status === 'Available' ? '#16a34a' : flat.status === 'Sold' ? '#dc2626' : '#d97706' }}>{flat.status}</span>
                                  </div>
                                  <button type="button" onClick={(e) => handleRemoveFlat(level.id, fIdx, e)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', padding: '0 0.2rem' }}>
                                    &times;
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>No flats added to this level yet.</p>
                          )}

                          {/* Add flat inline form */}
                          <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '10px', border: '1px solid #eaeaea', marginTop: '1rem' }}>
                            <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '0.8rem', color: 'var(--text-dark)' }}>+ Add Flat to {level.name}</strong>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.8rem', marginBottom: '0.8rem' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.2rem' }}>Flat Name / No.</label>
                                <input type="text" placeholder="e.g. 101" value={flatForms[level.id]?.name || ''} onChange={(e) => updateFlatForm(level.id, 'name', e.target.value)} style={smallInputStyle} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.2rem' }}>Price</label>
                                <input type="text" placeholder="e.g. $450,000" value={flatForms[level.id]?.price || ''} onChange={(e) => updateFlatForm(level.id, 'price', e.target.value)} style={smallInputStyle} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.2rem' }}>Size (Area)</label>
                                <input type="text" placeholder="e.g. 950 Sq. Ft." value={flatForms[level.id]?.size || ''} onChange={(e) => updateFlatForm(level.id, 'size', e.target.value)} style={smallInputStyle} />
                              </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.8rem', marginBottom: '1rem' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.2rem' }}>Bedrooms</label>
                                <input type="number" placeholder="No. of rooms" min="0" value={flatForms[level.id]?.beds === undefined || flatForms[level.id]?.beds === null ? '' : flatForms[level.id]?.beds} onChange={(e) => updateFlatForm(level.id, 'beds', e.target.value)} style={smallInputStyle} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.2rem' }}>Washrooms</label>
                                <input type="number" placeholder="No. of baths" min="0" value={flatForms[level.id]?.baths === undefined || flatForms[level.id]?.baths === null ? '' : flatForms[level.id]?.baths} onChange={(e) => updateFlatForm(level.id, 'baths', e.target.value)} style={smallInputStyle} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.2rem' }}>Status</label>
                                <select value={flatForms[level.id]?.status || 'Available'} onChange={(e) => updateFlatForm(level.id, 'status', e.target.value)} style={smallInputStyle}>
                                  <option value="Available">Available</option>
                                  <option value="Sold">Sold</option>
                                  <option value="Commercial">Commercial</option>
                                </select>
                              </div>
                            </div>
                            
                            <button type="button" onClick={(e) => handleAddFlat(level.id, e)} className="btn-solid" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'var(--primary-dark)', width: 'auto', borderRadius: '6px' }}>
                              + Add Flat to level
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.5rem', textAlign: 'center', background: '#fafafa', padding: '1rem', borderRadius: '8px' }}>
                      No levels configured yet. Add levels below or click Pre-populate to build your building structure.
                    </p>
                  )}

                  {/* Add level helper form */}
                  <div style={{ background: '#f5f5f5', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.8rem', color: 'var(--text-dark)' }}>Add Level / Floor</h5>
                    
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '100px' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Level ID (Numeric Order)</label>
                        <input type="number" placeholder="3" value={newLevel.id} onChange={e => setNewLevel({...newLevel, id: e.target.value})} style={smallInputStyle} />
                      </div>
                      <div style={{ flex: 2, minWidth: '150px' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Level Name</label>
                        <input type="text" placeholder="Level 3 - Bedrooms" value={newLevel.name} onChange={e => setNewLevel({...newLevel, name: e.target.value})} style={smallInputStyle} />
                      </div>
                    </div>

                    <button type="button" onClick={(e) => handleAddLevel(e)} className="btn-solid" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', background: 'var(--primary-dark)', width: 'auto', borderRadius: '6px', marginTop: '1rem' }}>
                      + CREATE LEVEL
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-solid" style={{ width: '100%', padding: '1rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600 }}>
                  {formType === 'create' ? 'PUBLISH LISTING' : 'SAVE CHANGES'}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Input styling helper
const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.8rem 1rem',
  borderRadius: '8px',
  border: '1px solid var(--border-color)',
  background: '#fafafa',
  fontSize: '0.95rem',
  outline: 'none',
  marginTop: '0.2rem'
};

// Small input styling helper for Floors manager
const smallInputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.5rem 0.8rem',
  borderRadius: '6px',
  border: '1px solid var(--border-color)',
  background: '#ffffff',
  fontSize: '0.85rem',
  outline: 'none',
  marginTop: '0.2rem'
};

// Helper to parse consultation details from the message
const getConsultationDetails = (message) => {
  if (!message) return { budget: 'N/A', mode: 'N/A' };
  // Expected format: "Consultancy Request - Budget: 10m-20m, Mode: virtual"
  const budgetMatch = message.match(/Budget:\s*([^,]+)/i);
  const modeMatch = message.match(/Mode:\s*(.+)$/i);
  
  const budget = budgetMatch ? budgetMatch[1].trim() : null;
  const mode = modeMatch ? modeMatch[1].trim() : null;
  
  if (budget || mode) {
    return {
      budget: budget ? formatBudget(budget) : 'N/A',
      mode: mode === 'virtual' ? '💻 Virtual Video Briefing' : mode === 'in-person' ? '💼 Private Office Session (Dubai)' : mode || 'N/A'
    };
  }
  return { budget: 'N/A', mode: 'N/A', rawMessage: message };
};

const formatBudget = (budget) => {
  switch (budget.toLowerCase()) {
    case 'below-5m': return 'Below AED 5,000,000';
    case '5m-10m': return 'AED 5,000,000 - 10,000,000';
    case '10m-20m': return 'AED 10,000,000 - 20,000,000';
    case 'above-20m': return 'AED 20,000,000+';
    default: return budget;
  }
};
