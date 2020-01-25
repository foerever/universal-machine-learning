import React from 'react';
import Table from 'rc-table';


class ResultsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prediction: ""
        };
    }

    componentWillReceiveProps(props) {
        console.log(props);
        this.setState({prediction: props.prediction});
    }

    render() {

        let bodyStyle = {
            overflow: 'auto',
            height: 500,
        }

        return (
            <div>
                {this.state.prediction}
            </div>
        )
    }

}

export default ResultsTable;
