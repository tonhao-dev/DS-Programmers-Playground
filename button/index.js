const template = document.createElement("template");

template.innerHTML = `
  <style>
    button {
      width: 100%;
      height: 44px;
      border-radius: 8px;
      border: none;
      font-size: 15px;
      line-height: 19px;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
    }

    button.primary {
      color: #fff;
      background-color: #2B6CE5;
    }

    button.secondary {
      color: #2B6CE5;
      background-color: #fff;
    }
  </style>

  <button>
    <slot></slot>
  </button>
`;

export class Button extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.button = shadow.querySelector("button");
  }

  static get observedAttributes() {
    return ["variant"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    const dictionary = {
      // variant: this.updateVariant,
      variant: (value) => this.updateVariant(value),
    };

    dictionary[name](newValue);
  }

  updateVariant(value) {
    this.button.classList.remove("primary");
    this.button.classList.remove("secondary");

    this.button.classList.add(value ?? "primary");
  }
}
