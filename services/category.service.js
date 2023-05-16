const DB = require('../database/database');
const sql = require('mssql');

module.exports = {

async get() {
  let pool = await DB.connect();
  return new Promise(function (resolve, reject) {
    let qry = "SELECT * FROM categories";
    pool.request().query(qry, (err, categories) => {
      if (err) {
        reject(err);
      } else {
        resolve(categories.recordset);
      }
    });
  }) 
},

create:  async (data) => {
  return DB.connect().then((pool) => {
    return pool.request().input('description', sql.VarChar(100), data.description).input('enabled', sql.Int, data.enabled).execute('sp_create_category')
    .then(function(ret) { return ret.output })
    .catch(function(err) { throw err.message });
  })
  },

  ProductosPorCategoria: async function (minimo) {
    /* console.log('Valor de minimo:', minimo); */

    let query = `SELECT c.description, COUNT(p.idproduct) as cantidad FROM categories c 
    INNER JOIN products p ON c.idcategory = p.idcategory GROUP BY c.description`;

if (minimo != null && minimo !== '') {
query += ' HAVING COUNT(p.idproduct) >= @minimo';
}

try {
  const pool = await DB.connect(); 
  const request = pool.request();

  if (minimo != null && minimo !== '') {
    request.input('minimo', sql.Int, minimo);
  }

  const result = await request.query(query);
  return result.recordset;
} catch (err) {
  console.error('Error al obtener la información:', err);
  throw new Error('Ocurrió un error al obtener la información');
}
}

    


}
