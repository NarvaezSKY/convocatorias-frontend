declare module 'colombia-cities' {
  export interface Department {
    id: number;
    nombre: string;
    totalMunicipios: number;
  }

  export interface City {
    codigo: string;
    nombre: string;
  }

  export interface CityWithDepartment extends City {
    departamento: string;
  }

  export function getDepartments(): Department[];
  export function getCitiesByDepartment(departamentoNombre: string): City[];
  export function findCityByCode(codigo: string): CityWithDepartment | null;
  export function searchCities(nombre: string): CityWithDepartment[];
}
