import React from 'react';
import Table from 'rc-table';


class ResultsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: []
        };
    }

    componentDidMount() {
        this.props.getData();
    }

    componentWillReceiveProps(props) {
        if (props.data.length !== this.state.data.length) {
            this.setState({data: props.data, columns: props.columns});
        }
    }

    render() {

        let bodyStyle = {
            overflow: 'auto',
            height: 500,
        }

        return (
            <div>
                <Table bodyStyle={bodyStyle} className="table" columns={this.state.columns} data={this.state.data} />
            </div>
        )
    }

}

export default ResultsTable;
