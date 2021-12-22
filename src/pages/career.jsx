import * as React from "react";
import { CareerItem } from "../components/career-item";

const getJobs = (page, signal) => {
  return fetch(
    `https://ecomm-service.herokuapp.com/job?limit=5&page=${page}` +
      (page === 2 ? "&delay=3000" : ""),
    {
      signal,
    }
  ).then((res) => res.json());
};

const createJob = (data) =>
  fetch("https://ecomm-service.herokuapp.com/job", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

const usePersistedState = (storageKey, defaultValue) => {
  const [value, setValue] = React.useState(
    () => sessionStorage.getItem(storageKey) || defaultValue
  );

  React.useEffect(() => {
    sessionStorage.setItem(storageKey, value);
  }, [value, storageKey]);

  return [value, setValue];
};

export const Career = () => {
  const [jobs, setJobs] = React.useState(undefined);
  const [title, setTitle] = usePersistedState("jobTitle", "");

  const [level, setLevel] = usePersistedState("level", "internship");
  const [department, setDepartment] = usePersistedState("department", "");
  const [summary, setSummary] = usePersistedState("summary", "");
  const [headcount, setHeadcount] = usePersistedState("headcount", 1);

  const titleInputRef = React.useRef();

  const loadJobs = (pageNum, signal) =>
    getJobs(pageNum, signal).then((data) => setJobs(data));

  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const ab = new AbortController();
    loadJobs(page, ab.signal);
    return () => {
      ab.abort();
    };
  }, [page]);

  return (
    <div>
      <div>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            createJob({
              title,
              level,
              department,
              summary,
              headcount: Number(headcount),
            }).then(() => {
              loadJobs();
              setTitle("");
              setLevel("internship");
              setDepartment("");
              setSummary("");
              setHeadcount(1);

              if (titleInputRef.current) {
                titleInputRef.current.focus();
              }
            });
          }}
          className="p-3"
        >
          <div className="text-xl mb-3">Add Job Posting</div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm" htmlFor="title">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                required
                ref={titleInputRef}
              />
            </div>
            <div>
              <label className="block text-sm" htmlFor="level">
                Level
              </label>
              <select
                name="level"
                id="level"
                value={level}
                onChange={(ev) => setLevel(ev.target.value)}
                required
              >
                <option value="internship">Internship</option>
                <option value="entry">Entry</option>
                <option value="experienced">Experienced</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div>
              <label className="block text-sm" htmlFor="department">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(ev) => setDepartment(ev.target.value)}
                name="department"
                id="department"
                placeholder="e.g. Engineering"
                required
              />
            </div>
            <div>
              <label className="block text-sm" htmlFor="summary">
                Summary
              </label>
              <textarea
                name="summary"
                id="summary"
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm" htmlFor="headcount">
                Headcount
              </label>
              <input
                type="number"
                name="headcount"
                id="headcount"
                value={headcount}
                onChange={(ev) => setHeadcount(ev.target.value)}
                required
              />
            </div>
            <div>
              <button>ADD</button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-between max-w-xl mx-auto">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button type="button" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      <div className="max-w-xl mx-auto p-6 space-y-5">
        {jobs &&
          jobs.map((job) => (
            <CareerItem
              title={job.title}
              department={job.department}
              level={job.level}
              onEdit={() => alert("Edit btn clicked, populate the form!")}
              onDelete={() => alert("Delete btn clicked, delete the item!")}
              key={job._id}
            />
          ))}
      </div>
    </div>
  );
};
