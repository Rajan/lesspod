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
        <h2 class="title">Recommended Posts</h2>
        <div class="columns is-multiline">
          <div class="column is-12-tablet is-6-desktop is-4-widescreen">
            <article class="box">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5 is-spaced is-marginless">
                    <a href="#">One Random Idea</a>
                  </p>
                  <div class="content is-small">
                    March 31, 1984 . Some Author
                    <br>
                    <p>
                      In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
                    </p>
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
                    <a href="#">Last Trip to Paris</a>
                  </p>
                  <div class="content is-small">
                    March 31, 1984 . Some Author
                    <br>
                    <p>
                      In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
                    </p>
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
                    <a href="#">Our New Business Venture</a>
                  </p>
                  <div class="content is-small">
                    March 31, 1984 . Some Author
                    <br>
                    <p>
                      In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
                    </p>
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
                    <a href="#">An Adventure to China</a>
                  </p>
                  <div class="content is-small">
                    March 31, 1984 . Some Author
                    <br>
                    <p>
                      In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
                    </p>
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
                    <a href="#">Of Ghosts and Gods</a>
                  </p>
                  <div class="content is-small">
                    March 31, 1984 . Some Author
                    <br>
                    <p>
                      In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
                    </p>
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
                    <a href="#">Hackers and Painters</a>
                  </p>
                  <div class="content is-small">
                    March 31, 1984 . Some Author
                    <br>
                    <p>
                      In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
                    </p>
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
    }
  },
  methods: {
    initPost: function() {

      var vm = this;

      if (Cookies.get('token') && Cookies.get('token').length) {
        vm.token = Cookies.get('token');
        axios.defaults.headers.common['Authorization'] = Cookies.get("token");
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
