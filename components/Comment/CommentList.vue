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
				@click="axios_comment(idx, 'fix')">수정하기</v-btn>
			<v-btn
				v-if="type === 'write'"
				color="primary"
				@click="axios_comment(idx, 'write')">작성하기</v-btn>
		</div>
	</div>
</template>

<style scope>
</style>

<script>
import axios from 'axios';
import '~/mixin'
import CommentCard from '~/components/Comment/CommentCard'

export default {
	props: ['commentInfo', 'type'],
	data () {
		return {
		}
	},
	methods: {
		axios_comment (listIdx, type) {
			console.log('d', listIdx);
			const authUser = this.$store.state.authUser;
			const bookIdx = this.commentInfo[listIdx].bookIdx;
			const comment = this.commentInfo[listIdx].comment;
			const star = this.commentInfo[listIdx].star;

			if (authUser === null) {
				/* TODO Alert */
				return;
			}

			const d = {
				user_id: authUser,
				bookIdx,
				comment,
				star
			};
			console.log('d', d);

			if (type === 'write') {
				axios.post('/comment/write', d).then(() => {
					console.log('success!');
				}).catch((err) => {
					console.log('err', err)
				});
			} else if (type === 'read') {
				console.log('read');
			}
			/*
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
