# Vue IP
A IP input component built for Vue 2.x

![Demo](https://media.giphy.com/media/l49JMe9WDPzJTamwE/giphy.gif)]

### DEMO
[Demo](https://peteringram0.github.io/vue-ip/)

### Install
````javascript
$ yarn add vue-ip
````


### Usage
```javascript
import VueIp from 'VueIp';

new Vue({
    components: {
        VueIp
    },
    data() {
        return {
            ip: '127.0.0.1', // or null
            port: '8888', // or null
        };
    },
    methods: {
        
        /**
        * Will be called on changes to IP address or port 
        */
        change(ip, port, valid) {
            console.log(ip, port, valid);
        }
        
    },
    template: '<vue-ip :ip="ip" :port="port" :on-change="change" theme="material"></vue-ip>'
})
```


### Supports
* Pasting (with IP or with IP and port)
* IP Validation
* Optional material design theme
* Optional Port
* No sub dependencies

### Props
| Prop        	| Type     	| Options                             	              |
|-------------	|----------	|---------------------------------------------------- |
| on-change   	| function 	| Will be called when changes                         |
| ip          	| string   	| null or ip address '127.0.0.1'      	              |
| port        	| string   	| null or '8080'                      	              |
| placeholder 	| boolean   | will show a dummy ip address within the placeholder |
| theme       	| string   	| 'material' (material design themed) 	              |


### License
[MIT](http://opensource.org/licenses/MIT)

#### Inspired by
[lakb248](https://github.com/lakb248/vue-ip-input)
