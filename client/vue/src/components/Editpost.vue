<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered is-multiline">
				<div class="column is-two-thirds">
					<div class="field is-horizontal">
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" v-model="title" id="title" type="text" placeholder="Post Title">
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-two-thirds">

					<quill v-model="editor"  v-if="editor.length > 0" style="background: white;" output="html"/>
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

module.exports = {
	data(){
		return {
			id: '',
			title: '',
			editor: '',
			tagsArray: []

		}
	},
	watch: {
		tagsArray: function() {
			// save updated values
			console.log('new tags: ' + this.tagsArray);
			if(Cookies.get('token') && Cookies.get('token').length && this.tagsArray.length){
				this.saveTags();
			}
		}
	},
	beforeMount() {
		this.initPost();
	},
	methods: {
		initPost: function() {
			// axios.defaults.headers.common['Authorization'] = Cookies.get("token");
			// var post = Cookies.getJSON("editpost");
			// console.log('post is: ' + post);
			// this.id = post.id;
			// this.title = post.title;
			// this.editor = post.content;
			// this.tagsArray = post.tags.toString().split(",");
			// console.log('this.tagsArray= ' + this.tagsArray);

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
					vm.editor = post.content;
					vm.tagsArray = post.tags.toString().split(",");

				})
				.catch(function (error) {
					console.log(error);
				});
		},
		savePost: function() {
			var vm = this;
			console.log('saving a post...');
			var title = document.getElementById("title").value;
			var content = this.editor;
			console.log('title is ' + title.toString() + ' content is ' + content.toString());
			if(title.length && content.length) {

				axios.put('/v1/posts/' + vm.id, {
					"id" : vm.id, 
					"title" : title.toString(),
					"content" : content.toString(),
					"tags" : this.tagsArray.toString()
				})
				.then(function (response) {
					console.log(response);
					console.log('Post Id is ' + response.data.post.id.toString());
					document.getElementById('postId').value = response.data.post.id.toString();
					Cookies.set("post", response.data.post);
					vm.$notify('Post saved successfully!', 'success');
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		},
		saveTags: function() {
			var vm = this;
			console.log('saving tags...');
			var title = document.getElementById("title").value;
			// var content = this.editor;
			// console.log('title is ' + title.toString() + ' content is ' + content.toString());
			if(title.length && this.tagsArray) {

				axios.put('/v1/posts/' + vm.id, {
					"id" : vm.id, 
					// "title" : title.toString(),
					// "content" : content.toString(),
					"tags" : this.tagsArray.toString()
				})
				.then(function (response) {
					console.log('response@saveTags = ' + response);
					Cookies.set("post", response.data.post);
				})
				.catch(function (error) {
					console.log(error);
				});
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