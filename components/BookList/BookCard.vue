<template>
	<v-card
		max-width="220"
	>
	{{ bookinfo }}
	<v-img
		class="white--text align-end"
		height="200px"
		src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
	/>
		<v-card-title class="pb-0">Number 10</v-card-title>
		<v-card-text class="text--primary">
			<div>Whitehaven Beach</div>
			<div>Whitsunday Island, Whitsunday Islands</div>
		</v-card-text>
	</v-card>
</template>

<style scope>
</style>

<script>
export default {
	props: ['bookinfo'],
	data () {
		return {
		}
	},
	methods: {
	}
}
</script>
