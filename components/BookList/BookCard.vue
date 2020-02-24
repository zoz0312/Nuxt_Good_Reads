<template>
	<nuxt-link
		:to="'/book/read/' + item.idx"
	>
		<v-card
			max-width="220"
			class="d-inline-block ma-4 text-left"
		>
		<v-img
			class="white--text align-end"
			height="200px"
			:src="item.image"
		/>
			<v-card-title class="">
				{{ item.title }}
			</v-card-title>
			<v-card-subtitle class="py-0">지은이 : {{ item.author }}</v-card-subtitle>
			<v-card-subtitle class="pt-0">출간일 : {{ item.create_date }}</v-card-subtitle>
		</v-card>
	</nuxt-link>
</template>

<script>
export default {
	props: ['item'],
	data () {
		return {
		}
	},
	methods: {
	}
}
</script>

<style scope>
a {
	text-decoration:none;
}
</style>
