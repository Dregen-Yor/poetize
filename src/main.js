import { createApp } from 'vue'

//主要插件
import App from './App.vue'
import router from './router'
import Element from 'element-plus'
import {Axios} from 'axios'
import VueAxios from 'vue-axios'
import store from './store'

import 'highlight.js/styles/stackoverflow-light.css'
import hljs from "highlight.js/lib/core";
import hljsVuePlugin from "@highlightjs/vue-plugin";
// import javascript from "highlight.js/lib/languages/javascript";
// import java from "highlight.js/lib/languages/java";
// import sql from "highlight.js/lib/languages/sql";
// import xml from "highlight.js/lib/languages/xml";
// import html from "highlight.js/lib/languages/vbscript-html";
// import json from "highlight.js/lib/languages/json";
// import yaml from "highlight.js/lib/languages/json";
// hljs.registerLanguage("javascript", javascript);
// hljs.registerLanguage("java", java);
// hljs.registerLanguage("yaml", yaml);
// hljs.registerLanguage("json", json);
// hljs.registerLanguage("sql", sql);
// hljs.registerLanguage("xml", xml);
// hljs.registerLanguage("html", html);

//自定义组件
import http from './utils/request'
import common from './utils/common'
import constant from './utils/constant'
import './utils/live2d'
import './utils/title'

//css文件
import 'element-plus/dist/index.css'
import './assets/css/animation.css'
import './assets/css/index.css'
import './assets/css/tocbot.css'
import './assets/css/color.css'
import './assets/css/markdown-highlight.css'
import './assets/css/font-awesome-all.min.css'

const app = createApp(App)

//加入插件
app.use(router)
app.use(Element)
// app.use(VueAxios,Axios)
app.use(store)
app.config.globalProperties.$http = http
console.log(common.mobile())
app.config.globalProperties.$common = common
app.config.globalProperties.$constant = constant
app.use(hljsVuePlugin)
app.provide('Axios', app.config.globalProperties.axios)

app.mount('#app')
