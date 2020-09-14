const cantonCodes: { [key: string]: string } = {
  AG: "Aargau",
  AI: "Appenzell Innerrhoden",
  AR: "Appenzell Ausserrhoden",
  BE: "Bern",
  BL: "Basel Land",
  BS: "Basel Stadt",
  FR: "Freibourg",
  GE: "Genève",
  GL: "Glarus",
  GR: "Graubünden",
  JU: "Jura",
  LU: "Luzern",
  NE: "Neuchâtel",
  NW: "Nidwalden",
  OW: "Obwalden",
  SG: "Sankt Gallen",
  SH: "Schaffhausen",
  SO: "Solothurn",
  SZ: "Schwyz",
  TG: "Thurgau",
  TI: "Ticino",
  UR: "Uri",
  VD: "Vaud",
  VS: "Wallis",
  ZG: "Zug",
  ZH: "Zürich",
};

const cantonNames = Object.keys(cantonCodes).reduce((o, k) => {
  o[cantonCodes[k]] = k;
  return o;
}, {} as { [key: string]: string });

export { cantonCodes, cantonNames };
