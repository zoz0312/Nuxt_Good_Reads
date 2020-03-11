<template>
	<div class="search-div">
		<v-toolbar
			dense
			elevation="0"
		>
			<v-text-field
				hide-details
				single-line
				v-model="search_text"
			></v-text-field>
			<v-btn
				icon
				@click="search()"
			>
				<v-icon>mdi-book-search</v-icon>
			</v-btn>
		</v-toolbar>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data () {
		return {
			search_text: ''
		}
	},
	methods: {
		search () {
			const d = {
				keyword: this.search_text
			}
			axios.post('/book/search', d).then((rtn) => {
				console.log('1');
			});
		}
	}
}
</script>

<style scope>
.search-div {
	width: 50%;
	background-color: #f5f5f5;
}
.sarch-div * {
	background-color: #f5f5f5;
}
</style>
