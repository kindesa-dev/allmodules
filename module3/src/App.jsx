import { useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import Filter from './components/Filter.jsx';
import StudentList from './components/StudentList.jsx';
import studentsData from './data/students.js';

const departments = [ 
  ...new Set(studentsData.map((student) => student.department)),
].sort();

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch = student.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === '' || student.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  function handleReset() {
    setSearchQuery('');
    setSelectedDepartment('');
  }

  return (
    <div className="app">
      <Header />
      <div className="toolbar">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <Filter
          departments={departments}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
        />
        {(searchQuery !== '' || selectedDepartment !== '') && (
          <button
            type="button"
            className="button button--secondary"
            onClick={handleReset}
          >
            Clear Filters
          </button>
        )}
      </div>
      <StudentList students={filteredStudents} onReset={handleReset} />
    </div>
  );
}

export default App;