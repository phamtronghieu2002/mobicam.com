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
    const [results] = await con.query('SELECT * FROM contentQA WHERE cateId = ?', [id]);
    console.log("results",results);
    return results;
  }
const getQAList = async () => {
    const [results] = await con.query('SELECT id, name_vi, name_en FROM categoriesQA');

   for(let i=0;i<results.length;i++){
      let qaDetail = await getQADetails(results[i].id);
      results[i].detail = qaDetail;
   }
    return results;
  }

  module.exports = {getPolicyDetails,getPolicyList,getQADetails,getQAList}