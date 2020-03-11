<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
			class="top-toolbar"
      clipped-left
      fixed
      app
    >
		<v-app-bar-nav-icon
			@click.stop="drawer = !drawer" />
      <v-btn
        @click.stop="miniVariant = !miniVariant"
        icon
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
			<Search />
      <v-spacer />
			<Top />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<style scope>
.top-toolbar {
	padding-left: 1rem;
}
</style>
<script>
import Top from '~/layouts/top'
import Search from '~/components/Search'

export default {
	data () {
		return {
			drawer: false,
			items: [
				{
					icon: 'mdi-home',
					title: 'Home',
					to: '/'
				},
				{
					icon: 'mdi-book-multiple',
					title: '책 목록',
					to: '/book/list'
				}
			],
			miniVariant: false,
			right: true,
			title: 'GoodReads'
		}
	},
	methods: {
	},
	components: {
		Top,
		Search
	}
}
</script>
