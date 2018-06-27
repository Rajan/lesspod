<template>
	<modal name="new-menu-modal" @before-open="beforeOpen" height="auto">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Add New Menu</p>
				<button class="delete" aria-label="close"></button>
			</header>
			<section class="modal-card-body">
				<!-- Content ... -->
				<form>
					<div class="field">
						<div class="field">
							<label class="label">New Menu Name</label>
							<div class="control">
								<input class="input" v-model="newMenuName" type="text" placeholder="About Us" required>
							</div>
						</div>
						<div class="field">
							<label class="label">Linked URL</label>
							<div class="control">
								<input class="input" v-model="linkedURL" type="text" placeholder="http://www.example.com">
							</div>
						</div>
						<div class="field">
							<label class="label">Under Menu</label>
							<div class="control">
								<div class="select is-primary">
									<select v-model="underMenuName">
										<option v-for="item in menuOptions">{{item}}</option>
									</select>
								</div>
							</div>
						</div>
						<!-- <div class="field">
							<label class="label">Under Menu</label>
							<div class="control">
								<input class="input" type="text" placeholder="None" required>
							</div>
						</div> -->
					</div>
				</form>
			</section>
			<footer class="modal-card-foot" style="padding-bottom: 2rem; padding-top: 2rem;">
				<br>
				<button class="button is-success is-small" @click="addMenu(newMenuName)">Add Menu</button>
				<!-- <button class="button is-info">Menu Editor</button> -->
				<button class="button is-small" @click="closeMenu();">Cancel</button><br>
			</footer>
		</div>
	</modal>
</template>
<script type="text/javascript">
// import firebase from 'firebase';
export default {
	data(){
		return {
			showModal: false,
			menuOptions: ['None', 'Some'],
			newMenuName: '',
			linkedURL: '',
			underMenuName: 'None'
		}
	},
	mounted() {
		// console.log('mounted in NewMenuModal' + this.menus);
	},
	methods: {
		showDialog: function() {
			this.showModal = true;
		},
		closeMenu: function() {
			this.$modal.hide('new-menu-modal');
		},
		beforeOpen(event) {
			console.log(event.params.menus);
			var vm = this;
			vm.newMenuName = '';
			vm.menuOptions = ['None'];
			for(var i=0; i< event.params.menus.length; i++){
				console.log('event.params.menus[i]= ' + event.params.menus[i]);
				vm.menuOptions.push(event.params.menus[i].name);
			}
		},
		addMenu: function(newMenu) {
			console.log('new menu in NewMenuModal: ' + newMenu);


			if(this.underMenuName === 'None') {
				this.$emit('new-menu-added', newMenu + ',' + this.linkedURL);
			} else {
				this.$emit('new-menu-added',this.underMenuName + '->' + newMenu + ',' + this.linkedURL);
			}
			
			this.$modal.hide('new-menu-modal');
			this.newMenuName = '';
			this.linkedURL = '';
			// this.menus.push(newMenu);
			// console.log('vm.$data' + this.$data.toString());

		},
		beforeClose(event) {
			var vm = this;
		}
	}
};
</script>
<style scoped>
form {
	width: 30rem;
}
.modal-background {
	z-index: 0;
};
.v--modal-overlay .v--modal-box {
	left: 0;
	height: auto !important;
	width: auto !important;
};
</style>