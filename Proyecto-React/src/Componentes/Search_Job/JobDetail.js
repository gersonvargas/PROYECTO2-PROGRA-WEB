// Dependencies
import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import Popover from 'react-bootstrap/lib/Popover';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';
import renderHTML from 'react-render-html';

class JobDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            description: this.props.description,
            jobtitle: this.props.jobtitle,
            show: this.props.show,
            company_logo: this.props.company_logo,
            company_description:this.props.company_description,
            company_url:this.props.company_url,
            how_to_apply:this.props.how_to_apply
            
        };

        this.hideModal = this.hideModal.bind(this);
    }
    hideModal() {
        this.setState({
            show: false
        });
    }

    render() {

        return (
                <Modal visible={this.state.show} onClickBackdrop={this.hideModal} dialogClassName="modal-lg modal-dialog-job-centered-y">
                    <div className="modal-header">
                        <h5 className="modal-title">Job Name: {this.state.jobtitle}</h5>
                    </div>
                    <div className="modal-body">
                        <p>{renderHTML(this.state.description)}</p>
                        <img src={this.props.company_logo} className="img-thumbnail" alt="company" />
                        <p>
                            <i>{this.state.company_description}
                                 <a className='active btn btn-link' href={this.state.company_url}>Visit us</a>
                            </i>
                        </p>
                    </div>
                    <div className="modal-footer">
                        <a className='active btn btn-link'>{renderHTML(this.state.how_to_apply)}</a>
                        <button type="button" className="btn btn-secondary" onClick={this.hideModal}>Close</button>
                    </div>
                </Modal>
                );
    }
}
export default JobDetail;
