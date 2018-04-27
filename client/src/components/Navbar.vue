<template lang="html">
	<nav class="navbar has-shadow">
		<div class="navbar-brand">
			<a class="navbar-item">
				<img src="./../assets/images/icon.png">
			</a>
			<div class="navbar-burger burger">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>

		<div class="navbar-menu">
			<div class="navbar-start">
				<div class="navbar-item">
					<div>
						<img src="./../assets/images/type.png" width="auto" height="21">
						<br>
						<small>Serverless Blogging Engine</small>
					</div>
				</div>
			</div>

			<div class="navbar-end">
				<div class="navbar-item has-dropdown is-hoverable">
					<div class="navbar-link">
						New
						<div class="navbar-dropdown is-right">
							<a class="navbar-item" onclick="window.location.href = '../newpost';">
								<div>
									<span class="icon is-small">
										<i class="fa fa-clipboard"></i>
									</span>
									Post
								</div>
							</a>
							<a class="navbar-item">
								<div>
									<span class="icon is-small">
										<i class="fa fa-bars"></i>
									</span>
									Menu
								</div>
							</a>
							<a class="navbar-item">
								<div>
									<span class="icon is-small">
										<i class="fa fa-file"></i>
									</span>
									Page
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="navbar-item is-hoverable">
					<a href="/blog">Blog</a>
				</div>

				<div class="navbar-item has-dropdown is-hoverable">
					<div class="navbar-link">
						Alex Johnson
					</div>
					<div class="navbar-dropdown is-right">
						<a class="navbar-item">
							<div>
								<span class="icon is-small">
									<i class="fa fa-user-circle-o"></i>
								</span>
								Profile
							</div>
						</a>
						<a class="navbar-item">
							<div>
								<span class="icon is-small">
									<i class="fa fa-cog"></i>
								</span>
								Settings
							</div>
						</a>
						<a class="navbar-item">
							<div>
								<span class="icon is-small">
									<i class="fa fa-bug"></i>
								</span>
								Report bug
							</div>
						</a>
						<a class="navbar-item">
							<div>
								<span class="icon is-small">
									<i class="fa fa-sign-out"></i>
								</span>
								Sign Out
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>
<script type="text/javascript">
module.exports = {
	data(){
		return {}
	}
}
</script>