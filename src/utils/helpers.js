export function areStringsMatched(str, search) {
  let lastIndex = 0;

  for (const char of search.toLowerCase()) {
    const index = str.toLowerCase().indexOf(char, lastIndex);

    if (index < lastIndex || index === -1) return false;
    else lastIndex = index + 1;
  }

  return true;
}
