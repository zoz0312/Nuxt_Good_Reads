<template>
	<div>
		<div
			class="my-3"
			v-for="(item, idx) in commentInfo"
			v-bind:key="idx"
		>
			<CommentCard
				v-bind:item="item"
				v-bind:type="type"
			/>
			<v-btn
				v-if="commentInfo.user_id === $store.state.authUser"
				color="primary"
				@click="write">수정하기</v-btn>
			<v-btn
				v-if="type === 'write'"
				color="primary"
				@click="write">작성하기</v-btn>
		</div>
	</div>
</template>

<style scope>
</style>

<script>
/*
import axios from 'axios';
*/
import '~/mixin'
import CommentCard from '~/components/Comment/CommentCard'

export default {
	props: ['commentInfo', 'type'],
	data () {
		return {
		}
	},
	methods: {
		write () {
			/*
			const d = {
				user_id: this.$store.state.authUser,
				book_idx: this.commentInfo.data.book_idx,
				contents: this.commentInfo.data.contents,
				star: this.commentInfo.data.star
			};
			if (this.commentInfo.type === 'add') {
				axios.post('/book/write', d).then(() => {
					console.log('success!');
				}).catch((err) => {
					console.log('err', err)
				});
			} else if (this.commentInfo.type === 'fix') {
				axios.post(`/book/modify/${this.commentInfo.idx}`, d).then(() => {
					console.log('success fix!');
				}).catch((err) => {
					console.log('err', err)
				});
			}
			*/
			console.log('commentInfo', this.commentInfo);
		}
	},
	components: {
		CommentCard
	}
}
</script>
