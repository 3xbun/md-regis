// Shared NocoDB v3 API client for the MD-Regis base.
// v3 response shape: { records: [{ id, id_fields, fields: {...} }] }
// We flatten each record to { Id, ...fields } so components keep working
// with the old v2-style field access.
import axios from "axios";

const BASE_URL = "https://ndb.3xbun.com/api/v3/data/p4g852mum0gbpdf";
const TOKEN =
  import.meta.env.VITE_NOCODB_TOKEN ||
  "wU0uyFeODMGzOqqkIUethPYhnZn_FqXXgifuiXWu";

export const TABLES = {
  allScore: "mv3bon2e35ra87d",
  works: "mo7prb5q18ojbfu",
  qrCode: "meaysop7m06dtlm",
};

const client = axios.create({
  headers: { "xc-token": TOKEN },
});

const flatten = (r) => ({ Id: r.id, ...r.fields });

/**
 * List records from a table (NocoDB v3).
 * @param {string} table one of TABLES
 * @param {object} opts { where, pageSize, page }
 * @returns {Promise<Array>} flattened records ({ Id, ...fields })
 */
export async function listRecords(table, { where, pageSize = 100, page } = {}) {
  const params = { pageSize };
  if (where) params.where = where;
  if (page) params.page = page;

  const res = await client.get(`${BASE_URL}/${table}/records`, { params });
  return (res.data.records || []).map(flatten);
}

/**
 * Create a record in a table (NocoDB v3).
 * @param {string} table one of TABLES
 * @param {object} fields field map for the new record
 */
export async function createRecord(table, fields) {
  const res = await client.post(`${BASE_URL}/${table}/records`, { fields });
  const rec = (res.data.records || [res.data])[0];
  return flatten(rec);
}

/**
 * Update a record by numeric row id (NocoDB v3).
 * This build wants PATCH on the collection with an array body:
 *   [{ id, fields: {...} }]
 * (PATCH/PUT on /records/{id} 404s on this server.)
 * @param {string} table one of TABLES
 * @param {number|string} id numeric record id
 * @param {object} fields field map to update
 */
export async function updateRecord(table, id, fields) {
  const res = await client.patch(`${BASE_URL}/${table}/records`, [
    { id: Number(id), fields },
  ]);
  const rec = (res.data.records || [res.data])[0];
  return flatten(rec);
}
