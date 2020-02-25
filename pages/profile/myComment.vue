<template>
	<div>
		<CommentList
			v-bind:init="'read'"
			v-bind:pIdx="'profile'"/>
	</div>
</template>

<script>
import '~/mixin'
import CommentList from '~/components/Comment/CommentList'

export default {
	middleware: 'auth',
	head () {
		return {
			title: '내 정보',
			meta: [
				{
					hid: 'profile',
					name: 'profile',
					content: 'Profile'
				}
			]
		}
	},
	async asyncData ({ params, store, req }) {
	},
	data () {
		return {
			rules: {
				'id': [
					value => !!value || 'Required.',
					value => (value && value.length >= 3) || 'Min 3 characters'
				]
			},
			book_data: null
		}
	},
	methods: {
	},
	components: {
		CommentList
	}
}
</script>
