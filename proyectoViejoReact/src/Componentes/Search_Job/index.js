import React, { Component } from 'react';
import LateralFilter from './Lateral_Filter';

class Search extends Component {
    constructor(props) {
        super(props);


    }
    componentWillMount() {
        document.title = 'Search Job'
    }
    render() {
        return (
            <div className="container">
                <div className="row search">
                </div>
                <div>
                    <LateralFilter />
                </div>
            </div>
        );
    }
}


export default Search;