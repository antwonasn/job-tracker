"use client";

import React from 'react';

export interface Job {
  id: string;
  company: string;
  role: string;
  platform: string;
  status: string;
  appliedDate: string | null;
  doubleDown: boolean;
  followedUp: boolean;
  createdAt: string;
}

interface JobTableProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const isFollowUpDue = (appliedDate: string, followedUp: boolean) => {
  const applied = new Date(appliedDate);
  const today = new Date();
  const diffDays = Math.floor(
    (today.getTime() - applied.getTime()) / (1000 * 60 * 60 * 24)
  );
  return !followedUp && diffDays >= 4;
};

const JobTable: React.FC<JobTableProps> = ({ jobs, setJobs }) => {
  const markAsFollowedUp = (index: number) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].followedUp = true;
    setJobs(updatedJobs);
  };

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border border-gray-200 text-sm'>
        <thead className='bg-gray-100 sticky top-0 z-10'>
          <tr className='text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
            <th className='p-3 border text-black'>Company</th>
            <th className='p-3 border text-black'>Role</th>
            <th className='p-3 border text-black'>Platform</th>
            <th className='p-3 border text-black'>Applied</th>
            <th className='p-3 border text-black'>Double Down</th>
            <th className='p-3 border text-black'>Followed Up</th>
            <th className='p-3 border text-black'>Status</th>
            <th className='p-3 border text-black'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, idx) => {
            const highlight =
              job.appliedDate && isFollowUpDue(job.appliedDate, job.followedUp);
            return (
              <tr
                key={idx}
                className={`even:bg-white odd:bg-gray-50 hover:bg-gray-200 transition-colors ${
                  highlight ? '!bg-yellow-100 text-yellow-900' : ''
                }`}
              >
                <td className='p-3 border text-black'>{job.company}</td>
                <td className='p-3 border text-black'>{job.role}</td>
                <td className='p-3 border text-black'>{job.platform}</td>
                <td className='p-3 border text-black'>{job.appliedDate}</td>
                <td className='p-3 border text-black text-center'>
                  {job.doubleDown ? '✅' : '—'}
                </td>
                <td className='p-3 border text-black text-center'>
                  {job.followedUp ? '✅' : '—'}
                </td>
                <td className='p-3 border text-black'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium
                      ${
                        job.status === 'To Apply'
                          ? 'bg-yellow-100 text-yellow-800'
                          : job.status === 'Applied'
                          ? 'bg-blue-100 text-blue-800'
                          : job.status === 'Interviewing'
                          ? 'bg-green-100 text-green-800'
                          : job.status === 'Ghosted'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className='p-3 border text-black'>
                  {highlight ? (
                    <button
                      onClick={() => markAsFollowedUp(idx)}
                      className='px-2 py-1 text-xs bg-yellow-300 text-yellow-900 rounded hover:bg-yellow-400'
                    >
                      Mark Followed Up
                    </button>
                  ) : (
                    <div className='h-5 w-full' />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
