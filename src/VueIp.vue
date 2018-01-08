<template lang="pug">
    span.vue-ip(:class="{'show-port' : portCopy !== false, 'material-theme': theme === 'material', 'active': active, 'valid': valid}")
        .label
            slot
        .segment(v-for="(segment, index) in ipCopy")
            input(v-model="ipCopy[index]", :placeholder="placeholderPos(index)", maxlength="3", @paste="paste($event)", @keydown="ipKeydown($event, index)", @focus="ipFocus(index)", @blur="blur", ref="ipSegment")
        input(v-show="portCopy !== false", v-model="portCopy", :placeholder="placeholder", @paste="paste($event)", @focus="portFocus", @keydown="portKeydown", @blur="blur", ref="portSegment").port
</template>

<style lang="stylus" scoped>
    $ip-material-valid := #13ce66
    $ip-material-in-valid := #f25d59

    $ip-material-color := #fafafa
    $ip-material-fontSize := inherit

    $ip-transition-speed := .15s

    .vue-ip
        position relative
        display inline-block
        text-align left

        &.material-theme
            transition all $ip-transition-speed ease-in-out
            border-bottom 1px solid $ip-material-color
            padding 5px

            .label
                display block
                transition all $ip-transition-speed ease-in-out
                position absolute
                width 100%
                font-size .6rem
                top -11px
                color $ip-material-color

            .segment
                &:after
                    color $ip-material-color

            &.active
                &.valid
                    &.material-theme
                        border-bottom-color $ip-material-valid

                        .segment
                            &:after
                                color $ip-material-valid

                        .label
                            color $ip-material-valid

                &:not(.valid)
                    &.material-theme
                        border-bottom-color $ip-material-in-valid

                        .segment
                            &:after
                                color $ip-material-in-valid

                        .label
                            color $ip-material-in-valid

            input
                background transparent
                font-size $ip-material-fontSize
                color $ip-material-color

                &::placeholder
                    color rgba($ip-material-color, .3)

        .label
            display none

        &.show-port
            .segment
                &:last-of-type
                    &:after
                        content ':'

        .segment
            display inline-block

            &:not(:last-of-type)
                &:after
                    content '.'
                    display inline-block

        input
            text-align center
            width 40px
            outline none
            border none

            &.port
                width 60px

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
                type: [String, Number, Boolean],
                default: false
            },
            placeholder: {
                type: [Boolean],
                default: false
            },
            theme: {
                type: [String, Boolean],
                default: false
            }
        },
        data() {
            return {
                ipCopy: ['', '', '', ''],
                portCopy: null,
                valid: false,
                active: false
            }
        },
        beforeMount() {

            // Copy the values over
            this.copyValue(this.ip, this.port);

        },
        watch: {

            /**
             * Watch the IP prop for changes and update internally
             */
            ip(newIp) {
                this.copyValue(newIp, this.port);
            },

            /**
             * Watch the port for changes and update internally
             */
            port(newPort) {
                this.copyValue(this.ip, newPort);
            }

        },
        methods: {

            /**
             * Placeholder with dummy IP
             */
            placeholderPos(segment) {

                // No placeholder
                if(!this.placeholder)
                    return '';

                // Dummy IP placeholder
                switch (segment) {
                    case 0:
                        return '192';
                    case 1:
                        return '168';
                    case 2:
                        return '0';
                    case 3:
                        return '1';
                }

            },

            /**
             * On focus clear the current box
             */
            ipFocus(index) {

                this.active = true;

                // Clear it
                this.ipCopy[index] = '';

                // Update the change
                this.changed();

            },

            /**
             * Clear both inputs
             */
            clearAll() {
                this.ipCopy = ['', '', '', ''];
                this.portCopy = null;
                this.valid = false;
            },

            /**
             * Clicked off the IP or port
             */
            blur() {

                this.active = false;

            },

            /**
             * Focus on the port
             */
            portFocus() {

                this.active = true;

                // Clear it
                this.portCopy = null;

                // Update the change
                this.changed();

            },

            /**
             * Paste in an IP (with or without a port)
             */
            paste(event) {

                // Focus on first el
                this.$refs.ipSegment[0].focus();

                // Get clipboard text
                let pasteText = event.clipboardData.getData('text/plain');

                // Check if we have a port or not
                let portPos = pasteText.indexOf(':');

                // If we have ports turned off, remove the port and only update the IP value
                if (this.port === false) {

                    console.warn('A IP address with a port has been entered but this module has no port attribute. Please enable it update the port.');

                    this.clearAll();

                    let ipAndPort = pasteText.split(":");
                    this.copyValue(ipAndPort[0], false);

                    // Blur off input
                    this.$refs.ipSegment[0].blur();

                    return;
                }

                // Based on if we have a port or not
                switch (portPos) {
                    case -1:
                        this.copyValue(pasteText, null);
                        this.changed();

                        // Blur off input
                        this.$refs.ipSegment[0].blur();

                        break;
                    default:
                        let ipAndPort = pasteText.split(":");
                        this.copyValue(ipAndPort[0], ipAndPort[1]);
                        this.changed();

                        // Blur off input
                        this.$refs.ipSegment[0].blur();

                        break
                }

            },

            /**
             * Port keydown event
             */
            portKeydown() {

                let keyCode = event.keyCode || event.which;

                // Return or left on keypad
                if (keyCode === 8 || keyCode === 37) {

                    // If there is nothing within the selected input go back to the last IP segment
                    if (this.portCopy && this.portCopy.length === 0 && this.portCopy !== undefined)
                        this.$refs.ipSegment[3].focus();

                }

                setTimeout(this.changed);

            },

            /**
             * Run on keydown
             */
            ipKeydown(event, index) {

                let keyCode = event.keyCode || event.which;

                // @TODO if you put : in the last box then just jump at port box

                // Return or left on keypad
                if (keyCode === 8 || keyCode === 37) {

                    // If there is nothing within the selected input go the the one before it
                    if (this.ipCopy[index].length === 0 && this.ipCopy[index - 1] !== undefined)
                        this.$refs.ipSegment[index - 1].focus();

                }

                setTimeout(() => {

                    // If its a 0 then always move to the next segment, if not work out if we need to move first
                    if (this.ipCopy[index] === '0')
                        this.moveToNextIpSegment(index, false);
                    else
                        this.moveToNextIpSegment(index);

                    // Update the change
                    this.changed();

                });
            },

            /**
             * Work out if we need to move to the next IP segment or not
             */
            moveToNextIpSegment(index, ifOverThree = true) {

                /**
                 * If there is 3 characters check if there is another segment, if there is focus on it.
                 */
                if (ifOverThree) {

                    if (this.ipCopy[index].length >= 3 && this.ipCopy[index + 1] !== undefined)
                        this.$refs.ipSegment[index + 1].focus();
                    else if (this.ipCopy[index].length >= 3 && this.ipCopy[index + 1] === undefined)
                        this.$refs.portSegment.focus();

                } else if (!ifOverThree) {

                    if (this.ipCopy[index + 1] !== undefined)
                        this.$refs.ipSegment[index + 1].focus();
                    else if (this.ipCopy[index + 1] === undefined)
                        this.$refs.portSegment.focus();

                }

            },

            /**
             * Update the controller with changed IP and port addresses
             */
            changed(ip = this.ipCopy, port = this.portCopy) {
                let ipLocal = this.arrayToIp(ip);
                this.onChange(ipLocal, port, this.validateIP(ip));
            },

            /**
             * Copy prop into local copy
             */
            copyValue(ip, port) {

                if (ip)
                    this.ipToArray(ip);

                // @todo convert port to a number

                // Always up the port
                this.portCopy = port;

                // Update if its valid locally
                this.valid = this.validateIP(this.ipCopy);

                // Report right back with if its valid or not
                this.changed();

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

                // If something is not valid clear it all
                if (segments.length !== 4) {
                    console.error('Not valid, so clearing ip', segments);
                    this.clearAll();
                } else
                    this.ipCopy = segments;

            },

            /**
             * Convert the array of IP segments back to a string
             */
            arrayToIp(ipArray) {
                return ipArray.join(".");
            },

            /**
             * validates the IP address
             *
             * @returns Boolean
             */
            validateIP(ip) {
                let ipCheck = this.arrayToIp(ip);
                return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipCheck))
            }

        }
    }
</script>
