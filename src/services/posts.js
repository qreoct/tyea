import axios from 'axios'
import defaultposts from '../utils/defaultposts.js'
const baseUrl = '/api/posts'

const getAll = () => {
	// this function needs to return a promise????
	const defposts = defaultposts().posts
	const req = axios.get(baseUrl)

	// So i have a promise here that returns the default posts if axios doesn't work
	return req.then((res) =>{
		console.log('POSTSERVICES could reach backend')
		return res.data
	}).catch((res) => {
		console.log('POSTSERVICES no backend. Default posts were returned')
		return defposts
	})
}

const create = async newObj => {
	const date = new Date()
	const formattedDate = date.toLocaleDateString("en-GB", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					}).split('/').reverse().join('-')
	const newPost = {
		...newObj,
		status: "todo",
		date: formattedDate
	}
	return newPost
}

const update = async (id, newObj) => {
	let newStatus = ""
	if (newObj.status === "todo"){
		newStatus = "done"
	}else{
		newStatus = "todo"
	}
	const newPost = {
		...newObj,
		status: newStatus
	}
	return newPost
}

export default { getAll, create, update }
