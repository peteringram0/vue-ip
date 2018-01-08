import Vue from 'vue';
import VueIp from './src/VueIp.vue';

new Vue({
    el: '#app',
    components: {
        VueIp
    },
    data() {
        return {
            ip: null,
            port: null,
            valid: null
        };
    },
    beforeMount() {

        // Random IP Address on load
        // this.changeIp()

    },
    methods: {

        /**
         * Generate random number
         */
        random(min = 1, max = 270) {
            return Math.floor(Math.random() * max) + min;
        },

        /**
         * Triggers on change
         */
        ipChange(ip, port, valid) {
            this.ip = ip;
            this.port = port;
            this.valid = valid;
        },

        /**
         * Trigger a random ip and port change
         */
        changeIp() {
            this.ip = this.random() + '.' + this.random() + '.' + this.random() + '.' + this.random();
            this.port = '' + this.random(1, 9) + this.random(1, 9) + this.random(1, 9) + this.random(1, 9);
        }

    }
});
