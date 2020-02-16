<template>
	<div>
		<BookForm v-bind:formData="book_data" />
	</div>
</template>

<script>
import axios from 'axios'
import '~/mixin'
import BookForm from '~/components/BookForm'

export default {
	middleware: 'auth',
	head () {
		return {
			title: `책 수정하기`,
			meta: [
				{
					hid: 'book modify',
					name: 'book modify',
					content: 'Book Modify'
				}
			]
		}
	},
	async asyncData ({ params, req }) {
		const host = req === undefined ? '' : 'http://127.0.0.1:3000';
		const d = {
			idx: req.session.passport.idx,
			user_pw: req.session.passport.user_pw
		};
		const bookIdx = params.index;
		const result = await axios.post(`${host}/book/detail/${bookIdx}`, d);
		return {
			book_data: {
				type: 'fix',
				data: result.data.data,
				bookIdx
			}
		}
	},
	data () {
		return {
			book_data: null
		}
	},
	methods: {
	},
	components: {
		BookForm
	}
}
</script>
