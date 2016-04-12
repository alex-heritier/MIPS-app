import React from "react";

import Title from "./Title";

export default class Header extends React.Component {
    handleChange(e) {
        const title = e.target.value;
        this.props.setTitle(title);
    }

    render() {
        return (
            <div class={"row"}>
                <Title title={this.props.title} />
            </div>
        );
    }
}
