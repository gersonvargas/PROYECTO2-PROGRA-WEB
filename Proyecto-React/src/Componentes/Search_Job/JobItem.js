import React, { Component } from 'react';
import JobDetail from './JobDetail';

import Company from "../Global/icons/home.png";
import Mensaje from "../Global/icons/mensaje.png";

class CompanyLogo extends Component {
    render() {
        return (
            <img src={this.props.company_logo ? this.props.company_logo : Company} className="img-thumbnail img-company" alt="company" />
        );
    }
}

class ApplyLink extends Component {
    render() {
        return (
            <a className='active btn btn-link text-white' target="_blank" href={this.props.company_url}>
                {this.props.action_name}
            </a>
        );
    }
}

class JobItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobtitle: null,
            job_description: null,
            company_logo: null,
            company_url: null,
            job_type: null,
            company_description: null,
            created_at: null,
            how_to_apply: null,
            show: false
        };
        this.handleShow = this.handleShow.bind(this);
    }
    handleShow() {
        this.setState({ show: true });
    }
    render() {
        return (
            <div>
                {this.state.show ? <JobDetail show={this.state.show}
                    visible={this.state.show}
                    company_url={this.props.company_url}
                    company_description={this.props.company_description} how_to_apply={this.props.how_to_apply} company_logo={this.props.company_logo} jobtitle={this.props.jobtitle} description={this.props.job_description} /> : ''}

                <div className="row p-2">
                    <div className="col-sm-3">
                        <div className="card m-0  card-job">
                            <div className="card-body">
                                <p>
                                    <b>{this.props.company}</b>
                                </p>
                                <CompanyLogo company_logo={this.props.company_logo} />
                            </div>
                            <p>
                                <i>{this.props.company_description}
                                    <ApplyLink company_url={this.props.company_url} action_name={'Visit Us'} />
                                </i>
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-9 ">
                        <div className="card  card-job">
                            <div className="card-body">
                                <h4 className="card-title">{this.props.jobtitle}</h4>
                                <h5 className="card-subtitle mb-2">About the job</h5>
                                <p> <i>
                                    <strong>Location:  </strong> {this.props.location ? this.props.location : 'Not especified.'}
                                </i>
                                </p>
                                <p>
                                    <i><strong>Job Type:  </strong> {this.props.job_type}</i>
                                </p>
                                <p className="card-text">
                                <i><strong>Last Modified:  </strong> {this.props.created_at}</i>
                                
                                </p>
                                <button className="btn btn-secondary btn-sm active" 
                                onClick={this.handleShow}>
                                <img src={Mensaje}/>
                                View Job and apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default JobItem;