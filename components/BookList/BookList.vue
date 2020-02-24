<template>
	<div class="text-center">
		<BookCard
			v-for="(item, idx) in bookinfo"
			v-bind:key="idx"
			v-bind:item="item"
		/>
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
