const con = require('../../config/database');

const create = (userReq, callback) => {
    

    let sqlQuery = "INSERT INTO posts SET ?";

    return new Promise((resolve, reject) => {
        con.query(sqlQuery,userReq, (err, result) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(result);
          }
        });
      });

    
   
}

const getList = (req, res) => {
   
    let sqlQuery = "SELECT id,question, DATE_FORMAT(updated_at, '%M,%d %Y %H:%i:%s') AS updated_at, link,author_name,answer,tags  FROM posts where status=1 order by updated_at DESC";

    return new Promise((resolve, reject) => {
      con.query(sqlQuery, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
}

const findOne = (module, slug, cond = false, callback) => {
    let sqlQuery = "SELECT *,DATE_FORMAT(updated_at, '%M,%d %Y %H:%i:%s') AS updated_at FROM posts WHERE link='"+slug+"' limit 1";

    return new Promise((resolve, reject) => {
        con.query(sqlQuery, (err, result) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(result);
          }
        });
      });

   
}

const getFilterList = (module, userId, res) => {
   
  let sqlQuery = "SELECT id,question,link,status,view_count,like_count,dislike_count,share_count,created_at,updated_at,created_by,author_name, DATE_FORMAT(updated_at, '%M,%d %Y %H:%i:%s') AS updated_at FROM posts where created_by= ? and status!=? order by updated_at DESC";

  return new Promise((resolve, reject) => {
    con.query(sqlQuery, [userId,2], (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });
  });
}

const getAllList = (module, userId, res) => {
   
  let sqlQuery = "SELECT id,question,link,status,view_count,like_count,dislike_count,share_count,created_at,updated_at,created_by,author_name, DATE_FORMAT(updated_at, '%M,%d %Y %H:%i:%s') AS updated_at FROM posts where c status!=? order by updated_at DESC";

  return new Promise((resolve, reject) => {
    con.query(sqlQuery, [2], (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });
  });
}

const update = (sqlQuery, req, moduleId) => {
 
  return new Promise((resolve, reject) => {
    con.query(sqlQuery, [req.body, req.params.id, moduleId] ,(err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });
  });
}

const getCommonQuery = (sqlQuery, sqlData) => {
 
  return new Promise((resolve, reject) => {
    con.query(sqlQuery, sqlData, (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });
  });
}

const setLikes = (userReq, callback) => {
    

  let sqlQuery = "INSERT INTO posts_viewers_count SET ?";

  return new Promise((resolve, reject) => {
      con.query(sqlQuery,userReq, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });

  
 
}



module.exports = {create, getList, findOne, update, getFilterList, getCommonQuery, setLikes, getAllList};