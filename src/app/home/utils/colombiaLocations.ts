import divipolaData from "divipola";

type DivipolaRecord = {
  mpioCode: string;
  mpioName: string;
  deptoName: string;
};

export interface Department {
  id: number;
  nombre: string;
  totalMunicipios: number;
}

export interface City {
  codigo: string;
  nombre: string;
}

const departmentDisplayOverrides: Record<string, string> = {
  "BOGOTA. D.C.": "Bogota D.C.",
  "ARCHIPIELAGO DE SAN ANDRES. PROVIDENCIA Y SANTA CATALINA":
    "Archipielago De San Andres, Providencia Y Santa Catalina",
};

const cityDisplayOverrides: Record<string, string> = {
  PATIA: "Patia (El Bordo)",
};

const removeDiacritics = (value: string): string =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const normalizeKey = (value: string): string =>
  removeDiacritics(value).replace(/,/g, ".").replace(/\s+/g, " ").trim().toUpperCase();

const toTitleCase = (value: string): string => {
  const lower = value.toLowerCase();
  return lower.replace(/(^|\s|[\-./(])\p{L}/gu, (match) => match.toUpperCase());
};

const rawRecords = divipolaData as DivipolaRecord[];
const records = rawRecords
  .filter((record) => record.mpioCode?.length > 0)
  .map((record) => ({
    ...record,
    deptKey: normalizeKey(record.deptoName),
    cityKey: normalizeKey(record.mpioName),
  }));

const departmentsByKey = new Map<
  string,
  {
    nombre: string;
    cities: City[];
  }
>();

records.forEach((record) => {
  if (!departmentsByKey.has(record.deptKey)) {
    const displayName =
      departmentDisplayOverrides[record.deptKey] ?? toTitleCase(record.deptoName);
    departmentsByKey.set(record.deptKey, {
      nombre: displayName,
      cities: [],
    });
  }

  const dept = departmentsByKey.get(record.deptKey);
  if (!dept) {
    return;
  }

  const cityName = cityDisplayOverrides[record.cityKey] ?? toTitleCase(record.mpioName);
  const exists = dept.cities.some((city) => normalizeKey(city.nombre) === record.cityKey);
  if (!exists) {
    dept.cities.push({
      codigo: record.mpioCode,
      nombre: cityName,
    });
  }
});

const sortedDepartments = Array.from(departmentsByKey.values())
  .map((department, index) => ({
    id: index + 1,
    nombre: department.nombre,
    totalMunicipios: department.cities.length,
    cities: department.cities.sort((a, b) => a.nombre.localeCompare(b.nombre, "es")),
  }))
  .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

const departments = sortedDepartments.map(({ cities: _cities, ...department }) => department);

const departmentCitiesByKey = new Map(
  sortedDepartments.map((department) => [normalizeKey(department.nombre), department.cities]),
);

export const getDepartments = (): Department[] => departments;

export const getCitiesByDepartment = (departamentoNombre: string): City[] => {
  const cityList = departmentCitiesByKey.get(normalizeKey(departamentoNombre));
  return cityList ?? [];
};
