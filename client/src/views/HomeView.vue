<template>
	<h1>Welcome to the Forum</h1>

	<div
		class="forum-list"
		v-for="category in categories">
		<h2 class="list-title">
			<a>{{ category.name }}</a>
		</h2>

		<ForumList :forums="forumsByIds(category.forums)" />
	</div>
</template>

<script setup>
	import ForumList from '../components/ForumList.vue'
	import { onBeforeMount } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useCategoriesStore } from '../stores/CategoriesStore'
	import { useForumsStore } from '../stores/ForumsStore'

	const categoriesStore = useCategoriesStore()
	const forumsStore = useForumsStore()
	const { categories } = storeToRefs(categoriesStore)
	const { forumsByIds } = storeToRefs(forumsStore)

	onBeforeMount(async () => {
		await forumsStore.fetchForums()
		categoriesStore.fetchCategories()
	})
</script>
