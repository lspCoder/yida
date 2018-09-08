/*
 * @Author: lsp 
 * @Date: 2017-05-19 13:22:28 
 * @Last Modified by: lsp
 * @Last Modified time: 2017-05-23 14:24:21
 */
<template>
	<div>
		<mu-appbar class="title" :title="title">
			<mu-icon-button v-if="isTopic" @click="goBack" icon="arrow_back" slot="left" />
			<!--<mu-icon-button v-else slot="left">
				<img class="logo" src="../assets/logo.png">
			</mu-icon-button>-->
			<!--<mu-icon-menu slot="right" icon="more_vert" :value="theme" @change="changeTheme">
				<mu-menu-item title="Default" value="defaultTheme" />
				<mu-menu-item title="LIGHT" value="light" />
				<mu-menu-item title="CARBON" value="carbon" />
				<mu-menu-item title="TEAL" value="teal" />
			</mu-icon-menu> -->
		</mu-appbar>
	</div>
</template>

<script>
import defaultTheme from '!raw-loader!muse-ui/dist/theme-default.css'
import light from '!raw-loader!muse-ui/dist/theme-light.css'
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
import teal from '!raw-loader!muse-ui/dist/theme-teal.css'
export default {
	data() {
		return {
			theme: 'light',
			themes: {
				defaultTheme,
				light,
				carbon,
				teal
			}
		}
	},
	computed: {
		title: function () {
			if (this.$route.path.indexOf('/user/') == -1) {
				return this.$store.state.titleMap.get(this.$route.path);
			} else {
				return this.$store.state.titleMap.get('/user');
			}
		},
		isTopic: function () {
			return this.$route.path == '/content'
		}
	},
	methods: {
		changeTheme(theme) {
			this.theme = theme
			const styleEl = this.getThemeStyle()
			styleEl.innerHTML = this.themes[theme] || ''
		},
		getThemeStyle() {
			const themeId = 'muse-theme'
			let styleEl = document.getElementById(themeId)
			if (styleEl) return styleEl
			styleEl = document.createElement('style')
			styleEl.id = themeId
			document.body.appendChild(styleEl)
			return styleEl;
		},
		goBack() {
			if (this.isTopic){
				this.$router.go(-1)
			}
		}
	}
}
</script>

<style scoped>
.title {
	text-align: center;
	height: 4rem;
}

.mu-icon-button {
	padding: 0.4rem;
}
</style>
