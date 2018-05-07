<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered is-multiline">
				<div class="column is-two-thirds">
					<div id="output"></div>
					You're logged in. <a href="#" @click="logout">Logout</a>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="columns is-centered is-multiline">
				<div class="column is-two-thirds">
					<h1 class="title">All Posts by Alex Johnson</h1>
				</div>
				<div class="column is-two-thirds">
					<nav class="level">
						<div class="level-left">
							<div class="level-item">
								<p class="subtitle is-5">
									<strong>{{posts.length}}</strong> Posts
								</p>
							</div>

							<p class="level-item">
								<a class="button is-success" href="../newpost" @click="newPost">New Post</a>
							</p>

							<div class="level-item is-hidden-tablet-only">
								<div class="field has-addons">
									<p class="control">
										<input class="input" v-model="query" type="text" placeholder="Search posts...">
									</p>
									<p class="control">
										<button class="button">
											Search
										</button>
									</p>
								</div>
							</div>
						</div>

						<div class="level-right">
							<div class="level-item">
								Order by
							</div>
							<div class="level-item">
								<div class="select">
									<select>
										<option>Publish date</option>
										<option>Page Views</option>
									</select>
								</div>
							</div>
						</div>
					</nav>
					<div class="columns is-multiline" >
						<div v-for="(post, index) in filteredPosts" :key="post.id" class="column is-12-tablet is-6-desktop is-4-widescreen">
							<article class="box">
								<div class="media">
									<div class="media-content">
										<p class="title is-5 is-spaced is-marginless">
											<a href="#"  @click="editPost(index)" :id="post.id">{{post.title}}</a>
										</p>
										<div class="content is-small">
											{{
												new Date(post.createdAt) | moment('MMMM D, YYYY')
											}}
											<br>
											<a href="#" @click="editPost(index)">Edit</a>
											<span>·</span>
											<a href="#" @click="deletePost(index)">Delete</a>
											<p></p>
										</div>
									</div>
								</div>
							</article>
						</div>
												<!-- <nav class="pagination">
							<a class="pagination-previous">Previous</a>
							<a class="pagination-next">Next page</a>
							<ul class="pagination-list">
								<li>
									<a class="pagination-link">1</a>
								</li>
								<li>
									<span class="pagination-ellipsis">&hellip;</span>
								</li>
								<li>
									<a class="pagination-link">45</a>
								</li>
								<li>
									<a class="pagination-link is-current">46</a>
								</li>
								<li>
									<a class="pagination-link">47</a>
								</li>
								<li>
									<span class="pagination-ellipsis">&hellip;</span>
								</li>
								<li>
									<a class="pagination-link">86</a>
								</li>
							</ul>
						</nav> -->
					</div>
				</div>
			</div>
		</div>
	</section>

