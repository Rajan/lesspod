<template>
	<div class="modal" v-if="showModal">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Modal title</p>
				<button class="delete" aria-label="close"></button>
			</header>
			<section class="modal-card-body">
				<!-- Content ... -->
				<form>
					<div class="field">
						<div class="field">
							<label class="label">New Menu Name</label>
							<div class="control">
								<input class="input" type="text" placeholder="Add Post" required>
							</div>
						</div>
					</div>
				</form>
			</section>
			<footer class="modal-card-foot">
				<button class="button is-success">Save changes</button>
				<button class="button">Cancel</button>
			</footer>
		</div>
	</div>
</template>
<script type="text/javascript">
// module.exports = {
// 	data(){
// 		return {
// 			showModal: false
// 		}
// 	},
// 	methods: {
// 		showDialog: function() {
// 			this.showModal = true;
// 		}
// 	}
// };
</script>