export const API_URL = "https://restcountries.com/v2/all";

export const REGION_FILTER_OPTIONS = [
  "All",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
];

export const ORDER_FILTERS = {
  nameAsc: "Country name (Asc)",
  nameDes: "Country name (Des)",
  populationAsc: "Population (Asc)",
  populationDes: "Population (Des)",
};

export const ORDER_FILTER_OPTIONS = Object.values(ORDER_FILTERS);

export const THEMES = {
  Light: "light-theme",
  Dark: "dark-theme",
};
