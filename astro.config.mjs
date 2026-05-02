// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.ord.net',
	integrations: [
		starlight({
			title: 'ord.net docs',
			customCss: ['./src/styles/custom.css'],
			logo: {
				src: '/src/assets/logo-wordmark.svg',
				alt: '◉rd',
				replacesTitle: true,
			},
			favicon: '/favicon.svg',
			sidebar: [
				{ label: 'Getting Started', link: '/' },
				{
					label: 'Creator Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Technicals',
					autogenerate: { directory: 'technicals' },
				},
			],
		}),
	],
});
