'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [jobs, setJobs] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredListings, setFilteredListings] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:3000/api/jobs');
        const data = await res.json();
        if (data) {
          setFilteredListings(data);
          setJobs(data);
        }
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

  return (
    <Main
      jobs={jobs}
      activeFilters={activeFilters}
      setActiveFilters={setActiveFilters}
      filteredListings={filteredListings}
      setFilteredListings={setFilteredListings}
    />
  );
}

function Main({
  jobs,
  activeFilters,
  setActiveFilters,
  filteredListings,
  setFilteredListings
}) {
  function handleAddFilter(filter) {
    const updatedFilters = [...activeFilters, filter];

    if (!activeFilters.includes(filter)) {
      setActiveFilters(updatedFilters);

      setFilteredListings(
        jobs.filter((listing) =>
          updatedFilters.every((elem) =>
            [
              listing.role,
              listing.level,
              ...listing.tools,
              ...listing.languages
            ].includes(elem)
          )
        )
      );
    }
  }

  function handleRemoveFilter(filter) {
    const updatedFilters = activeFilters.filter((elem) => elem !== filter);

    setActiveFilters(updatedFilters);

    setFilteredListings(
      jobs.filter((listing) =>
        updatedFilters.every((elem) =>
          [
            listing.role,
            listing.level,
            ...listing.tools,
            ...listing.languages
          ].includes(elem)
        )
      )
    );
  }

  return (
    <main>
      <header>Header</header>

      {activeFilters.length ? (
        <div>
          {activeFilters.map((activeFilter) => {
            return (
              <button
                key={activeFilter}
                onClick={() => handleRemoveFilter(activeFilter)}
              >
                {activeFilter + ' X'}
              </button>
            );
          })}
          <button
            onClick={() => {
              setActiveFilters([]);
              setFilteredListings(jobs);
            }}
          >
            clear
          </button>
        </div>
      ) : null}

      {filteredListings &&
        filteredListings.map((job) => {
          const filters = [job.role, job.level, ...job.tools, ...job.languages];
          return (
            <article key={job}>
              <Image
                width={48}
                height={48}
                src={job.logo}
                alt={job.company + ' logo'}
              />
              <div>
                <span>{job.company}</span>
                {job.new && <span>new!</span>}
                {job.featured && <span>featured!</span>}
              </div>

              <h2>{job.position}</h2>
              <div>
                <span>{job.postedAt}</span>
                <span>{job.contract}</span>
                <span>{job.location}</span>
              </div>
              <div className="w-[279px] max-w-[90%] h-[1px] bg-[#B7C4C4]"></div>
              <div>
                {filters.map((filter) => {
                  return (
                    <button
                      key={filter}
                      onClick={() => handleAddFilter(filter)}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
    </main>
  );
}

function Loading() {
  return <div>Loading...</div>;
}
