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
			book_list: [],
			bookcnt: 1,
			end_flag: false
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
		handleScroll (e) {
			const height = (window.innerHeight + window.scrollY) - document.body.offsetHeight;
			if (height >= 0 && !this.end_flag) {
				this.bookLoad();
			}
		},
		async bookLoad () {
			this.bookcnt++;
			const { data } = await axios.post(`/book/all/${this.bookcnt}`);
			if (data.data.length < 10) {
				this.end_flag = true;
			}
			this.book_list.push(...data.data);
		}
	},
	beforeMount () {
		window.addEventListener('scroll', this.handleScroll);
	},
	beforeDestroy () {
		window.body.removeEventListener('scroll', this.handleScroll);
	},
	mounted () {
		/* this.getBookList(); */
	},
	components: {
		BookList
	}
}
</script>
