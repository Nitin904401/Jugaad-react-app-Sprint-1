// Fake API for vehicles
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  variant?: string;
}

const mockVehicles: Vehicle[] = [
  { id: '1', make: 'Toyota', model: 'Corolla', year: 2020 },
  { id: '2', make: 'Toyota', model: 'Fortuner', year: 2021 },
  { id: '3', make: 'Hyundai', model: 'Creta', year: 2022 },
  { id: '4', make: 'Hyundai', model: 'i20', year: 2021 },
  { id: '5', make: 'Maruti', model: 'Swift', year: 2020 },
  { id: '6', make: 'Maruti', model: 'Alto', year: 2019 },
  { id: '7', make: 'Honda', model: 'Jazz', year: 2021 },
  { id: '8', make: 'Honda', model: 'City', year: 2022 },
  { id: '9', make: 'Tata', model: 'Nexon', year: 2022 },
  { id: '10', make: 'Mahindra', model: 'XUV500', year: 2021 }
];

const carMakes = Array.from(new Set(mockVehicles.map((v) => v.make)));

export const getCarMakes = async (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(carMakes), 300);
  });
};

export const getCarModels = async (make: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const models = Array.from(
        new Set(mockVehicles.filter((v) => v.make === make).map((v) => v.model))
      );
      resolve(models);
    }, 300);
  });
};

export const getCarYears = async (make: string, model: string): Promise<number[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const years = Array.from(
        new Set(
          mockVehicles
            .filter((v) => v.make === make && v.model === model)
            .map((v) => v.year)
        )
      ).sort((a, b) => b - a);
      resolve(years);
    }, 300);
  });
};

export const getVehicles = async (): Promise<Vehicle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockVehicles), 400);
  });
};

export const getVehiclesByMake = async (make: string): Promise<Vehicle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVehicles.filter((v) => v.make === make));
    }, 300);
  });
};
