export function reportFromSelection() {
    figma.skipInvisibleInstanceChildren = true;

    for (let textNode of figma.currentPage.findAllWithCriteria({
        types: ["TEXT", "VECTOR", "BOOLEAN_OPERATION"]
    })) {
        let result = processTextNode(textNode)
        console.log(result);
        
    }
}

type ReviewableNode = SceneNode & {
    opacity?: number
    fillStyleId?: string | symbol | undefined
    backgroundStyleId?: string
}

const processTextNode = (textNode: ReviewableNode) => {
    const textColorId = textNode.fillStyleId
    const backgroundColorId = getBackgroundColor(textNode)
    if (!textColorId || !backgroundColorId) return;

    let textColor = figma.getStyleById(textColorId.toString())!.name.split("/").pop()
    let backgroundColor = figma.getStyleById(backgroundColorId.toString())!.name.split("/").pop()

    return {
        rootId: textNode.id,
        name: textNode.name,
        textColor: textColor,
        backgroundColor: backgroundColor
    };
}

const getBackgroundColor = (node: ReviewableNode): string | symbol | undefined => {
    let parent = node.parent as ReviewableNode
    if (!parent) return;
    if (["DOCUMENT", "PAGE",].includes(parent.type)) return;
    if (parent.opacity && parent.opacity < 1) return getBackgroundColor(parent)
    if (parent.fillStyleId && parent.fillStyleId.toString().length > 0) return parent.fillStyleId
    if (parent.backgroundStyleId && parent.backgroundStyleId.length > 0) return parent.backgroundStyleId
    return getBackgroundColor(parent)
}


