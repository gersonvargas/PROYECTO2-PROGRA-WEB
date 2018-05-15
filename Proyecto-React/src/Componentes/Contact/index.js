// Dependencies
import React, { Component } from 'react';



class Contact extends Component {
    componentWillMount() {
        document.title = 'Contact'
    }
    render() {
        return (
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="card border-dark col-md-6">
                        <div className="card-header h2">Contact</div>
                        <div className="card-body text-dark">
                            <p className="card-text">Thank you for using this product. Please, complete the form below, so we can provide quick and efficient service.</p>
                            <form>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="name">Name</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text fa fa-user"></div>
                                        </div>
                                        <input type="text" className="form-control" id="name" placeholder="Name" required/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="phone">Phone</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text fa fa-phone"></div>
                                        </div>
                                        <input type="text" className="form-control" id="phone" placeholder="Phone" required/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="email">Email</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">@</div>
                                        </div>
                                        <input type="email" className="form-control" id="email" placeholder="Email" required/>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mb-2">Send</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                );
    }
}

export default Contact;
