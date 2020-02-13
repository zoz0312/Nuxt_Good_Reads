<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
		<BookList v-bind:bookinfo="book_list"/>
    </v-flex>
			<button @click="getBookList">dasdsasda</button>
  </v-layout>
</template>

<script>
import axios from 'axios'
import BookList from '~/components/BookList/BookList'

export default {
	data () {
		return {
			book_list: {}
		}
	},
	async asyncData ({ params }) {
		const { data } = await axios.post('http://localhost:3000/book/all/1');
		/* const { data } = await axios.post('localhost:3000/book/all/1'); */
		return {
			book_list: data.data
		}
	},
	methods: {
		async getBookList () {
			const { data } = await axios.post('/book/all/1');
			this.book_list = data.data;
		}
	},
	mounted () {
		/* this.getBookList(); */
	},
	components: {
		BookList
	}
}
</script>
