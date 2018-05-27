const constructorSpan = $("constructor");
const resultSpan = $("result");
const constructorBlock = $("block-constructor");
const resultBlock = $("block-result");
const configPanel = $("config_panel");
const configExpandTag = $("expand");
const configCollapseTag = $("collapse");
const closeTag = $("close");
let configExpanded = false;
const gc = new GConstructor($("canvas-constructor"))
    .setWiresCanvas($("canvas-result"))
    .setWiresParams({
        color: [{
            red: 230,
            green: 30,
            blue: 30,
            opacity: 0.4
        }, {
            red: 0,
            green: 30,
            blue: 30,
            opacity: 0.4
        }],
        amount: 5, //amount wires lines
        distanceRange: {
            x: [4, 5],
            y: [0, 0]
        },
        splitBy: 0,
        width: [1, 2], // range width lines
    });
constructorSpan.addEventListener("click", () => {
    constructorBlock.style.display = "block";
    resultBlock.style.display = "none";

});
resultSpan.addEventListener("click", () => {
    constructorBlock.style.display = "none";
    resultBlock.style.display = "block";
    gc.run();
});
configPanel.addEventListener("click", () => {
    if (!configExpanded) {
        removeClass(configPanel, "min");
        configExpandTag.style.display = "block";
        configCollapseTag.style.display = "none";
        configExpanded = true;
    }
});
closeTag.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("close click");
    addClass(configPanel, "min");
    configExpandTag.style.display = "none";
    configCollapseTag.style.display = "block";
    configExpanded = false;
});


function addClass(node, className) {
    node.className = (" " + className);
}

function removeClass(node, className) {
    const cl = node.className;
    const regexp = new RegExp(className + "\s?", "g");
    node.className = cl.replace(regexp, "");
}

function $(id) {
    return document.getElementById(id);
}