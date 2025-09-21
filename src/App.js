import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCompany, setFilteredCompany] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      });
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerSearch) &&
        (filteredCompany ? user.company.name === filteredCompany : true)
    );
    setFilteredUsers(filtered);
  }, [search, filteredCompany, users]);

  const uniqueCompanies = [...new Set(users.map((u) => u.company.name))];

  return (
    <div className="App">
      <h1>User Directory</h1>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filteredCompany}
        onChange={(e) => setFilteredCompany(e.target.value)}
      >
        <option value="">All Companies</option>
        {uniqueCompanies.map((company) => (
          <option key={company} value={company}>
            {company}
          </option>
        ))}
      </select>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> – {user.email} – {user.company.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
