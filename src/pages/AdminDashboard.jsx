import React, { useState, useEffect, useRef, useMemo } from 'react';
import AdminLogin from './AdminLogin';
import useRealTimeSync from '../components/useRealTimeSync';
import {
  Search, Plus, UploadCloud, Trash2, Edit3, ExternalLink, Star, Eye, Check, X,
  Image as ImageIcon, FileText, Mail, Phone, MessageSquare, Layers,
  SlidersHorizontal, Filter, Sparkles, Clock, MapPin, Building2,
  DollarSign, CheckCircle2, AlertCircle, LogOut, RefreshCw, ChevronRight,
  Download, ArrowUpRight
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('ready-listings'); // 'ready-listings', 'offplan-listings', 'inquiries', 'blogs'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [starredOnlyFilter, setStarredOnlyFilter] = useState(false);

  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Property Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [modalTab, setModalTab] = useState('core'); // 'core', 'catalog', 'gallery', 'features', 'floors'
  const [formType, setFormType] = useState('create'); // 'create' or 'edit'
  const [editingId, setEditingId] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [customFeatureInput, setCustomFeatureInput] = useState('');
  const multiFileInputRef = useRef(null);

  const [propertyForm, setPropertyForm] = useState({
    title: '',
    price: '',
    image: '',
    images: [],
    description: '',
    beds: 0,
    baths: 0,
    size: '',
    category: 'villas',
    type: 'ready', // 'ready' or 'off-plan'
    location: 'Prime District',
    status: 'Available',
    dropbox_link: '',
    floors: [],
    features: [],
    handover: '',
    payment_plan: '',
    property_type: '',
    bedrooms_range: '',
    starred: false
  });

  // Floor manager inputs
  const [newLevel, setNewLevel] = useState({ id: '', name: '' });
  const [flatForms, setFlatForms] = useState({});

  // AI & Dropbox scanning states
  const [scanningDoc, setScanningDoc] = useState(false);
  const [isUploadOptionOpen, setIsUploadOptionOpen] = useState(false);
  const [dropboxInputUrl, setDropboxInputUrl] = useState('');
  const docUploadInputRef = useRef(null);

  // Blog modal states
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [blogFormType, setBlogFormType] = useState('create');
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Market Trends',
    readTime: '5 min read',
    image: '',
    excerpt: '',
    content: '',
    featured: false,
    attachments: []
  });
  const blogFileInputRef = useRef(null);

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';
  const currentAdminUser = localStorage.getItem('adminUser') || 'Executive Administrator';

  // Real-time synchronization hook
  useRealTimeSync((message) => {
    if (message.type === 'PROPERTY_CHANGE' || message.type === 'INQUIRY_CHANGE' || message.type === 'BLOG_CHANGE') {
      fetchData(null, true);
    }
  });

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
    setTimeout(() => setSuccessMsg(''), 4500);
  };

  const getHeaders = (token) => {
    const activeToken = token || localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeToken}`
    };
  };

  const ensureArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
      if (val.trim()) {
        return val.split('\n').map(s => s.trim()).filter(Boolean);
      }
    }
    return [];
  };

  const fetchData = async (token, silent = false) => {
    if (!silent) setLoading(true);
    setError('');
    try {
      // 1. Fetch Properties
      const propsRes = await fetch(`${API_BASE}/properties?limit=500`);
      if (!propsRes.ok) throw new Error('Failed to fetch properties from server');
      const propsData = await propsRes.json();
      const propsArray = propsData.data || (Array.isArray(propsData) ? propsData : []);
      setProperties(propsArray);

      // 2. Fetch Inquiries
      const inqRes = await fetch(`${API_BASE}/inquiries`, {
        headers: getHeaders(token)
      });
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(Array.isArray(inqData) ? inqData : []);
      } else if (inqRes.status === 401 || inqRes.status === 403) {
        handleLogout();
        throw new Error('Session expired. Please log in again.');
      }

      // 3. Fetch Blogs
      try {
        const blogsRes = await fetch(`${API_BASE}/blogs`);
        if (blogsRes.ok) {
          const blogsData = await blogsRes.json();
          setBlogs(Array.isArray(blogsData) ? blogsData : []);
        }
      } catch (blogErr) {
        console.warn('Could not load blogs:', blogErr.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // ══════════════════════════════════════════════
  // PROPERTY ACTIONS & MULTI-IMAGE GALLERY MANAGER
  // ══════════════════════════════════════════════

  const handleOpenCreateForm = (preferredType = 'ready') => {
    setPropertyForm({
      title: '',
      price: '',
      image: '',
      images: [],
      description: '',
      beds: preferredType === 'ready' ? 3 : 0,
      baths: preferredType === 'ready' ? 3 : 0,
      size: preferredType === 'ready' ? '3,500 Sq. Ft.' : '',
      category: 'villas',
      type: preferredType,
      location: 'Dubai, UAE',
      status: 'Available',
      dropbox_link: '',
      floors: [],
      features: ['Private Pool', 'Lagoon Access', 'Concierge Service'],
      handover: preferredType === 'off-plan' ? 'Q4 2028' : '',
      payment_plan: preferredType === 'off-plan' ? '80/20 on Handover' : '',
      property_type: preferredType === 'off-plan' ? 'Luxury Villas & Mansions' : 'Private Residence',
      bedrooms_range: preferredType === 'off-plan' ? '3 - 6 Bedrooms' : '',
      starred: false
    });
    setFlatForms({});
    setNewLevel({ id: '', name: '' });
    setImageUrlInput('');
    setCustomFeatureInput('');
    setFormType('create');
    setEditingId(null);
    setModalTab('core');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (prop) => {
    const cleanImages = ensureArray(prop.images);
    if (prop.image && !cleanImages.includes(prop.image)) {
      cleanImages.unshift(prop.image);
    }

    setPropertyForm({
      title: prop.title || '',
      price: prop.price || '',
      image: prop.image || cleanImages[0] || '',
      images: cleanImages,
      description: prop.description || '',
      beds: prop.beds || 0,
      baths: prop.baths || 0,
      size: prop.size || '',
      category: prop.category || 'villas',
      type: prop.type || 'ready',
      location: prop.location || 'Prime District',
      status: prop.status || 'Available',
      dropbox_link: prop.dropbox_link || '',
      floors: ensureArray(prop.floors),
      features: ensureArray(prop.features),
      handover: prop.handover || '',
      payment_plan: prop.payment_plan || '',
      property_type: prop.property_type || '',
      bedrooms_range: prop.bedrooms_range || '',
      starred: prop.starred === true || prop.starred === 'true'
    });

    setFlatForms({});
    setNewLevel({ id: '', name: '' });
    setImageUrlInput('');
    setCustomFeatureInput('');
    setEditingId(prop.id);
    setFormType('edit');
    setModalTab('core');
    setIsFormOpen(true);
  };

  // Upload Multiple Image Files
  const handleMultiImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImageUploadLoading(true);
    setError('');

    try {
      const readPromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ data: reader.result, name: file.name });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const base64Images = await Promise.all(readPromises);

      const res = await fetch(`${API_BASE}/upload-images`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ images: base64Images })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload images');

      const uploadedUrls = data.urls || [];
      setPropertyForm(prev => {
        const combined = [...prev.images, ...uploadedUrls];
        return {
          ...prev,
          images: combined,
          image: prev.image || combined[0] || ''
        };
      });

      showSuccess(`Successfully uploaded ${uploadedUrls.length} high-resolution image(s).`);
    } catch (err) {
      setError(err.message);
    } finally {
      setImageUploadLoading(false);
      if (multiFileInputRef.current) multiFileInputRef.current.value = '';
    }
  };

  // Add Image via Direct URL
  const handleAddImageUrl = (e) => {
    if (e) e.preventDefault();
    const url = imageUrlInput.trim();
    if (!url) return;
    setPropertyForm(prev => {
      const combined = [...prev.images, url];
      return {
        ...prev,
        images: combined,
        image: prev.image || url
      };
    });
    setImageUrlInput('');
  };

  // Remove Image from Gallery
  const handleRemoveImage = (indexToRemove) => {
    setPropertyForm(prev => {
      const updated = prev.images.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updated,
        image: updated.length > 0 ? updated[0] : ''
      };
    });
  };

  // Set an Image as Primary Cover Image
  const handleSetCoverImage = (indexToPromote) => {
    setPropertyForm(prev => {
      const selected = prev.images[indexToPromote];
      if (!selected) return prev;
      const reordered = [selected, ...prev.images.filter((_, idx) => idx !== indexToPromote)];
      return {
        ...prev,
        images: reordered,
        image: selected
      };
    });
    showSuccess('Cover image updated.');
  };

  // Feature Tag Manager
  const handleAddFeatureTag = (tag) => {
    const cleaned = tag.trim();
    if (!cleaned || propertyForm.features.includes(cleaned)) return;
    setPropertyForm(prev => ({
      ...prev,
      features: [...prev.features, cleaned]
    }));
    setCustomFeatureInput('');
  };

  const handleRemoveFeatureTag = (tagToRemove) => {
    setPropertyForm(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== tagToRemove)
    }));
  };

  // Floor / Level manager helpers
  const handleAddLevel = () => {
    if (!newLevel.name.trim()) return;
    const newId = newLevel.id ? parseInt(newLevel.id) : (propertyForm.floors.length + 1);
    const updatedFloors = [
      ...propertyForm.floors,
      { id: newId, name: newLevel.name.trim(), flats: [] }
    ];
    setPropertyForm(prev => ({ ...prev, floors: updatedFloors }));
    setNewLevel({ id: '', name: '' });
  };

  const handleRemoveLevel = (levelId) => {
    setPropertyForm(prev => ({
      ...prev,
      floors: prev.floors.filter(l => l.id !== levelId)
    }));
  };

  const handleAddFlat = (levelId) => {
    const form = flatForms[levelId] || {};
    if (!form.name || !form.name.trim()) return;

    const newFlat = {
      name: form.name.trim(),
      price: form.price ? form.price.trim() : 'AED 0',
      size: form.size ? form.size.trim() : '',
      beds: parseInt(form.beds) || 0,
      baths: parseInt(form.baths) || 0,
      status: form.status || 'Available'
    };

    const updatedFloors = propertyForm.floors.map(lvl => {
      if (lvl.id === levelId) {
        return { ...lvl, flats: [...(lvl.flats || []), newFlat] };
      }
      return lvl;
    });

    setPropertyForm(prev => ({ ...prev, floors: updatedFloors }));
    setFlatForms(prev => ({ ...prev, [levelId]: { name: '', price: '', size: '', beds: 0, baths: 0, status: 'Available' } }));
  };

  const handleRemoveFlat = (levelId, flatIdx) => {
    const updatedFloors = propertyForm.floors.map(lvl => {
      if (lvl.id === levelId) {
        return { ...lvl, flats: (lvl.flats || []).filter((_, i) => i !== flatIdx) };
      }
      return lvl;
    });
    setPropertyForm(prev => ({ ...prev, floors: updatedFloors }));
  };

  // Save / Submit Property
  const handlePropertySubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!propertyForm.title.trim()) {
      setError('Please provide a property or catalog title.');
      return;
    }
    if (!propertyForm.price.trim()) {
      setError('Please enter the price or starting price.');
      return;
    }

    try {
      const url = formType === 'create'
        ? `${API_BASE}/properties`
        : `${API_BASE}/properties/${editingId}`;
      const method = formType === 'create' ? 'POST' : 'PUT';

      const payload = {
        ...propertyForm,
        image: propertyForm.images[0] || propertyForm.image || '/listing_villa.webp',
        images: propertyForm.images,
        features: propertyForm.features,
        floors: propertyForm.floors
      };

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save property listing');

      showSuccess(`"${data.title}" successfully saved and synchronized.`);
      setIsFormOpen(false);
      fetchData(null, true);
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle Starred Highlight
  const handleToggleStarred = async (prop) => {
    setError('');
    try {
      const updatedStarred = !(prop.starred === true || prop.starred === 'true');
      const payload = {
        ...prop,
        starred: updatedStarred
      };

      const res = await fetch(`${API_BASE}/properties/${prop.id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to toggle starred status');
      }

      showSuccess(`Curated Highlight status updated for "${prop.title}".`);
      fetchData(null, true);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete Property
  const handlePropertyDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"? This action will remove it from all website catalogs.`)) return;
    setError('');
    try {
      const res = await fetch(`${API_BASE}/properties/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete listing');
      }
      showSuccess(`Listing "${title}" removed successfully.`);
      fetchData(null, true);
    } catch (err) {
      setError(err.message);
    }
  };

  // AI & Dropbox scanning
  const handleScanDropboxUrl = async (e) => {
    if (e) e.preventDefault();
    if (!dropboxInputUrl.trim()) return;

    setScanningDoc(true);
    setError('');
    setIsUploadOptionOpen(false);

    try {
      const res = await fetch(`${API_BASE}/properties/upload-doc`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ dropboxUrl: dropboxInputUrl.trim() })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to scan Dropbox campaign');

      const extractedImages = ensureArray(data.images);
      setPropertyForm({
        title: data.title || '',
        price: data.price || '',
        image: data.image || extractedImages[0] || '',
        images: extractedImages,
        description: data.description || '',
        beds: data.beds || 0,
        baths: data.baths || 0,
        size: data.size || '',
        category: data.category || 'villas',
        type: data.type || 'off-plan',
        location: data.location || 'Prime District',
        status: data.status || 'Available',
        dropbox_link: data.dropbox_link || dropboxInputUrl.trim(),
        floors: ensureArray(data.floors),
        features: ensureArray(data.features),
        handover: data.handover || '',
        payment_plan: data.payment_plan || '',
        property_type: data.property_type || '',
        bedrooms_range: data.bedrooms_range || '',
        starred: false
      });

      setFormType('create');
      setEditingId(null);
      setModalTab('core');
      setIsFormOpen(true);
      setDropboxInputUrl('');

      showSuccess(`AI successfully extracted details from Dropbox campaign.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setScanningDoc(false);
    }
  };

  const handleUploadDoc = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';

    setScanningDoc(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const res = await fetch(`${API_BASE}/properties/upload-doc`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
              fileData: reader.result,
              fileName: file.name,
              mimeType: file.type
            })
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to scan document');

          const extractedImages = ensureArray(data.images);
          setPropertyForm({
            title: data.title || '',
            price: data.price || '',
            image: data.image || extractedImages[0] || '',
            images: extractedImages,
            description: data.description || '',
            beds: data.beds || 0,
            baths: data.baths || 0,
            size: data.size || '',
            category: data.category || 'villas',
            type: data.type || 'off-plan',
            location: data.location || 'Prime District',
            status: data.status || 'Available',
            dropbox_link: data.dropbox_link || '',
            floors: ensureArray(data.floors),
            features: ensureArray(data.features),
            handover: data.handover || '',
            payment_plan: data.payment_plan || '',
            property_type: data.property_type || '',
            bedrooms_range: data.bedrooms_range || '',
            starred: false
          });

          setFormType('create');
          setEditingId(null);
          setModalTab('core');
          setIsFormOpen(true);

          showSuccess(`AI parsed "${file.name}". Review the extracted details.`);
        } catch (err) {
          setError(err.message);
        } finally {
          setScanningDoc(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err.message);
      setScanningDoc(false);
    }
  };

  // ══════════════════════════════════════════════
  // INQUIRIES & LEADS MANAGEMENT
  // ══════════════════════════════════════════════

  const handleUpdateInquiryStatus = async (inqId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/inquiries/${inqId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      showSuccess(`Inquiry status updated to ${newStatus}.`);
      fetchData(null, true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteInquiry = async (inqId) => {
    if (!window.confirm('Delete this client inquiry record?')) return;
    try {
      const res = await fetch(`${API_BASE}/inquiries/${inqId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to delete inquiry');
      showSuccess('Inquiry deleted.');
      fetchData(null, true);
    } catch (err) {
      setError(err.message);
    }
  };

  // ══════════════════════════════════════════════
  // BLOGS & EDITORIAL MANAGEMENT
  // ══════════════════════════════════════════════

  const handleOpenBlogCreate = () => {
    setBlogForm({
      title: '',
      category: 'Market Trends',
      readTime: '5 min read',
      image: '',
      excerpt: '',
      content: '',
      featured: false,
      attachments: []
    });
    setBlogFormType('create');
    setEditingBlogId(null);
    setIsBlogFormOpen(true);
  };

  const handleOpenBlogEdit = (blog) => {
    setBlogForm({
      title: blog.title || '',
      category: blog.category || 'Market Trends',
      readTime: blog.readTime || '5 min read',
      image: blog.image || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      featured: blog.featured || false,
      attachments: blog.attachments || []
    });
    setBlogFormType('edit');
    setEditingBlogId(blog.id);
    setIsBlogFormOpen(true);
  };

  const handleBlogSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!blogForm.title.trim()) {
      setError('Please provide a publication title.');
      return;
    }

    try {
      const url = blogFormType === 'create'
        ? `${API_BASE}/blogs`
        : `${API_BASE}/blogs/${editingBlogId}`;
      const method = blogFormType === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(blogForm)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save publication');

      showSuccess(`Article "${data.title}" saved.`);
      setIsBlogFormOpen(false);
      fetchData(null, true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBlogDelete = async (blogId, title) => {
    if (!window.confirm(`Delete publication "${title}"?`)) return;
    try {
      const res = await fetch(`${API_BASE}/blogs/${blogId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to delete article');
      showSuccess(`Article "${title}" removed.`);
      fetchData(null, true);
    } catch (err) {
      setError(err.message);
    }
  };

  // ══════════════════════════════════════════════
  // FILTERED PORTFOLIO LISTS & METRICS
  // ══════════════════════════════════════════════

  const readyProperties = useMemo(() => {
    return properties.filter(p => p.type !== 'off-plan');
  }, [properties]);

  const offPlanProperties = useMemo(() => {
    return properties.filter(p => p.type === 'off-plan');
  }, [properties]);

  const pendingInquiriesCount = useMemo(() => {
    return inquiries.filter(i => (i.status || 'Pending').toLowerCase() === 'pending').length;
  }, [inquiries]);

  const starredPropertiesCount = useMemo(() => {
    return properties.filter(p => p.starred === true || p.starred === 'true').length;
  }, [properties]);

  const displayedListings = useMemo(() => {
    const list = activeTab === 'ready-listings' ? readyProperties : offPlanProperties;
    return list.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Starred filter
      if (starredOnlyFilter && !(item.starred === true || item.starred === 'true')) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title && item.title.toLowerCase().includes(q);
        const matchesLocation = item.location && item.location.toLowerCase().includes(q);
        const matchesCategory = item.category && item.category.toLowerCase().includes(q);
        const matchesPrice = item.price && item.price.toLowerCase().includes(q);
        return matchesTitle || matchesLocation || matchesCategory || matchesPrice;
      }
      return true;
    });
  }, [activeTab, readyProperties, offPlanProperties, selectedCategory, starredOnlyFilter, searchQuery]);

  // If unauthenticated, show login screen
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => { setIsAuthenticated(true); fetchData(); }} />;
  }

  return (
    <div className="admin-luxury-suite">
      <style>{`
        .admin-luxury-suite {
          min-height: 100vh;
          background: #FFFFFF;
          color: #111827;
          font-family: var(--font-sans);
          padding-top: 5.5rem;
          padding-bottom: 6rem;
        }
        .admin-glass-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          transition: all 0.25s ease;
        }
        .admin-glass-card:hover {
          border-color: #CBD5E1;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }
        .admin-nav-tab {
          padding: 0.85rem 1.4rem;
          font-size: 0.76rem;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          color: #64748B;
          border: none;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          white-space: nowrap;
          background: transparent;
        }
        .admin-nav-tab.active {
          color: #000000;
          border-bottom-color: #000000;
          background: rgba(0, 0, 0, 0.02);
        }
        .admin-btn-primary {
          background: #000000;
          color: #FFFFFF;
          border: 1px solid #000000;
          padding: 0.6rem 1.25rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .admin-btn-primary:hover {
          background: #262626;
          border-color: #262626;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }
        .admin-btn-secondary {
          background: #FFFFFF;
          color: #0F172A;
          border: 1px solid #CBD5E1;
          padding: 0.6rem 1.1rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .admin-btn-secondary:hover {
          background: #F8FAFC;
          border-color: #94A3B8;
        }
        .admin-pill-filter {
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
          font-size: 0.7rem;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #475569;
          transition: all 0.2s ease;
        }
        .admin-pill-filter.active {
          background: #000000;
          border-color: #000000;
          color: #FFFFFF;
          font-weight: 600;
        }
        .admin-input-luxury {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          color: #0F172A;
          border-radius: 2px;
          padding: 0.7rem 0.9rem;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .admin-input-luxury:focus {
          border-color: #000000;
          box-shadow: 0 0 0 1px #000000;
        }
        .admin-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          overflow-y: auto;
        }
        .admin-modal-container {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 4px;
          width: 100%;
          max-width: 920px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          color: #0F172A;
        }
        .admin-table-row {
          border-bottom: 1px solid #F1F5F9;
          transition: background 0.15s ease;
        }
        .admin-table-row:hover {
          background: #F8FAFC;
        }
      `}</style>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>

        {/* ── TOP EXECUTIVE BANNER ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.2rem', flexWrap: 'wrap', gap: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.8rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669', boxShadow: '0 0 8px rgba(5, 150, 105, 0.4)' }} />
              <span style={{ fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#059669', fontWeight: 700 }}>
                Real-Time Cloud Database Synchronized
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: '#000000', margin: 0, letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 300 }}>
              Shārān Advisory Suite
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.35rem', margin: 0 }}>
              Curate, edit and command private luxury real estate portfolios, off-plan developer catalogs, and high-net-worth investor inquiries.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.5rem 0.9rem', borderRadius: '2px', fontSize: '0.75rem', color: '#475569' }}>
              <span style={{ color: '#94A3B8', marginRight: '0.4rem' }}>Identity:</span>
              <strong style={{ color: '#0F172A' }}>{currentAdminUser}</strong>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn-secondary"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={14} /> View Live Website
            </a>

            <button onClick={handleLogout} className="admin-btn-secondary" style={{ borderColor: '#FECACA', color: '#DC2626', background: '#FEF2F2' }}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* ── NOTIFICATION TOASTS ── */}
        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '0.9rem 1.25rem', borderRadius: '4px', marginBottom: '1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <AlertCircle size={18} />
              <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{error}</span>
            </div>
            <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer' }}>✕</button>
          </div>
        )}

        {successMsg && (
          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#047857', padding: '0.9rem 1.25rem', borderRadius: '4px', marginBottom: '1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg('')} style={{ background: 'none', border: 'none', color: '#047857', cursor: 'pointer' }}>✕</button>
          </div>
        )}

        {/* ── EXECUTIVE KPI METRIC CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
          
          <div className="admin-glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.68rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>Total Portfolio</span>
              <Building2 size={18} color="#0F172A" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 300, color: '#000000', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
              {properties.length}
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.5rem', margin: 0 }}>
              {readyProperties.length} Ready Estates • {offPlanProperties.length} Catalogs
            </p>
          </div>

          <div className="admin-glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.68rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>Ready Estates</span>
              <Sparkles size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 300, color: '#000000', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
              {readyProperties.length}
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.5rem', margin: 0 }}>
              Primary mansions & duplex penthouses
            </p>
          </div>

          <div className="admin-glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.68rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>Master Catalogs</span>
              <Layers size={18} color="#0284C7" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 300, color: '#000000', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
              {offPlanProperties.length}
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.5rem', margin: 0 }}>
              Emaar, Nakheel, Wasl, Aldar, Modon
            </p>
          </div>

          <div className="admin-glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.68rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>Client Inquiries</span>
              <MessageSquare size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 300, color: '#000000', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
              {inquiries.length}
            </div>
            <p style={{ fontSize: '0.72rem', color: pendingInquiriesCount > 0 ? '#D97706' : '#64748B', marginTop: '0.5rem', margin: 0, fontWeight: pendingInquiriesCount > 0 ? 600 : 400 }}>
              {pendingInquiriesCount} Pending Client Follow-up{pendingInquiriesCount !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="admin-glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.68rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>Curated Highlights</span>
              <Star size={18} color="#CA8A04" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 300, color: '#000000', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
              {starredPropertiesCount}
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.5rem', margin: 0 }}>
              Featured on Homepage Selection
            </p>
          </div>

        </div>

        {/* ── SEGMENTED NAVIGATION BAR ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', marginBottom: '1.8rem', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              onClick={() => { setActiveTab('ready-listings'); setSearchQuery(''); }}
              className={`admin-nav-tab ${activeTab === 'ready-listings' ? 'active' : ''}`}
            >
              <Sparkles size={15} /> Ready Properties ({readyProperties.length})
            </button>
            <button
              onClick={() => { setActiveTab('offplan-listings'); setSearchQuery(''); }}
              className={`admin-nav-tab ${activeTab === 'offplan-listings' ? 'active' : ''}`}
            >
              <Building2 size={15} /> Off-Plan Catalogs ({offPlanProperties.length})
            </button>
            <button
              onClick={() => { setActiveTab('inquiries'); setSearchQuery(''); }}
              className={`admin-nav-tab ${activeTab === 'inquiries' ? 'active' : ''}`}
            >
              <Mail size={15} /> Inquiries ({inquiries.length})
              {pendingInquiriesCount > 0 && (
                <span style={{ background: '#F59E0B', color: '#FFFFFF', borderRadius: '10px', padding: '0.1rem 0.45rem', fontSize: '0.62rem', fontWeight: 700 }}>
                  {pendingInquiriesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('blogs'); setSearchQuery(''); }}
              className={`admin-nav-tab ${activeTab === 'blogs' ? 'active' : ''}`}
            >
              <FileText size={15} /> Publications ({blogs.length})
            </button>
          </div>

          <button
            onClick={() => fetchData(null, false)}
            className="admin-btn-secondary"
            style={{ padding: '0.45rem 0.8rem', fontSize: '0.68rem', marginBottom: '0.4rem' }}
            title="Refresh database"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        {/* ── TOOLBAR: SEARCH, FILTERS & ACTION BUTTONS ── */}
        {(activeTab === 'ready-listings' || activeTab === 'offplan-listings') && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem', flexWrap: 'wrap', gap: '1rem' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1', minWidth: '280px', maxWidth: '400px' }}>
              <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search by title, location, developer, price..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="admin-input-luxury"
                style={{ paddingLeft: '2.5rem' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category and Starred Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['all', 'villas', 'penthouses', 'apartments'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`admin-pill-filter ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={() => setStarredOnlyFilter(!starredOnlyFilter)}
                className={`admin-pill-filter ${starredOnlyFilter ? 'active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Star size={12} fill={starredOnlyFilter ? '#CA8A04' : 'none'} color={starredOnlyFilter ? '#CA8A04' : 'currentColor'} /> Starred Only
              </button>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => handleOpenCreateForm(activeTab === 'offplan-listings' ? 'off-plan' : 'ready')}
                className="admin-btn-primary"
              >
                <Plus size={15} /> Add {activeTab === 'offplan-listings' ? 'Catalog' : 'Property'}
              </button>

              <button
                onClick={() => setIsUploadOptionOpen(true)}
                className="admin-btn-secondary"
                disabled={scanningDoc}
                style={{ borderColor: '#059669', color: '#059669', background: '#ECFDF5' }}
              >
                <Sparkles size={14} /> {scanningDoc ? 'Scanning...' : 'AI Scan'}
              </button>
            </div>

          </div>
        )}

        {/* ── TAB 1 & 2: LISTINGS & CATALOGS TABLE ── */}
        {(activeTab === 'ready-listings' || activeTab === 'offplan-listings') && (
          <div className="admin-glass-card" style={{ overflow: 'hidden' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
                <RefreshCw size={28} className="animate-spin" style={{ margin: '0 auto 1rem', color: '#000000' }} />
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Loading portfolio from cloud database...</p>
              </div>
            ) : displayedListings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <Building2 size={36} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: '#000000', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', textTransform: 'uppercase' }}>No listings found</h3>
                <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  {searchQuery ? `No properties matched "${searchQuery}".` : 'No properties in this category.'}
                </p>
                <button onClick={() => handleOpenCreateForm(activeTab === 'offplan-listings' ? 'off-plan' : 'ready')} className="admin-btn-primary">
                  <Plus size={14} /> Create Listing
                </button>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '950px' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '0.9rem 1.25rem' }}>Residence / Catalog</th>
                      <th style={{ padding: '0.9rem' }}>Category</th>
                      <th style={{ padding: '0.9rem' }}>Location</th>
                      <th style={{ padding: '0.9rem' }}>Pricing</th>
                      <th style={{ padding: '0.9rem' }}>Status</th>
                      <th style={{ padding: '0.9rem', textAlign: 'center' }}>Curated</th>
                      <th style={{ padding: '0.9rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedListings.map(prop => {
                      const propImages = ensureArray(prop.images);
                      const coverImg = prop.image || propImages[0] || '/listing_villa.webp';
                      const isStarred = prop.starred === true || prop.starred === 'true';

                      return (
                        <tr key={prop.id} className="admin-table-row">
                          
                          {/* Property Info & Thumbnail */}
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              
                              <div style={{ position: 'relative', width: '70px', height: '52px', borderRadius: '2px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                                <img
                                  src={coverImg}
                                  alt=""
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={e => { e.target.src = '/listing_villa.webp'; }}
                                />
                                {propImages.length > 1 && (
                                  <div style={{ position: 'absolute', bottom: '2px', right: '3px', background: 'rgba(0,0,0,0.75)', color: '#fff', fontSize: '0.55rem', padding: '0.1rem 0.35rem', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                    <ImageIcon size={9} /> {propImages.length}
                                  </div>
                                )}
                              </div>

                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <h4 style={{ color: '#0F172A', fontSize: '0.88rem', fontWeight: 600, margin: 0, letterSpacing: '0.3px' }}>
                                    {prop.title}
                                  </h4>
                                  {isStarred && (
                                    <span style={{ color: '#EAB308', fontSize: '0.8rem' }} title="Curated on Homepage">★</span>
                                  )}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
                                  {prop.type === 'off-plan' ? (
                                    <span>{prop.bedrooms_range || 'Multi-bedroom'} • {prop.handover || 'Handover TBA'}</span>
                                  ) : (
                                    <span>{prop.beds} Beds • {prop.baths} Baths • {prop.size || 'Private Estate'}</span>
                                  )}
                                </div>
                              </div>

                            </div>
                          </td>

                          {/* Category / Type */}
                          <td style={{ padding: '1rem' }}>
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#334155', background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '0.25rem 0.6rem', borderRadius: '2px', fontWeight: 500 }}>
                              {prop.category}
                            </span>
                          </td>

                          {/* Location */}
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748B', fontSize: '0.8rem' }}>
                              <MapPin size={13} color="#0F172A" />
                              <span>{prop.location || 'Dubai, UAE'}</span>
                            </div>
                          </td>

                          {/* Price */}
                          <td style={{ padding: '1rem' }}>
                            <div style={{ color: '#000000', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.3px' }}>
                              {prop.price}
                            </div>
                          </td>

                          {/* Status */}
                          <td style={{ padding: '1rem' }}>
                            <span style={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              letterSpacing: '1px',
                              textTransform: 'uppercase',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '2px',
                              background: (prop.status || 'Available') === 'Available' ? '#ECFDF5' : '#FFFBEB',
                              color: (prop.status || 'Available') === 'Available' ? '#059669' : '#D97706',
                              border: `1px solid ${(prop.status || 'Available') === 'Available' ? '#A7F3D0' : '#FDE68A'}`
                            }}>
                              {prop.status || 'Available'}
                            </span>
                          </td>

                          {/* Curated Star Toggle */}
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <button
                              onClick={() => handleToggleStarred(prop)}
                              style={{
                                background: isStarred ? '#FEF9C3' : '#F8FAFC',
                                border: `1px solid ${isStarred ? '#FACC15' : '#E2E8F0'}`,
                                color: isStarred ? '#854D0E' : '#64748B',
                                padding: '0.35rem 0.75rem',
                                borderRadius: '2px',
                                cursor: 'pointer',
                                fontSize: '0.72rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                transition: 'all 0.2s ease',
                                fontWeight: 600
                              }}
                              title={isStarred ? 'Remove from Homepage Highlight' : 'Feature on Homepage Highlight'}
                            >
                              <Star size={13} fill={isStarred ? '#EAB308' : 'none'} color={isStarred ? '#CA8A04' : '#94A3B8'} />
                              <span>{isStarred ? 'Featured' : 'Standard'}</span>
                            </button>
                          </td>

                          {/* Action Buttons */}
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                              
                              <a
                                href={`/property/${prop.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="admin-btn-secondary"
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.7rem', textDecoration: 'none' }}
                                title="View on Live Website"
                              >
                                <ArrowUpRight size={13} /> View
                              </a>

                              <button
                                onClick={() => handleOpenEditForm(prop)}
                                className="admin-btn-primary"
                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.7rem' }}
                              >
                                <Edit3 size={13} /> Edit
                              </button>

                              <button
                                onClick={() => handlePropertyDelete(prop.id, prop.title)}
                                style={{
                                  background: '#FEF2F2',
                                  border: '1px solid #FECACA',
                                  color: '#DC2626',
                                  padding: '0.35rem 0.6rem',
                                  borderRadius: '2px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center'
                                }}
                                title="Delete Listing"
                              >
                                <Trash2 size={13} />
                              </button>

                            </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: CLIENT INQUIRIES & INVESTOR LEADS ── */}
        {activeTab === 'inquiries' && (
          <div className="admin-glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ color: '#000000', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Client Advisory Enquiries
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.82rem', margin: '0.25rem 0 0' }}>
                  Investor requests received from the private advisory booking modal, floor plan gates, and contact concierge.
                </p>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#0F172A', background: '#F1F5F9', padding: '0.45rem 1rem', borderRadius: '2px', border: '1px solid #E2E8F0', fontWeight: 600 }}>
                {inquiries.length} Total Leads Recorded
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <Mail size={36} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: '#64748B' }}>No client enquiries received yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {inquiries.map(inq => {
                  const status = inq.status || 'Pending';
                  const isPending = status.toLowerCase() === 'pending';
                  const dateStr = inq.created_at ? new Date(inq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
                  const cleanPhone = (inq.phone || '').replace(/[^0-9+]/g, '');

                  return (
                    <div
                      key={inq.id}
                      style={{
                        background: '#FFFFFF',
                        border: `1px solid ${isPending ? '#FDE68A' : '#E2E8F0'}`,
                        borderRadius: '4px',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1.2rem',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                      }}
                    >
                      <div style={{ flex: '1', minWidth: '280px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                          <h4 style={{ color: '#000000', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
                            {inq.name}
                          </h4>
                          <span style={{
                            fontSize: '0.65rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '2px',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            background: isPending ? '#FFFBEB' : '#ECFDF5',
                            color: isPending ? '#D97706' : '#059669',
                            border: `1px solid ${isPending ? '#FDE68A' : '#A7F3D0'}`
                          }}>
                            {status}
                          </span>
                          {dateStr && <span style={{ color: '#94A3B8', fontSize: '0.72rem' }}>{dateStr}</span>}
                        </div>

                        <div style={{ display: 'flex', gap: '1.2rem', color: '#64748B', fontSize: '0.82rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Mail size={13} color="#000000" /> {inq.email}
                          </span>
                          {inq.phone && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                              <Phone size={13} color="#000000" /> {inq.phone}
                            </span>
                          )}
                          {inq.property_id && (
                            <span style={{ color: '#0F172A', fontWeight: 600 }}>
                              Target Property Ref: #{inq.property_id}
                            </span>
                          )}
                        </div>

                        {inq.message && (
                          <div style={{ background: '#F8FAFC', borderLeft: '3px solid #000000', padding: '0.75rem 1rem', borderRadius: '2px', fontSize: '0.82rem', color: '#334155', fontStyle: 'italic' }}>
                            "{inq.message}"
                          </div>
                        )}
                      </div>

                      {/* Inquiry Quick Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone.replace('+', '')}?text=Hello%20${encodeURIComponent(inq.name)}%2C%20thank%20you%20for%20contacting%20Sharan%20Estates%20Private%20Advisory.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              background: '#059669',
                              color: '#fff',
                              padding: '0.45rem 0.85rem',
                              borderRadius: '2px',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem'
                            }}
                          >
                            <MessageSquare size={13} /> WhatsApp
                          </a>
                        )}

                        <a
                          href={`mailto:${inq.email}?subject=Sharan%20Estates%20Private%20Advisory%20Enquiry`}
                          className="admin-btn-secondary"
                          style={{ padding: '0.45rem 0.85rem', textDecoration: 'none' }}
                        >
                          <Mail size={13} /> Email
                        </a>

                        <select
                          value={status}
                          onChange={e => handleUpdateInquiryStatus(inq.id, e.target.value)}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#0F172A',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '2px',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0.4rem' }}
                          title="Delete inquiry"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 4: BLOGS & EDITORIAL PUBLICATIONS ── */}
        {activeTab === 'blogs' && (
          <div className="admin-glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ color: '#000000', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Publications & Research Insights
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.82rem', margin: '0.25rem 0 0' }}>
                  Manage editorial market intelligence, architectural whitepapers, and wealth reports.
                </p>
              </div>

              <button onClick={handleOpenBlogCreate} className="admin-btn-primary">
                <Plus size={14} /> New Publication
              </button>
            </div>

            {blogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <FileText size={36} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: '#64748B' }}>No articles published yet.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {blogs.map(blog => (
                  <div
                    key={blog.id}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    <div style={{ height: '160px', position: 'relative', backgroundColor: '#F1F5F9' }}>
                      <img
                        src={blog.image || '/areas/creek_harbour.webp'}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', background: '#000000', color: '#FFFFFF', fontSize: '0.62rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {blog.category || 'Advisory'}
                      </div>
                      {blog.featured && (
                        <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', background: '#FEF9C3', border: '1px solid #FACC15', color: '#854D0E', fontSize: '0.6rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '2px', textTransform: 'uppercase' }}>
                          Featured
                        </div>
                      )}
                    </div>

                    <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ color: '#94A3B8', fontSize: '0.72rem', marginBottom: '0.4rem' }}>
                        {blog.date} • {blog.readTime || '5 min read'}
                      </div>
                      <h4 style={{ color: '#000000', fontSize: '0.98rem', fontWeight: 600, margin: '0 0 0.5rem', lineHeight: 1.4 }}>
                        {blog.title}
                      </h4>
                      <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, margin: '0 0 1rem', flex: 1 }}>
                        {blog.excerpt ? `${blog.excerpt.slice(0, 110)}...` : 'Comprehensive real estate insight.'}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '0.8rem' }}>
                        <a
                          href={`/blogs`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#000000', fontSize: '0.75rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
                        >
                          View in Blog <ArrowUpRight size={12} />
                        </a>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleOpenBlogEdit(blog)} className="admin-btn-secondary" style={{ padding: '0.35rem 0.65rem' }}>
                            <Edit3 size={13} /> Edit
                          </button>
                          <button onClick={() => handleBlogDelete(blog.id, blog.title)} style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', cursor: 'pointer', padding: '0.35rem 0.55rem', borderRadius: '2px' }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════
          PROPERTY & CATALOG REDESIGNED MODAL
      ══════════════════════════════════════════════ */}
      {isFormOpen && (
        <div className="admin-modal-backdrop" onClick={e => e.target === e.currentTarget && setIsFormOpen(false)}>
          <div className="admin-modal-container">
            
            {/* Modal Header */}
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFAFA' }}>
              <div>
                <span style={{ fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>
                  {formType === 'create' ? 'Curate New Listing' : `Editing ID #${editingId}`}
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: '#000000', fontSize: '1.6rem', margin: '0.2rem 0 0', textTransform: 'uppercase', fontWeight: 300 }}>
                  {formType === 'create' ? 'Add Residence or Master Catalog' : (propertyForm.title || 'Edit Listing')}
                </h2>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#0F172A', fontSize: '1.1rem', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Internal Navigation Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', padding: '0 2rem', overflowX: 'auto' }}>
              <button
                type="button"
                onClick={() => setModalTab('core')}
                className={`admin-nav-tab ${modalTab === 'core' ? 'active' : ''}`}
                style={{ padding: '0.8rem 1.1rem', fontSize: '0.75rem' }}
              >
                1. Core Specs
              </button>
              <button
                type="button"
                onClick={() => setModalTab('catalog')}
                className={`admin-nav-tab ${modalTab === 'catalog' ? 'active' : ''}`}
                style={{ padding: '0.8rem 1.1rem', fontSize: '0.75rem' }}
              >
                2. Master Development / Off-Plan
              </button>
              <button
                type="button"
                onClick={() => setModalTab('gallery')}
                className={`admin-nav-tab ${modalTab === 'gallery' ? 'active' : ''}`}
                style={{ padding: '0.8rem 1.1rem', fontSize: '0.75rem' }}
              >
                3. Multi-Image Gallery ({propertyForm.images.length})
              </button>
              <button
                type="button"
                onClick={() => setModalTab('features')}
                className={`admin-nav-tab ${modalTab === 'features' ? 'active' : ''}`}
                style={{ padding: '0.8rem 1.1rem', fontSize: '0.75rem' }}
              >
                4. Features & Description
              </button>
              <button
                type="button"
                onClick={() => setModalTab('floors')}
                className={`admin-nav-tab ${modalTab === 'floors' ? 'active' : ''}`}
                style={{ padding: '0.8rem 1.1rem', fontSize: '0.75rem' }}
              >
                5. Floor Plans ({propertyForm.floors.length})
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handlePropertySubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflowY: 'auto' }}>

              {/* ── TAB 1: CORE SPECIFICATIONS ── */}
              {modalTab === 'core' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Listing Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. The Concrete Oasis Villa, Peninsula by H&H, Palm Crescent Estate"
                      value={propertyForm.title}
                      onChange={e => setPropertyForm({ ...propertyForm, title: e.target.value })}
                      className="admin-input-luxury"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Catalog Type *
                      </label>
                      <select
                        value={propertyForm.type}
                        onChange={e => setPropertyForm({ ...propertyForm, type: e.target.value })}
                        className="admin-input-luxury"
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="ready">Ready Property (Immediate Acquisition / Buy)</option>
                        <option value="off-plan">Off-Plan Master Catalog (New Development)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Category *
                      </label>
                      <select
                        value={propertyForm.category}
                        onChange={e => setPropertyForm({ ...propertyForm, category: e.target.value })}
                        className="admin-input-luxury"
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="villas">Villas & Mansions</option>
                        <option value="penthouses">Penthouses & Sky Duplexes</option>
                        <option value="apartments">Luxury Apartments & Residences</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Asking / Starting Price *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. AED 18,500,000"
                        value={propertyForm.price}
                        onChange={e => setPropertyForm({ ...propertyForm, price: e.target.value })}
                        className="admin-input-luxury"
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Location / District *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Emirates Hills, Palm Jumeirah, Downtown Dubai"
                        value={propertyForm.location}
                        onChange={e => setPropertyForm({ ...propertyForm, location: e.target.value })}
                        className="admin-input-luxury"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Status
                      </label>
                      <select
                        value={propertyForm.status}
                        onChange={e => setPropertyForm({ ...propertyForm, status: e.target.value })}
                        className="admin-input-luxury"
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="Available">Available</option>
                        <option value="Presale">Presale / EOI Active</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Sold">Sold / Off Market</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem', gap: '0.6rem' }}>
                      <input
                        type="checkbox"
                        id="modal-starred"
                        checked={propertyForm.starred}
                        onChange={e => setPropertyForm({ ...propertyForm, starred: e.target.checked })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#000000' }}
                      />
                      <label htmlFor="modal-starred" style={{ fontSize: '0.82rem', color: '#0F172A', cursor: 'pointer', fontWeight: 500 }}>
                        Feature as Curated Highlight on Homepage
                      </label>
                    </div>
                  </div>

                  {propertyForm.type === 'ready' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem' }}>Bedrooms</label>
                        <input
                          type="number"
                          min="0"
                          value={propertyForm.beds}
                          onChange={e => setPropertyForm({ ...propertyForm, beds: parseInt(e.target.value) || 0 })}
                          className="admin-input-luxury"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem' }}>Bathrooms</label>
                        <input
                          type="number"
                          min="0"
                          value={propertyForm.baths}
                          onChange={e => setPropertyForm({ ...propertyForm, baths: parseInt(e.target.value) || 0 })}
                          className="admin-input-luxury"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem' }}>Built-Up Area</label>
                        <input
                          type="text"
                          placeholder="e.g. 6,500 Sq. Ft."
                          value={propertyForm.size}
                          onChange={e => setPropertyForm({ ...propertyForm, size: e.target.value })}
                          className="admin-input-luxury"
                        />
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ── TAB 2: DEVELOPMENT & OFF-PLAN CATALOG ── */}
              {modalTab === 'catalog' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '1rem', borderRadius: '4px', color: '#0369A1', fontSize: '0.82rem' }}>
                    <strong style={{ color: '#0C4A6E' }}>Master Development Specifications:</strong> Configure handover timeline, developer payment schemes, and marketing pack URLs for master-planned developments.
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Handover Quarter / Year
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Q4 2028 or Ready"
                        value={propertyForm.handover}
                        onChange={e => setPropertyForm({ ...propertyForm, handover: e.target.value })}
                        className="admin-input-luxury"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Payment Plan
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 80/20 on Handover, 60/40, 70/30"
                        value={propertyForm.payment_plan}
                        onChange={e => setPropertyForm({ ...propertyForm, payment_plan: e.target.value })}
                        className="admin-input-luxury"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Bedrooms Range
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 3, 4 & 5 Bedrooms, 4 - 6 Bedroom Mansions"
                        value={propertyForm.bedrooms_range}
                        onChange={e => setPropertyForm({ ...propertyForm, bedrooms_range: e.target.value })}
                        className="admin-input-luxury"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Property Typology
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Waterfront Villas, Golf Mansions, Branded Residences"
                        value={propertyForm.property_type}
                        onChange={e => setPropertyForm({ ...propertyForm, property_type: e.target.value })}
                        className="admin-input-luxury"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Dropbox Agent Marketing Pack / Brochure Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.dropbox.com/scl/fo/... or direct download URL"
                      value={propertyForm.dropbox_link}
                      onChange={e => setPropertyForm({ ...propertyForm, dropbox_link: e.target.value })}
                      className="admin-input-luxury"
                    />
                    <span style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.3rem', display: 'block' }}>
                      Allows prospective clients to download official masterplan brochures and unit layout packs.
                    </span>
                  </div>

                </div>
              )}

              {/* ── TAB 3: MULTI-IMAGE GALLERY MANAGER ── */}
              {modalTab === 'gallery' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Upload Box */}
                  <div
                    onClick={() => multiFileInputRef.current?.click()}
                    style={{
                      border: '2px dashed #CBD5E1',
                      borderRadius: '4px',
                      padding: '2.5rem 1.5rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: '#F8FAFC',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#000000'}
                    onMouseOut={e => e.currentTarget.style.borderColor = '#CBD5E1'}
                  >
                    <UploadCloud size={36} color="#0F172A" style={{ margin: '0 auto 0.75rem' }} />
                    <h4 style={{ color: '#0F172A', fontSize: '1rem', fontWeight: 600, margin: '0 0 0.3rem' }}>
                      {imageUploadLoading ? 'Uploading Images to Server...' : 'Click to Upload Multiple High-Res Images'}
                    </h4>
                    <p style={{ color: '#64748B', fontSize: '0.8rem', margin: 0 }}>
                      Upload JPG, PNG, WEBP files simultaneously. Files are processed and served directly to the gallery.
                    </p>
                    <input
                      type="file"
                      ref={multiFileInputRef}
                      onChange={handleMultiImageUpload}
                      multiple
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </div>

                  {/* Add URL Form */}
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <input
                      type="text"
                      placeholder="Or paste an image URL (/areas/emirates_hills.webp, https://...)"
                      value={imageUrlInput}
                      onChange={e => setImageUrlInput(e.target.value)}
                      className="admin-input-luxury"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="admin-btn-secondary"
                      style={{ flexShrink: 0 }}
                    >
                      <Plus size={14} /> Add URL
                    </button>
                  </div>

                  {/* Visual Image Grid */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                      <span style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', fontWeight: 600 }}>
                        Catalog Gallery ({propertyForm.images.length} Image{propertyForm.images.length !== 1 ? 's' : ''})
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                        Image #1 is automatically used as the primary cover picture across website cards.
                      </span>
                    </div>

                    {propertyForm.images.length === 0 ? (
                      <div style={{ padding: '2.5rem', textAlign: 'center', background: '#F8FAFC', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                        <ImageIcon size={30} color="#94A3B8" style={{ margin: '0 auto 0.6rem' }} />
                        <p style={{ color: '#64748B', fontSize: '0.82rem', margin: 0 }}>No images added yet. Upload files above or paste a URL.</p>
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                        {propertyForm.images.map((imgUrl, idx) => {
                          const isCover = idx === 0;
                          return (
                            <div
                              key={idx}
                              style={{
                                background: '#FFFFFF',
                                border: `1px solid ${isCover ? '#000000' : '#E2E8F0'}`,
                                borderRadius: '4px',
                                overflow: 'hidden',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                              }}
                            >
                              <div style={{ height: '110px', position: 'relative', background: '#F1F5F9' }}>
                                <img
                                  src={imgUrl}
                                  alt={`Image ${idx + 1}`}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={e => { e.target.src = '/listing_villa.webp'; }}
                                />
                                {isCover && (
                                  <div style={{ position: 'absolute', top: '6px', left: '6px', background: '#000000', color: '#FFFFFF', fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '2px', textTransform: 'uppercase' }}>
                                    ★ Cover
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  style={{
                                    position: 'absolute',
                                    top: '6px',
                                    right: '6px',
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem'
                                  }}
                                  title="Remove image"
                                >
                                  ✕
                                </button>
                              </div>

                              <div style={{ padding: '0.5rem 0.6rem', background: '#FAFAFA', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.68rem', color: '#64748B' }}>
                                  #{idx + 1}
                                </span>
                                {!isCover && (
                                  <button
                                    type="button"
                                    onClick={() => handleSetCoverImage(idx)}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      color: '#0F172A',
                                      fontSize: '0.68rem',
                                      cursor: 'pointer',
                                      fontWeight: 600,
                                      textDecoration: 'underline'
                                    }}
                                  >
                                    Set as Cover
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* ── TAB 4: FEATURES & DESCRIPTION ── */}
              {modalTab === 'features' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Architectural & Investment Summary
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Elaborate on the architectural style, bespoke interior finishes, private grounds, views, and investor potential..."
                      value={propertyForm.description}
                      onChange={e => setPropertyForm({ ...propertyForm, description: e.target.value })}
                      className="admin-input-luxury"
                      style={{ resize: 'vertical', lineHeight: 1.6 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Features & Bespoke Amenities
                    </label>

                    {/* Pre-made tag pills */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {[
                        'Private Infinity Pool', 'Direct Beach Access', 'Crystal Lagoon',
                        'Golf Course View', 'Burj Khalifa View', 'Marina Skyline View',
                        'Smart Home Automation', 'Valet Parking', 'Concierge 24/7',
                        'Private Cinema', 'Spa & Wellness Suite', 'Rooftop Lounge'
                      ].map(feature => {
                        const isAdded = propertyForm.features.includes(feature);
                        return (
                          <button
                            key={feature}
                            type="button"
                            onClick={() => isAdded ? handleRemoveFeatureTag(feature) : handleAddFeatureTag(feature)}
                            style={{
                              padding: '0.35rem 0.75rem',
                              borderRadius: '2px',
                              fontSize: '0.72rem',
                              cursor: 'pointer',
                              background: isAdded ? '#000000' : '#F1F5F9',
                              border: `1px solid ${isAdded ? '#000000' : '#E2E8F0'}`,
                              color: isAdded ? '#FFFFFF' : '#475569',
                              transition: 'all 0.15s ease',
                              fontWeight: isAdded ? 600 : 400
                            }}
                          >
                            {isAdded ? '✓ ' : '+ '} {feature}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Feature Add Input */}
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <input
                        type="text"
                        placeholder="Add custom amenity or feature tag (e.g. Private Marina Berth)..."
                        value={customFeatureInput}
                        onChange={e => setCustomFeatureInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeatureTag(customFeatureInput); } }}
                        className="admin-input-luxury"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddFeatureTag(customFeatureInput)}
                        className="admin-btn-secondary"
                        style={{ flexShrink: 0 }}
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>

                    {/* Active tags display */}
                    {propertyForm.features.length > 0 && (
                      <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {propertyForm.features.map(f => (
                          <span
                            key={f}
                            style={{
                              background: '#0F172A',
                              border: '1px solid #0F172A',
                              color: '#FFFFFF',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '2px',
                              fontSize: '0.72rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem'
                            }}
                          >
                            {f}
                            <button
                              type="button"
                              onClick={() => handleRemoveFeatureTag(f)}
                              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* ── TAB 5: FLOOR PLANS & ARCHITECTURAL UNITS ── */}
              {modalTab === 'floors' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '4px' }}>
                    <h4 style={{ color: '#0F172A', fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: 600 }}>Add Architectural Level / Floor</h4>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <input
                        type="text"
                        placeholder="Floor / Level Name (e.g. Level 1 - Living & Garden, Sky Penthouse)"
                        value={newLevel.name}
                        onChange={e => setNewLevel({ ...newLevel, name: e.target.value })}
                        className="admin-input-luxury"
                      />
                      <button
                        type="button"
                        onClick={handleAddLevel}
                        className="admin-btn-primary"
                        style={{ flexShrink: 0 }}
                      >
                        <Plus size={14} /> Add Floor
                      </button>
                    </div>
                  </div>

                  {propertyForm.floors.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#64748B', fontSize: '0.82rem' }}>
                      No floors configured. Add a level above if you wish to configure interactive unit layouts.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {propertyForm.floors.map(lvl => (
                        <div key={lvl.id} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.6rem' }}>
                            <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{lvl.name}</strong>
                            <button
                              type="button"
                              onClick={() => handleRemoveLevel(lvl.id)}
                              style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '0.75rem', cursor: 'pointer' }}
                            >
                              Remove Level
                            </button>
                          </div>

                          {/* Existing Flats / Units */}
                          {lvl.flats && lvl.flats.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                              {lvl.flats.map((flat, fIdx) => (
                                <div key={fIdx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.6rem 0.8rem', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                                  <div>
                                    <strong style={{ color: '#0F172A' }}>{flat.name}</strong> • <span style={{ color: '#059669', fontWeight: 600 }}>{flat.price}</span> • {flat.size} • {flat.beds}B/{flat.baths}Ba
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFlat(lvl.id, fIdx)}
                                    style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer' }}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add Flat Inputs */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                              type="text"
                              placeholder="Suite / Unit Name"
                              value={flatForms[lvl.id]?.name || ''}
                              onChange={e => setFlatForms({ ...flatForms, [lvl.id]: { ...(flatForms[lvl.id] || {}), name: e.target.value } })}
                              className="admin-input-luxury"
                              style={{ padding: '0.5rem', fontSize: '0.78rem' }}
                            />
                            <input
                              type="text"
                              placeholder="Price (e.g. AED 4.5M)"
                              value={flatForms[lvl.id]?.price || ''}
                              onChange={e => setFlatForms({ ...flatForms, [lvl.id]: { ...(flatForms[lvl.id] || {}), price: e.target.value } })}
                              className="admin-input-luxury"
                              style={{ padding: '0.5rem', fontSize: '0.78rem' }}
                            />
                            <input
                              type="text"
                              placeholder="Size (e.g. 1,800 Sq. Ft.)"
                              value={flatForms[lvl.id]?.size || ''}
                              onChange={e => setFlatForms({ ...flatForms, [lvl.id]: { ...(flatForms[lvl.id] || {}), size: e.target.value } })}
                              className="admin-input-luxury"
                              style={{ padding: '0.5rem', fontSize: '0.78rem' }}
                            />
                            <button
                              type="button"
                              onClick={() => handleAddFlat(lvl.id)}
                              className="admin-btn-secondary"
                              style={{ padding: '0.5rem', fontSize: '0.72rem', justifyContent: 'center' }}
                            >
                              + Add Unit
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* Modal Footer Controls */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {modalTab !== 'floors' ? (
                    <button
                      type="button"
                      onClick={() => {
                        const tabs = ['core', 'catalog', 'gallery', 'features', 'floors'];
                        const currIdx = tabs.indexOf(modalTab);
                        if (currIdx < tabs.length - 1) setModalTab(tabs[currIdx + 1]);
                      }}
                      className="admin-btn-secondary"
                    >
                      Next Section →
                    </button>
                  ) : null}

                  <button
                    type="submit"
                    className="admin-btn-primary"
                  >
                    <Check size={15} /> Save & Synchronize Listing
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          AI CAMPAIGN SCAN MODAL
      ══════════════════════════════════════════════ */}
      {isUploadOptionOpen && (
        <div className="admin-modal-backdrop" onClick={e => e.target === e.currentTarget && setIsUploadOptionOpen(false)}>
          <div className="admin-modal-container" style={{ maxWidth: '520px' }}>
            
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Sparkles size={18} color="#059669" />
                <h3 style={{ color: '#000000', margin: 0, fontSize: '1.15rem', fontFamily: 'var(--font-serif)', textTransform: 'uppercase' }}>AI Campaign & Brochure Scan</h3>
              </div>
              <button onClick={() => setIsUploadOptionOpen(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Option A: Scan via Dropbox Agent Link
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="url"
                    placeholder="https://www.dropbox.com/scl/fo/..."
                    value={dropboxInputUrl}
                    onChange={e => setDropboxInputUrl(e.target.value)}
                    className="admin-input-luxury"
                  />
                  <button
                    type="button"
                    onClick={handleScanDropboxUrl}
                    disabled={scanningDoc}
                    className="admin-btn-primary"
                    style={{ flexShrink: 0 }}
                  >
                    Scan
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.75rem' }}>— OR —</div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#475569', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Option B: Upload PDF / Word / Excel Brochure
                </label>
                <input
                  type="file"
                  ref={docUploadInputRef}
                  onChange={handleUploadDoc}
                  accept=".pdf,.docx,.xlsx,.xls,.zip,image/*"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => docUploadInputRef.current?.click()}
                  className="admin-btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                >
                  <UploadCloud size={16} /> Choose Document to Parse
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          BLOG & PUBLICATION MODAL
      ══════════════════════════════════════════════ */}
      {isBlogFormOpen && (
        <div className="admin-modal-backdrop" onClick={e => e.target === e.currentTarget && setIsBlogFormOpen(false)}>
          <div className="admin-modal-container" style={{ maxWidth: '780px' }}>
            
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFAFA' }}>
              <h3 style={{ color: '#000000', margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-serif)', textTransform: 'uppercase' }}>
                {blogFormType === 'create' ? 'Create Luxury Insight Publication' : 'Edit Publication'}
              </h3>
              <button onClick={() => setIsBlogFormOpen(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleBlogSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.35rem', fontWeight: 600 }}>Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Dubai Super-Prime Real Estate Forecast"
                  value={blogForm.title}
                  onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="admin-input-luxury"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.35rem', fontWeight: 600 }}>Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Market Trends, Advisory"
                    value={blogForm.category}
                    onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="admin-input-luxury"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.35rem', fontWeight: 600 }}>Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={blogForm.readTime}
                    onChange={e => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="admin-input-luxury"
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="blog-featured"
                    checked={blogForm.featured}
                    onChange={e => setBlogForm({ ...blogForm, featured: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#000000' }}
                  />
                  <label htmlFor="blog-featured" style={{ color: '#0F172A', fontSize: '0.8rem', fontWeight: 500 }}>Featured Article</label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.35rem', fontWeight: 600 }}>Cover Image URL</label>
                <input
                  type="text"
                  placeholder="/areas/emirates_hills.webp or https://..."
                  value={blogForm.image}
                  onChange={e => setBlogForm({ ...blogForm, image: e.target.value })}
                  className="admin-input-luxury"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.35rem', fontWeight: 600 }}>Excerpt Summary</label>
                <textarea
                  rows={2}
                  placeholder="Short introductory summary for card previews..."
                  value={blogForm.excerpt}
                  onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="admin-input-luxury"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.35rem', fontWeight: 600 }}>Full Article Content</label>
                <textarea
                  rows={8}
                  placeholder="Full publication content..."
                  value={blogForm.content}
                  onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="admin-input-luxury"
                  style={{ lineHeight: 1.6 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
                <button type="button" onClick={() => setIsBlogFormOpen(false)} className="admin-btn-secondary">Cancel</button>
                <button type="submit" className="admin-btn-primary">Save Publication</button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
