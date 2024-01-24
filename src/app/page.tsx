'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [jobs, setJobs] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:3000/api/jobs');
        const data = await res.json();
        if (data) setJobs(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Main />;
}

function Main() {
  return <main>Hello World</main>;
}

function Loading() {
  return <div>Loading...</div>;
}
