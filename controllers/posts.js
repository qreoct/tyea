const postsRouter = require('express').Router()
const Post = require('../models/post.js')

postsRouter.get('/', async (req,res) => {
	const posts = await Post
		.find({})
	res.json(posts.map(p => p.toJSON()))
})

postsRouter.post('/', async (req, res) => {
	const body = req.body
	if (!req.body.title && !req.body.url){
		return res.status(400)
			.send({error:'title and url missing'})
			.end()
	}
	const date = new Date()
	const m = String(date.getMonth() + 1)
	const d = String(date.getDate())
	let mm 
	(String(m).length < 2) ? mm = "0"+m : mm = m
	let dd
	(String(d).length < 2) ? dd = "0"+d : dd = d
	const formattedDate = date.getFullYear() + "-" + mm + "-" + dd
	const post = new Post({
	  title: body.title,
	  url: body.url,
	  date: formattedDate,
	  tags: body.tags,
	  comment: body.comment,
	  breadcrumb: body.breadcrumb,
	  status: "todo",
	  type: body.type
	})

	const saved = await post.save()
	res.status(201).json(saved.toJSON())
})


postsRouter.put('/:id', async (req, res) => {
	const id = req.params.id
	const body = req.body

	let newStatus
	if(body.status === "todo" ) {
		newStatus = "done" 
	}else { 
		newStatus = "todo"
	}

	const updatedPost = {
		...body,
		status: newStatus
	}

	const updated = await Post.findByIdAndUpdate(id, updatedPost, {new : true})
	res.json(updated.toJSON())
})

module.exports = postsRouter
