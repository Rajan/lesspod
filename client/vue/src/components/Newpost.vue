<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered is-multiline has-text-centered">
        <div class="column is-two-thirds">
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input has-text-centered is-medium" id="title" type="text" placeholder="Post Title" style="font-weight: bold;font-size:2rem;">
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-two-thirds">

          <quill-editor v-model="content" :options="editorOption" style="height: 20rem;font-size: 1.3rem;">
          </quill-editor>
        <!-- <div class="quill-code">
          <div class="title">Code</div>
          <code class="hljs xml" v-html="contentCode"></code>
        </div> -->

        <br><br><br>

        <a href="#" class="button is-primary" @click="savePost">
         Save Post
       </a><br><br><br>
       <!-- <input-tag :tags.sync="tagsArray" placeholder="Add Tag"></input-tag> -->
       <br><br>
       <input type="hidden" name="postId" id="postId" value="" />
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

import hljs from 'highlight.js';

export default {
  data() {
    return {
      fullName: '',
      content: '',
      editorOption: {
        modules: {
          toolbar: [
          [{
            'size': ['small', false, 'large']
          }],
          ['bold', 'italic'],
          [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }],
          ['link', 'image', 'video']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true
          // imageResize: {
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          //   modules: ['Resize', 'DisplaySize', 'Toolbar']
          // }
        }
      },
      tagsArray: []
    }
  },
  beforeMount() {
    this.initPost();
  },
  computed: {
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    }
  },
  methods: {
    initPost: function() {

      axios.defaults.headers.common['Authorization'] = Cookies.get("token");
      let user = Cookies.getJSON("user");
      this.fullName = user.first + ' ' + user.last;

    },
    savePost: function() {
      console.log('saving a post...');
      var vm = this;
      var title = document.getElementById("title").value;
      var content = vm.content;
      console.log('title is ' + title.toString() + ' content is ' + content.toString());
      if (title.length && content.length) {

        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables;

        console.log('deployment target is ' + deploymentTarget);

        const postData = {
          "title": title.toString(),
          "content": vm.content.toString(),
          "tags": vm.tagsArray.toString(),
          "author" : vm.fullName.toString()
        };

        switch (deploymentTarget) {
          case LOCALHOST:
          axios.post('/v1/posts', postData)
          .then(function(response) {
            console.log(response);
            console.log('Post Id is ' + response.data.post.id.toString());
            document.getElementById('postId')
            .value = response.data.post.id.toString();
            Cookies.set("post", response.data.post);
                // this.$notify('Post saved successfully!', 'success');
                window.location.href = '../home'
              })
          .catch(function(error) {
            console.log(error);
            if (error.toString().indexOf('401') > -1) {
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

          const uuidv4 = require('uuid/v4');
          postData.id = uuidv4();
          postData.createdBy = Cookies.getJSON('user').id;

          const moment = require('moment');
          postData.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');
          postData.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');

          db.collection("posts")
          .doc(postData.id)
          .set(postData)
          .then(function(docRef) {
            Cookies.set("post", postData);
                // this.$notify('Post saved successfully!', 'success');
                window.location.href = '../home'

              })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
          break;
        }
      } else {
        console.log('nothing to save...');
      }
    },
    logout: function() {
      Cookies.set('token', '');
      Cookies.set('user', '');
      window.location.href = '../';
    },
    onEditorBlur(content) {
      // console.log('content blur!', content)
    },
    onEditorFocus(content) {
      // console.log('content focus!', content)
    },
    onEditorReady(content) {
      // console.log('content ready!', content)
    },
    addTag: function() {
      console.log('adding a tag...');

      let tagText = document.getElementById("tag").value;
      let user = Cookies.getJSON("user");

      if (tagText.length && document.getElementById("postId").value.length) {
        // axios.defaults.headers.common['Authorization'] = Cookies.get("token");

        let tagData = {
          "name": tagText,
          "postId": document.getElementById('postId').value,
          "userId": user.id.toString()
        };

        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables;
        console.log('deployment target is ' + deploymentTarget);

        switch (deploymentTarget) {
          case LOCALHOST:
          axios.post('/v1/tags', tagData)
          .then(function(response) {
            console.log(response);
            if (response.data.success) {
              document.getElementById("tag").value = '';
              console.log('Tag: ' + response.data.tag.name.toString() + ' added successfully.');
            }
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

          const uuidv4 = require('uuid/v4');
          tagData.id = uuidv4();
          tagData.createdBy = Cookies.getJSON('user').id;

          const moment = require('moment');
          tagData.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');
          tagData.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');

          db.collection("tags")
          .doc(tagData.id)
          .set(tagData)
          .then(function(docRef) {
            document.getElementById("tag").value = '';
            console.log('Tag: ' + tagData.name.toString() + ' added successfully.');

          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
          break;

        }
      }
    }
  }
};
</script>

<style>

section,
body,
html {
  background: white !important;
}

.ql-container {
  font-size: 1.3rem;
  font-family:Avenir, Helvetica, Arial, sans-serif;
}
</style>
