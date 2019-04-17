const isProduction = process.env.NODE_ENV === 'production';


export default {
    env: {},
    mode: isProduction ? 'universal': 'spa',
    head: {
        title: "euklides",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "Nuxt.js TypeScript project" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
        ]
    },
    loading: { color: "#3B8070" },
    css: ["~/assets/css/main.css"],
    build: {
        extractCSS: true
    },
    generate: {
        dir: 'public'
    },
    modules: [
        '@nuxtjs/vuetify'
    ],
    plugins: [
        '~/plugins/globalComponents.ts',
        '~/plugins/bus.client.ts',
        '~/plugins/api.ts'
    ],
    vuetify: {
        theme: {
            primary: '#078B75',
            secondary: '#b79100',
            accent: '#8c9eff',
            error: '#b71c1c'
        },
        options: {
            customProperties: true
        }
    }
}
