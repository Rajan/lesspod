<template>
<section class="section">
  <div class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-two-thirds">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control has-text-centered">
                <input class="input has-text-centered is-large disabled" style="font-weight: bold;font-size:2rem;" v-model="title" id="title" type="text" placeholder="Post Title" readonly>
                <span class="has-text-centered is-large disabled">{{ new Date(createdDate) | moment('MMMM D, YYYY') }} . {{ author }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-two-thirds">

        <span v-html="editor" class="has-text-left" style="font-size: 1.3rem;"></span>
        <br>

        <div class="tags">
          <span class="button is-link is-outlined is-small is-rounded" v-for="tag in tagsArray" @click="tagClicked(tag)" style="margin-right:0.6rem;" v-if="tag.trim().length > 0">
							{{ tag.trim() }}
						</span>
        </div>
        <input type="hidden" v-model="id" name="postId" id="postId" value="" />
      </div>
      <div class="column is-two-thirds has-text-centered">
        <!-- This div is only for design purposes -->
        <h2 class="title">Latest Posts</h2>
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
        <h2 class="title">Comments</h2>
        <div class="comments">
          <vue-disqus shortname="lesspod" :identifier="id"></vue-disqus>
        </div>
      </div>

    </div>
  </div>
  </div>
  <div class="icon-bar">
    <a v-bind:href="fbUrl" class="facebook"><i class="fab fa-facebook-f"></i></a>
    <a v-bind:href="twitterUrl" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;" target="_blank" title="Share on Twitter"
      class="twitter"><i class="fab fa-twitter"></i>
		</a>
    <!-- <a href="#" class="google"><i class="fab fa-google"></i></a>  -->
    <a v-bind:href="linkedinUrl" class="linkedin"><i class="fab fa-linkedin"></i></a>
    <!-- <a href="#" class="youtube"><i class="fab fa-youtube"></i></a>  -->
  </div>
</section>
</template>

<script type="text/javascript">
import {
  globalVariables
} from './../main';

export default {
  data() {
    return {

      // content: '',
      editor: '',
      tagsArray: [],
      postURL: '',
      id: '',
      title: '',
      author: '',
      posts: [],
      createdDate: '',
      token: null,
      dateAuthor: '',
    }
  },
  beforeMount: function() {
    this.initPost();
  },
  computed: {
    fbUrl() {
      let fburl = encodeURI('https://www.facebook.com/sharer/sharer.php?u=') + encodeURI(this.postURL) + '&t=' + escape(this.title);
      console.log(fburl);
      return fburl;
    },
    twitterUrl() {
      // https://twitter.com/share?url=URLENCODED_URL&via=TWITTER_HANDLE&text=TEXT
      let twitterurl = 'https://twitter.com/share?url=' + encodeURI(this.postURL) + '&text=' + escape(this.title);
      return twitterurl;
    },
    linkedinUrl() {
      // https://www.linkedin.com/shareArticle?mini=true&url=http://developer.linkedin.com&title=LinkedIn%20Developer%20Network&summary=My%20favorite%20developer%20program&source=LinkedIn
      let linkedinurl = encodeURI('https://www.linkedin.com/shareArticle?mini=true&url=') + encodeURI(this.postURL) + '&title=' + escape(this.title) + '&source=Lesspod';
      return linkedinurl;
    },
    filteredPosts: function() {
      return this.posts.filter(function(post) {
        return !(post.pageURL && post.pageURL.length)
      });
    }
  },
  methods: {
    initPost: function() {

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

          db.collection("posts").doc(postId)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                const post = doc.data();
                vm.id = post.id;
                vm.title = post.title;
                vm.editor = post.content;
                // vm.author = post.author; // need to display author and date.
                vm.tagsArray = post.tags.toString().split(",");
                document.title = post.title;

              } else {
                console.log("No such post!");
              }
            })
            .catch(function(error) {
              console.log("Error getting post: ", error);
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

      window.location.href = '../post/' + post.id.toString();
    },
    tagClicked: function(tag) {
      console.log(tag);
    }
  },
  created: function(){
    document.getElementById("footer").style.visibility = "visible";
  },

};
</script>
<style>
section,
body,
html {
  background: white !important;
}

;
#dateAuthor {
  padding-top: 0;
  margin-top: 0;
}

;


body {
  margin: 0;
  height: 2000px;
}

.icon-bar {
  position: fixed;
  top: 50%;
  
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

@media (min-width: 100px) {
  /* This style block will only apply on viewports larger than 700px */
 	.icon-bar {
  		right: 0%;
  		left: auto;
  		top:81%;
	}

  #footer {
    height: 4rem;
  }
}

@media (min-width: 768px) {
  /* This style block will only apply on viewports larger than 700px */
 	.icon-bar {
  		left: 7%;
  		right: auto;
  		top: 50%;
	}
  #footer {
    height: 3rem;
  }
}

.icon-bar a {
  display: block;
  text-align: center;
  padding: 16px;
  transition: all 0.3s ease;
  color: white;
  font-size: 20px;
}

.icon-bar a:hover {
  background-color: #000;
}

.facebook {
  background: #3B5998;
  color: white;
}

.twitter {
  background: #55ACEE;
  color: white;
}

.google {
  background: #dd4b39;
  color: white;
}

.linkedin {
  background: #007bb5;
  color: white;
}

.youtube {
  background: #bb0000;
  color: white;
}

/*.content {
	margin-left: 75px;
	font-size: 30px;
}*/
</style>
