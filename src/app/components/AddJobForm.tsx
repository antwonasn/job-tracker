"use client";

import React, { useState } from 'react';
import { Job } from './JobTable'; 

interface JobFormData {
  company: string;
  role: string;
  platform: string;
  status: string;
  appliedDate: string;
  doubleDown: boolean;
  followedUp: boolean;
}

interface AddJobFormProps {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const AddJobForm: React.FC<AddJobFormProps> = ({ setJobs }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    company: '',
    role: '',
    platform: '',
    status: '',
    appliedDate: '',
    doubleDown: false,
    followedUp: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create job');

      await fetchJobs(); // refresh jobs

      setFormData({
        company: '',
        role: '',
        platform: '',
        status: '',
        appliedDate: '',
        doubleDown: false,
        followedUp: false,
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchJobs = async () => {
    const res = await fetch('/api/jobs');
    const jobs = await res.json();
    setJobs(jobs);
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Add Job</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input name='company' value={formData.company} onChange={handleChange} placeholder='Company' />
          <input name='role' value={formData.role} onChange={handleChange} placeholder='Role' />
          <input name='platform' value={formData.platform} onChange={handleChange} placeholder='Platform' />
          <input name='status' value={formData.status} onChange={handleChange} placeholder='Status' />
          <input name='appliedDate' value={formData.appliedDate} onChange={handleChange} placeholder='Applied Date (YYYY-MM-DD)' />
          <label>
            <input type='checkbox' name='doubleDown' checked={formData.doubleDown} onChange={handleChange} />
            Double Down
          </label>
          <label>
            <input type='checkbox' name='followedUp' checked={formData.followedUp} onChange={handleChange} />
            Followed Up
          </label>
          <button type='submit'>Save</button>
          <button type='button' onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default AddJobForm;
