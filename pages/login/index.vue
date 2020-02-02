<template>
	<v-card
		class="mx-auto"
		max-width="800">
		<v-card-text>
			<span class="display-1 text--primary">
				로그인
			</span>
		</v-card-text>
		<v-card-text>
			<v-row>
				<v-col cols="12">
					<v-text-field v-model="model.user_id" label="ID" :rules="rules.id" hide-details="auto" />
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-text-field v-model="model.user_pw" label="Password" :rules="rules.id" hide-details="auto" />
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn color="primary" @click="login">로그인</v-btn>
			<a href='/login/auth/kakao'>카카오로그인</a>
		</v-card-actions>
	</v-card>
</template>

<script>
import '~/mixin'

export default {
	head () {
		return {
			title: '로그인',
			meta: [
				{
					hid: 'login',
					name: 'login',
					content: 'Login'
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
				user_pw: ''
			}
		}
	},
	methods: {
		login () {
			/* TODO ALERT */
			console.log(this.$http);
			if (!this.useString(this.model.user_id)) {
			}
			if (!this.useString(this.model.user_pw)) {
			}
			this.$http.post('/login', this.model).then((data) => {
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
