import Post from "../Models/Post.js"
import PostModel from "../Models/Post.js"

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
    res.json(posts)
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получтиь статьи"
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    
    PostModel.findOneAndUpdate({
      _id: postId,
    }, 
    {
      $inc: { viewsCount: 1}
    }, 
    {
      returnDocument: "after"
    },
    (err, doc) => {
      if(err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось вернуть статью"
        })
      }

      if(!doc) {
        return res.status(404).json({
          message: "Статья не найдена"
        })
      }

      res.json(doc)
    }
    )
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получтиь статьи"
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndRemove({
      _id: postId, 
    }, (err, doc) => {
      if(err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить пост"
        })
      }
      if(!doc) {
        return res.status(404).json({
          message: "Не удалось найти статью"
        })
      }

      res.json({
        succes: true
      })
    })
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получтиь статьи"
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId
    })

    const post = await doc.save()

    res.json(post)
  } catch (error) {
    console.log(500);
    res.status(500).json({
      message: "Не удалось создать статью"
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndUpdate({
      _id: postId,
    }, 
    {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId
    })
    
    res.json({
      succes: true
    })
  } catch (error) {
    console.log(500)
    res.status(500).json({
      message: "Не удалось обновить статью"
    })
  }
}