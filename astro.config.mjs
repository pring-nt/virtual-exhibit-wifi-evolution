export default defineConfig({
  integrations: [mdx(), react(), icon()],
  site: 'https://pring-nt.github.io',
  base: 'virtual-exhibit-wifi-generations',
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { '@': '/src' } },
  },
});