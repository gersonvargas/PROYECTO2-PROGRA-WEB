import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import JobItem from './JobItem';

class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: this.props.job_list
        }
        this.componentDidMount=this.componentDidMount.bind(this);
        //console.log(this.state.jobs[0])
    }
    componentDidMount(){
        this.setState({jobs: this.props.job_list});
    }
    render() {
        return (
            this.state.jobs.map(elemento => <div key={elemento.id}>
                <JobItem jobtitle={elemento.title}
                    job_type={elemento.type}
                    job_description={elemento.description}
                    created_at={elemento.created_at}
                    how_to_apply={elemento.how_to_apply}
                    company_logo={elemento.company_logo}
                    company_url={elemento.company_url}
                    company={elemento.company}
                />
            </div>)

        )
    }

}
export default JobList;