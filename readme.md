# nft html template

html template 사용 예제

아래와 같이 &lt;template&gt; 안에 만들 template 코드를 작성한다.

변경될 필요가 있는 부분은 &lt;slot&gt; 으로 작성하고 name 을 지정한다.

```html
<template id="nftItemTemplate">
    <li class="nftItem">
    <slot name="nft-name"></slot>
    <slot name="nft-address"></slot>
    <div>
        <slot name="nft-image"></slot>
    </div>
    </li>
</template>
```

custom element 를 아래와 같이 정의한다. (javascript)

```javascript
function defineNftItemElement() {
  customElements.define(
    "nft-item",
    class extends HTMLElement {
      constructor() {
        super(); // Always call super first in constructor
        const nftItemTemplate =
          document.getElementById("nftItemTemplate").content;
        const shadowRoot = this.attachShadow({
          mode: "open",
        });
        shadowRoot.appendChild(nftItemTemplate.cloneNode(true));
      }
    }
  );
}
```

아래와 같이 &lt;nft-item&gt; custom element 를 사용할 수 있다.

slot 부분이 대체될 element 를 작성하고 `slot` attribute 에 이름을 작성하면 &lt;slot&gt; 이 바뀌어 render 된다.

```html
<nft-item>
    <h2 slot="nft-name" class="nftName">nft-name slot</h2>
    <p slot="nft-address" class="nftAddress">nft-address slot</p>
    <img
    class="nft-image"
    slot="nft-image"
    src="https://avatars.githubusercontent.com/u/3061056?s=400&u=f8dc38910de5f803a62f16f4d987610367575ac9&v=4"
    />
</nft-item>
```

