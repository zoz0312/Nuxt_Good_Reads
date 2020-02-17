<template>
	<v-card>
		<v-card-text>
			<v-row>
				<v-col cols="3">
					댓글
				</v-col><v-col cols="9">
					<v-textarea
						name="input-7-1"
						label="Default style"
						v-model="item.comment"
						hint="Hint text"
					></v-textarea>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="3">
					<v-rating v-model="item.star"></v-rating>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	props: ['item'],
	methods: {
	}
}
</script>

<style scope>
</style>
