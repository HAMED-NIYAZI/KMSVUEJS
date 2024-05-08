<template>
	<div class="page">
		<Sidebar/>
		<div class="main-content app-content">
			<Header />
			<div class="container-fluid">
				<router-view></router-view>
			</div>
		</div>
		<Footer />
	</div>
	<!-- Back-to-top -->
	<!-- <a href="#top" id="back-to-top"><i class="las la-angle-double-up"></i></a> -->
</template>
<script setup>

    import Sidebar from './Sidebar.vue'
    import Header from './Header.vue'
    import Footer from './Footer.vue'
</script>
<style>
.page {
		margin-top: 75px;
}
</style>

