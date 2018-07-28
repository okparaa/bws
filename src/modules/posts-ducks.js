import { TX, FDT } from '@/utils/tx';
import utils from '@/utils/utils';
import { keducer as postsReducer, Types } from '@/utils/keducer';

export const POST = 'posts/POST';
export const SAVE_ARTICLE = 'posts/SAVE_ARTICLE';
export const POST_REQUEST = Types('posts', 'POST_REQUEST');

export default postsReducer('posts');

export const saveArticle = (article) => ({
    type: SAVE_ARTICLE,
    payload: {
        article
    }
})
export const postRequest = () => ({
    type: POST_REQUEST.PENDING,
    payload: {
        isPosting: true
    }
})
export const postSucess = () => ({
    type: POST_REQUEST.SUCCESS,
    payload: {
        isPosting:false
    }
})
export const postError = (error) => ({
    type: POST_REQUEST.ERROR,
    payload: {
        error
    }
})

export const post = (article) => dispatch => {
    dispatch(postRequest());
    TX.post('/posts/create', FDT({content: article}))
    .then(res => {
        dispatch(postSucess());
    })
    .catch(error => {
        dispatch(postError(error));
    });
}