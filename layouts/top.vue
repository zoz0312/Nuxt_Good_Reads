<template>
  <v-toolbar class="no-shadow">
		<div id="dropdown-example"></div>
			<v-menu offset-y>
				<template v-slot:activator="{ on }">
					<v-btn
						color="primary"
						dark
						v-on="on"
						depressed
					>
						Dropdown
					</v-btn>
				</template>
				<v-list>
					<v-list-item
						v-for="(item, index) in dropdown_font"
						:key="index"
						@click=""
					>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
				<v-btn-toggle
					group
					color="primary"
				>
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
				{ title: 'Arial' },
				{ title: 'Calibri' },
				{ title: 'Courier' },
				{ title: 'Verdana' }
			]
		}
	},
	methods: {
	}
}
</script>

<style scope>
.top-dropdown {
	width: 200px;
	height: 64px;
}
.no-shadow {
	box-shadow: none;
}
</style>
