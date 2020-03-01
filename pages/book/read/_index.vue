<template>
	<div class="book-container">
		<div class="b-image">
			<v-card
				max-width="240px">
				<v-card-text>
					<img class="book-img" :src="book_data.image" />
				</v-card-text>
				<v-card-action
					v-if="$store.state.authUser !== null">
					<div v-if="book_data.status === 1">
						<v-icon
							color="green darken-3"
							@click="bookMark('del')"
							x-large
						>mdi-bookmark-check</v-icon>
						<span class="green--text text--darken-3">책갈피 소장중!</span>
					</div><div v-else>
						<v-icon
							color="primary"
							@click="bookMark('add')"
							x-large
						>mdi-bookmark-plus</v-icon>
						<span>책갈피 소장하기</span>
					</div>
				</v-card-action>
			</v-card>
		</div><div class="b-contain">
			<div class="display-1">
				{{ book_data.title }}
			</div><div class="sub-title">
				{{ book_data.author }}
			</div>
			<div>
				<v-rating
					class="comment-rate d-inline-block"
					size="15"
					color="red darken-1"
					background-color="red lighten-4"
					v-model="commentAvg.avgStar"
					half-increments
					readonly
				></v-rating>
				<span class="pr-2">{{ commentAvg.avgStar }}</span>
				리뷰수 : <span>{{ commentAvg.commentCnt }}</span>개
			</div>
			{{ book_data.contents }}
		</div>
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
.book-container {
	max-width: 1000px;
	margin: auto;
}
.b-image {
	display: inline-block;
	margin-right: 2rem;
}
.book-img {
	max-width: 100%;
}
.b-contain {
	display: inline-block;
	vertical-align: top;
}
.comment-rate > button {
	padding: .1rem !important;
}
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
		if (req.session.passport) {
			d = {
				idx: req.session.passport.idx,
				user_pw: req.session.passport.user_pw
			}
		}
		const result = await axios.post(`${host}/book/detail/${pIdx}`, d);
		const avgResult = await axios.post(`${host}/comment/info/${pIdx}`);
		console.log('avgResult', avgResult);
		return {
			book_data: result.data.data,
			commentAvg: avgResult.data.data,
			pIdx
		}
	},
	data () {
		return {
			book_data: null,
			comment_data: null,
			bookFlag: false,
			commentAvg: {
				commentCnt: 0,
				avgStar: 0
			}
		}
	},
	methods: {
		callCommentUpdate () {
			this.$refs.readComment.getData(1, true);
		},
		async bookMark (type) {
			if (type === 'add') {
				const d = {
					pIdx: this.pIdx,
					user_id: this.$store.state.authUser
				}
				const result = await axios.post(`/bookmark/add/${this.pIdx}`, d);
				if (result.data.success) {
					/* Alert */
					this.book_data.status = 1;
				}
			} else if (type === 'del') {
				const d = {
					user_id: this.$store.state.authUser
				}
				const result = await axios.post(`/bookmark/del/${this.book_data.mkIdx}`, d);
				if (result.data.success) {
					/* Alert */
					this.book_data.status = 0;
				}
			}
		}
	},
	components: {
		CommentList
	}
}
</script>
