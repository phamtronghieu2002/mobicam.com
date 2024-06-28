const con = require("../db/db.js");


//==================Policy==================
const getPolicyDetails = async (id) => {
try {
  const [results] = await con.query('SELECT * FROM policy WHERE id = ?', [id]);
  return results[0];
} catch (error) {
  console.log("Error getting policy", error);
}
}
const getPolicyList = async () => {
  const [results] = await con.query('SELECT id, name_vi, name_en FROM policy');
  return results;
}
const updatePolicy = async (name_vi, name_en, content_vi, content_en, id) => {
  const [results] = await con.query('update policy set name_vi = ?, name_en = ?, content_vi = ?, content_en = ? where id = ?', [name_vi, name_en, content_vi, content_en, id])
  return results.affectedRows
}
const addPolicy = async (name_vi, name_en, content_vi, content_en ) => {
  const [results] = await db.query('insert into news (name_vi, name_en, content_vi, content_en) values (?,?,?,?)', [name_vi, name_en, content_vi, content_en ])
  return results
}


//==================Q&A==================
const getQADetails = async (id) => {
  const [results] = await con.query('SELECT * FROM contentQA WHERE cateId = ?', [id]);
  return results;
}
const getQAList = async () => {
  const [results] = await con.query('SELECT id, name_vi, name_en FROM categoriesQA');
  return results;
}


//==================Cooperate==================
const getCoopList = async () => {
  const [results] = await con.query('SELECT id,name_vi,name_en from cooperate');
  return results;  
}
const getCoopDetails = async (id,lang) => {
  try {
    const [results] = await con.query(`SELECT name_${lang}, content_${lang} FROM cooperate WHERE id = ?`, [id]);
   
    const response = {}
    response.name = results[0][`name_${lang}`];
    response.content = results[0][`content_${lang}`]
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

module.exports = { getPolicyDetails, getPolicyList, updatePolicy, addPolicy,
                  getQADetails, getQAList, getCoopList, 
                  getCoopDetails, updateCoop, getCoopDetailsAdmin }