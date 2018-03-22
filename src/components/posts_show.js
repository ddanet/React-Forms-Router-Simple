import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchPost, deletePost} from '../actions/index'

class PostsShow extends Component {

    render() {

        const { post } = this.props;

        if(!post){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/" className="btn btn-primary">Back to Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                 >
                 Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }

    componentDidMount() {
        const { id } = this.props.match.params;  // de-structuring for id
        this.props.fetchPost(id);
    }

    onDeleteClick(){
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/')
        });
    }

}

// function mapStateToProps({ posts }, ownProps) { // ownProps is a second argument
function mapStateToProps(state, ownProps) { // ownProps is a second argument
    const posts = state.posts;
    return {  post: posts[ownProps.match.params.id]};
}


export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
