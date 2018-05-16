<template>
<section class="section">
	<div class="container">
		<div class="columns is-centered is-multiline">
			<div class="column is-two-thirds">
				This is a landing page
				<a href="/login">Login</a> Or <a href="/register">Create Account</a>
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

		if(Cookies.get('token').length > 0){
			this.$router.push('/home');
		}
	}
};
</script>