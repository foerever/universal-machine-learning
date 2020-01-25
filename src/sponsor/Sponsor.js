import React from 'react';

class Sponsor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{paddingTop:'1em'}}>
                    <Button variant="primary" onClick={click => this.onSubmit()}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}

export default Sponsor;