import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [part, setPart] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ make, model, year, part });
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-container">
        <div className="search-group">
          <select 
            value={make} 
            onChange={(e) => setMake(e.target.value)}
            required
          >
            <option value="">Select Your Make</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Maruti Suzuki">Maruti Suzuki</option>
            <option value="Tata">Tata</option>
            <option value="Mahindra">Mahindra</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Toyota">Toyota</option>
            <option value="Skoda">Skoda</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
          </select>
        </div>

        <div className="search-group">
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            required
          >
            <option value="">Select Your Model</option>
            <option value="Creta">Creta</option>
            <option value="Swift">Swift</option>
            <option value="Nexon">Nexon</option>
            <option value="Jazz">Jazz</option>
            <option value="City">City</option>
            <option value="Fortuner">Fortuner</option>
          </select>
        </div>

        <div className="search-group">
          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option value="">Select Year</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="search-group">
          <input 
            type="text" 
            placeholder="Find My Part"
            value={part}
            onChange={(e) => setPart(e.target.value)}
          />
        </div>

        <button type="submit" className="search-button">Search</button>
      </div>
    </form>
  );
}
