// VehicleSelector component
import React, { useState, useEffect } from 'react';
import { getCarMakes, getCarModels, getCarYears } from '../../api/vehicles';

interface VehicleSelectorProps {
  onVehicleSelect: (make: string, model: string, year: number) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({ onVehicleSelect }) => {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);

  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');

  useEffect(() => {
    getCarMakes().then(setMakes);
  }, []);

  useEffect(() => {
    if (selectedMake) {
      getCarModels(selectedMake).then(setModels);
      setSelectedModel('');
      setYears([]);
    }
  }, [selectedMake]);

  useEffect(() => {
    if (selectedMake && selectedModel) {
      getCarYears(selectedMake, selectedModel).then(setYears);
      setSelectedYear('');
    }
  }, [selectedMake, selectedModel]);

  const handleSelect = () => {
    if (selectedMake && selectedModel && selectedYear) {
      onVehicleSelect(selectedMake, selectedModel, selectedYear as number);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-lg mb-4">Select Your Vehicle</h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Make</label>
          <select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
          >
            <option value="">Select Make</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!selectedMake}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500 disabled:bg-gray-100\"
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : '')}
            disabled={!selectedModel}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500 disabled:bg-gray-100\"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSelect}
        disabled={!selectedYear}
        className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white font-semibold py-2 rounded transition-colors"
      >
        Search Parts for This Vehicle
      </button>
    </div>
  );
};
