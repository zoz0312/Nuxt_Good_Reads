<template>
	<v-card>
		<v-card-text
			v-if="type === 'read'">
			<div class="subtitle-2">
				<v-list-item>
					<v-list-item-avatar>
						<v-img v-if="item.profile" :src="item.profile"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="headline">
							{{ item.nickname }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ item.title }}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</div>
			<div class="text-area">
				{{ item.comment }}
			</div>
			<div>
				<v-rating
					v-model="item.star"
					readonly></v-rating>
			</div>
		</v-card-text>
		<v-card-text v-else>
			<div class="subtitle-2">
					댓글
			</div>
			<div>
				<v-textarea
						name="input-7-1"
						label="댓글 입력"
						v-model="item.comment"
						hint="작품의 소감을 남겨주세요."
					></v-textarea>
			</div>
			<v-rating v-model="item.star"></v-rating>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	props: ['item', 'type'],
	methods: {
	}
}
</script>

<style scope>
</style>
