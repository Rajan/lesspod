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
                <strong>{{filteredPosts.length}}</strong> Posts
              </p>
            </div>

            <p class="level-item">
              <a class="button is-success" v-if="fullName.length > 0" href="../newpost">New Post</a>
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
										<!-- <option>Page Views</option> -->
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
                  <div class="content ">
                    <span class="content is-small">{{ new Date(post.createdAt) | moment('MMMM D, YYYY') }} . {{ post.author }}</span>
                    <br>
                    <p v-html="postSummary(post.content)"></p>
                    <a href="#" @click="editPost(index)" v-if="fullName.length > 0">Edit</a>
                    <span v-if="fullName.length > 0">·</span>
                    <a href="#" @click="viewPost(index)" v-if="fullName.length > 0">View</a>
                    <p></p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script type="text/javascript">
import firebase from 'firebase';
import axios from 'axios';
import {
  globalVariables
} from './../main';
// import moment from 'moment';
export default {
  // props: ["posts"],
  data() {
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
  computed: {
    filteredPosts: function() {
      let query = this.query;
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
      if (vm.$cookie.get("token") && vm.$cookie.get("token").length) {
        axios.defaults.headers.common['Authorization'] = vm.$cookie.get("token");
      }

      const {
        deploymentTarget,
        LOCALHOST,
        FBASE
      } = globalVariables;
      console.log('deployment target is ' + deploymentTarget);


      var vm = this;

      switch (deploymentTarget) {
        case LOCALHOST:

          axios.get('/v1/posts', {})
            .then(function(response) {

              // console.log(response);

              let posts1 = response.data.posts;
              posts1.reverse();
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

      let user = vm.$cookie.getJSON('user');
      if (user) {
        this.fullName = user.first + ' ' + user.last;
      }
      // console.log(user.first + ' ' + user.last);
    },
    editPost: function(index) {
      var vm = this;
      let post = vm.filteredPosts[index];
      if (this.fullName.length > 0) {
        console.log('Editing... ' + JSON.stringify(post));
        window.location.href = '../editpost/' + post.id.toString();
      } else {
        window.location.href = '../post/' + post.id.toString();
      }
    },
    viewPost: function(index) {
      var vm = this;
      let post = vm.filteredPosts[index];
      let postString = JSON.stringify(vm.filteredPosts[index]);

      console.log('viewing... ' + JSON.stringify(post));

      window.location.href = '../post/' + post.id.toString();
    },
    postSummary: function(content) {
      let postSummary = content.replace(/<(?:.|\n)*?>/gm, '').replace(/\./g, '. ').replace(/\,/g, ', ').substring(0, 140);
      console.log('postSummary.length' + postSummary.length);
      if (postSummary.length == 140) {
        postSummary = postSummary + '...';
        return postSummary;
      } else {
        return postSummary;
      }


    },
    logout: function() {
      this.$cookie.set('token', '');
      this.$cookie.set('user', '');
      window.location.href = '../';
    }
  }

};
</script>

