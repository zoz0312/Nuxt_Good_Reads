<template>
	<div>
		<BookList v-bind:bookinfo="book_data"/>
	</div>
</template>

<script>
import axios from 'axios'
import '~/mixin'
import BookList from '~/components/BookList/BookList'

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
	mounted () {
		this.getMybook(1);
	},
	data () {
		return {
			rules: {
				'id': [
					value => !!value || 'Required.',
					value => (value && value.length >= 3) || 'Min 3 characters'
				]
			},
			book_data: null,
			bookmarkPage: 1
		}
	},
	methods: {
		async getMybook (page) {
			const d = {
				user_id: this.$store.state.authUser
			}
			const result = await axios.post(`/bookmark/mybook/${page}`, d);
			this.book_data = result.data.data;
		}
	},
	components: {
		BookList
	}
}
</script>
