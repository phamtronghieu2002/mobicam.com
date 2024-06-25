const con = require("../db/db.js");

const getPolicyDetails = async (id) => {
    const [results] = await con.query('SELECT * FROM policy WHERE id = ?', [id]);
    return results[0];
  }
const getPolicyList = async () => {
    const [results] = await con.query('SELECT id, name_vi, name_en FROM policy');
    return results;
  }
const getQADetails = async (id) => {
    const [results] = await con.query('SELECT * FROM q_a WHERE id = ?', [id]);
    return results[0];
  }
const getQAList = async () => {
    const [results] = await con.query('SELECT id, name_vi, name_en FROM q_a');
    return results;
  }

  module.exports = {getPolicyDetails,getPolicyList,getQADetails,getQAList}