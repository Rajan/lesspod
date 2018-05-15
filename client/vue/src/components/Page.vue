<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered is-multiline">
				<div class="column is-two-thirds">
					<div class="field is-horizontal">
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" id="title" type="text" placeholder="Page Title">
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-two-thirds">

					<quill v-model="editor" :config="config" style="background: white;" output="html"/>

					<br>
					
					<a href="#" class="button is-primary" @click="savePage">
						Save Page
					</a><br><br><br>
					<input-tag :tags.sync="tagsArray" placeholder="Add Tag"></input-tag>
					<br><br>
					<input type="hidden" name="postId" id="postId" value="" />
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
			editor: '<br><br><br><br><br>',
			config: {
				theme: 'snow'
			},
			tagsArray: [],
			pageURL
		}
	},
	beforeMount() {
		this.initPage();
	},
	methods: {
		initPage: function() {

			axios.defaults.headers.common['Authorization'] = Cookies.get("token");

			this.pageURL = window.location.href;

			// var post = Cookies.getJSON("editpost");
			// console.log('post is: ' + post);
			// this.id = post.id;
			// this.title = post.title;
			// this.editor = post.content;
			// this.tagsArray = post.tags.toString().split(",");

			// initialize the page with past data etc.

		},
		savePage: function() {
			var vm = this;
			console.log('saving a page...');
			var title = document.getElementById("title").value;
			var content = this.editor;
			console.log('title is ' + title.toString() + ' content is ' + content.toString());
			if(title.length && content.length) {
				if(document.getElementById('postId').value.length == 0){
					axios.post('/v1/posts', {
						"title" : title.toString(),
						"content" : content.toString(),
						"tags" : this.tagsArray.toString(),
						"pageURL" : this.pageURL
					})
					.then(function (response) {
						console.log(response);
						console.log('Page Id is ' + response.data.post.id.toString());
						document.getElementById('postId').value = response.data.post.id.toString();
						Cookies.set("page", response.data.post);
					})
					.catch(function (error) {
						console.log(error);
					});
				}else {
					axios.put('/v1/posts/' + vm.id, {
						"id" : vm.id, 
						"title" : title.toString(),
						"content" : content.toString(),
						"tags" : this.tagsArray.toString()
					})
					.then(function (response) {
						console.log(response);
						console.log('Page Id is ' + response.data.post.id.toString());
						document.getElementById('postId').value = response.data.post.id.toString();
						Cookies.set("page", response.data.post);
					})
					.catch(function (error) {
						console.log(error);
					});
				}
			}
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
}
</script>