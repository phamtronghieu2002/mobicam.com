const con = require("..//db/db.js");

module.exports = {
  addNew: (
    title_vi,
    title_en,
    content_vi,
    content_en,
    imageUrl,
    importance,
    datePost
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          `INSERT INTO news ( title_vi,
      title_en,
      content_vi,
      content_en,
      img,
      importance,
      createdAt,
      updatedAt
      ) VALUES (?,?,?,?,?,?,?,?)`,
          [
            title_vi,
            title_en,
            content_vi,
            content_en,
            imageUrl,
            importance,
            datePost,
            datePost,
          ]
        );

        if (result.affectedRows > 0) {
          return resolve(true);
        }
        return resolve(false);
      } catch (error) {
        console.log("error >>>", error);
        return reject(error);
      }
    });
  },

  updateNew: (
    title_vi,
    title_en,
    content_vi,
    content_en,
    imageUrl,
    id,
    importance,
    datePost
  ) => {
    return new Promise(async (resolve, reject) => {
      
      try {
        if (imageUrl) {
          const [result] = await con.execute(
            `UPDATE news SET  
            title_vi = ?,
            title_en = ?,
            content_vi = ?,
            content_en = ?,
            img = ?,
            updatedAt = ?,
            importance = ?
            WHERE id = ?
           `,
            [
              title_vi,
              title_en,
              content_vi,
              content_en,
              imageUrl,
              datePost,
              Number(importance),
              id,
            ]
          );
         
          if (result.affectedRows > 0) {
            return resolve(true);
          }
          return resolve(false);
        } else {
          const [result] = await con.execute(
            `UPDATE news SET  
            title_vi = ?,
            title_en = ?,
            content_vi = ?,
            content_en = ?,
            updatedAt = ?,
            importance = ?
            WHERE id = ?`,
            [title_vi, title_en, content_vi, content_en,datePost,Number(importance),  id]
          );
          if (result.affectedRows > 0) {
            return resolve(true);
          }
          return resolve(false);
        }
      } catch (error) {
        console.log("error >>>", error);
        return reject(false);
      }
    });
  },

  getNewbyId: (id, lang) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`SELECT * FROM news WHERE id = ?`, [
          id,
        ]);

        if (result.length > 0) {
          let news = {};
          news.id = result[0].id;
          news.title = result[0][`title_${lang}`];
          news.content = result[0][`content_${lang}`];
          news.img = result[0].img;

          return resolve(news);
        }
        return resolve(false);
      } catch (error) {
        console.log("error >>>", error);
        return reject(false);
      }
    });
  },

  deleteNew: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`DELETE FROM news WHERE id = ?`, [
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

  getAllnews: (lang = "vi") => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          `SELECT * 
FROM news 
ORDER BY importance DESC,updatedAt DESC;`
        );
        if (result.length > 0) {
          result.forEach((element) => {
            element.updatedAt = new Date(element.updatedAt).toLocaleDateString(
              "en-CA"
            );
          });

          return resolve(result);
        }
      } catch (error) {
        console.log(" loi ne error >>>", error);
        return reject(error);
      }
    });
  },

  getNewsLimit: (limit_num, lang = "vi") => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          `select * from news  ORDER BY importance DESC,updatedAt DESC  limit ${limit_num}`
        );
        const news = [];
        result.forEach((element) => {
          news.push({
            id: element.id,
            title: element[`title_${lang}`],
            content: element[`content_${lang}`],
            img: element.img,
            updatedAt: element.updatedAt.toLocaleDateString("en-CA"),
          });
        });

        return resolve(news);
      } catch (error) {
        console.log("error >>>", error);
        return reject(error);
      }
    });
  },
};
