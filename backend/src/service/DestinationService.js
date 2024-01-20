const db = require('../../db');

const querying = async (query, values) => {
  await new Promise((resolve, reject) => {
    db.query(query, [values], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const select = async (query) => {
  await new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

class DestinationService {
  async getAllDestination() {
    const dest = await select(`SELECT * FROM destination`);
    console.log(dest);
    return dest;
  }

  async createDestination({ country_id, cost, name, notes }) {
    await querying(
      `INSERT INTO destination (country_id, cost, name, notes) VALUES ?`,
      [[country_id, cost, name, notes]],
    );
  }

  //   async deleteDestination(id) {
  //     await querying(``);
  //   }
}

module.exports = DestinationService;
