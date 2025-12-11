// Vehicles page
import React from 'react';
import { VehicleSelector } from '../../components/product/VehicleSelector';

export const VehiclesPage: React.FC = () => {
  const handleVehicleSelect = (make: string, model: string, year: number) => {
    console.log(`Selected: ${year} ${make} ${model}`);
    // Redirect to search with filters
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Select Your Vehicle</h1>
      <VehicleSelector onVehicleSelect={handleVehicleSelect} />
    </div>
  );
};
