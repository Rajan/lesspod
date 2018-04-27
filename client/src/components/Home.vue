<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered is-multiline">
				<div class="column is-two-thirds">
					<div id="output"></div>
					You're logged in. <a href="/logout" onclick="logout()">Logout</a>
				</div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default {
	data(){
		return {
			email: '',
			password: ''
		}
	}
}
</script>