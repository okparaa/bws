import { h, Component } from 'preact';
import '@/public/styles/posts.scss';
import { connect } from 'preact-redux';
import auth from '@/utils/auth';
import { route } from 'preact-router';
import postsReducer from '@/modules/posts-ducks';
import { addReducer } from '@/components/add-reducer';
import autosize from 'autosize';

class Posts extends Component{
    componentDidMount(){
        var ta = document.getElementById('poster');
        autosize(ta);
    }
    render(){
        return(
            <div class="container full-h">
                <div class="row">
                    <div class="leftside">
                        this is the left side
                    </div>
                    <div class="content">
                        <form action="" onSubmit={this.postArticle}>
                            <div id="posts">
                                <textarea name="poster" id="poster" ></textarea>
                                <button class="">send</button>
                            </div>
                        </form>
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