import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, MapPin, Maximize2, Bed, Image } from 'lucide-react';
import { adminService } from '../adminService';

export default function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    location: '',
    price: '',
    area: '',
    beds: '3 Beds',
    baths: '3.5 Baths',
    completion: '2026',
    image: '',
    tag: 'Featured',
    description: '',
    featuresText: 'Private Sky Terrace, LEED Platinum, Valet & 24/7 Concierge'
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await adminService.getProjects();
      if (res.success && res.data) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Residential',
      location: '',
      price: '',
      area: '',
      beds: '3 Beds',
      baths: '3.5 Baths',
      completion: '2026',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
      tag: 'Featured',
      description: '',
      featuresText: 'Private Sky Terrace, LEED Platinum, Valet & 24/7 Concierge'
    });
    setModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      category: proj.category || 'Residential',
      location: proj.location,
      price: proj.price,
      area: proj.area,
      beds: proj.beds || 'N/A',
      baths: proj.baths || 'N/A',
      completion: proj.completion || '2026',
      image: proj.image,
      tag: proj.tag || 'Featured',
      description: proj.description,
      featuresText: Array.isArray(proj.features) ? proj.features.join(', ') : ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project from MongoDB?')) {
      try {
        const res = await adminService.deleteProject(id);
        if (res.success) {
          setNotification('Project deleted successfully.');
          fetchProjects();
          setTimeout(() => setNotification(''), 3000);
        }
      } catch (err) {
        alert('Failed to delete: ' + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: formData.title,
      category: formData.category,
      location: formData.location,
      price: formData.price,
      area: formData.area,
      beds: formData.beds,
      baths: formData.baths,
      completion: formData.completion,
      image: formData.image,
      tag: formData.tag,
      description: formData.description,
      features: formData.featuresText.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      let res;
      if (editingProject) {
        res = await adminService.updateProject(editingProject._id || editingProject.id, payload);
      } else {
        res = await adminService.createProject(payload);
      }

      if (res.success) {
        setNotification(editingProject ? 'Project updated!' : 'New project published to MongoDB!');
        setModalOpen(false);
        fetchProjects();
        setTimeout(() => setNotification(''), 3000);
      }
    } catch (err) {
      alert('Error saving project: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-stone-200">
        <div>
          <h3 className="text-xl font-black text-[#141714]">
            Manage Luxury Living Projects
          </h3>
          <p className="text-xs text-stone-500">
            {projects.length} developments published in MongoDB Atlas.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D4F138] hover:bg-[#c6e52c] text-[#141714] font-black text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          {notification}
        </div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="p-12 text-center text-stone-500">Loading projects from MongoDB...</div>
      ) : projects.length === 0 ? (
        <div className="bg-white p-12 rounded-[32px] border border-stone-200 text-center text-stone-500">
          No projects found in database. Click "Add New Project" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => {
            const id = proj._id || proj.id;
            return (
              <div
                key={id}
                className="bg-white rounded-[28px] overflow-hidden border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 w-full bg-stone-100 relative">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-black/80 text-[#D4F138] text-[10px] font-bold uppercase">
                        {proj.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full bg-[#D4F138] text-black text-[10px] font-bold">
                        {proj.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#141714]" />
                      <span>{proj.location}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#141714] mb-2">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2 mb-4">
                      {proj.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-stone-600 pt-3 border-t border-stone-100">
                      <span className="font-semibold">{proj.area} • {proj.beds}</span>
                      <span className="text-sm font-black text-[#141714]">{proj.price}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-2 border-t border-stone-50">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div 
            className="bg-white rounded-[32px] max-w-2xl w-full p-8 shadow-2xl relative border border-stone-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-[#141714] mb-6">
              {editingProject ? 'Edit Project' : 'Add New Luxury Project'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Luminara Sky Tower"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Eco Villas</option>
                    <option>Penthouses</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Award Winner, Exclusive"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hudson Yards, New York"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                    Price *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $2,450,000+"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                    Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3,850 sq ft"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                    Beds / Specs
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Beds"
                    value={formData.beds}
                    onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2026"
                    value={formData.completion}
                    onChange={(e) => setFormData({ ...formData, completion: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                  Description *
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Describe architectural features, view, and engineering highlights..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                  Features (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="Private Sky Terrace, LEED Platinum, Heated Pool"
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-[#D4F138] hover:bg-[#c6e52c] text-[#141714] font-black text-xs shadow-md cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingProject ? 'Update in MongoDB' : 'Publish to MongoDB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

