function init() {
  defineNftItemElement();
  addEvents();
}

async function getNft(owner, network) {
  const resp = await fetch(
    `http://localhost:8080/nfts?owner=${owner}&network=${network}`
  );
  return await resp.json();
}

async function appendNftItemElement(targetListEl, nft) {
  const item = document.createElement("nft-item");
  const titleEl = document.createElement("h3");
  titleEl.innerText = nft.name;
  titleEl.setAttribute("slot", "nft-name");
  const contractNameEl = document.createElement("p");
  contractNameEl.innerText = nft.contract_address;
  contractNameEl.setAttribute("slot", "nft-address");
  const imageElement = document.createElement("img");
  imageElement.setAttribute("slot", "nft-image");
  imageElement.src = nft.source_url.h250;
  imageElement.classList.add("nft-image");

  item.appendChild(titleEl);
  item.appendChild(contractNameEl);
  item.appendChild(imageElement);

  targetListEl.appendChild(item);
}

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

function addEvents() {
  const nftForm = document.getElementById("nftForm");
  nftForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const ownerInput = document.getElementById("ownerInput");
    const networkSelect = document.getElementById("networkSelect");
    const nftList = document.getElementById("nftList");

    getNft(ownerInput.value, networkSelect.value).then((nftResult) => {
      //console.log(nftResult);
      const nfts = nftResult.nfts;
      Array.from(nfts).forEach((nft) => appendNftItemElement(nftList, nft));
    });
  });
}

init();
