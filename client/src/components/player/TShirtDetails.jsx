import React, { useState } from 'react';
import { playerAPI } from '../../services/auth';
import toast from 'react-hot-toast';

const TShirtDetails = ({ player, onUpdate }) => {
  const [formData, setFormData] = useState({
    tShirtSize: player?.tShirtSize || '',
    tShirtNumber: player?.tShirtNumber || '',
    tShirtName: player?.tShirtName || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await playerAPI.updateTShirtDetails(formData);
      toast.success('T-Shirt details updated successfully!');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update T-Shirt details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tshirt-form">
      <h3>Update T-Shirt Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>T-Shirt Size</label>
          <select
            name="tShirtSize"
            value={formData.tShirtSize}
            onChange={handleChange}
            required
          >
            <option value="">Select Size</option>
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
            <option value="XXL">Double Extra Large (XXL)</option>
          </select>
        </div>

        <div className="form-group">
          <label>T-Shirt Number</label>
          <input
            type="number"
            name="tShirtNumber"
            value={formData.tShirtNumber}
            onChange={handleChange}
            min="1"
            max="999"
            placeholder="Enter jersey number"
            required
          />
        </div>

        <div className="form-group">
          <label>T-Shirt Name</label>
          <input
            type="text"
            name="tShirtName"
            value={formData.tShirtName}
            onChange={handleChange}
            placeholder="Enter name to print on jersey"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Details'}
        </button>
      </form>
    </div>
  );
};

export default TShirtDetails;
