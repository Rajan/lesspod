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
						<div class="content" style="font-size: 1.3rem;" >
							<ul class="has-text-left block" style="margin-bottom: 0.5rem;">
								<li>Blazing fast page load time.</li>
								<li>Infinite scalability of the cloud.</li>
								<li>Free forever hosting! (almost)</li>
							</ul>
							<span style="color:green;">This is a <em>serverless website</em> hosted freely on Firebase.</span>
						</div>
						<p class="has-text-left">
							
							<b style="font-size:1.3rem;padding-bottom: 1rem;">Star us on Github or Follow on Twitter:</b><br><br>
							<!-- Place this tag where you want the button to render. -->
							<!-- <a class="github-button" href="https://github.com/Rajan/lesspod" data-size="large" data-show-count="true" aria-label="Star ntkme/github-buttons on GitHub">Star</a>  -->
							<!-- <no-ssr>
								<gh-btns-star slug="Rajan/lesspod" show-count></gh-btns-star>
							</no-ssr> -->
							<a href="https://github.com/Rajan/lesspod" class="button is-small is-outlined">
								<span class="icon">
									<i class="fab fa-github is-small"></i>
								</span>&nbsp;&nbsp;&nbsp;Star
							</a>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

							<a href="https://twitter.com/less_pod" class="button is-info is-small">
								<span class="icon">
									<i class="fab fa-twitter"></i>
								</span>&nbsp;&nbsp;&nbsp;Follow
							</a>
							
							<!-- <a href="https://twitter.com/less_pod?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false" target="_blank" data-size="large" data-show-screen-name=false><b>Follow Lesspod</b></a> -->

							<!-- <a href="https://www.reddit.com/user/lesspod" target="_blank" class="button is-primary is-small">
								<i class="fab fa-reddit"></i>&nbsp;Reddit
							</a> -->
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
												<no-ssr>
													<span class="content is-small">{{ post.createdAt | moment }} . {{ post.author }}</span>
												</no-ssr>
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
							<!-- 	<a href="/login">Login</a> -->
							Login
						</router-link> Or 
						<router-link to="/register">
							Create Account
							<!-- <a href="/register">Create Account</a> -->
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
// import Loading from 'vue-loading-overlay';
import axios from 'axios';
import firebase from 'firebase';
import NoSSR from 'vue-no-ssr';

import Vue from 'vue';

import VueGitHubButtons from 'vue-github-buttons';
// Stylesheet
import 'vue-github-buttons/dist/vue-github-buttons.css';

import moment from 'moment';
// Vue.use(moment);

Vue.use(VueGitHubButtons);
// Vue.component('VueGitHubButtons', VueGitHubButtons);

export default {
	fetch ({ store, params }) {
		console.log('fetching.....');
		return store.dispatch('FETCH_MENUS');
		return store.dispatch('FETCH_POSTS');
	},
	async asyncData (context) {
		console.log('fetching asyncData.....');
     // this.$store.dispatch('FETCH_MENUS')
     //  .then(resp => {
     //    console.log('fetch success ',resp)
     //    callback(resp);
     //  })
     //  .catch(err => {
     //    console.log('Some err', err);
     //    callback(err);
     //  })
     // return {menus: [1,2,3]}
 },
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
 components: {
 	'no-ssr': NoSSR, VueGitHubButtons
 },
 async asyncData () {

 },
 beforeMount: function(){

		// auto login if credentials are present

		if(this.$cookie && this.$cookie.get('token') && this.$cookie.get('token').length > 0){
			this.$router.push('/home');
		}
		// this.initLanding();
	},
	mounted(){
		this.initLanding();
	},
	filters : {
	// {{ new Date(post.createdAt).toISOString() | moment('MMMM D, YYYY') }} . {{ post.author }}
	moment: function(date) {
		console.log('DATE', date);
		return moment(new Date(date).toUTCString()).format('MMMM D, YYYY');
	},
},
methods: {
	whenCancelled() {
		console.log("User cancelled the loader.");
	},
	initLanding: function(){
		var vm = this;
			// vm.isLoading = true;
			// let loader = vm.$loading.show();
			if (vm.$cookie && vm.$cookie.get('token') && vm.$cookie.get('token').length) {
				vm.token = vm.$cookie.get('token');
				axios.defaults.headers.common['Authorization'] = vm.$cookie.get("token");
			}
			vm.posts = vm.$store.state.posts;

			if(vm.posts.length == 0){
				const {
					deploymentTarget,
					LOCALHOST,
					FBASE
				} = globalVariables;

				console.log('deployment target is ' + deploymentTarget);

				switch (deploymentTarget) {
					case LOCALHOST:

		          // Need to display latest posts under the post being viewed.
		          axios.get('/v1/posts', {})
		          .then(function(response) {

		              // console.log(response);
		              // vm.isLoading = false;
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
		          if(this.$cookie){
		          	const user = this.$cookie.getJSON('user');
		          }
		          db.collection("posts")
		          .get()
		          .then(function(querySnapshot) {
	          	// vm.isLoading = false;
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
      vm.$router.push({name: 'post-id', params: { id: post.id.toString() }});
      // vm.$router.push('/post/' + post.id.toString());
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