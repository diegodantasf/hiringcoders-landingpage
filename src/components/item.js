export function createItem(itemURL, description, dimensions = ["150px", "150px"]) {
    const itemTemplate = document.querySelector("#template-item");
    const item = itemTemplate.content.cloneNode(true)
    const itemImg = item.querySelector("img")
    const itemDesc = item.querySelector("[description]")

    itemImg.src = itemURL;
    itemImg.style.width = dimensions[0]
    itemImg.style.height = dimensions[1]
    itemDesc.innerHTML = description;

    return item
}