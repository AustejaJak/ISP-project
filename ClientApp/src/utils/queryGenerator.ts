export const generateQueryString = (object: { [key: string]: unknown }) => {
  let query = "?";
  const entries = Object.entries(object);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    if (i !== 0) {
      query += "&";
    }
    query += `${key}=${value}`;
  }
  return query;
};
