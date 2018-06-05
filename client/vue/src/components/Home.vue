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
					<h1 class="title">All Menus</h1>
					<div class="tags has-addons" v-if="menus.length > 0">
						<!-- <span  > -->
							<button  v-for="(menu, index) in  menus" class="button" style="margin: 1rem;">{{ menu.name }} &nbsp;
								<a class="tag is-danger is-delete" @click="deleteMenu(index)"></a>
							</button>
						<!-- </span> -->
					</div>
					<div class="subtitle">Note: Clicking on the <a class="tag is-danger is-delete"></a> will delete the menu/page irreversibly.</div>
					<!-- <div class="tags has-addons">
						<span class="tag">About Us</span>
						<a class="tag is-danger is-delete"></a>
					</div> -->
				</div>
				<div class="column is-two-thirds">
					<h1 class="title">All Posts by {{ fullName }}</h1>
				</div>
				<div class="column is-two-thirds">
					<nav class="level">
						<div class="level-left">
							<div class="level-item">
								<p class="subtitle is-5">
									<strong>{{filteredPosts.length}}</strong> Posts
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
					<div class="columns is-multiline">
						<div v-for="(post, index) in filteredPosts" :key="post.id" class="column is-12-tablet is-6-desktop is-4-widescreen">
							<article class="box">
								<div class="media">
									<div class="media-content">
										<p class="title is-5 is-spaced is-marginless">
											<a href="#" @click="editPost(index)" :id="post.id">{{post.title}}</a>
										</p>
										<div class="content is-small">
											{{ new Date(post.createdAt) | moment('MMMM D, YYYY') }}
											<br>
											<p v-html="postSummary(post.content)"></p>
											<a href="#" @click="editPost(index)">Edit</a>
											<span>·</span>
											<a href="#" @click="viewPost(index)">View</a>
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
import {
	globalVariables
} from './../main';

export default {
  // props: ["posts"],
  data() {
  	return {
  		query: '',
  		fullName: '',
  		posts: [],
  		menus: []
  	};
  },
  created: function() {

  	this.fetchData();

  },
  computed: {
  	filteredPosts: function() {
  		var query = this.query;
  		return this.posts.filter(function(post) {
  			return ((post.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
  			(post.content.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
  				post.tags.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1)) && !(post.pageURL && post.pageURL.length)
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

      let user = Cookies.getJSON('user');
      this.fullName = user.first + ' ' + user.last;
      // console.log(user.first + ' ' + user.last);

      const {
      	deploymentTarget,
      	LOCALHOST,
      	FBASE
      } = globalVariables;
      console.log('deployment target is ' + deploymentTarget);


      var vm = this;

      axios.get('/v1/menus', {})
      .then(function (response){

							// console.log(response);

							let menus1 = response.data.menus;

							for(var i in menus1){

								console.log(menus1[i].name);
							}
							if(menus1.length > 0){
								vm.menus = vm.menus.concat(menus1);
								// console.log(menus1);
							}else{
								// console.log(menus1);
							}
							// renderPosts();
						})
      .catch(function (error){
				// console.log(error);
				// if error is 401 unauthorize, logout the user.

				if(error.toString().indexOf('401') !== -1){
					console.log('Logging you out...')
					vm.logout();
				}
			});

      switch (deploymentTarget) {
      	case LOCALHOST:
      	axios.get('/v1/posts', {})
      	.then(function(response) {

              // console.log(response);

              let posts1 = response.data.posts;
              for (var i in posts1) {

                // console.log(posts1[i].title);
                if (posts1[i].pageURL && posts1[i].pageURL.length !== 0) {
                	posts1.splice(i, 1);
                }
            }
            vm.posts = posts1;
              // renderPosts();
          })
      	.catch(function(error) {
      		console.log(error);
              // if error is 401 unauthorize, logout the user.

              if (error.toString().indexOf('401') !== -1) {
              	console.log('Logging you out...')
              	vm.logout();
              }
          });
      	break;
      	case FBASE:
      	let db = firebase.firestore();
      	const settings = {
      		timestampsInSnapshots: true
      	};
      	db.settings(settings);

      	db.collection("posts").where("createdBy", "==", user.id)
      	.get()
      	.then(function(querySnapshot) {
      		let posts1 = [];
      		querySnapshot.forEach(function(doc) {
      			posts1.push(doc.data())
      		});
      		for (var i in posts1) {
      			if (posts1[i].pageURL && posts1[i].pageURL.length !== 0) {
      				posts1.splice(i, 1);
      			}
      		}
      		vm.posts = posts1;
      	})
      	.catch(function(error) {
      		console.log("Error getting posts: ", error);
      	});
      	break;
      }

  },
  editPost: function(index) {
  	var vm = this;
  	let post = vm.filteredPosts[index];
  	let postString = JSON.stringify(vm.filteredPosts[index]);

  	Cookies.set("editpost", postString);
  	console.log('Editing... ' + JSON.stringify(post));

  	window.location.href = '../editpost/' + post.id.toString();
  },
  viewPost: function(index) {
  	var vm = this;
  	let post = vm.filteredPosts[index];
  	let postString = JSON.stringify(vm.filteredPosts[index]);

  	console.log('viewing... ' + JSON.stringify(post));

  	window.location.href = '../post/' + post.id.toString();
  },
  deletePost: function(index) {
  	var vm = this;
  	let post = vm.filteredPosts[index];

  	console.log('Deleting... ' + JSON.stringify(post));
  	const {
  		deploymentTarget,
  		LOCALHOST,
  		FBASE
  	} = globalVariables;
  	console.log('deployment target is ' + deploymentTarget);

  	switch (deploymentTarget) {
  		case LOCALHOST:
  		axios.delete('/v1/posts/' + post.id, {
  			'post_id': post.id,
  			'post': post
  		})
  		.then(function(response) {
  			let post1 = response.data.post;
  			console.log('Deleted... ' + JSON.stringify(response));
  			vm.posts.splice(index, 1);
  		})
  		.catch(function(error) {
  			console.log(error);
              // if error is 401 unauthorize, logout the user.

              if (error.toString().indexOf('401') !== -1) {
              	vm.logout();
              }
          });
  		break;
  		case FBASE:
  		let db = firebase.firestore();
  		const settings = {
  			timestampsInSnapshots: true
  		};
  		db.settings(settings);
  		db.collection("posts").doc(post.id).delete().then(function() {
  			console.log("Post successfully deleted!");
  		}).catch(function(error) {
  			console.error("Error deleting post: ", error);
  		});
  		break;
  	}

  },
  postSummary: function(content) {
  	let postSummary = content.replace(/<(?:.|\n)*?>/gm, '').replace(/\./g, '. ').replace(/\,/g, ', ').substring(0, 140);
      // console.log('postSummary.length' + postSummary.length);
      if (postSummary.length == 140) {
      	postSummary = postSummary + '...';
      	return postSummary;
      } else {
      	return postSummary;
      }
  },
  deleteMenu: function(index) {
  	var vm = this;
  	let menu = this.menus[index];
  	console.log('deleting...' + menu.name);
  	axios.delete('/v1/menus/' + menu.id, {
  			'menu_id': menu.id,
  			'menu': menu
  		})
  		.then(function(response) {
  			let menu1 = response.data.menu;
  			console.log('Deleted... ' + JSON.stringify(response));
  			// vm.menus.splice(index, 1); // should never run
  			window.location.href = './';
  		})
  		.catch(function(error) {
  			console.log(error);
              // if error is 401 unauthorize, logout the user.

              if (error.toString().indexOf('401') !== -1) {
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
