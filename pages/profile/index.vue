<template>
	<v-card
		class="mx-auto"
		max-width="800">
		<v-card-text>
			<span class="display-1 text--primary">
				내 정보
			</span>
		</v-card-text>
		<v-card-text>
			<v-row>
				<v-col cols="12">
					{{ user_data }}
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn color="primary" @click="">로그인</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import axios from 'axios'
import '~/mixin'

export default {
	middleware: 'auth',
	head () {
		return {
			title: '내 정보',
			meta: [
				{
					hid: 'profile',
					name: 'profile',
					content: 'Profile'
				}
			]
		}
	},
	async asyncData ({ params, store, req }) {
		const d = {
			idx: req.session.passport.idx,
			user_pw: req.session.passport.user_pw
		}
		const { data } = await axios.post(`${req.session.host}/profile/read`, d);
		return {
			user_data: data.data
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
			user_data: null
		}
	},
	methods: {
	},
	components: {
	}
}
</script>
