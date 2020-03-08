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
	async asyncData ({ params, req }) {
		const host = req === undefined ? '' : 'http://127.0.0.1:3000';
		const { data } = await axios.post(`${host}/book/all/1`);
		return {
			book_list: data.data
		}
	},
	methods: {
	},
	mounted () {
		/* this.getBookList(); */
	},
	components: {
		BookList
	}
}
</script>
