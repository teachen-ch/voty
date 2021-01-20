import fs from "fs";

const IMPORT = "public/data/PLZO_CSV_WGS84.csv";
const start = Date.now();
const places: Zip[] = importData(IMPORT);
const end = Date.now();
console.warn(`Imported ${places.length} places in ${end - start}ms`);

export type Zip = {
  place: string;
  zip: number;
  municipality: string;
  canton: string;
  E: number;
  N: number;
  language: string;
};

export type ZipSearch = {
  zip?: number;
  place?: string;
  municipality?: string;
};

export function searchPlace(term?: string): Zip[] {
  return term
    ? places
        .filter(
          (item) =>
            String(item.zip).startsWith(term) || item.place?.startsWith(term)
        )
        .slice(0, 10)
    : [];
}

export function search({ zip, place, municipality }: ZipSearch): Zip[] {
  const z = String(zip);
  const p = place?.toLocaleLowerCase();
  const m = municipality?.toLocaleLowerCase();

  return places
    .filter(
      (item) =>
        (!z || String(item.zip).startsWith(z)) &&
        (!p || item.place.startsWith(p)) &&
        (!m || item.municipality.startsWith(m))
    )
    .slice(0, 10);
}

function parseLine(line: string): Zip {
  const v = line.split(";");
  return {
    place: v[0],
    zip: parseInt(v[1]),
    municipality: v[3],
    canton: v[4],
    E: parseFloat(v[6]),
    N: parseFloat(v[7]),
    language: v[8],
  };
}

function importData(file: string) {
  try {
    const csv = fs.readFileSync(file, "utf8");
    const lines = csv.split("\r\n");
    // remove header
    lines.shift();
    return lines.map((line) => parseLine(line)).filter((zip) => zip.place);
  } catch (err) {
    throw new Error(`Could not import file ${IMPORT}`);
  }
}
