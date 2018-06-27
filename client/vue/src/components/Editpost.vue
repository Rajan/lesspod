<template>
<section class="section">
  <div class="container">
    <div class="columns is-centered is-multiline has-text-centered">
      <div class="column is-two-thirds">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input has-text-centered is-large" v-model="title" id="title" type="text" placeholder="Post Title" style="font-weight: bold;font-size:2rem;">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-two-thirds">
        <quill-editor v-model="editor" v-if="editor.length > 0" :options="editorOption" style="background: white;font-size: 1.3rem;" ref="editor">
        </quill-editor>
        <br>

        <a href="#" class="button is-primary" @click="savePost">
						Save Post
					</a><br><br><br>
        <input-tag :tags.sync="tagsArray" placeholder="Add Tag"></input-tag>
        <br><br>
        <input type="hidden" v-model="id" name="postId" id="postId" value="" />
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

import firebase from 'firebase';

import hljs from "highlight.js";

import moment from 'moment';

import axios from 'axios';

function imageHandler(img) {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();
  input.onchange = () => {
    const file = input.files[0];
    if (/^image\//.test(file.type)) {
      uploadImage.call(this, file);
    } else {
      alert("You could only upload images.");
    }
  };
}

function uploadImage(file) {
  // Upload file and get url from firebase server. Make an API call, upload the file and get the URL which can be embedded into the editor.

  const user = this.$cookie.getJSON("user");
  const now = moment().format("YYYY-MM-DD HH:mm:ss.ms Z");
  const storagePath = `${user.id}/images/${now}_${file.name}`;
  firebase
    .storage()
    .ref(storagePath)
    .put(file)
    .then(snapshot => {
      console.log('image upload success');
      return snapshot.ref.getDownloadURL();
    })
    .then(downloadURL => {
      console.log('writing download url to db');
      //const url = "https://avatars2.githubusercontent.com/u/16257851?s=88&v=4";
      const url = downloadURL;
      const range = this.$refs.editor.quill.getSelection();
      this.$refs.editor.quill.insertEmbed(range.index, "image", url);

      let db = firebase.firestore();
      const settings = {
        timestampsInSnapshots: true
      };
      db.settings(settings);

      db.collection('images').add({
          name: file.name,
          path: storagePath,
          publicUrl: url,
          createdBy: user.id,
          createdAt: now,
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    })
    .catch(error => {
      console.error(error);
      this._alert(true, 'error', error.message);
    });
}

function videoHandler(vid1) {
  // console.log("video info = " + vid1);
  this.$refs.editor.quill.root.quill = this.$refs.editor.quill;
  // Embed the video into the editor: https://www.youtube.com/watch?v=bz7sibZsOLs
  const vidurl = prompt("enter video url").toString().replace('watch?v=', 'embed/');
  let src = 'https://www.youtube.com/embed/o-KdQiObAGM'
  const range = this.$refs.editor.quill.getSelection();
  this.$refs.editor.quill.insertEmbed(range.index, 'video', vidurl, 'user');
}

export default {
  data() {
    return {
      id: '',
      title: '',
      editor: '',
      author: '',
      pageURL: '',
      editorOption: {
        modules: {
          toolbar: {
            // removing the handler will revert back to base64 images in the file
            handlers: {
              image: imageHandler.bind(this),
              video: videoHandler.bind(this)
            },
            container: [
              [{
                size: ["small", false, "large"]
              }],
              ["bold", "italic"],
              [{
                  list: "ordered"
                },
                {
                  list: "bullet"
                }
              ],
              ["link", "image", "video"]
            ]
          },
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
  watch: {
    tagsArray: function() {
      // save updated values
      console.log('new tags: ' + this.tagsArray);
      if (this.$cookie.get('token') && this.$cookie.get('token').length && this.tagsArray.length) {
        this.saveTags();
      }
    }
  },
  computed: {
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    }
  },
  beforeMount() {
    this.initPost();
  },
  methods: {
    initPost: function() {
      // axios.defaults.headers.common['Authorization'] = this.$cookie.get("token");
      // var post = this.$cookie.getJSON("editpost");
      // console.log('post is: ' + post);
      // this.id = post.id;
      // this.title = post.title;
      // this.editor = post.content;
      // this.tagsArray = post.tags.toString().split(",");
      // console.log('this.tagsArray= ' + this.tagsArray);

      var vm = this;

      if (vm.$cookie.get('token') && vm.$cookie.get('token').length) {
        vm.token = vm.$cookie.get('token');
        axios.defaults.headers.common['Authorization'] = vm.$cookie.get("token");
      }
      // fetch the post from server
      let href = location.href;

      let postId = href.substr(href.lastIndexOf('/') + 1).replace('#', '');
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
              vm.tagsArray = post.tags.toString().split(",");
              vm.pageURL = post.pageURL;
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
                vm.tagsArray = post.tags.toString().split(",");
                vm.pageURL = post.pageURL;

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

    savePost: function() {
      var vm = this;
      console.log('saving a post...');
      var title = document.getElementById("title").value;
      var content = this.editor;
      console.log('title is ' + title.toString() + ' content is ' + content.toString());
      if (title.length && content.length) {

        let postData = {
          "id": vm.id,
          "title": title.toString(),
          "content": content.toString(),
          "tags": vm.tagsArray.toString(),
          "pageURL": vm.pageURL ? vm.pageURL : null
        };

        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables;
        console.log('deployment target is ' + deploymentTarget);

        switch (deploymentTarget) {
          case LOCALHOST:
            axios.put('/v1/posts/' + vm.id, postData)
              .then(function(response) {
                console.log(response);
                console.log('Post Id is ' + response.data.post.id.toString());
                document.getElementById('postId').value = response.data.post.id.toString();
                vm.$cookie.set("post", response.data.post);
                vm.$notify('Post saved successfully!', 'success');
              })
              .catch(function(error) {
                console.log(error);
                if (error.toString().indexOf('401') !== 0) {
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

            postData.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');

            db.collection("posts")
              .doc(postData.id)
              .update(postData)
              .then(function(docRef) {
                console.log('Post Id is ' + postData.id.toString());
                document.getElementById('postId').value = postData.id.toString();
                vm.$cookie.set("post", postData);
                vm.$notify('Post saved successfully!', 'success');
              })
              .catch(function(error) {
                console.error("Error updating document: ", error);
              });
            break;
        }


      }
    },
    saveTags: function() {
      var vm = this;
      console.log('saving tags...');
      var title = document.getElementById("title").value;
      // var content = this.editor;
      // console.log('title is ' + title.toString() + ' content is ' + content.toString());
      if (title.length && this.tagsArray) {

        let postData = {
          "id": vm.id,
          // "title" : title.toString(),
          // "content" : content.toString(),
          "tags": this.tagsArray.toString()
        };

        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables;
        console.log('deployment target is ' + deploymentTarget);

        switch (deploymentTarget) {
          case LOCALHOST:
            axios.put('/v1/posts/' + vm.id, postData)
              .then(function(response) {
                console.log('response@saveTags = ' + response);
                vm.$cookie.set("post", response.data.post);
              })
              .catch(function(error) {
                console.log(error);
                if (error.toString().indexOf('401') !== 0) {
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

            postData.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');

            db.collection("posts")
              .doc(postData.id)
              .update(postData)
              .then(function(docRef) {
                console.log('Post Id is ' + postData.id.toString());
                document.getElementById('postId').value = postData.id.toString();
                postData.title = title.toString();
                postData.content = content.toString();
                vm.$cookie.set("post", postData);
                vm.$notify('Post saved successfully!', 'success');
              })
              .catch(function(error) {
                console.error("Error updating document: ", error);
              });
            break;
        }
      }
    },
    addTag: function() {
      console.log('adding a tag...');
      var vm = this;
      let tagText = document.getElementById("tag").value;
      let user = vm.$cookie.getJSON("user");

      if (tagText.length && document.getElementById("postId").value.length) {
        // axios.defaults.headers.common['Authorization'] = this.$cookie.get("token");
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
            tagData.createdBy = this.$cookie.getJSON('user').id;

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
    },
    logout: function() {
      this.$cookie.set('token', '');
      this.$cookie.set('user', '');
      window.location.href = '../';
    },
  }
};
</script>
<style>
section,
body,
html {
  background: white !important;
}


#dateAuthor {
  padding-top: 0;
  margin-top: 0;
}


.ql-container {
  font-size: 1.3rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;

}
</style>
