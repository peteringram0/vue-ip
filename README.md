# vue-ip
A IP input component built for Vue 2.x

### DEMO
URL

### Supports
* Pasting (with IP or with IP and port)
* IP Validation
* Optional material design theme
* Optional Port

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

### Props

| Prop        	| Type     	| Options                             	|
|-------------	|----------	|-------------------------------------	|
| on-change   	| function 	| N/A                                 	|
| ip          	| string   	| null or ip address '127.0.0.1'      	|
| port        	| string   	| null or '8080'                      	|
| placeholder 	| string   	| Input placeholder character         	|
| theme       	| string   	| 'material' (material design themed) 	|
