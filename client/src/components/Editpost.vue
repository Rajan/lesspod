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

					<quill v-model="editor" style="background: white;" output="html"/>
					<br>

					<a href="#" class="button is-primary" @click="savePost">
						Save Post
					</a><br><br><br>
					<input class="input" id="tag" type="text" placeholder="Add Tag"><br><br>
					<a href="#" class="button is-primary" @click="addTag">
						Add Tag
					</a><br><br>
					<input type="hidden" name="postId" id="postId" value="" />
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
			title: '',
			editor: '<br><br><br><br><br>'
		}
	},
	beforeMount() {
		this.initPost();
	},
	methods: {
		initPost: function() {
			axios.defaults.headers.common['Authorization'] = Cookies.get("token");
			var post = Cookies.getJSON("editpost");
			console.log('post is: ' + post);
			this.title = post.title;
			this.editor = post.content;
		},
		savePost: function() {
			var vm = this;
			console.log('saving a post...');
			var title = document.getElementById("title").value;
			var content = vm.editor.getText();
			console.log('title is ' + title.toString() + ' content is ' + content.toString());
			if(title.length && content.length) {

				axios.post('/v1/posts', {
					"title" : title.toString(),
					"content" : content.toString()
				})
				.then(function (response) {
					console.log(response);
					console.log('Post Id is ' + response.data.post.id.toString());
					document.getElementById('postId').value = response.data.post.id.toString();
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