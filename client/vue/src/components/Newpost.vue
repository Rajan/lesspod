<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered is-multiline has-text-centered">
				<div class="column is-two-thirds">
					<div class="field is-horizontal">
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input has-text-centered is-medium" id="title" type="text" placeholder="Post Title" style="font-weight: bold;font-size:2rem;" >
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-two-thirds">

				<quill-editor v-model="editor"
					:options="editorOption" style="height: 20rem;">
				</quill-editor>

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
import { globalVariables } from './../main';
export default {
	data(){
		return {
			editor: '',
			editorOption: {
				modules: {
					toolbar: [
					[{ 'size': ['small', false, 'large'] }],
					['bold', 'italic'],
					[{ 'list': 'ordered'}, { 'list': 'bullet' }],
					['link', 'image', 'video']
					],
					history: {
						delay: 1000,
						maxStack: 50,
						userOnly: false
					},
					imageDrop: true,
					 imageResize: {
					 	displayStyles: {
					 		backgroundColor: 'black',
					 		border: 'none',
					 		color: 'white'
					 	},
					 	modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
					 }
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

		},
		savePost: function() {
			console.log('saving a post...');
			var vm = this;
			var title = document.getElementById("title").value;
			var content = this.editor;
			console.log('title is ' + title.toString() + ' content is ' + content.toString());
			if(title.length && content.length) {

				const { deploymentTarget, LOCALHOST, FBASE } = globalVariables;
				console.log('deployment target is ' + deploymentTarget);

				const postData = {
					"title" : title.toString(),
					"content" : content.toString(),
					"tags" : this.tagsArray.toString()
				};

				switch (deploymentTarget) {
					case LOCALHOST:
					axios.post('/v1/posts', postData)
					.then(function (response) {
						console.log(response);
						console.log('Post Id is ' + response.data.post.id.toString());
						document.getElementById('postId').value = response.data.post.id.toString();
						Cookies.set("post", response.data.post);
						// this.$notify('Post saved successfully!', 'success');
						window.location.href = '../home'
					})
					.catch(function (error) {
						console.log(error);
						if(error.toString().indexOf('401') !== 0){
							vm.logout();
						}

					});
					break;

					case FBASE:
					var db = firebase.firestore();
					const settings = { timestampsInSnapshots: true };

					db.settings(settings);
					db.collection("posts").add(postData)
					.then(function(docRef) {
						console.log("Document written with ID: ", docRef.id);
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
		onEditorBlur(editor) {
        	// console.log('editor blur!', editor)
   		},
    	onEditorFocus(editor) {
	        // console.log('editor focus!', editor)
	    },
	    onEditorReady(editor) {
	        // console.log('editor ready!', editor)
	    },
	    addTag: function() {
	    	console.log('adding a tag...');

	    	let tagText = document.getElementById("tag").value;
	    	let user = Cookies.getJSON("user");

	    	if(tagText.length && document.getElementById("postId").value.length) {
					// axios.defaults.headers.common['Authorization'] = Cookies.get("token");
					axios.post('/v1/tags', {

						"name" : tagText,
						"postId" : document.getElementById('postId').value,
						"userId" : user.id.toString()

					})
					.then(function (response) {
						console.log(response);
						if(response.data.success) {
							document.getElementById("tag").value = '';
							console.log('Tag: ' + response.data.tag.name.toString() + ' added successfully.');
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}
	}
};
</script>
<style>
	section, body, html {
		background: white !important;
	}
</style>
