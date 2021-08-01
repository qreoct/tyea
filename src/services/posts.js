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
	const res = await axios.post(baseUrl, newObj)
	return res.data
}

const update = async (id, newObj) => {
	const res = await axios.put(`${baseUrl}/${id}`, newObj)
	return res.data
}

export default { getAll, create, update }
