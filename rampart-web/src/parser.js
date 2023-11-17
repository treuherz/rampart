import TreeSitter from "web-tree-sitter"

await TreeSitter.init({
    // async locateFile(name, _) {
    //     console.log(name);
    //     switch (name) {
    //         case 'tree-sitter.wasm':
    //             console.log(treeSitterURL);
    //             return await treeSitterURL;
    //     }
    // }
});
const TreeSitterRampart = await TreeSitter.Language.load("tree-sitter-rampart.wasm");
const parser = new TreeSitter();
parser.setLanguage(TreeSitterRampart);

export function parse(...args) {
    return parser.parse(...args);
}

export const queryPointList = TreeSitterRampart.query("(point_list) @points")

export const queryPoint = TreeSitterRampart.query("(point) @point")
