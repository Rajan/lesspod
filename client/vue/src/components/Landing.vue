<template>
	<section class="section">

		<div class="hero-body">
			<div class="container has-text-centered">
				<div class="columns is-vcentered">
					<div class="column is-5">
						<figure class="image is-4by3">
							<img src="./../assets/images/serverless.png" alt="Description">
						</figure><br>
						<h6 class="title is-6" style="font-weight: 300;">Image credits: Hackernoon</h6>
					</div>
					<div class="column is-6 is-offset-1 has-text-left">
						<h1 class="title">
							Serverless Websites
						</h1>
						<h2 class="subtitle is-4 "><br>
							Lesspod lets anyone build and deploy website+blog combination to serverless platforms (starting with <a href="https://firebase.google.com/pricing/" target="_blank">Firebase</a>). Key benefits:
						</h2>
						<div class="content">
							<ul style="font-size: 1.3rem;" class="has-text-left block">
								<li>No fixed yearly/monthly hosting fees.</li>
								<li>Infinite scalability of the cloud.</li>
								<li>Free hosting till you're very popular!</li>
							</ul>
						</div>
						<br>
						<p class="has-text-left">
							<a href="https://github.com/Rajan/lesspod" target="_blank" class="button is-medium is-success is-outlined">
								<i class="fab fa-github"></i>&nbsp;Lesspod on Github
							</a>
						</p>
					</div>
				</div>
				<div class="columns has-text-centered is-multiline">
					<div class="column has-text-centered"><br><br>
						<h2 class="title" v-if="filteredPosts.length > 0">Latest Posts</h2>
						<div class="columns is-multiline">
							<div v-for="(post, index) in filteredPosts" :key="post.id" class="column is-12-tablet is-6-desktop is-4-widescreen">
								<article class="box">
									<div class="media">
										<div class="media-content">
											<p class="title is-5 is-spaced is-marginless">
												<a href="#" @click="viewPost(index)" :id="post.id">{{post.title}}</a>
											</p>
											<div class="content ">
												<span class="content is-small">{{ new Date(post.createdAt) | moment('MMMM D, YYYY') }} . {{ post.author }}</span>
												<br>
												<p v-html="postSummary(post.content)"></p>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="hero-foot">
			<div class="container">
				<div class="is-centered">
					<div class="column has-text-centered" style="font-size:1.5rem;">
						<a href="/login">Login</a> Or <a href="/register">Create Account</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
import {
  globalVariables
} from './../main';

export default {
	data(){
		return {
			posts: []
		}
	},
	computed: {
		filteredPosts: function() {
			return this.posts.filter(function(post) {
				return !(post.pageURL && post.pageURL.length)
			});
		}
	},
	beforeMount: function(){

		// auto login if credentials are present

		if(this.$cookie.get('token').length > 0){
			this.$router.push('/home');
		}
		this.initLanding();
	},
	methods: {
		initLanding: function(){
			var vm = this;

			if (vm.$cookie.get('token') && vm.$cookie.get('token').length) {
				vm.token = vm.$cookie.get('token');
				axios.defaults.headers.common['Authorization'] = vm.$cookie.get("token");
			}
	      // fetch the post from server
	      let href = location.href;

	      let postId = href.substr(href.lastIndexOf('/') + 1);

	      const {
	      	deploymentTarget,
	      	LOCALHOST,
	      	FBASE
	      } = globalVariables;
	      console.log('deployment target is ' + deploymentTarget);

	      switch (deploymentTarget) {
	      	case LOCALHOST:
	      	axios.get('/v1/posts/' + postId, {})
	      	.then(function(response) {
	      		console.log(response.data.post);
	      		let post = response.data.post;
	      		vm.id = post.id;
	      		vm.title = post.title;
	      		vm.editor = post.content;
	      		vm.author = post.author;
	      		vm.createdDate = post.createdAt;
	      		vm.tagsArray = post.tags.toString().split(",");
	      		vm.postURL = window.location.origin + '/post/' + post.id.toString();
	      		console.log(vm.postURL);
	      		document.title = post.title.toString() + ' by ' + post.author.toString();
	      	})
	      	.catch(function(error) {
	      		console.log(error);
	      	});


	          // Need to display latest posts under the post being viewed.

	          axios.get('/v1/posts', {})
	          .then(function(response) {

	              // console.log(response);

	              let posts1 = response.data.posts;
	              posts1.reverse();
	              for (var i in posts1) {

	              	console.log(posts1[i].title);
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

	          const user = this.$cookie.getJSON('user');
	          db.collection("posts")
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
	postSummary: function(content) {
      let postSummary = content.replace(/<(?:.|\n)*?>/gm, '').replace(/\./g, '. ').replace(/\,/g, ', ').substring(0, 140);
      // console.log('postSummary.length' + postSummary.length);
      if (postSummary.length == 140) {
        postSummary = postSummary + '...';
        return postSummary;
      } else {
        return postSummary;
      }
    }
}
};
</script>
<style>
section,
body,
html {
	background: white;
}
</style>