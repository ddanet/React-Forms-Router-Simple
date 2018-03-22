import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPosts} from "../actions/index";
import _ from 'lodash';

class PostsIndex extends Component {

    renderPosts() {

        return _.map(this.props.posts, post => {
            return (
                <li key={post.id} className="list-group-item">
                    <div className="text-xs-left">
                        <Link to={`/posts/${post.id}`}>
                            {post.title}
                        </Link>
                    </div>
                </li>
            );
        })
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="posts/new">
                        Add a post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        console.log('ComponentDidMount - PostIndex');
        this.props.fetchPosts();
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

// export default connect(null, {fetchPosts: fetchPosts()}) (PostsIndex);
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);  //same as above, using abbreviated syntax