<template>
	<section class="section">
		<loading :active.sync="isLoading" :can-cancel="true" :on-cancel="whenCancelled"></loading>
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
						<div class="content" style="font-size: 1.3rem;" >
							<ul class="has-text-left block" style="margin-bottom: 0.5rem;">
								<li>No fixed yearly/monthly hosting fees.</li>
								<li>Infinite scalability of the cloud.</li>
								<li>Free hosting till you're very popular!</li>
							</ul>
							<span style="color:green;">This is a <em>serverless website</em> hosted freely on Firebase.</span>
						</div>
						<p class="has-text-left">
							
							<b style="font-size:1.3rem;padding-bottom: 1rem;">Star us on Github or Follow on Twitter:</b><br><br>
							<!-- Place this tag where you want the button to render. -->
							<a class="github-button" href="https://github.com/Rajan/lesspod" data-size="large" data-show-count="true" aria-label="Star ntkme/github-buttons on GitHub">Star</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<a href="https://twitter.com/less_pod?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false" data-size="large" data-show-screen-name=false>Follow Lesspod</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

							<a href="https://www.reddit.com/user/lesspod" target="_blank" class="button is-primary is-small">
								<i class="fab fa-reddit"></i>&nbsp;Reddit
							</a>
							<!-- <a class="twitter-follow-button"
							  href="https://twitter.com/less_pod"
							  data-size="large">
							Follow @Lesspod</a> -->
						</p>
					</div>
				</div>
				<div class="columns has-text-centered is-multiline">
					<div class="column has-text-centered"><br><br>
						<h2 class="title" v-if="filteredPosts.length > 0">Latest Posts</h2>
						<div class="columns is-multiline">
							<div v-for="(post, index) in filteredPosts.slice(0, 6)" :key="post.id" class="column is-12-tablet is-6-desktop is-4-widescreen">
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
						<router-link to="/login">
							<a href="/login">Login</a>
						</router-link> Or 
						<router-link to="/register">
							<a href="/register">Create Account</a>
						</router-link>
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
// Import component
import Loading from 'vue-loading-overlay';
import firebase from 'firebase';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';

import { mapState, mapActions } from 'vuex';

export default {
	data(){
		return {
			posts: [],
			isLoading: false
		}
	},
	computed: {
		filteredPosts: function() {
			return this.posts.filter(function(post) {
				return !(post.pageURL && post.pageURL.length)
			});
		}
	},
	components: {
    	Loading
  	},
	beforeMount: function(){

		// auto login if credentials are present

		if(this.$cookie.get('token') && this.$cookie.get('token').length > 0){
			this.$router.push('/home');
		}
		this.initLanding();
	},
	methods: {
		whenCancelled() {
      		console.log("User cancelled the loader.");
    	},
		initLanding: function(){
			var vm = this;
			vm.isLoading = true;
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
		      		if(response.data.post){
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
		      		}
		      	})
		      	.catch(function(error) {
		      		console.log(error);
		      	});


		          // Need to display latest posts under the post being viewed.

		          axios.get('/v1/posts', {})
		          .then(function(response) {

		              // console.log(response);
		              vm.isLoading = false;
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
	          	vm.isLoading = false;
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
    },
    viewPost: function(index) {
      var vm = this;
      let post = vm.filteredPosts[index];
      let postString = JSON.stringify(vm.filteredPosts[index]);

      console.log('viewing... ' + JSON.stringify(post));

      // window.location.href = '../post/' + post.id.toString();
      vm.$router.push({name: 'Viewpost', params: { post_id: post.id.toString() }});
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