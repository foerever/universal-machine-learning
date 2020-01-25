import React from 'react';
import Table from 'rc-table';


class TrainResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ""
        };
    }

    componentWillReceiveProps(props) {
        console.log(props);
        this.setState({result: props.result});
    }

    render() {

        let bodyStyle = {
            overflow: 'auto',
            height: 500,
        }

        return (
            <div>
                {this.state.result}
            </div>
        )
    }

}

export default TrainResults;
