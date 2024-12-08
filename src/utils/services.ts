const { parse, stringify } = require('svgson')
const polygons = ["path1529"]

/* Modify the SVG based on Rotation,Color and Shape Filter
    1. Transform SVG to JS object
    2. Update color information based on element name such as rect,circular,star... with color and shape param
    3. Update shape information based on element name such as rect,circular,star... with color and shape param
    4. Transform SVG Object back to SVG Image
    */
export const processingSVG = async (path: any, color: any, shape: any) => {
    try {
        let selectedShape = shape
        let svgObject: any = await svgToObj(path)
        if (selectedShape === "none") {
            svgObject.children.forEach((element: any) => {
                if (element.hasOwnProperty("attributes") && element.attributes.hasOwnProperty("id")) {
                    element.attributes.fill = color
                }
            });
        } else {
            svgObject.children.forEach((element: any) => {
                if (selectedShape !== "none" && element.name === selectedShape && element.hasOwnProperty("attributes") && element.attributes.hasOwnProperty("id")) {
                    element.attributes.fill = color
                    if (selectedShape === "polygon") {
                        if (polygons.includes(element.attributes.id)) {
                            element.attributes.fill = color
                        }
                    }
                }
                if (selectedShape !== "none" && selectedShape === "polygon" && element.hasOwnProperty("attributes") && element.attributes.hasOwnProperty("id")) {
                    if (polygons.includes(element.attributes.id)) {
                        element.attributes.fill = color
                    }
                }

                if (selectedShape !== "none" && selectedShape === "circle" && element.hasOwnProperty("attributes") && element.attributes.hasOwnProperty("id")) {
                    if (element.name === "ellipse" && element.attributes.id === "path1585") {
                        element.attributes.fill = color
                    }
                }

            });
        }
        let response = stringify(svgObject)
        let blob = new Blob([response], { type: 'image/svg+xml' });
        let url = URL.createObjectURL(blob);
        return url
    } catch (e) {
        return ""
        // Log the error in ELK stack and Enable Monitoring
    }

}

/* Converting SVG image to Javascript Object using svgson library  */

const svgToObj = (path: any) => {
    return new Promise((resolve, reject) => {
        import(`../${path}`).then((image) => {
            fetch(image.default)
                .then(response => response.text())
                .then(text => {
                    parse(text).then((json: any) => {
                        resolve(json)
                    })
                });
        });
    })

}