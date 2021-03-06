
// docs: [HTMLElement](https://www.w3school.com.cn/xmldom/dom_htmlelement.asp)

class Component extends HTMLElement {
    constructor() {
        super();

        this.init()
            .then(({ data, methods }) => {
                this.create({ data, methods })
                    .then(this.mount)
            })
    }

    // @return { data, methods }
    async init() {
        return {
            data: {},
            methods: {
                fetch() { }
            }
        }
    }

    /* private */async create({ data, methods }) {
        this.shadow = this.attachShadow({ mode: 'closed' });

        this.state = data
        this.methods = methods

        const template = this.template()
            .replace(/\>\s*\</g, _ => _.replace(/\s+/g, ''))
            .replace(/\s*=\s*/g, '=')
            .replace(/\>\s*(\{[\s\S]*\})\s*\</g, _ => _.replace(/\s+/g, '')) // 去除{}空格

        this.shadow.innerHTML = template

        this.directives(template)
        this.viewModel(template)
        this.listeners(template)

        const props = {}
        const atrributes = this.getAttributeNames()
        atrributes.forEach(attribute => props[attribute] = this.getAttribute(attribute))

        this.props = new Proxy(props, {
            set: (target, key, receiver) => {
                const retVal = Reflect.set(target, key, receiver)
                this.update({ key: receiver })
                return retVal;
            }
        })

        this.setState(props)
    }

    async mount() { }

    update(data) {
        this.setState(data)
    }

    template(state) { }

    setState(data) {
        if (typeof data === 'object') {
            Object.assign(this.state, data)
            this.render()
        }
    }

    /* private */$(selector, isAll = false) {
        return isAll ? this.shadow.queryAllSelector(selector) : this.shadow.querySelector(selector)
    }

    /* private */directives(template) {
        // const [_, directive, value] = template.match(/\s+\*([a-zA-Z\_]+)=\"{1}([^\"]+)\"{1}/) || []
        // switch (directive) {
        //     case 'for':
        //         console.log('------directive: for---------')
        //         this.data.value.map(item => {
        //             return template.replace(/\s*\*for=\"([^\"]+){1}\"{1}/, '')
        //                 .replace(/\>{1}\s*\{([\s\S]*)\}\s*\<{1}/, ($, $1) => `>${eval($1)}<`)
        //                 .replace(/\s*\:key=\"{1}([\s\S]*)\"{1}/, ($, $1) => ` key="${eval($1)}"`)
        //         })
        //         break
        //     case 'if':
        //         console.log('------directive: if---------')
        //         return template.replace(/\s*\*if=\"([^\"]+){1}\"{1}/, value ? '' : ' style="display: none;"')
        //         break
        //     default:
        //         break
        // }
    }

    /* private */viewModel(node) {
        // const [_, attribute, value] = template.match(/\s+\:([a-zA-Z\_]+)=\"{1}([^\"]+)\"{1}/) || []
        // console.log({ attribute, value })
        const h = (node) => {
            for (let i = 0; i < node.atrributes.length; i++) {
                if (attributes[i].matches(/\:[a-zA-Z\-]+/)) {
                    // 
                }
                if (attributes[i].matches(/\:[a-zA-Z\-]+/)) {
                    // 
                }
                if (attributes[i].matches(/\@[a-zA-Z\-]+/)) {
                    // 
                }
            }
            if (node.children && node.children.length > 0) {
                this.vm = {}
            }
        }
        this.vm = {
            children: 
        }
    }

    /* private */listeners(template) {
        const [_, event, handler] = template.match(/\s+\@([a-zA-Z\_]+)=\"{1}(\S+)\"{1}/) || []
        console.log({ event, handler })
    }

    // 根据state变化计算可变节点
    /* private */async diff() {
        this.vm
    }

    /* private */async render() {
        await this.diff().forEach(node => {
            const { selector, attribute, value } = node
            this.$(selector)[attribute] = value
        })
    }
}

const customElementRegister = (customs) => Object.entries(customs)
    .forEach(custom => window.customElements.define(...custom))

const isRoute = (path) => {
    const paths = (window.location.pathname || '/').split('/')
    const slugs = path.split('/')
    if (slugs.length !== paths.length) return false
    for (let i = 0; i < slugs.length; i++) {
        if (slugs[i].includes(':')) return true
        if (slugs[i] !== paths[i]) return false
    }
    return true
}

class Router extends Component {
    template(/* { routes } */) {
        return (
            `<route *for="routes" *if="isRoute(.path)" :key=".tag">{.title}</route>`
        )
    }
}
