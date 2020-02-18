<template>
	<v-card>
		<v-card-text
			v-if="type === 'read'">
			<div class="subtitle-2">
				<v-list-item-avatar>
					<v-img v-if="item.profile" :src="item.profile"></v-img>
				</v-list-item-avatar>
				{{ item.nickname }}
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
						label="Default style"
						v-model="item.comment"
						hint="Hint text"
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
