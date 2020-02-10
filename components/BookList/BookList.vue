<template>
	<div>
		<BookCard v-bind:bookinfo="bookinfo" />
	</div>
</template>

<style scope>
</style>

<script>
import '~/mixin'
import BookCard from '~/components/BookList/BookCard'

export default {
	props: ['bookinfo'],
	data () {
		return {
		}
	},
	methods: {
	},
	components: {
		BookCard
	}
}
</script>
