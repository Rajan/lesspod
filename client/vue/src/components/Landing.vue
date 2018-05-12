
<template>
<div class="landing">
<div id = landing>
	<h2> {{ title }} </h2>
	<div align="center"><img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaMVpZVegjXdgU9KurFb7-nCgdGIMtmtSzugDTOhLIB6-BrJ-h"></div>
</div>
</div>
</template>

<script>
module.exports = {
	data(){
		return {
			title: 'Landing page coming soon'
		}
	}
};
</script>

<style scoped>
h2 {
	text-align: center;
	text-shadow: #FC0 1px 0 10px;
	font-size: 30px;
	font-weight: bold;
}

img {
    display: block;
    margin: 0 auto;
		width: 600px;
}

</style>
