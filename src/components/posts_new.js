import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions/index'

// reduxForm helper is similar to connect.......  it allows our component to talk to redux store

class PostsNew extends Component {

    renderField(field) {

        // grab meta from field so we don't have to type field.meta...
        // called destructuring
        // all es6
        const { meta: { touched, error } } = field;

        field.meta.touched ? field.meta.error : ''
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label className="form-label">{field.label}</label>
                <input
                    type={field.type}
                    // onChange={field.input.onChange}  // don't need to, do lower
                    // onFocus={field.input.onFocus}    // don't need, replace by fancy JSX below
                    {...field.input} // boilderplate handler and props
                    className="form-control"
                    aria-label={field.label}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {

        // this.props.createPost(values);  // change this to have a callback function
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {

        // handleSubmit is a property passed to component by redux-form in the props
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    name="title"
                    component={this.renderField}
                    label="Title"
                    type="text"
                />
                <Field
                    name="categories"
                    component={this.renderField}
                    label="Categories"
                    type="text"
                />
                <Field
                    name="content"
                    component={this.renderField}
                    label="Post Content"
                    type="text"
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {  // pass this to the reduxForm helper

    const errors = {};

    if (!values.title) {
        errors.title = "Title is required, please enter a title"
    }

    if (values.title && values.title.length < 3) {
        errors.title = "Title must be more than 3 characters"
    }

    if (!values.categories) {
        errors.categories = "Categories are required, please enter a category"
    }
    if (!values.content) {
        errors.content = "Content are required, please enter some content"
    }

    // if error is empty the form is fine to submit
    // if errors has any properties, redux form assume form is invalid
    return errors;
}


export default reduxForm({
    validate: validate,     // since the key and value are the same `validate` you can just use validate
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);