const con = require("..//db/db.js");

module.exports = {
  addProduct: (name_vi, img, desc_vi, catid ,name_en,desc_en) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          // productname,productimg,productdesc,catid
          `INSERT INTO products (
            productname_vi,
            productname_en,
            productimg,
            productdesc_vi,
            productdesc_en,
            catid
          ) VALUES(?,?,?,?,?,?)`,
          [name_vi, name_en, img, desc_vi, desc_en, catid]
        );
        if (result.affectedRows) {
          return resolve(true);
        }
      } catch (error) {
        return reject(error);
      }
    });
  },
  getAllProduct: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`SELECT * FROM products`);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  },
  deleteProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`DELETE FROM products WHERE id = ?`, [
          id,
        ]);

        if (result.affectedRows > 0) {
          return resolve(true);
        }
        return resolve(false);
      } catch (error) {
        return reject(error);
      }
    });
  },

  updateProduct: ( name_vi, img, desc_vi, catid ,name_en,desc_en,id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (img) {
          const [result] = await con.execute(
            `UPDATE  products SET productname_vi=?,productimg=?,productdesc_vi=?,catid=?,productname_en=?,productdesc_en=? WHERE id = ?`,
            [ name_vi, img, desc_vi, catid ,name_en,desc_en,id]
          );
          if (result.affectedRows) {
            return resolve(true);
          }
        } else {
          const [result] = await con.execute(
            `UPDATE  products SET productname_vi=?,productdesc_vi=?,catid=?,productname_en=?,productdesc_en=? WHERE id = ?`,
            [ name_vi, desc_vi, catid ,name_en,desc_en,id]
          );
          if (result.affectedRows) {
            return resolve(true);
          }
        }
      } catch (error) {
        console.log("error >>>", error);
        return reject(false);
      }
    });
  },
};