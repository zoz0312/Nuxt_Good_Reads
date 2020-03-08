<template>
  <v-layout
    column
    justify-center
    align-center
  >
		<div id="div-main">
			<v-row class="text-row-m" align="center">
				<v-col class="text-col">
					<div class="main-text" transition="slide-y-transition">
						Nuxt GoodReads
					</div>
					<div class="sub-text">
						페이지 방문을 환영합니다.
					</div>
				</v-col>
			</v-row>
			<v-row class="text-row-s" align="center">
				<v-col class="text-col">
					<div class="main-text" transition="slide-y-transition">
						회원이 되어 활동하여보세요.
					</div>
					<div class="sub-text">
						Kakao와 Nuxt Goodreads로 로그인이 가능합니다.
					</div>
					<div class="sub-action">
						로그인 / 회원가입
					</div>
				</v-col>
			</v-row>
			<v-row class="text-row-s last-div" align="center">
				<v-col class="text-col">
					<div class="main-text" transition="slide-y-transition">
						책 등록부터 감상평까지
					</div>
					<div class="sub-text">
						나만의 책을 추가하고 책 리스트를 관리하세요.
					</div>
				</v-col>
			</v-row>
		</div>
  </v-layout>
</template>

<style scope>
#div-main {
	position: absolute;
	width: 100%;
	height: 100%;
	text-align: center;
}
.text-row-m,
.text-row-s {
	height: 100%;
}
.text-row-m {
	background-color: #0F4C81;
}
.text-row-s {
	background-color: #EEEEEE;
	border-bottom: 1px solid #0F4C81;
}
.text-row-m > .text-col {
	color: #EEEEEE;
}
.text-row-s > .text-col {
	color: #0F4C81;
}
.text-row-s > .text-col > .sub-text {
	color: #333333;
}
.text-row-s > .text-col > .sub-action {
	margin-top: 2rem;
}
.main-text {
	font-size: 5rem;
}
.sub-text {
	font-size: 1rem;
}
.last-div {
	margin-bottom: 36px;
}
</style>

<script>
export default {
	data () {
		return {
		}
	},
	async asyncData ({ params, req }) {
	},
	methods: {
	},
	mounted () {
		/* this.getBookList(); */
	},
	components: {
	}
}
</script>
