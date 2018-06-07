<template>
	<section class="section">

		<div class="hero-body">
			<div class="container has-text-centered">
				<div class="columns is-vcentered">
					<div class="column is-5">
						<figure class="image is-4by3">
							<img src="./../assets/images/serverless.png" alt="Description">
						</figure><br>
						<h6 class="title is-6" style="font-weight: 300;">Image credits: Hackernoon</h6>
					</div>
					<div class="column is-6 is-offset-1 has-text-left">
						<h1 class="title">
							Serverless Websites
						</h1>
						<h2 class="subtitle is-4 "><br>
							Lesspod lets anyone build and deploy website+blog combination to serverless platforms (starting with <a href="https://firebase.google.com/pricing/" target="_blank">Firebase</a>). Key benefits:
						</h2>
						<div class="content">
							<ul style="font-size: 1.3rem;" class="has-text-left block">
								<li>No fixed yearly/monthly hosting fees.</li>
								<li>Infinite scalability of the cloud.</li>
								<li>Free hosting till you're very popular!</li>
							</ul>
						</div>
						<br>
						<p class="has-text-left">
							<a href="https://github.com/Rajan/lesspod" target="_blank" class="button is-medium is-success is-outlined">
								<i class="fab fa-github"></i>&nbsp;Lesspod on Github
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="hero-foot">
			<div class="container">
				<div class="is-centered">
					<div class="column has-text-centered" style="font-size:1.5rem;">
						<a href="/login">Login</a> Or <a href="/register">Create Account</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
module.exports = {
	data(){
		return {}
	},
	beforeMount: function(){

		// auto login if credentials are present

		if(this.$cookie.get('token').length > 0){
			this.$router.push('/home');
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
</style>