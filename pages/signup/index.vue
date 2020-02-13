<template>
	<v-card
		class="mx-auto"
		max-width="800">
		<v-card-text>
			<span class="display-1 text--primary">
				회원가입
			</span>
		</v-card-text>
		<v-card-text>
			<v-row>
				<v-col cols="9">
					<v-text-field v-model="model.user_id" label="ID" :rules="rules.id" hide-details="auto"></v-text-field>
				</v-col>
				<v-col cols="3">
					<v-btn class="w-100" color="primary">ID 중복확인</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-text-field v-model="model.user_pw" label="Password" :rules="rules.id" hide-details="auto"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-text-field v-model="model.user_pw2" label="Re Enter Password" :rules="rules.id" hide-details="auto"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-text-field v-model="model.name" label="Name" :rules="rules.id" hide-details="auto"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-text-field v-model="model.user_email" label="Email" :rules="rules.id" hide-details="auto"></v-text-field>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn color="primary" @click="create">생성하기</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import '~/mixin'

export default {
	head () {
		return {
			title: '회원가입',
			meta: [
				{
					hid: 'signup',
					name: 'signup',
					content: 'Singup'
				}
			]
		}
	},
	data () {
		return {
			rules: {
				'id': [
					value => !!value || 'Required.',
					value => (value && value.length >= 3) || 'Min 3 characters'
				]
			},
			model: {
				user_id: '',
				user_pw: '',
				user_pw2: '',
				name: '',
				user_email: ''
			}
		}
	},
	methods: {
		create () {
			/* TODO ALERT */
			if (!this.useString(this.model.user_id)) {
			}
			if (!this.useString(this.model.user_pw)) {
			}
			if (!this.useString(this.model.user_pw2)) {
			}
			if (this.model.user_pw !== this.model.user_pw2) {
			}
			if (!this.useString(this.model.name)) {
			}
			this.$http.post('/signup', this.model).then((data) => {
				console.log(data);
			}).catch((err) => {
				console.log('err', err);
			});
		}
	},
	components: {
	}
}
</script>
