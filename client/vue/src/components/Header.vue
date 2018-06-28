<template lang="html">
  
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <a class="navbar-item">
        <img id="squareLogo" src="../assets/images/icon.png" >
      </a>
      <a role="button" class="navbar-burger" data-target="navMenu"  aria-label="menu" aria-expanded="false">
       <span aria-hidden="true"></span>
       <span aria-hidden="true"></span>
       <span aria-hidden="true"></span>
     </a>
   </div>

   <div class="navbar-menu" id="navMenu">
     <div class="navbar-start" id="navStart">
      <div class="navbar-item">
       <div>
        <a href="#" id="typeLogo"  @click="logoClick">
         <img id="horizontalLogo" src="../assets/images/type.png" width="auto">
         <!-- <span style='font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;height: 5rem;font-size:1.8rem;font-weight: bold;padding-bottom:3rem;'>Rajan Chandi</span> -->
       </a>
       <br>
       <small id="tagline">Serverless CMS (Web + Blog Engine)</small>
     </div>
   </div>
 </div>

 <div class="navbar-end">
  <div id="create-new" class="navbar-item has-dropdown is-hoverable"  v-if="isLoggedIn()">
   <div class="navbar-link">
    New
    <div class="navbar-dropdown is-right">
      <router-link to="/newpost">
         <a id="new-post" class="navbar-item">
            <div>
             <span class="icon is-small">
              <i class="fa fa-clipboard"></i>
            </span>&nbsp;
            Post
          </div>
        </a>
      </router-link>
      <a id="new-menu" class="navbar-item" @click="newMenu();">
        <div>
         <span class="icon is-small">
          <i class="fa fa-bars"></i>
         </span>&nbsp;
         Menu
        </div>
      </a>

              <!-- <a class="navbar-item">
                <div>
                  <span class="icon is-small">
                    <i class="fa fa-file"></i>
                  </span>
                  Page
                </div>
              </a> -->
            </div>
          </div>

        </div>

        <div v-for="menuItem in topLevelMenus" class="navbar-item is-hoverable">
          <a href="#" v-on:click="visitMenu(menuItem)" :class="bindClass(menuItem)">{{menuItem.name.trim()}}
            <div class="navbar-item navbar-dropdown is-right" v-if="subMenusOf(menuItem.name).length">
              <a class="" v-for="menu1 in subMenusOf(menuItem.name)">
                <div v-if="menu1.postId.length">
                  <a href="#" v-on:click.stop="visitMenu(menu1)">{{cleanedSubmenu(menu1.name)}}</a>
                </div>
                <div v-else>
                  <a href="#" v-bind:href="properURL(menu1.linkedURL)" target="_blank">{{cleanedSubmenu(menu1.name)}}</a>
                </div>
              </a>
            </div>
          </a>
          <!-- class="navbar-link"  v-bind:href="properURL(menu1.linkedURL)" v-bind:href="linkedMenu(menu1)"-->
        </div>

        <!-- <div class="navbar-item is-hoverable">
          <a href="/blog">Blog</a>
        </div> -->

        <div id="profile" class="navbar-item has-dropdown is-hoverable"  v-if="isLoggedIn()">
          <div class="navbar-link">
            {{ fullName }}
          </div>
          <div class="navbar-dropdown is-right">
            <router-link to="/profile">
              <a href="/profile" class="navbar-item">
                <div>
                  <span class="icon is-small">
                    <i class="fa fa-user-circle"></i>
                  </span>&nbsp;
                  Profile
                </div>
              </a>
            </router-link>
            <router-link to="/settings">
              <a href="/settings" class="navbar-item">
                <div>
                  <span class="icon is-small">
                    <i class="fa fa-cog"></i>
                  </span>&nbsp;
                  Settings
                </div>
              </a>
            </router-link>
            <a class="navbar-item" href="https://github.com/Rajan/lesspod/issues" target="_blank">
              <div>
                <span class="icon is-small">
                  <i class="fa fa-bug"></i>
                </span>&nbsp;
                Report bug
              </div>
            </a>
            <a class="navbar-item" id="signout" @click="logout">
              <div>
                <span class="icon is-small">
                  <i class="fa fa-arrow-right"></i>
                </span>&nbsp;
                Sign Out
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- <NewMenuModal v-on:new-menu-added="newMenuAdded"></NewMenuModal> -->
  </nav>

