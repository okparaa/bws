import { TX } from '@/utils/tx';
import utils from '@/utils/utils';
import { keducer as postsReducer, Types } from '@/utils/keducer';

export const POST = 'posts/POST';
export const POST_REQUEST = Types('posts', 'POST_REQUEST');

export default postsReducer('posts');