"use client";

import React, { useEffect, useState } from 'react';
import AddJobForm from './components/AddJobForm';
import JobTable from './components/JobTable';
import { Job } from './components/JobTable'; 

export default function Home() {
  
const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Job Tracker Dashboard</h1>
      <AddJobForm setJobs={setJobs} />
      <JobTable jobs={jobs} setJobs={setJobs} />
    </main>
  );
}
