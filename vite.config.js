/*
 * @FilePath: \vue2.7\vite.config.js
 * @Author: maggot-code
 * @Date: 2022-10-31 11:39:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 18:21:26
 * @Description: 
 */
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { visualizer } from "rollup-plugin-visualizer";
import { ElementUiResolver } from "unplugin-vue-components/resolvers";

import vue from "@vitejs/plugin-vue2";
import autoImport from "unplugin-auto-import/vite";
import vueComponents from "unplugin-vue-components/vite";
import viteCompression from 'vite-plugin-compression';

const importsLodash = [
    "isNil",
    "isObject",
    "isString",
    "isNumber",
    "isBoolean",
    "isFunction",
];

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    clearScreen: true,
    css: {
        scss: {
            // additionalData: `@import "@/style/var.scss";`,
        },
    },
    server: {
        hmr: true,
        proxy: {
            "/vue": {
                target: 'http://192.1.1.176:8080/',
                changeOrigin: true,
            },
            "/config": {
                target: 'http://192.1.1.176:8080/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/config/, '')
            },
            '/api': {
                target: 'http://192.1.1.6:8300/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api')
            },
            '/v2': {
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/v2/, '/v2')
            },
        }
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: '/src',
            }
        ],
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json", ".proto"],
        dedupe: ["vue"],
        preserveSymlinks: false,
    },
    json: {
        namedExports: true,
        stringify: false,
    },
    plugins: [
        vue({
            reactivityTransform: true,
        }),
        splitVendorChunkPlugin(),
        autoImport({
            resolvers: [ElementUiResolver({ importStyle: "css" })],
            imports: [
                'vue',
                "vue-router",
                "pinia",
                {
                    "lodash-es": importsLodash,
                }
            ],
            dts: true,
        }),
        vueComponents({
            resolvers: [ElementUiResolver({ importStyle: "css" })],
            dirs: [
                'src/components',
            ],
            extensions: ['vue', 'tsx'],
            transformer: "vue2",
            dts: true,
            deep: true,
            version: 2.7
        }),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
            deleteOriginFile: false,
        }),
        visualizer({
            filename: './node_modules/.cache/visualizer/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
        })
    ],
    build: {
        minify: false,
        target: "modules",
        sourcemap: 'hidden',
        chunkSizeWarningLimit: 500,
        assetsInlineLimit: 4096,
        polyfillModulePreload: true,
        cssCodeSplit: true,
        ssrManifest: false,
        emptyOutDir: true,
        manifest: false,
        write: true,
        rollupOptions: {
            output: {
                chunkFileNames: `assets/js/[name]-[hash].js`,
                entryFileNames: `assets/js/[name]-[hash].js`,
                assetFileNames: `assets/[name]-[hash].[ext]`,
                manualChunks: {
                    'element-ui': ['element-ui']
                }
            },
        },
    },
})