</template>
<script type="text/javascript">
// var posts;
export default {
	// props: ["posts"],
	data(){
		return {
			query: '',
			posts: [
			{
				"id": 4,
				"title": "Test Post",
				"content": "Hello World!\nSome initial bold text\n\n",
				"createdAt": "2018-04-23T15:12:08.584Z",
				"updatedAt": "2018-04-23T15:12:08.584Z",
				"Users": [
				{
					"id": 1,
					"first": "Rajan",
					"last": "GC",
					"email": "chandi.rajan@gmail.com",
					"phone": null,
					"password": "$2b$10$3AeX3hbFZTmpHcHFECMNL.D65pxRYPjedsNYUc.J7h9m8j/NlSh0m",
					"createdAt": "2018-04-20T09:17:42.303Z",
					"updatedAt": "2018-04-20T09:17:42.303Z",
					"UserPost": {
						"id": 1,
						"UserId": 1,
						"PostId": 4,
						"createdAt": "2018-04-23T15:12:08.602Z",
						"updatedAt": "2018-04-23T15:12:08.602Z"
					}
				}
				],
				"UserPost": {
					"id": 1,
					"UserId": 1,
					"PostId": 4,
					"createdAt": "2018-04-23T15:12:08.602Z",
					"updatedAt": "2018-04-23T15:12:08.602Z"
				},
				"users": [
				{
					"user": 1
				}
				]
			},
			{
				"id": 6,
				"title": "save post id",
				"content": "Hello World!\nSome initial bold text\n\n",
				"createdAt": "2018-04-23T17:57:06.619Z",
				"updatedAt": "2018-04-23T17:57:06.619Z",
				"Users": [
				{
					"id": 1,
					"first": "Rajan",
					"last": "GC",
					"email": "chandi.rajan@gmail.com",
					"phone": null,
					"password": "$2b$10$3AeX3hbFZTmpHcHFECMNL.D65pxRYPjedsNYUc.J7h9m8j/NlSh0m",
					"createdAt": "2018-04-20T09:17:42.303Z",
					"updatedAt": "2018-04-20T09:17:42.303Z",
					"UserPost": {
						"id": 3,
						"UserId": 1,
						"PostId": 6,
						"createdAt": "2018-04-23T17:57:06.629Z",
						"updatedAt": "2018-04-23T17:57:06.629Z"
					}
				}
				],
				"UserPost": {
					"id": 3,
					"UserId": 1,
					"PostId": 6,
					"createdAt": "2018-04-23T17:57:06.629Z",
					"updatedAt": "2018-04-23T17:57:06.629Z"
				},
				"users": [
				{
					"user": 1
				}
				]
			},
			{
				"id": 7,
				"title": "tagged post",
				"content": "Hello World!\nSome initial bold text\n\n",
				"createdAt": "2018-04-24T02:57:00.663Z",
				"updatedAt": "2018-04-24T02:57:00.663Z",
				"Users": [
				{
					"id": 1,
					"first": "Rajan",
					"last": "GC",
					"email": "chandi.rajan@gmail.com",
					"phone": null,
					"password": "$2b$10$3AeX3hbFZTmpHcHFECMNL.D65pxRYPjedsNYUc.J7h9m8j/NlSh0m",
					"createdAt": "2018-04-20T09:17:42.303Z",
					"updatedAt": "2018-04-20T09:17:42.303Z",
					"UserPost": {
						"id": 4,
						"UserId": 1,
						"PostId": 7,
						"createdAt": "2018-04-24T02:57:00.687Z",
						"updatedAt": "2018-04-24T02:57:00.687Z"
					}
				}
				],
				"UserPost": {
					"id": 4,
					"UserId": 1,
					"PostId": 7,
					"createdAt": "2018-04-24T02:57:00.687Z",
					"updatedAt": "2018-04-24T02:57:00.687Z"
				},
				"users": [
				{
					"user": 1
				}
				]
			}
			]


		};
	},
	created: function() {

		this.fetchData();

		// this.$nextTick(function () {

		// });
	},
	computed:{
	    filteredPosts: function () {
	    	var query = this.query;
	    	return this.posts.filter(function (post) {
		        return (post.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) || 
		        	   (post.content.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1) 
	    	});	
	    }
  	},
	methods: {
		newPost: function() {
			console.log('new post');
		},
		fetchData: function() {
			console.log('fetching data...');
			var vm = this;
			axios.defaults.headers.common['Authorization'] = Cookies.get("token");

			axios.get('/v1/posts', {})
			.then(function (response){

							// console.log(response);

							let posts1 = response.data.posts;

							for(var i in posts1){

								console.log(posts1[i].title);
							}
							vm.posts = posts1;
							// renderPosts();
						})
			.catch(function (error){
				console.log(error);
				// if error is 401 unauthorize, logout the user.

				if(error.toString().indexOf('401') !== -1){
					logout();
				}
			});
		},
		editPost: function(index) {
			var vm = this;
			let post = vm.posts[index];
			console.log('Editing... ' + JSON.stringify(post));
			Cookies.set("editpost", JSON.stringify(post));
			window.location.href = '../editpost/' + post.id.toString();
		},
		deletePost: function(index) {
			var vm = this;
			let post = vm.posts[index];
			
			console.log('Deleting... ' + JSON.stringify(post));
			axios.delete('/v1/posts/' + post.id, 
			{
				'post_id': post.id,
				'post': post
			})
			.then(function (response){
				let post1 = response.data.post;
				console.log('Deleted... ' + JSON.stringify(response));
				vm.posts.splice(index, 1);
			})
			.catch(function (error) {
				console.log(error);
				// if error is 401 unauthorize, logout the user.

				if(error.toString().indexOf('401') !== -1){
					logout();
				}
			});
		},
		logout: function() {
			Cookies.set('token', '');
			Cookies.set('user', '');
			window.location.href = '../';
		}
	}
	
}
</script>