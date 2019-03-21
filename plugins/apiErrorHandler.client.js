export default function ({ $axios, app }) {
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)

        const message = ' Ups... ';

        app.$nuxt.$emit('api/error', message);
    })

}
