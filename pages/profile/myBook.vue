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
	async asyncData ({ params, store, req }) {
		const host = req === undefined ? '' : 'http://127.0.0.1:3000';
		const d = {
			idx: req.session.passport.idx,
			user_pw: req.session.passport.user_pw
		}
		const result2 = await axios.post(`${host}/book/mybook/1`, d);
		return {
			book_data: result2.data.data
		}
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
		BookList
	}
}
</script>
