import React from "react";

export default class MemoryPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            activeBank: 0,
        };
    }

    deactivateBanks() {
        const elems = document.getElementsByClassName("tab");
        for (let i = 0; i < elems.length; i++) {
            elems[i].className = "tab tab" + i;
        }
    }

    getBankSwitcher(bank) {
        return () => {
            this.deactivateBanks();
            const elem = document.getElementsByClassName("tab tab" + bank)[0];
            // console.log(elem.className);
            elem.className = elem.className + " active-bank";

            this.setState({
                activeBank: bank,
            });
        }
    }

    toHex(num) {
        let hex = "0x";
        hex += toHexDigit(parseInt(num / 16));
        num %= 16;
        hex += toHexDigit(num);

        return hex;

        function toHexDigit(num) {
            switch (num) {
                case 10:
                    return 'A';
                case 11:
                    return 'B';
                case 12:
                    return 'C';
                case 13:
                    return 'D';
                case 14:
                    return 'E';
                case 15:
                    return 'F';
                default:
                    return num;
            }
        }
    }

    render() {
        const memoryCells = [];
        const startIndex = this.state.activeBank * (0x100 / 8);
        for (let i = startIndex; i < startIndex + (0x100 / 8); i++) {
            // console.log(i);
            memoryCells.push(
                <MemoryCell
                    key={i}
                    address={this.toHex(i)}
                    value={this.toHex(this.props.memory[i])}/>
            );
        }

        return (
            <div class="col-lg-12">
                <div class="memory-bank-tabs">
                    <div class="tab tab0 active-bank" onClick={this.getBankSwitcher(0).bind(this)}>Bank 0</div>
                    <div class="tab tab1" onClick={this.getBankSwitcher(1).bind(this)}>Bank 1</div>
                    <div class="tab tab2" onClick={this.getBankSwitcher(2).bind(this)}>Bank 2</div>
                    <div class="tab tab3" onClick={this.getBankSwitcher(3).bind(this)}>Bank 3</div>
                    <div class="tab tab4" onClick={this.getBankSwitcher(4).bind(this)}>Bank 4</div>
                    <div class="tab tab5" onClick={this.getBankSwitcher(5).bind(this)}>Bank 5</div>
                    <div class="tab tab6" onClick={this.getBankSwitcher(6).bind(this)}>Bank 6</div>
                    <div class="tab tab7" onClick={this.getBankSwitcher(7).bind(this)}>Bank 7</div>
                </div>
                <div class="memory-panel">
                    <MemoryColumn memoryCells={memoryCells.slice(0, 4)} />
                    <MemoryColumn memoryCells={memoryCells.slice(4, 8)} />
                    <MemoryColumn memoryCells={memoryCells.slice(8, 12)} />
                    <MemoryColumn memoryCells={memoryCells.slice(12, 16)} />
                    <MemoryColumn memoryCells={memoryCells.slice(16, 20)} />
                    <MemoryColumn memoryCells={memoryCells.slice(20, 24)} />
                    <MemoryColumn memoryCells={memoryCells.slice(24, 28)} />
                    <MemoryColumn memoryCells={memoryCells.slice(28, 32)} />
                </div>
            </div>
        );
    }
}

class MemoryColumn extends React.Component {
    render() {
        return (
            <div class="memory-col">
                { this.props.memoryCells }
            </div>
        );
    }
}

class MemoryCell extends React.Component {
    render() {
        return (
            <div class="memory-cell">
                <span class="address">{this.props.address}: </span>
                <span class="value">{this.props.value}</span>
            </div>
        );
    }
}
