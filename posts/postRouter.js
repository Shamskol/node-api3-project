const express = require('express');
const db = require('./postDb')
const router = express.Router();

router.get('/', async(req, res) => {
  // do your magic!
  try {
    const resources = await db.get()
    res.status(200).json(resources)
  }
  catch {
    res.status(500).json({ errorMessage: "error"})
  }
});

router.get('/:id', validatePostId, async (req, res) => {
  // do your magic!
  try {
    const post = await db.getById(req.params.id)
    res.status(200).json(post)
  }
  catch{
    res.status(500).json({ errorMessage: "error"})
  }

});

router.delete('/:id', validatePostId, async (req, res) => {
  // do your magic!
  try{
    const result = await db.remove(req.params.id)
    res.status(200).json(result)
  }
  catch{
    res.status(500).json({ errorMessage: "error"})
  }
});

router.put('/:id',validatePostId, async (req, res) => {
  // do your magic!
  try{
    const result = await db.update(req.params.id, req.body)
    res.status(200).json(result)
  }
  catch{
    res.status(500).json({ errorMessage: "error"})
  }
});

// custom middleware

async function validatePostId(req, res, next) {
  // do your magic!
  const post = await db.getById(req.params.id)
  if (post){
    next()
  } else {
    res.status(400).json({ message: "not found"})
  }
}

module.exports = router;
