<template>
	<div>
		<BookForm v-bind:formData="book_data" />
	</div>
</template>

<script>
/*
import axios from 'axios'
*/
import '~/mixin'
import BookForm from '~/components/BookForm'

export default {
	middleware: 'auth',
	head () {
		return {
			title: `책 추가하기`,
			meta: [
				{
					hid: 'book detail',
					name: 'book detail',
					content: 'Book Detail'
				}
			]
		}
	},
	asyncData ({ params, req }) {
		/*
		const result = await axios.post(`${req.session.host}/book/detail/${params.index}`);
		return {
			book_data: result.data.data
		}
		*/
		const props = {};
		props.user_id = req.session.passport.user_id;
		props.user_idx = req.session.passport.idx;
		return {
			book_data: {
				type: 'add',
				data: props
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
