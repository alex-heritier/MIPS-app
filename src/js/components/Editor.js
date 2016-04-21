import React from "react";

export default class Editor extends React.Component {
    handleChange(e) {
        const codeArea = document.getElementById("code-area");
        const code = this.extractCode(codeArea);

        this.props.changeCode(code);
    }

    extractCode(element) {
        let codeLines = [];
        const children = element.childNodes;
        for (let i = 0; i < children.length; i++) {
            let newLine = "";
            const child = children[i].childNodes[0];
            if (child.nodeName.toLowerCase() == "br") {
                newLine = "\n";
            } else {
                newLine = child.data;
            }
            codeLines.push(newLine);
        }

        return codeLines;
    }

    render() {
        return (
            <div class="col-lg-12">
                <div class="editor">
                    <pre id="code-area" contentEditable onKeyUp={this.handleChange.bind(this)}>
                        <div style={{color: "gray"}}># your code here</div>
                        <div><br /></div>
                        <div>li $v0, 69</div>
                        <div>add $v1, $zero, $v0</div>
                        <div>move $t0, $v0</div>
                        <div>addi $sp, $sp, -4</div>
                        <div>sw $v0, 0($zero)</div>
                    </pre>
                </div>
            </div>
        );
    }
}
