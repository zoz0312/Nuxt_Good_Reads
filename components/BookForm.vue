<template>
	<v-card>
		<v-card-text>
			<v-row>
				<v-col cols="3">
					제목
				</v-col><v-col cols="9">
					<v-text-field label="제목" :rules="rules" v-model="formData.data.title" hide-details="auto"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="3">
					지은이
				</v-col><v-col cols="9">
					<v-text-field label="지은이" :rules="rules" v-model="formData.data.author" hide-details="auto"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="py-0">
					<v-file-input
						:v-model="formData.data.image"
						accept="image/png, image/jpeg"
						placeholder="썸네일을 넣어주세요"
						label="썸네일"
						@change="image_change"
					></v-file-input>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<img :src="formData.data.image" />
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="3">
					내용
				</v-col><v-col cols="9">
					<v-textarea
						name="input-7-1"
						label="Default style"
						v-model="formData.data.contents"
						hint="Hint text"
					></v-textarea>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn color="primary" @click="write">작성하기</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import axios from 'axios';

export default {
	props: ['formData'],
	data () {
		return {
			image_size: 0,
			rules: [
				value => !!value || 'Required.',
				value => (value && value.length >= 3) || 'Min 3 characters'
			]
		}
	},
	methods: {
		image_change (file) {
			if (file !== undefined) {
				const reader = new FileReader();
				reader.onload = (event) => {
					this.imgSrc = file;
					this.formData.data.image = event.target.result;
				}
				reader.readAsDataURL(file)
				this.image_size = file.size;
			}
		},
		write () {
			/*
			if (this.image_size > 2048000) {
				this.$refs.alert.set_alert_text('썸네일의 크기가 2MB 이상입니다.', 'error');
				return;
			}
			*/
			const d = {
				idx: this.formData.data.user_idx,
				user_id: this.$store.state.authUser,
				title: this.formData.data.title,
				author: this.formData.data.author,
				contents: this.formData.data.contents,
				thumbnail: this.formData.data.image
			};
			if (this.formData.type === 'add') {
				axios.post('/book/write', d).then(() => {
					console.log('success!');
				}).catch((err) => {
					console.log('err', err)
				});
			} else if (this.formData.type === 'fix') {
				axios.post(`/book/modify/${this.formData.bookIdx}`, d).then(() => {
					console.log('success fix!');
				}).catch((err) => {
					console.log('err', err)
				});
			}
		}
	}
}
</script>

<style scope>
</style>
