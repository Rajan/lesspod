<template>
<section class="section">
  <div class="container">
    <div class="columns is-centered is-multiline has-text-centered">
      <div class="column is-two-thirds">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input has-text-centered is-medium" v-model="title" id="title" type="text" placeholder="Page Title" style="font-weight: bold;font-size:2rem;">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-two-thirds">

        <!-- <quill v-model="content"  :config="config" style="background: white;" output="html"/> -->
        <quill-editor v-model="content" ref="myQuillEditor" v-if="token && token.length > 0" :options="editorOption" style="height: 20rem;">
        </quill-editor>
        <span v-else v-html="content" class="has-text-left" style="font-size: 1.3rem;"></span>
        <br><br><br>

        <a href="#" class="button is-primary" @click="savePage" v-if="token && token.length > 0">
						Save Page
					</a><br><br>
        <input-tag :tags.sync="tagsArray" :placeholder="(token && token.length > 0)? 'Add Tag' : ''" v-if="token && token.length > 0">

        </input-tag>
        <div class="tags" v-if="!token">
          <span class="button is-link is-outlined is-small is-rounded" v-if="tag.trim().length > 0" v-for="tag in tagsArray" @click="tagClicked(tag)" style="margin-right:0.6rem;">
								{{ tag.trim() }}
							</span>
        </div>
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

// window.onload = function() {

// }


// var editor = new Quill('#editor', {
//     // modules: { toolbar: '#toolbar' },
//     theme: 'snow',
//     toolbar: false
// });
export default {
  data() {
    return {

      content: '',
      tagsArray: [],
      pageURL: '',
      id: '',
      title: '',
      token: null,
      disabled: true,
      editorOption: {

        modules: {
          // readOnly: true,
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
          imageDrop: true,
          // imageResize: {
          // 	displayStyles: {
          // 		backgroundColor: 'black',
          // 		border: 'none',
          // 		color: 'white'
          // 	},
          // 	modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          // }
        }
      },
      config: {
        theme: 'snow',
        readOnly: ((this.$cookie.get('token') && this.$cookie.get('token').length) > 0 ? false : true),
        "modules": {
          "toolbar": (this.$cookie.get('token') && this.$cookie.get('token').length) > 0
        }
      }
    }
  },
  computed: {
    quill() {
      return this.$refs.myQuillEditor.quill
    }
  },
  watch: {
    tagsArray: function() {
      // save updated values
      console.log('new tags: ' + this.tagsArray);
      if (this.$cookie.get('token') && this.$cookie.get('token').length) {
        this.saveTags();
      }
    }
  },
  beforeMount: function() {
    this.initPage();
  },
  methods: {
    initPage: function() {

      var vm = this;
      axios.defaults.headers.common['Authorization'] = vm.$cookie.get("token");


      var post = vm.$cookie.getJSON("editpost");
      console.log('post is: ' + post);

      vm.id = post.id;
      vm.title = post.title;
      vm.content = post.content;
      vm.tagsArray = post.tags.toString().split(",");

      vm.token = vm.$cookie.get('token');

      console.log('token: ' + vm.token);


    },
    savePage: function() {
      var vm = this;
      console.log('saving a page...');
      var title = document.getElementById("title").value;
      var content = vm.content;
      console.log('title is ' + title.toString() + ' content is ' + content.toString());
      if (title.length && content.length) {

        if (document.getElementById('postId').value.length == 0) {
          let postData = {
            "title": vm.title.toString(),
            "content": vm.content.toString(),
            "tags": vm.tagsArray.toString(),
            "pageURL": vm.pageURL
          };

          const {
            deploymentTarget,
            LOCALHOST,
            FBASE
          } = globalVariables;
          console.log('deployment target is ' + deploymentTarget);

          switch (deploymentTarget) {
            case LOCALHOST:
              axios.post('/v1/posts', postData)
                .then(function(response) {
                  console.log(response);
                  console.log('Page Id is ' + response.data.post.id.toString());
                  document.getElementById('postId').value = response.data.post.id.toString();
                  vm.$cookie.set("page", response.data.post);
                  vm.$notify('Page saved successfully!', 'success', {
                    'position': 'bottom-right'
                  });
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
              postData.id = uuidv4();
              postData.createdBy = vm.$cookie.getJSON('user').id;

              const moment = require('moment');
              postData.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');
              postData.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');


              db.collection("posts")
                .doc(postData.id)
                .set(postData)
                .then(function(docRef) {
                  console.log(postData);
                  console.log('Page Id is ' + postData.id);
                  document.getElementById('postId').value = postData.id;
                  vm.$cookie.set("page", postData);
                  vm.$notify('Page saved successfully!', 'success', {
                    'position': 'bottom-right'
                  });

                })
                .catch(function(error) {
                  console.error("Error adding document: ", error);
                });

              break;
          }

        } else {

          let postData = {
            "title": vm.title.toString(),
            "content": vm.content.toString(),
            "tags": vm.tagsArray.toString(),
          };

          const {
            deploymentTarget,
            LOCALHOST,
            FBASE
          } = globalVariables;
          console.log('deployment target is ' + deploymentTarget);

          switch (deploymentTarget) {
            case LOCALHOST:
              postData.id = vm.id;
              axios.put('/v1/posts/' + vm.id, postData)
                .then(function(response) {
                  console.log(response);
                  console.log('Page Id is ' + response.data.post.id.toString());
                  document.getElementById('postId').value = response.data.post.id.toString();
                  vm.$cookie.set("page", response.data.post);
                  vm.$notify('Page saved successfully!', 'success');
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

              postData.id = vm.id;
              const moment = require('moment');
              postData.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');


              db.collection("posts")
                .doc(postData.id)
                .update(postData)
                .then(function(docRef) {
                  console.log('Page Id is ' + postData.id);
                  document.getElementById('postId').value = postData.id;
                  vm.$cookie.set("page", postData);
                  vm.$notify('Page saved successfully!', 'success');

                })
                .catch(function(error) {
                  console.error("Error updating document: ", error);
                });
              break;
          }


        }
      }
    },
    saveTags: function() {
      var vm = this;
      console.log('saving tags...');
      var title = document.getElementById("title").value;
      //var content = this.editor;
      // console.log('title is ' + title.toString() + ' content is ' + content.toString());
      if (vm.id && vm.tagsArray) {
        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables;
        console.log('deployment target is ' + deploymentTarget);

        let postData = {
          "id": vm.id,
          // "title" : title.toString(),
          // "content" : content.toString(),
          "tags": vm.tagsArray.toString()
        };

        switch (deploymentTarget) {
          case LOCALHOST:
            axios.put('/v1/posts/' + vm.id, postData)
              .then(function(response) {
                console.log(response);
                vm.$cookie.set("post", response.data.post);
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
            const moment = require('moment');
            postData.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');

            db.collection("posts")
              .doc(postData.id)
              .update(postData)
              .then(function(docRef) {
                postData.title = title.toString();
                //postData.content = content.toString();
                vm.$cookie.set("post", postData);
                console.log(postData);
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

      let tagText = document.getElementById("tag").value;
      let user = this.$cookie.getJSON("user");

      if (tagText.length && document.getElementById("postId").value.length) {
        // axios.defaults.headers.common['Authorization'] = this.$cookie.get("token");

        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables;
        console.log('deployment target is ' + deploymentTarget);

        let tagData = {
          "name": tagText,
          "postId": document.getElementById('postId').value,
          "userId": user.id.toString()
        };

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

.hide-toolbar .ql-toolbar {
  display: none;
}

.ql-container {
  font-size: 1.3rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
