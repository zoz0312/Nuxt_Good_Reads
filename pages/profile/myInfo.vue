<template>
	<div>
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
					<v-col cols="3">
						사용자 ID
					</v-col>
					<v-col cols="9">
						{{ user_data.user_id }}
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="3">
						별칭
					</v-col>
					<v-col cols="9">
						{{ user_data.nickname }}
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="3">
						생성일
					</v-col>
					<v-col cols="9">
						{{ user_data.create_date }}
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="3">
						마지막 로그인
					</v-col>
					<v-col cols="9">
						{{ user_data.last_login_date }}
					</v-col>
				</v-row>
				{{ user_data }}
			</v-card-text>
			<v-card-actions>
				<v-btn color="primary" @click="">수정?</v-btn>
			</v-card-actions>
		</v-card>
	</div>
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
		const host = req === undefined ? '' : 'http://127.0.0.1:3000';
		const d = {
			idx: req.session.passport.idx,
			user_pw: req.session.passport.user_pw
		}
		const result = await axios.post(`${host}/profile/read`, d);
		return {
			user_data: result.data.data
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
