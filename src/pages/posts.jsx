import { h, Component } from 'preact';
import '@/public/styles/posts.scss';
import { connect } from 'preact-redux';
import auth from '@/utils/auth';
import { route } from 'preact-router';
import postsReducer from '@/modules/posts-ducks';
import { addReducer } from '@/components/add-reducer';

class Posts extends Component{
    render(){
        return(
            <div class="container full-h">
                <div class="row">
                    <div class="leftside">
                        this is the left side
                    </div>
                    <div class="content">
                        
                    </div>
                    <div class="rightside">
                        this is the left side
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({posts}) => {
    if(!posts)
        return {};

    return {
        articles: posts.articles
    }
}
Posts = addReducer('posts', postsReducer)(Posts);
export default connect(mapStateToProps, {
    
})(Posts);