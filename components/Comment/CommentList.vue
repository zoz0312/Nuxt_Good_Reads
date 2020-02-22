<template>
	<div>
		<div v-if="init === 'read'">
			<div>
				댓글 갯수 : <span>{{ commentAvg.commentCnt }}</span>개
			</div><div>
				별점 : <span>{{ commentAvg.avgStar }}</span>
			</div>
			<v-rating
				v-model="commentAvg.avgStar"
				half-increments
			></v-rating>
		</div>
		<div
			class="my-3"
			v-for="(item, idx) in commentInfo"
			v-bind:key="idx">
			<CommentCard
				v-bind:item="item"
				v-bind:type="item.type"
			/>
			<v-btn
				v-if="item.user_id === $store.state.authUser &&
				item.type === 'read'"
				color="primary"
				@click="backupData(idx)">수정하기</v-btn>
			<v-btn
				v-if="item.user_id === $store.state.authUser &&
				item.user_id !== null &&
				item.type === 'fix'"
				color="primary"
				@click="restoreData(idx)">수정취소</v-btn>
			<v-btn
				v-if="item.type !== 'read'"
				color="primary"
				@click="axios_comment(idx)">작성하기</v-btn>
		</div>
		<v-btn
			v-show="more"
			color="primary"
			@click="getData(++commentPage, false)">더보기</v-btn>
	</div>
</template>

<style scope>
</style>

<script>
import axios from 'axios';
import '~/mixin'
import CommentCard from '~/components/Comment/CommentCard'

export default {
	props: ['init', 'pIdx'],
	data () {
		return {
			commentInfo: [],
			origValue: [],
			commentAvg: {},
			commentPage: 1,
			more: true
		}
	},
	mounted () {
		if (this.init === 'write') {
			this.commentInfo = [{ 'bookIdx': this.pIdx, 'type': 'write' }];
		} else if (this.init === 'read') {
			this.getSubData();
			this.getData(1, false);
		}
	},
	methods: {
		async getSubData () {
			const result = await axios.post(`/comment/info/${this.pIdx}`);
			console.log('result', result.data.data);
			this.commentAvg = result.data.data;
		},
		async getData (page, flag) {
			const result = await axios.post(`/comment/read/${this.pIdx}/${page}`, { user_id: this.$store.state.authUser });
			for (let i = 0; i < result.data.data.length; i++) {
				result.data.data[i].type = 'read';
			}
			if (flag) {
				console.log('commment', this.commentInfo);
				this.commentInfo.splice(0);
			}
			if (this.init === 'write') {
				this.commentInfo = [{ 'bookIdx': this.pIdx, 'type': 'write' }];
				this.callUpdate();
			} else if (this.init === 'read') {
				this.getSubData();
				this.more = result.data.data.length === 5;
				this.commentInfo.push(...result.data.data);
			}
		},
		backupData (idx) {
			this.commentInfo[idx].type = 'fix';
			if (this.origValue[idx] === undefined) {
				this.origValue[idx] = {};
			}
			this.origValue[idx].comment = this.commentInfo[idx].comment;
			this.origValue[idx].star = this.commentInfo[idx].star;
		},
		restoreData (idx) {
			this.commentInfo[idx].type = 'read';
			this.commentInfo[idx].comment = this.origValue[idx].comment;
			this.commentInfo[idx].star = this.origValue[idx].star;
		},
		axios_comment (listIdx) {
			const type = this.commentInfo[listIdx].type;
			const authUser = this.$store.state.authUser;
			const commentIdx = this.commentInfo[listIdx].commentIdx;
			const bookIdx = this.commentInfo[listIdx].bookIdx;
			const comment = this.commentInfo[listIdx].comment;
			const star = this.commentInfo[listIdx].star;

			if (authUser === null) {
				/* TODO Alert */
				return;
			}

			const d = {
				user_id: authUser,
				commentIdx,
				bookIdx,
				comment,
				star
			};

			if (type === 'write') {
				axios.post('/comment/write', d).then(() => {
					this.getData(1, true);
				}).catch((err) => {
					console.log('err', err)
				});
			} else if (type === 'fix') {
				axios.post(`/comment/update`, d).then(() => {
					this.commentInfo[listIdx].type = 'read';
				}).catch((err) => {
					console.log('err', err)
				});
			}
		},
		callUpdate () {
			this.$emit('update');
		}
	},
	components: {
		CommentCard
	}
}
</script>
