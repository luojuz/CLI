import { Component } from '../../../helpers.js'


export default class Footer extends Component {
    get template() {
        return (
            `<div>
                <input type="text" value="${this.state.inputVal}" />
                <button type="button">${this.props.operation}</button>
                <ul>
                    ${this.state.list.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>`
        );
    }

    get data() {
        return {
            inputVal: '',
            list: [],
        }
    }

    listen() {
        {   // comments
            this.inputRef = this.shadow.querySelector("input");
            this.shadow.querySelector("button").addEventListener("click", () => {
                if (this.inputRef.value) {
                    Object.assign(this.state, {
                        inputVal: this.inputRef.value, 
                        list: [...this.state.list, this.inputRef.value]
                    })
                }
            });
        }
    }
}