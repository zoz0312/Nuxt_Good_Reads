<template>
	<div>
		<v-card
			class="mx-auto"
			max-width="800">
			<v-card-text>
				<span class="display-1 text--primary">
					정보
				</span>
			</v-card-text>
			<v-card-text>
				<v-row>
					<v-col cols="3">
						책이름
					</v-col>
					<v-col cols="9">
						{{ book_data.title }}
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="3">
						Author
					</v-col>
					<v-col cols="9">
						{{ book_data.author }}
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="3">
						Content
					</v-col>
					<v-col cols="9">
						{{ book_data.contents }}
					</v-col>
				</v-row>
				{{ book_data }}
			</v-card-text>
			<v-card-actions>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
import axios from 'axios'
import '~/mixin'

export default {
	middleware: 'auth',
	head () {
		return {
			title: `${this.book_data.title} 상세정보`,
			meta: [
				{
					hid: 'book detail',
					name: 'book detail',
					content: 'Book Detail'
				}
			]
		}
	},
	async asyncData ({ params, req }) {
		const result = await axios.post(`${req.session.host}/book/detail/${params.index}`);
		return {
			book_data: result.data.data
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
	}
}
</script>
