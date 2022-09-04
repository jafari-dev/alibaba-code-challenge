import { ORDER_FILTERS, THEMES } from "./constants";

export function areStringsMatched(str, search) {
  let lastIndex = 0;

  for (const char of search.toLowerCase()) {
    const index = str.toLowerCase().indexOf(char, lastIndex);

    if (index < lastIndex || index === -1) return false;
    else lastIndex = index + 1;
  }

  return true;
}

function orderObjectsByProperty(
  array,
  property,
  options = { isDescending: false }
) {
  if (options.isDescending === false) {
    return array.sort((a, b) => (a[property] > b[property] ? 1 : -1));
  } else {
    return array.sort((a, b) => (a[property] < b[property] ? 1 : -1));
  }
}

export function reorderCountriesByFilter(countries, filter) {
  if (filter === ORDER_FILTERS.nameAsc) {
    return orderObjectsByProperty(countries, "name");
  } else if (filter === ORDER_FILTERS.nameDes) {
    return orderObjectsByProperty(countries, "name", { isDescending: true });
  } else if (filter === ORDER_FILTERS.populationAsc) {
    return orderObjectsByProperty(countries, "population");
  } else if (filter === ORDER_FILTERS.populationDes) {
    return orderObjectsByProperty(countries, "population", {
      isDescending: true,
    });
  } else {
    return countries;
  }
}

