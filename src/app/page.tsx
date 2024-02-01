'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [jobs, setJobs] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
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
      }
    }

    fetchData();
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }

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
    <div className="bg-[#4d8788] text-[16px]">
      <header className="lg:bg-[url('/images/bg-header-desktop.svg')] bg-[url('/images/bg-header-mobile.svg')] bg-cover h-[150px] bg-no-repeat"></header>

      <main className="flex flex-col items-center bg-[#EFFAFA] min-h-[100vh] ">
        {activeFilters.length ? (
          <div className="bg-[#fff] p-[20px] rounded-[5px] flex justify-between gap-[40px] min-h-[120px] w-[90%] max-w-[320px] translate-y-[-20%] mb-[16px] lg:max-w-[1110px] lg:justify-between lg:px-[40px] lg:py-[25px]">
            <div className="flex flex-wrap w-[66%] gap-[16px] ">
              {activeFilters.map((activeFilter) => {
                return (
                  <button
                    key={activeFilter}
                    className="flex items-center"
                  >
                    <span className="text-[#5ba4a4] px-[8px] pt-[5px] pb-[3px] bg-[#5CA5A5] rounded-s-[5px] bg-opacity-[0.1]">
                      {activeFilter}
                    </span>
                    <span
                      onClick={() => handleRemoveFilter(activeFilter)}
                      className="p-[10px] bg-[#5CA5A5] hover:bg-[#000] rounded-e-[5px]"
                    >
                      <Image
                        src={'/images/icon-remove.svg'}
                        width={13}
                        height={13}
                        alt="remove"
                        className=""
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setActiveFilters([]);
                setFilteredListings(jobs);
              }}
              className="text-[#7C8F8F]"
            >
              clear
            </button>
          </div>
        ) : null}

        {filteredListings &&
          filteredListings.map((job) => {
            const filters = [
              job.role,
              job.level,
              ...job.tools,
              ...job.languages
            ];
            return (
              <article
                key={JSON.stringify(job)}
                className={`mt-[16px] mb-[24px] rounded-[5px] bg-[#fff] p-[24px] pt-[0px] first:mt-[56px] w-[90%] max-w-[320px] lg:max-w-[1110px] lg:flex lg:justify-between lg:items-center lg:pt-[24px] ${
                  job.featured ? 'featured' : ''
                } `}
              >
                <div className="lg:flex items-center gap-[24px]">
                  <Image
                    width={48}
                    height={48}
                    src={job.logo}
                    alt={job.company + ' logo'}
                    className="translate-y-[-50%] lg:w-[88px] lg:translate-y-0"
                  />

                  <div>
                    <div className="mt-[-10px] flex items-center gap-[40px] lg:mt-0">
                      <span className="text-[#5CA5A5] text-[13px] lg:text-[18px]">
                        {job.company}
                      </span>
                      <div className="flex items-center gap-[8px] text-[14px]">
                        {job.new && (
                          <span className="bg-[#5CA5A5] text-[#fff] uppercase px-[8px] pt-[3px] rounded-[999px]">
                            new!
                          </span>
                        )}
                        {job.featured && (
                          <span className="bg-[#000] text-[#fff] uppercase px-[8px] pt-[3px] rounded-[999px]">
                            featured
                          </span>
                        )}
                      </div>
                    </div>

                    <h2 className="hover:text-[#5CA5A5] hover:cursor-pointer my-[9px] text-[15px] lg:text-[22px]">
                      {job.position}
                    </h2>
                    <div className="mb-[15px] font-[500] text-[#7C8F8F] flex gap-[10px] items-center text-[16px] lg:text-[18px]">
                      <span>{job.postedAt}</span>
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="2"
                          cy="2"
                          r="2"
                          fill="#B7C4C4"
                        />
                      </svg>

                      <span>{job.contract}</span>
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="2"
                          cy="2"
                          r="2"
                          fill="#B7C4C4"
                        />
                      </svg>

                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                <div className="w-[279px] w-[100%] h-[1px] bg-[#B7C4C4] lg:hidden"></div>

                <div className="flex flex-wrap gap-[16px] mt-[16px]">
                  {filters.map((filter) => {
                    return (
                      <button
                        key={filter}
                        onClick={() => handleAddFilter(filter)}
                        className="text-[#5ba4a4] px-[8px] pt-[5px] pb-[3px] bg-[#5CA5A5] rounded-[5px] bg-opacity-[0.1] hover:bg-[#5CA5A5] hover:text-[#fff]  "
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
    </div>
  );
}

// function Loading() {
//   return <div>Loading...</div>;
// }
