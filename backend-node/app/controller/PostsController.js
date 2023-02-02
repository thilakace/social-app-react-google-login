const jwt = require('jsonwebtoken');
const User = require('../model/User');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const Posts = require('../model/Posts');
const connection = require('../../config/database');
const Helper = require('../controller/helpers/index');


const getDataList = async (req, res, next) => {
    try { 
      const posts = await Posts.getList();

      return res.send({data:posts,message:"Success"});
      
      
    } catch (error) {
      return res.status(401).send(error);
    }
}

const createNewPosts = async (req, res, next) => {
    try { 
      let getModuleId = await Posts.getCommonQuery("select id,name from modules where slug='"+req.params.module+"'");
      if(getModuleId.length == 0){
        return res.send({status:'success', message:"Module "+req.params.module+" not found",code :0});
      } 
      req.body.module =   getModuleId[0].id;
      req.body.author_name = 'user';
      const posts = await Posts.create(req.body);
     // console.log(posts);
     if(posts.affectedRows ==1){
        return res.send({status:'success',message:"Success",code :1});
     }else{
        return res.send({status:'success', message:"Something went wrong",code :0});
     }
     
      
      
    } catch (error) {
      return res.status(401).send(error);
    }
}

const getEditpost = async (req, res, next) => {
  try { 
    let posts = await Posts.getCommonQuery("select * from posts where id='"+req.params.id+"'");
    if(posts.length === 1){
      res.send({status:'success','message':'Data retrive successfully',data:posts[0],code:1})
    }

  // res.send(  req.headers.referer)


  } catch (error) {
    return res.status(401).send(error);
  }  
}

const updatePost = async (req, res, next) => {
  try { 
    
    let getModuleId = await Posts.getCommonQuery("select id,name from modules where slug= ? ",[req.params.module]);
    if(getModuleId.length == 0){
      return res.send({status:'success', message:"Module "+req.params.module+" not found",code :0});
    }   

    req.body.status = 0;
    req.body.module = getModuleId[0].id;
    req.body.updated_at = Helper.getDate();

    let user = await Posts.getCommonQuery("select name from users where id= ? ",[req.body.created_by]);
    req.body.author_name = user[0].name;
    //return res.send({date : req.body});
    let sqlQuery = "UPDATE posts SET ? WHERE id = ? and module = ?";
    //let sqlQuery = "UPDATE posts SET question='"+req.body.question+"', answer='"+connection.escape(req.body.answer)+"', link='"+req.body.link+"'  WHERE id='"+req.params.id+"' and module="+getModuleId[0].id;
    //return res.send({re : sqlQuery});
    const posts = await Posts.update(sqlQuery,req, getModuleId[0].id);
   // return res.send({re : posts});
   if(posts.affectedRows ==1){
      return res.send({status:'success',message:"Data has been updated!",code :1});
   }else{
      return res.send({status:'success', message:"Something went wrong",code :0});
   }
   
    
    
  } catch (error) {
    return res.status(200).send(error);
  }
}

const getSingleData = async (req, res, next) => {
  try { 

    const posts = await Posts.findOne(req.params.module, req.params.slug);
    if(posts.length === 1){
      res.send({status:'success','message':'Data retrive successfully',data:posts[0],code:1})
    }

  // res.send(  req.headers.referer)


  } catch (error) {
    return res.status(401).send(error);
  }  
}

const getAuthorsPostData = async (req, res, next) => {
  try { 

    const posts = await Posts.getFilterList(req.params.module, req.params.userId);
      res.send({status:'success','message':'Data retrive successfully',data:posts,code:1})
  } catch (error) {
     return res.status(401).send(error);
  }  
}

const getPublishPost = async (req, res, next) => {
  try { 
    var status = null;
    if((req.body.status === 'Disable')){
       status = 0;
    }else if ((req.body.status === 'Delete')){
       status = 2;
    }else{
       status = 1;
    }
    //let status = (req.body.status === 'Disable') ? 0 : 1;
    let sqlQuery = "UPDATE posts SET status="+status+" WHERE id='"+req.body.id+"'";
    const posts = await Posts.getCommonQuery(sqlQuery,res);
      res.send({status:'success','message':'Data updated successfully',data:posts,code:1,query:req.body.id})
  } catch (error) {
     return res.status(401).send(error);
  }  
}

const PostLikeShare = async (req, res, next) => {
  try { 

    if( req.body.action == 'setLikeCount'){ 
      let getLikes = await Posts.getCommonQuery("select like_count from posts_viewers_count where user_id='"+req.body.user_id+"' and module_post_id='"+req.body.module_posts_id+"'");
        if(getLikes.length != 0 && getLikes[0].like_count == 1){
          return res.send({status:'success', message:"Already liked",code :0});
        } 
  
      var data = {
                   user_id : req.body.user_id, 
                   module : req.body.module, 
                   module_post_id : req.body.module_posts_id,
                   like_count : 1
  
                  }
      const posts = await Posts.setLikes(data);
      return res.send({status:'success', message:"Done",code :0});
     }
     else if( req.body.action == 'setDisLikeCount'){ 

      let getLikes = await Posts.getCommonQuery("select dislike_count from posts_viewers_count where user_id='"+req.body.user_id+"' and module_post_id='"+req.body.module_posts_id+"'");
       
      if(getLikes.length != 0 && getLikes[0].dislike_count == 1){
          return res.send({status:'success', message:"Already Disliked",code :0});
        } 
  
      var data = {
                   user_id : req.body.user_id, 
                   module : req.body.module, 
                   module_post_id : req.body.module_posts_id,
                   dislike_count : 1
  
                  }
      const posts = await Posts.setLikes(data);
      return res.send({status:'success', message:"Done",code :0});

     } else if(req.body.action == 'allCOunt'){

        let getLikes = await Posts.getCommonQuery("select sum(like_count) as likes, sum(dislike_count) as dislikes from posts_viewers_count where  module_post_id='"+req.body.module_posts_id+"'");

        let getComments = await Posts.getCommonQuery("select posts_viewers_count.comments,users.name from posts_viewers_count join users on users.id =posts_viewers_count.user_id where  module_post_id='"+req.body.module_posts_id+"' and comments != ''");

        if(getLikes.length != 0 ){
          return res.send({status:'success', message:"All count here",id : { like_count: getLikes[0].likes, dislike_count: getLikes[0].dislikes},comments:getComments ,code :0});
        } 
     }else if(req.body.action == 'setComments'){
      var data = {
        user_id : req.body.user_id, 
        module : req.body.module, 
        module_post_id : req.body.module_posts_id,
        comments : req.body.comments

       }
      const posts = await Posts.setLikes(data);
      return res.send({status:'success', message:"Done",code :0});
     }
    
    
  } catch (error) {
    return res.status(401).send(error);
  }
}

module.exports = { 
                  getDataList, 
                  createNewPosts, 
                  getSingleData, 
                  getAuthorsPostData, 
                  getPublishPost, 
                  getEditpost, 
                  updatePost,
                  PostLikeShare
                };