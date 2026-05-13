import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const colombiaCities = require("colombia-cities");
const divipola = require("divipola");

const removeDiacritics = (value) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const normalize = (value) =>
  removeDiacritics(String(value || ""))
    .replace(/,/g, ".")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

const oldDepartments = colombiaCities.getDepartments();

const oldByDepartment = new Map();
oldDepartments.forEach((department) => {
  const key = normalize(department.nombre);
  const cities = colombiaCities
    .getCitiesByDepartment(department.nombre)
    .map((city) => city.nombre);

  oldByDepartment.set(
    key,
    new Set(cities.map((cityName) => normalize(cityName))),
  );
});

const daneByDepartment = new Map();
divipola.forEach((row) => {
  const deptKey = normalize(row.deptoName);
  if (!daneByDepartment.has(deptKey)) {
    daneByDepartment.set(deptKey, new Set());
  }
  daneByDepartment.get(deptKey).add(normalize(row.mpioName));
});

const allDepartmentKeys = new Set([
  ...oldByDepartment.keys(),
  ...daneByDepartment.keys(),
]);

const report = [];
for (const deptKey of allDepartmentKeys) {
  const oldCities = oldByDepartment.get(deptKey) ?? new Set();
  const daneCities = daneByDepartment.get(deptKey) ?? new Set();

  const missingInOld = [...daneCities].filter((city) => !oldCities.has(city));

  if (missingInOld.length > 0) {
    report.push({
      departamento: deptKey,
      totalAntiguo: oldCities.size,
      totalDane: daneCities.size,
      faltantesEnColombiaCities: missingInOld.sort(),
    });
  }
}

report.sort((a, b) => a.departamento.localeCompare(b.departamento, "es"));

if (report.length === 0) {
  console.log("No hay diferencias entre colombia-cities y divipola.");
  process.exit(0);
}

console.log(`Departamentos con faltantes: ${report.length}`);
for (const item of report) {
  console.log("\n----------------------------------------");
  console.log(`Departamento: ${item.departamento}`);
  console.log(`Total colombia-cities: ${item.totalAntiguo}`);
  console.log(`Total divipola: ${item.totalDane}`);
  console.log(
    `Faltantes en colombia-cities (${item.faltantesEnColombiaCities.length}):`,
  );
  console.log(item.faltantesEnColombiaCities.join(", "));
}
