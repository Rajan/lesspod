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

					<quill v-model="content"  :config="config" style="background: white;" output="html"/>
					<br>

					<a href="#" class="button is-primary" @click="savePage" v-if="this.token.length > 0">
						Save Page
					</a><br><br><br>
					<input-tag :tags.sync="tagsArray" :placeholder="(this.token.length > 0)? 'Add Tag' : ''"></input-tag>
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
			token: Cookies.get('token'),
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
			this.saveTags();
		}
	},
	beforeMount: function() {
		this.initPage();
	},
	methods: {
		initPage: function() {

			var vm = this;
			axios.defaults.headers.common['Authorization'] = Cookies.get("token");


			var post = Cookies.getJSON("editpost");
			console.log('post is: ' + post);

			vm.id = post.id;
			vm.title = post.title;
			vm.content = post.content;
			vm.tagsArray = post.tags.toString().split(",");

			vm.token = Cookies.get('token');

			console.log('token: ' + vm.token);


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
			if(title.length && content.length) {

				axios.put('/v1/posts/' + vm.id, {
					"id" : vm.id, 
					// "title" : title.toString(),
					// "content" : content.toString(),
					"tags" : this.tagsArray.toString()
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