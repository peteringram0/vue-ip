<template lang="pug">
    .vue-ip
        .segment(v-for="(segment, index) in ipCopy")
            input(v-model="ipCopy[index]", :placeholder="placeholder", maxlength="3", @keydown="ipKeydown")
        input(v-show="port", v-model="portCopy", :placeholder="placeholder")
</template>

<style lang="stylus" scoped>
    .vue-ip
        .segment
            display inline-block

        input
            outline none
            border none
</style>

<script>
    export default {
        props: {
            onChange: Function,
            ip: {
                required: true,
                type: String
            },
            port: {
                type: [String, Number]
            },
            placeholder: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                ipCopy: ['', '', '', ''],
                portCopy: null
            }
        },
        beforeMount() {

            this.copyValue(this.ip, this.port);

        },
        methods: {

            /**
             * Run on keydown
             */
            ipKeydown() {
                setTimeout(() => {
                    this.changed(this.arrayToIp(this.ipCopy), this.portCopy);
                });
            },

            /**
             * Update the controller with changed IP and port addresses
             */
            changed(ip, port) {
                this.onChange(ip, port);
            },

            /**
             * Copy prop into local copy
             */
            copyValue(ip, port) {
                this.ipCopy = this.ipToArray(ip);
                this.portCopy = port;
            },

            /**
             * Convert the IP address string to an array of values
             */
            ipToArray(ip) {
                let segments = [];
                ip.split('.').map(segment => {
                    if (isNaN(segment) || segment < 0 || segment > 255)
                        segment = 255;
                    segments.push(segment);
                });
                return segments;
            },

            /**
             * Convert the array of IP segments back to a string
             */
            arrayToIp(ipArray) {
                return ipArray.join(".");
            }

        }
    }
</script>
