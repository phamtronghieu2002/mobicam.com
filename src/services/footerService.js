const con = require("../db/db.js");

const getPolicyDetails = async (id) => {
  const [results] = await con.query('SELECT * FROM policy WHERE id = ?', [id]);
  return results[0];
}
const getPolicyList = async () => {
  const [results] = await con.query('SELECT id, name_vi, name_en FROM policy');
  return results;
}
const updatePolicy = async (name_vi, name_en, content_vi, content_en, id) => {
  const [results] = await con.query('update policy set name_vi = ?, name_en = ?, content_vi = ?, content_en = ? where id = ?', [name_vi, name_en, content_vi, content_en, id])
  return results.affectedRows
}

const getQADetails = async (id) => {
  const [results] = await con.query('SELECT * FROM contentQA WHERE cateId = ?', [id]);
  return results[0];
}
const getQAList = async () => {
  const [results] = await con.query('SELECT id, name_vi, name_en FROM categoriesQA');
  return results;
}

const getCoopList = async () => {
  const [results] = await con.query('SELECT id,name_vi,name_en from cooperate');
  return results;  
}
const getCoopDetails = async (id,lang) => {
  try {
    const [results] = await con.query(`SELECT name_${lang}, content_${lang} FROM cooperate WHERE id = ?`, [id]);
   
    const response = {}
    response.name = results[0].name_vi;
    response.content = results[0].content_vi;
    return response;
  } catch (error) {
    console.log(error);
  }
}
const getCoopDetailsAdmin = async (id) => {
  try {
    const [results] = await con.query(`SELECT * FROM cooperate WHERE id = ?`, [id]);
    return results[0];
  } catch (error) {
    console.log(error);
  }
}
const updateCoop = async (name_vi, name_en, content_vi, content_en, id) => {
  const [results] = await con.query('update cooperate set name_vi = ?, name_en = ?, content_vi = ?, content_en = ? where id = ?', [name_vi, name_en, content_vi, content_en, id])
  return results.affectedRows
}

module.exports = { getPolicyDetails, getPolicyList, getQADetails, getQAList, updatePolicy,getCoopList, getCoopDetails,updateCoop,getCoopDetailsAdmin }