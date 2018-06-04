<template>
	<section class="hero is-info">
		<div class="hero-body">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-5-tablet is-4-desktop is-4-widescreen">
						<form class="box">
							<div class="field has-text-centered">
								<span class="icon" style="width: 3rem; height: 3rem;">
									<i class="fa fa-cog fas fa-3x"></i>
								</span><br>
								Settings
							</div>
							<div class="field">
								<label class="label">Square Logo</label>
								<div class="control has-icons-left">
									<div class="file has-name is-boxed">
										<label class="file-label">
											<input class="file-input" type="file" name="resume">
											<span class="file-cta">
												<span class="file-icon">
													<i class="fas fa-upload"></i>
												</span>
												<span class="file-label">
													Choose a file…
												</span>
											</span>
											<span class="file-name">
												square-logo.png
											</span>
										</label>
									</div>
								</div>
							</div><br>
							<div class="field">
								<label class="label">Text Logo</label>
								<div class="control has-icons-left">
									<div class="file has-name is-boxed">
										<label class="file-label">
											<input class="file-input" type="file" name="resume">
											<span class="file-cta">
												<span class="file-icon">
													<i class="fas fa-upload"></i>
												</span>
												<span class="file-label">
													Choose a file…
												</span>
											</span>
											<span class="file-name">
												text-rectangle-logo.png
											</span>
										</label>
									</div>
								</div>
							</div>
							
							<div class="field">
								<label class="label">Tagline</label>
								<div class="control has-icons-left">
									<input class="input" type="text" v-model="tagline" id="tagline" placeholder="e.g. Serverless Blogging Engine" autocomplete="name" required>
								</div>
							</div>
							<div class="field">
								<label class="label">Blog Menu</label>
								<div class="control has-icons-left">
									<div class="control">
										<label class="checkbox">
											<input type="checkbox">
											Disable Blog Menu
										</label>	
									</div>
								</div>
							</div>
							<div class="field is-grouped" style="margin-top: 1.5rem;">
								<div class="control">
									<button class="button is-info" @click="saveSettings">Save Settings</button>
								</div>
								<div class="control">
									<a class="button is-text" style="text-decoration: none;" href="home">Cancel</a>
								</div>
							</div>
                <!-- <div class="field">
                  <button class="button is-success">
                    Login
                  </button>
              </div> -->
          </form>
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
			tagline: ''
		}
	}, 
	methods: {
		saveSettings: function(){

		}
	}
}
</script>