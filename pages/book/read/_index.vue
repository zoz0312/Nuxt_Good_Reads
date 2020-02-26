<template>
	<div>
		<v-card
			class="mx-auto"
			max-width="800">
			<v-card-text>
				<v-row>
					<v-col cols="11" class="display-1 text--primary">
						{{ book_data.title }}
					</v-col>
					<v-col
						cols="1"
						v-if="$store.state.authUser !== null">
						<v-icon
							color="primary"
							@click="bookMark('add')"
							v-if="book_data.status === 1"
							x-large
						>mdi-bookmark-check</v-icon>
						<v-icon
							color="primary"
							@click="bookMark('add')"
							v-else
							x-large
						>mdi-bookmark-plus</v-icon>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-text>
				<v-row>
					<v-col>
						<img :src="book_data.image" />
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
			</v-card-text>
			<v-card-actions>
			</v-card-actions>
		</v-card>
		<CommentList
			v-bind:init="'write'"
			v-bind:pIdx="pIdx"
			v-on:update="callCommentUpdate"/>
		<CommentList
			v-bind:init="'read'"
			v-bind:pIdx="pIdx"
			ref="readComment"/>
	</div>
</template>

<style scope>
</style>

<script>
import axios from 'axios'
import '~/mixin'
import CommentList from '~/components/Comment/CommentList'

export default {
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
		const host = req === undefined ? '' : 'http://127.0.0.1:3000';
		const pIdx = params.index;
		let d = {};
		if (req.session) {
			d = {
				idx: req.session.passport.idx,
				user_pw: req.session.passport.user_pw
			}
		}
		const result = await axios.post(`${host}/book/detail/${pIdx}`, d);
		return {
			book_data: result.data.data,
			pIdx
		}
	},
	data () {
		return {
			book_data: null,
			comment_data: null,
			bookFlag: false
		}
	},
	methods: {
		callCommentUpdate () {
			this.$refs.readComment.getData(1, true);
		},
		bookMark (type) {
			if (type === 'add') {
			}
		}
	},
	components: {
		CommentList
	}
}
</script>