</template>
<script type="text/javascript">
import axios from 'axios';
import { globalVariables } from "./../main";
// import NewMenuModal from "@/components/NewMenuModal";
import { loadImage } from "../utils";
import firebase from 'firebase';

// import moment from 'moment';



import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      menus: [
        {
          name: "Blog",
          linkedURL: "/blog"
        }
      ],
      showModal: false,
      newMenuName: "",
      fullName: "Alex Johnson"
    };
  },
  computed: {
    topLevelMenus: function() {
      return this.menus.filter(function(menu) {
        if (menu.name !== null && menu.name !== undefined) {
          return !(menu.name.indexOf("-") !== -1);
        }
        // return true;
      });
    },
    ...mapState({
      storedMenus: state => state.menus
    })
  },
  props: {
    // allMenus: this.menus
  },
  components: {
    // NewMenuModal
    
  },
  beforeMount() {
    if(this.$cookie) {
      axios.defaults.headers.common["Authorization"] = this.$cookie.get("token");
    }
  },
  mounted: function() {
    const { deploymentTarget, LOCALHOST, FBASE } = globalVariables;
    this.$store.dispatch("FETCH_MENUS");
    this.$store.dispatch("FETCH_POSTS");
    switch (deploymentTarget) {
      case LOCALHOST:
        // loadImage("/v1/settings/logo?name=squareLogo").then(image => {
        //   // console.log('image is ' + image);
        //   if (
        //     document.getElementById("squareLogo") &&
        //     !atob(image.substring(13)).includes("error")
        //   ) {
        //     document.getElementById("squareLogo").setAttribute("src", image);
        //   }
        // });
        // loadImage("/v1/settings/logo?name=horizontalLogo").then(image => {
        //   if (
        //     document.getElementById("horizontalLogo") &&
        //     !atob(image.substring(13)).includes("error")
        //   ) {
        //     document
        //       .getElementById("horizontalLogo")
        //       .setAttribute("src", image);
        //   }
        // });

        // /* load the tagline */
        // axios
        //   .get("/v1/settings/byName/tagline")
        //   .then(function(response) {
        //     if (response.data.setting) {
        //       document.getElementById("tagline").innerHTML =
        //         response.data.setting.value;
        //     }
        //   })
        //   .catch(e => console.log(e));
        break;
      case FBASE:
        // Firebase code to retrieve logo pics.
        break;
    }
  },
  methods: {
    whenCancelled() {
      console.log("User cancelled the loader.");
    },
    initNavbar: function() {
      // console.log('fetching menus...');
      var vm = this;

      let user = vm.$cookie.getJSON("user");
      if (user) {
        vm.fullName = user.first + " " + user.last;
        console.log(user.first + " " + user.last);
      }

      const { deploymentTarget, LOCALHOST, FBASE } = globalVariables;
      console.log("deployment target is " + deploymentTarget);

      // let menus1 = vm.$cookie.getJSON("menus");
      let menus1 = this.$store.state.storedMenus;
      console.log('storedMenus: ' + JSON.stringify(menus1));
      if (menus1 && menus1.length) {
        vm.menus = vm.menus.concat(menus1);
        console.log("menus already present: " + menus1.toString);
      } else {
        switch (deploymentTarget) {
          case LOCALHOST:
            axios
              .get("/v1/menus", {})
              .then(function(response) {
                // console.log(response);
                let menus1 = response.data.menus;

                for (var i in menus1) {
                  // console.log(menus1[i].name);
                }
                if (menus1.length > 0) {
                  vm.menus = vm.menus.concat(menus1);
                  // vm.$cookie.set("menus", JSON.stringify(vm.menus), 1);
                  // console.log(menus1);
                } else {
                  // console.log(menus1);
                }
                // renderPosts();
              })
              .catch(function(error) {
                // console.log(error);
                // if error is 401 unauthorize, logout the user.

                if (error.toString().indexOf("401") !== -1) {
                  // console.log('Logging you out...')
                  // vm.logout();
                }
              });

            break;
          case FBASE:
            let db = firebase.firestore();

            const settings = {
              timestampsInSnapshots: true
            };
            db.settings(settings);

            db
              .collection("menus") // we need to get menus by all users  .where("createdBy", "==", user.id)
              .get()
              .then(function(querySnapshot) {

                let menus1 = [];
                querySnapshot.forEach(function(doc) {
                  menus1.push(doc.data());
                });
                for (var i in menus1) {
                  console.log(menus1[i].name);
                }
                if (menus1.length > 0) {
                  vm.menus = vm.menus.concat(menus1);
                  // vm.$cookie.set("menus", JSON.stringify(vm.menus), 1);
                  // console.log(menus1);
                } else {
                  // console.log(menus1);
                }
              })
              .catch(function(error) {
                console.log("Error getting menus: ", error);
              });
            break;

            // db
            //   .collection("menus") // we need to get menus by all users  .where("createdBy", "==", user.id)
            //   .get()
            //   .then(function(querySnapshot) {
            //     let menus1 = [];
            //     querySnapshot.forEach(function(doc) {
            //       menus1.push(doc.data());
            //     });
            //     for (var i in menus1) {
            //       console.log(menus1[i].name);
            //     }
            //     if (menus1.length > 0) {
            //       vm.menus = vm.menus.concat(menus1);
            //       vm.$cookie.set("menus", JSON.stringify(vm.menus), 0.3);
            //       vm.$store.dispatch('menus/latestMenusFetched', vm.menus);
            //       // console.log(menus1);
            //     } else {
            //       // console.log(menus1);
            //     }
            //   })
            //   .catch(function(error) {
            //     console.log("Error getting menus: ", error);
            //   });
            break;
        }
      }
    },
    isLoggedIn: function() {
      if (this.$cookie && this.$cookie.get("token") && this.$cookie.get("token").length) {
        return true;
      } else {
        return false;
      }
    },
    logoClick: function() {
      var vm = this;
      
      if (vm.$cookie && vm.$cookie.get("token") && vm.$cookie.get("token").length) {
        console.log("token is " + vm.$cookie.get("token"));
        vm.$router.push('/home');
        // window.location.href = "/home";
      } else {
        // window.location.href = "/";
        vm.$router.push('/');
      }
    },
    newMenu: function() {
      // console.log('creating new menu...');
      this.$modal.show(
        "new-menu-modal",
        {
          menus: this.topLevelMenus
        },
        {}
      );
      // this.menus.push('NewM');
    },
    beforeOpen: function(event) {
      // console.log(event.params.menus);
    },
    beforeClose: function(event) {
      // console.log(event.params.menus);
    },
    linkedMenu: function(menuItem) {
      if (menuItem.linkedURL && menuItem.linkedURL.trim().length) {
        return this.properURL(menuItem.linkedURL);
      } else {
        return this.dashedMenu(menuItem.name);
      }
    },
    dashedMenu: function(menuName) {
      let arrowPos = menuName.indexOf("->");
      if (arrowPos > 0) {
        let finalMenu = menuName.substring(arrowPos + 2);

        let dashed = finalMenu.split(" ").join("-");
        return "/" + dashed.toLowerCase();
      } else {
        // console.log('menuItem.name: ' + menuItem.name);
        let dashed = menuName
          .trim()
          .split(" ")
          .join("-");
        return "/" + dashed.toLowerCase();
      }
    },
    subMenusOf: function(menuName) {
      // console.log('subMenusOf 1: ' + menuName);
      return this.menus.filter(function(menu) {
        // console.log('subMenusOf 2: ' + menuName);
        if (menu.name !== null && menu.name !== undefined) {
          return menu.name.startsWith(menuName) && menu.name !== menuName;
        }
        // return true;
      });
    },
    bindClass: function(menuItem) {
      if (this.subMenusOf(menuItem.name).length) {
        return "navbar-link";
      } else {
        return "";
      }
    },
    cleanedSubmenu: function(menu1) {
      let arrowPos = menu1.indexOf("->");
      if (arrowPos > 0) {
        return menu1.substring(arrowPos + 2);
      } else {
        return menu1;
      }
    },
    properURL: function(url) {
      if (url && url.indexOf("http") === -1) {
        return "http://" + url;
      } else return url;
    },
    newMenuAdded: function(newMenu) {
      const vm = this;
      console.log("new menu in Navbar: " + newMenu);
      const result = newMenu.split(",");
      const menuName = result[0];
      vm.menus.push(menuName);
      let linkedURL = "";
      let postId = "";
      // result[1] will contain the linked url.
      // console.log('vm.$data' + this.$data.toString());

      // axios create menu via the api
      if (result[1].length > 0) {
        linkedURL = result[1];
        vm.createMenu(result[0], linkedURL, postId);
      } else {
        const pageURL = window.location.origin + vm.dashedMenu(menuName);

        // if there's no linkedURL, we should create a corresponding page.
        // After the page is created, we should add postId to this menu.
        // This postId can be retrieved later when someone clicks on the menu.

        const title = menuName;
        const content = "<br>";
        console.log(
          "title is " + title.toString() + " content is " + content.toString()
        );
        if (title.length && content.length) {
          const { deploymentTarget, LOCALHOST, FBASE } = globalVariables;

          console.log("deployment target is " + deploymentTarget);

          const postData = {
            title: title.toString(),
            content: content.toString(),
            tags: [].toString(),
            pageURL: pageURL.toString(),
            author: vm.fullName
          };

          switch (deploymentTarget) {
            case LOCALHOST:
              axios
                .post("/v1/posts", postData)
                .then(function(response) {
                  console.log(response);
                  postId = response.data.post.id.toString();
                  // console.log('Post Id is ' + postId);
                  // document.getElementById('postId').value = postId;
                  vm.createMenu(menuName, pageURL, postId);
                  // this.$cookie.set("post", response.data.post);
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
              postData.id = uuidv4();
              postData.createdBy = vm.$cookie.getJSON("user").id;

              postData.createdAt = moment().format("YYYY-MM-DD HH:mm:ss.ms Z");
              postData.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss.ms Z");

              console.log(
                "postData in firebase menupost creation:" +
                  JSON.stringify(postData)
              );

              db
                .collection("posts")
                .doc(postData.id)
                .set(postData)
                .then(function(docRef) {
                  postId = postData.id;
                  // console.log('Post Id is ' + postId);
                  // document.getElementById('postId').value = postId;
                  vm.createMenu(menuName, pageURL, postId);
                })
                .catch(function(error) {
                  console.error("Error adding document: ", error);
                });
              break;
          }
        }
      }
    },
    createMenu: function(menuName, linkedURL, postId) {
      var vm = this;
      console.log(
        "creating menu..." +
          menuName +
          ", LinkedURL =" +
          linkedURL +
          ", postId = " +
          postId
      );

      if (menuName) {
        let menuData = {
          name: menuName.toString(),
          linkedURL: linkedURL.toString(),
          postId: postId.toString()
        };

        const { deploymentTarget, LOCALHOST, FBASE } = globalVariables;
        console.log("deployment target is " + deploymentTarget);

        switch (deploymentTarget) {
          case LOCALHOST:
            axios
              .post("/v1/menus", menuData)
              .then(function(response) {
                console.log("menu create response: " + response);
                // console.log('New Menu Id is inside: ' + response.toString());
                // document.getElementById('menuId').value = response.data.menu.id.toString();
                vm.menus.push(response.data.menu);
                // vm.$cookie.set("menu", response.data.menu, 1);
                vm.$store.dispatch("menus/setMenus", vm.menus);
                // this.$router.go(this.$router.currentRoute);
                // this.$router.go();
                vm.$notify("Menu added successfully!", "success");
                location.reload();
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

            menuData.postId = postId.toString();

            const uuidv4 = require("uuid/v4");
            menuData.id = uuidv4();
            menuData.createdBy = vm.$cookie.getJSON("user").id;

            menuData.createdAt = moment().format("YYYY-MM-DD HH:mm:ss.ms Z");
            menuData.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss.ms Z");

            db
              .collection("menus")
              .doc(menuData.id)
              .set(menuData)
              .then(function(docRef) {
                vm.menus.push(menuData);
                // vm.$cookie.set("menu", menuData);
                vm.$notify("Menu added successfully!", "success");
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });

            break;
        }
      }
    },
    visitMenu: function(menu1) {
      var vm = this;

      if (menu1.postId && menu1.postId.length) {
        // console.log("postId in visitMenu: " + JSON.stringify(menu1.postId));
        // this.$cookie.set('postId', menu1.postId);

        var postId = menu1.postId;

        // console.log("postId in Navbar: " + postId);

        const { deploymentTarget, LOCALHOST, FBASE } = globalVariables;
        console.log("deployment target is " + deploymentTarget);

        switch (deploymentTarget) {
          case LOCALHOST:
            axios
              .get("/v1/posts/" + postId.trim(), {
                id: postId.trim()
              })
              .then(function(response) {

                console.log(response);
                var post = response.data.post;
                post.title = vm.cleanedSubmenu(post.title);
                // console.log('post in Navbar: ' + post);
                vm.$cookie.set("editpost", JSON.stringify(post));
                // location.href = menu1.linkedURL;
                vm.$router.push({name: 'Page', params: { path: menu1.linkedURL.substr(menu1.linkedURL.lastIndexOf('/')+1) }});
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

            db
              .collection("posts")
              .doc(postId.trim())
              .get()
              .then(function(doc) {

                if (doc.exists) {
                  const post = doc.data();
                  post.title = vm.cleanedSubmenu(post.title);
                  vm.$cookie.set("editpost", JSON.stringify(post));
                  // location.href = menu1.linkedURL;
                  // console.log('MENU: ', menu1);
                  let menuURL = menu1.linkedURL.substr(menu1.linkedURL.lastIndexOf('/')+1);
                  vm.$router.push({name: 'Page', params: { page: menuURL }});
                } else {
                  console.log("No such post!");
                }
              })
              .catch(function(error) {
                console.log("Error getting post: ", error);
              });
            break;
        }
      } else {
        window.open(vm.properURL(menu1.linkedURL), "_blank");
      }
    },
    logout: function() {
      this.$cookie.set("token", "");
      this.$cookie.set("user", "");
      window.location.href = "../";
    },
    ...mapActions("latestMenusFetched", ["latestMenusFetched"])
  },
  created() {
    // this.initNavbar();
  }
};
</script>
<style>
@media (min-width: 100px) {
  /* This style block will only apply on viewports larger than 700px */
  #navStart {
    visibility: hidden;
    display: none;
  }

  a.navbar-link {
    padding-left: 0;
    padding-bottom: 12px;
  }
}

@media (min-width: 768px) {
  /* This style block will only apply on viewports larger than 700px */
  #navStart {
    visibility: visible;
    display: inline-block;
  }

  div.a.navbar-link {
    padding-left: 24px;
    padding-bottom: 24px;
  }
}
nav {
  width: 100%;
  display: block;
}
</style>

