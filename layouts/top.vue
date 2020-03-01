<template>
  <v-toolbar
		max-width="380"
		min-width="340"
		class="no-shadow px-5">
		<div id="dropdown-example"></div>
			<v-menu
				offset-y
				v-if="$store.state.authUser !== null">
				<template v-slot:activator="{ on }">
					<v-btn
						color="primary"
						v-on="on"
						depressed
					>
						나만의 메뉴
					</v-btn>
				</template>
				<v-list>
					<v-list-item
						v-for="(item, index) in dropdown_font"
						:key="index"
					>
					<a :href="item.to">
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</a>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-btn-toggle
				group
				color="primary"
			>
			<v-btn
				v-if="$store.state.authUser !== null"
				href="/book/add"
			>책 추가하기</v-btn>
			<v-btn
				v-if="$store.state.authUser === null"
				:to="'/login'"
			>Login</v-btn>
			<v-btn
				v-if="$store.state.authUser !== null"
				@click="logout"
			>Logout</v-btn>
		</v-btn-toggle>
	</v-toolbar>
</template>

<script>
export default {
	data () {
		return {
			dropdown_font: [
				{
					title: '내 정보',
					to: '/profile/myinfo'
				}, {
					title: '즐겨찾기',
					to: '/profile/mybookmark'
				}, {
					title: '내가 쓴 책',
					to: '/profile/mybook'
				}, {
					title: '내가 쓴 댓글',
					to: '/profile/mycomment'
				}
			]
		}
	},
	methods: {
		logout () {
			this.$store.dispatch('logout').catch((err) => {
				console.log('err', err);
			})
		}
	}
}
</script>

<style scope>
.top-dropdown {
	width: 300px;
	height: 64px;
}
.no-shadow {
	box-shadow: none;
}
</style>
