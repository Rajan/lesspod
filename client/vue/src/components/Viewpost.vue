<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered is-multiline">
				<div class="column is-two-thirds">
					<div class="field is-horizontal">
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input has-text-centered is-large disabled" style="font-weight: bold;font-size:2rem;" v-model="title" id="title" type="text" placeholder="Post Title" readonly>
									<input class="input has-text-centered is-small disabled" v-model="dateAuthor" id="dateAuthor" type="text" placeholder="March 31, 2018 - Some Author" readonly>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-two-thirds">

					<span v-html="content" class="has-text-left"></span>
					<br>

					<div class="tags">
						<span class="tag is-medium is-info" v-for="tag in tagsArray" @click="tagClicked(tag)">
							{{ tag }}
						</span>
					</div>
					<input type="hidden" v-model="id" name="postId" id="postId" value="" />
				</div>
				<div class="column is-two-thirds has-text-centered"> <!-- This div is only for design purposes -->
					<h2 class="title">Recommended Posts</h2>
					<div class="columns is-multiline" >
						<div class="column is-12-tablet is-6-desktop is-4-widescreen">
							<article class="box">
								<div class="media">
									<div class="media-content">
										<p class="title is-5 is-spaced is-marginless">
											<a href="#" >One Random Idea</a>
										</p>
										<div class="content is-small">
											March 31, 1984 . Some Author
											<br>
											<p>
												In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
											</p>
										</div>
									</div>
								</div>
							</article>
						</div>
						<div class="column is-12-tablet is-6-desktop is-4-widescreen">
							<article class="box">
								<div class="media">
									<div class="media-content">
										<p class="title is-5 is-spaced is-marginless">
											<a href="#" >Last Trip to Paris</a>
										</p>
										<div class="content is-small">
											March 31, 1984 . Some Author
											<br>
											<p>
												In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
											</p>
										</div>
									</div>
								</div>
							</article>
						</div>
						<div class="column is-12-tablet is-6-desktop is-4-widescreen">
							<article class="box">
								<div class="media">
									<div class="media-content">
										<p class="title is-5 is-spaced is-marginless">
											<a href="#" >Our New Business Venture</a>
										</p>
										<div class="content is-small">
											March 31, 1984 . Some Author
											<br>
											<p>
												In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
											</p>
										</div>
									</div>
								</div>
							</article>
						</div>
						<div class="column is-12-tablet is-6-desktop is-4-widescreen">
							<article class="box">
								<div class="media">
									<div class="media-content">
										<p class="title is-5 is-spaced is-marginless">
											<a href="#" >An Adventure to China</a>
										</p>
										<div class="content is-small">
											March 31, 1984 . Some Author
											<br>
											<p>
												In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
											</p>
										</div>
									</div>
								</div>
							</article>
						</div>
						<div class="column is-12-tablet is-6-desktop is-4-widescreen">
							<article class="box">
								<div class="media">
									<div class="media-content">
										<p class="title is-5 is-spaced is-marginless">
											<a href="#" >Of Ghosts and Gods</a>
										</p>
										<div class="content is-small">
											March 31, 1984 . Some Author
											<br>
											<p>
												In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
											</p>
										</div>
									</div>
								</div>
							</article>
						</div>
						<div class="column is-12-tablet is-6-desktop is-4-widescreen">
							<article class="box">
								<div class="media">
									<div class="media-content">
										<p class="title is-5 is-spaced is-marginless">
											<a href="#" >Hackers and Painters</a>
										</p>
										<div class="content is-small">
											March 31, 1984 . Some Author
											<br>
											<p>
												In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just. Led all visitor musical calling nor her.
											</p>
										</div>
									</div>
								</div>
							</article>
						</div>
					</div>
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
			
			content: '',
			tagsArray: [],
			pageURL: '',
			id: '',
			title: '',
			token: null,
			dateAuthor: 'March 31, 2018 - Some Author',
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