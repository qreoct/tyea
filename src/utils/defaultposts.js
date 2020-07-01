const defaultposts = () => {

return {
	"posts": [
	{
		"title": "1 Welcome to TYEA!",
		"url": "https://qreoct.github.io/tyea",
		"date": "2020-06-26",
		"tags": ["tutorial"],
		"comment": ["These are a set of demo posts to show how TYEA works"],
		"status": "todo",
		"type": "quote",
		"id": "1"
	},
	{
		"title": "2 TYEA is an application to store links as virtual sticky notes",
		"url": "https://en.wikipedia.org/wiki/Special:Random",
		"date": "2020-06-27",
		"tags": ["tutorial", "demo"],
		"comment": ["You can click on the post title to visit the embedded link.", "There are more details here in the post body. You can see the date each post was made...", "The tags associated with it...", "And (Multiple) comments!"],
		"breadcrumb" : "Breadcrumbs are context markers to help you remember how you stumbled upon this resource.",
		"status": "done",
		"type": "article",
		"id": "2"
	},
	{
		"title": "3 Try clicking on stuff!",
		"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		"date": "2020-06-27",
		"tags": ["demo"],
		"comment": ["You can click on the tags on each post, or click the icon on the top-right, to filter posts by that criteria", "You may also use the search bar on the left", "You can even click on the navigation icons on the menu on the left!"],
		"status": "done",
		"type": "article",
		"id": "3"
	},
	{
		"title": "4 More stuff to click on",
		"url": "https://qreoct.github.io/tyea",
		"date": "2020-06-28",
		"tags": ["demo"],
		"comment": ["Clicking on the Tick or Cross icon on each post toggles the todo status"],
		"status": "done",
		"type": "article",
		"id": "4"
	},
	{
		"title": "5 Create new posts",
		"url": "https://qreoct.github.io/tyea",
		"date": "2020-06-29",
		"tags": ["demo"],
		"comment": ["Click on 'new' on the bottom left, or use keyboard shortcuts [n]ew/[c]reate/[+] to open up the new post dialog.", "Fill in each field with the required data and hit post! It's that easy."],
		"status": "done",
		"type": "article",
		"id": "5"
	},
	{
		"title": "6 Check out the code on Github!",
		"url": "https://github.com/qreoct/tyea",
		"date": "2020-06-18",
		"tags": ["demo"],
		"comment": ["Hope you enjoyed this demo! Check out the source code on Github to learn how to deploy this for yourself!", "P.S. This demo doesn't actually write anything to any API! Your posts will not be saved on refresh. Check out how to deploy your own instance on Github."],
		"status": "done",
		"type": "book",
		"id": "6"
	}
	]
}
}

export default defaultposts
