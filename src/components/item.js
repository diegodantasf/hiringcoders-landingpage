export function createItem(itemURL, description, dimensions = [150, 150]) {
    const itemTemplate = document.querySelector("#template-item");
    const item = itemTemplate.content.cloneNode(true)
    const itemImg = item.querySelector("img")
    const itemDesc = item.querySelector("[description]")

    itemImg.src = itemURL;
    itemImg.style.width = `${dimensions[0]}px`;
    itemImg.style.height = `${dimensions[0]}px`;
    itemDesc.innerHTML = description;

    return item
}