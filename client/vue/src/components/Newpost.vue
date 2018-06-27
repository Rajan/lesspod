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

        <quill-editor ref="editor" v-model="content" :options="editorOption" style="height: 20rem;font-size: 1.3rem;">
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
</section>
</template>

<script type="text/javascript">
import {
  globalVariables
} from "./../main";

import firebase from 'firebase';
import axios from 'axios';

import hljs from "highlight.js";

import moment from 'moment';

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
      fullName: "",
      content: "",
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
    };
  },
  beforeMount() {
    this.initPost();
  },
  created() {
    // document.getElementById("footer").style.visibility = "visible";
  },
  computed: {
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    }
  },
  methods: {
    initPost: function() {
      axios.defaults.headers.common["Authorization"] = this.$cookie.get(
        "token"
      );
      let user = this.$cookie.getJSON("user");
      this.fullName = user.first + " " + user.last;
    },
    savePost: function() {
      console.log("saving a post...");
      var vm = this;
      var title = document.getElementById("title").value;
      var content = vm.content;
      console.log(
        "title is " + title.toString() + " content is " + content.toString()
      );
      if(title.toString().trim().length == 0 || content.toString().trim().length == 0){
        alert('Post title or post content missing. Add them and save again!');
      }
      if (title.length && content.length) {
        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables;

        console.log("deployment target is " + deploymentTarget);

        const postData = {
          title: title.toString(),
          content: vm.content.toString(),
          tags: vm.tagsArray.toString(),
          author: vm.fullName.toString()
        };

        switch (deploymentTarget) {
          case LOCALHOST:
            axios
              .post("/v1/posts", postData)
              .then(function(response) {
                console.log(response);
                console.log("Post Id is " + response.data.post.id.toString());
                document.getElementById(
                  "postId"
                ).value = response.data.post.id.toString();
                vm.$cookie.set("post", response.data.post);
                // this.$notify('Post saved successfully!', 'success');
                window.location.href = "../home";
              })
              .catch(function(error) {
                console.log(error);
                if (error.toString().indexOf("401") > -1) {
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

            const uuidv4 = require("uuid/v4");
            postData.id = uuidv4();
            postData.createdBy = vm.$cookie.getJSON("user").id;

            postData.createdAt = moment().format("YYYY-MM-DD HH:mm:ss.ms Z");
            postData.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss.ms Z");

            db
              .collection("posts")
              .doc(postData.id)
              .set(postData)
              .then(function(docRef) {
                vm.$cookie.set("post", postData);
                // this.$notify('Post saved successfully!', 'success');
                window.location.href = "../home";
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });
            break;
        }
      } else {
        console.log("nothing to save...");
      }
    },
    logout: function() {
      this.$cookie.set("token", "");
      this.$cookie.set("user", "");
      window.location.href = "../";
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
      console.log("adding a tag...");

      let tagText = document.getElementById("tag").value;
      let user = this.$cookie.getJSON("user");

      if (tagText.length && document.getElementById("postId").value.length) {
        // axios.defaults.headers.common['Authorization'] = this.$cookie.get("token");

        let tagData = {
          name: tagText,
          postId: document.getElementById("postId").value,
          userId: user.id.toString()
        };

        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables;
        console.log("deployment target is " + deploymentTarget);

        switch (deploymentTarget) {
          case LOCALHOST:
            axios
              .post("/v1/tags", tagData)
              .then(function(response) {
                console.log(response);
                if (response.data.success) {
                  document.getElementById("tag").value = "";
                  console.log(
                    "Tag: " +
                    response.data.tag.name.toString() +
                    " added successfully."
                  );
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

            const uuidv4 = require("uuid/v4");
            tagData.id = uuidv4();
            tagData.createdBy = this.$cookie.getJSON("user").id;

            tagData.createdAt = moment().format("YYYY-MM-DD HH:mm:ss.ms Z");
            tagData.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss.ms Z");

            db
              .collection("tags")
              .doc(tagData.id)
              .set(tagData)
              .then(function(docRef) {
                document.getElementById("tag").value = "";
                console.log(
                  "Tag: " + tagData.name.toString() + " added successfully."
                );
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
