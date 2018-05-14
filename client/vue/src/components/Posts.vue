<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered is-multiline">
				<div class="column is-two-thirds">
					<h1 class="title">All Blog Posts</h1>
				</div>
				<div class="column is-two-thirds">
					<nav class="level">
						<div class="level-left">
							<div class="level-item">
								<p class="subtitle is-5">
									<strong>17</strong> Posts
								</p>
							</div>

							<p class="level-item">
								<a class="button is-success" href="new-book.html">New Post</a>
							</p>

							<div class="level-item is-hidden-tablet-only">
								<div class="field has-addons">
									<p class="control">
										<input class="input" type="text" placeholder="Search posts...">
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
					<div class="columns is-multiline">
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
						<div class="column is-12-tablet is-6-desktop is-4-widescreen">
							<article class="box">
								<div class="media">
									<div class="media-content">
										<p class="title is-5 is-spaced is-marginless">
											<a href="#">TensorFlow For Machine Intelligence</a>
										</p>
										<div class="content is-small">
											April 10, 2018
											<br>
											<a href="user.html">Edit</a>
											<span>·</span>
											<a>Delete</a>
											<p></p>
										</div>
									</div>
								</div>
							</article>
							</div>

							<div class="column is-12-tablet is-6-desktop is-4-widescreen">
								<article class="box">
									<div class="media">
										<div class="media-content">
											<p class="title is-5 is-marginless">
												<a href="#">Docker in Production</a>
											</p>
											<div class="content is-small">
												April 1, 2018
												<br>
												<a href="user.html">Edit</a>
												<span>·</span>
												<a>Delete</a>
												<p></p>
											</div>
										</div>
									</div></article>
								</div>

								<div class="column is-12-tablet is-6-desktop is-4-widescreen">
									<article class="box">
										<div class="media">
											<div class="media-content">
												<p class="title is-5 is-marginless">
													<a href="#">Developing a Gulp.js Edge</a>
												</p>
												<div class="content is-small">
													March 29, 2018
													<br>
													<a href="user.html">Edit</a>
													<span>·</span>
													<a>Delete</a>
													<p></p>
												</div>
											</div>
										</div></article>
									</div>

									<div class="column is-12-tablet is-6-desktop is-4-widescreen">
										<article class="box">
											<div class="media">
												<div class="media-content">
													<p class="title is-5 is-marginless">
														<a href="#">Learning Swift</a>
													</p>
													<div class="content is-small">
														Dec 25, 2017
														<br>
														<a href="user.html">Edit</a>
														<span>·</span>
														<a>Delete</a>
														<p></p>
													</div>
												</div>
											</div></article>
										</div>

										<div class="column is-12-tablet is-6-desktop is-4-widescreen">
											<article class="box">
												<div class="media">
													<div class="media-content">
														<p class="title is-5 is-marginless">
															<a href="#">Choosing a JavaScript Framework</a>
														</p>
														<div class="content is-small">
															Dec 5, 2017
															<br>
															<a href="user.html">Edit</a>
															<span>·</span>
															<a>Delete</a>
															<p></p>
														</div>
													</div>
												</div></article>
											</div>

											<div class="column is-12-tablet is-6-desktop is-4-widescreen">
												<article class="box">
													<div class="media">
														<div class="media-content">
															<p class="title is-5 is-marginless">
																<a href="#">Deconstructing Google Cardboard Apps</a>
															</p>
															<div class="content is-small">
																Nov 20, 2017
																<br>
																<a href="user.html">Edit</a>
																<span>·</span>
																<a>Delete</a>
																<p></p>
															</div>
														</div>
													</div></article>
												</div>
											</div>

											<nav class="pagination">
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
											</nav>
										</div>
									</div>
								</div>
							</div>
						</section>
					</template>
<script type="text/javascript">
	export default {
	// props: ["posts"],
	data(){
		return {
			query: '',
			fullName: '',
			posts: []
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
		        	   (post.content.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
		        	   	post.tags.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1) 
	    	});	
		}
	},
	methods: {
		newPost: function() {
			console.log('new post');
		},
		fetchData: function() {
			// console.log('fetching data...');
			var vm = this;
			axios.defaults.headers.common['Authorization'] = Cookies.get("token");

			axios.get('/v1/posts', {})
			.then(function (response){

							// console.log(response);

							let posts1 = response.data.posts;

							for(var i in posts1){

								// console.log(posts1[i].title);
							}
							vm.posts = posts1;
							// renderPosts();
						})
			.catch(function (error){
				console.log(error);
				// if error is 401 unauthorize, logout the user.

				if(error.toString().indexOf('401') !== -1){
					console.log('Logging you out...')
					// vm.logout();
				}
			});
			let user = Cookies.getJSON('user');
			this.fullName = user.first + ' ' + user.last;
			// console.log(user.first + ' ' + user.last);
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
					vm.logout();
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