<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered is-multiline">
				<div class="column is-two-thirds">
					<div class="field is-horizontal">
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input has-text-centered is-large disabled" style="font-weight: bold;" v-model="title" id="title" type="text" placeholder="Post Title" readonly>
									<!-- <label class="has-text-centered is-centered"></label> -->
									<!-- <div class="field-label has-text-centered is-small">
										<label class="label is-small has-text-centered is-centered">March 31, 2018 - Rajan Chandi</label>
									</div> -->
									<input class="input has-text-centered is-small disabled" v-model="dateAuthor" id="dateAuthor" type="text" placeholder="March 31, 2018 - Some Author" readonly>
									<!-- <input class="has-text-centered is-small" ></span> -->
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-two-thirds">

					<!-- <quill v-model="content" v-if="content.length > 0"  :config="config" style="background: white;font-size:1.4rem;" output="html"/> -->
					<!-- 	<quill-editor v-model="content" v-if="content.length > 0"
							:options="editorOption" style="background: white;">
						</quill-editor> -->
						<span v-html="content" class="has-text-left"></span>
						<br>

						<div class="tags">
							<span class="tag is-medium is-info" v-for="tag in tagsArray" @click="tagClicked(tag)">
								{{ tag }}
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


// window.onload = function() {
	
// }


// var editor = new Quill('#editor', {
//     // modules: { toolbar: '#toolbar' },
//     theme: 'snow',
//     toolbar: false
// });
module.exports = {
	data(){
		return {
			
			content: '',
			tagsArray: [],
			pageURL: '',
			id: '',
			title: '',
			token: null,
			dateAuthor: 'March 31, 2018 - Some Author',
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
				readOnly: ((Cookies.get('token') && Cookies.get('token').length) > 0 ? false : true),
				"modules": {
					"toolbar": (Cookies.get('token') && Cookies.get('token').length) > 0
				}
			}
		}
	},
	watch: {
		tagsArray: function() {
			// save updated values
			console.log('new tags: ' + this.tagsArray);
			if(Cookies.get('token') && Cookies.get('token').length){
				this.saveTags();
			}
		}
	},
	beforeMount: function() {
		this.initPost();
	},
	methods: {
		initPost: function() {

			var vm = this;

			if(Cookies.get('token') && Cookies.get('token').length){
				vm.token = Cookies.get('token');
				axios.defaults.headers.common['Authorization'] = Cookies.get("token");
			}
			// fetch the post from server
			let href = location.href;

			let postId = href.substr(href.lastIndexOf('/') + 1);

			axios.get('/v1/posts/' + postId, {})
			.then(function (response){
				console.log(response.data.post);
				let post = response.data.post;
				vm.id = post.id;
				vm.title = post.title;
				vm.content = post.content;
				vm.tagsArray = post.tags.toString().split(",");
				// vm.dateAuthor = post.

			})
			.catch(function (error) {
				console.log(error);
			});

			

			// console.log('token: ' + vm.token);


		},
		savePage: function() {
			var vm = this;
			console.log('saving a page...');
			var title = document.getElementById("title").value;
			var content = vm.content;
			console.log('title is ' + title.toString() + ' content is ' + content.toString());
			if(title.length && content.length) {
				if(document.getElementById('postId').value.length == 0){
					axios.post('/v1/posts', {
						"title" : vm.title.toString(),
						"content" : vm.content.toString(),
						"tags" : vm.tagsArray.toString(),
						"pageURL" : vm.pageURL
					})
					.then(function (response) {
						console.log(response);
						console.log('Page Id is ' + response.data.post.id.toString());
						document.getElementById('postId').value = response.data.post.id.toString();
						Cookies.set("page", response.data.post);
						vm.$notify('Page saved successfully!', 'success', { 'position': 'bottom-right' });
					})
					.catch(function (error) {
						console.log(error);
					});
				}else {
					axios.put('/v1/posts/' + vm.id, {
						"id" : vm.id, 
						"title" : vm.title.toString(),
						"content" : vm.content.toString(),
						"tags" : vm.tagsArray.toString()
					})
					.then(function (response) {
						console.log(response);
						console.log('Page Id is ' + response.data.post.id.toString());
						document.getElementById('postId').value = response.data.post.id.toString();
						Cookies.set("page", response.data.post);
						vm.$notify('Page saved successfully!', 'success');
					})
					.catch(function (error) {
						console.log(error);
					});
				}
			}
		},
		saveTags: function() {
			var vm = this;
			console.log('saving tags...');
			var title = document.getElementById("title").value;
			// var content = this.editor;
			// console.log('title is ' + title.toString() + ' content is ' + content.toString());
			if(vm.id && vm.tagsArray) {

				axios.put('/v1/posts/' + vm.id, {
					"id" : vm.id, 
					// "title" : title.toString(),
					// "content" : content.toString(),
					"tags" : vm.tagsArray.toString()
				})
				.then(function (response) {
					console.log(response);
					Cookies.set("post", response.data.post);
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		},
		tagClicked: function(tag) {
			console.log(tag);
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
};
#dateAuthor {
	padding-top: 0;
	margin-top: 0;
};
</style>