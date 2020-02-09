<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
			<BookCard />
    </v-flex>
  </v-layout>
</template>

<script>
import BookCard from '~/components/BookList/BookCard'

export default {
	components: {
		BookCard
	}
}
</script>
