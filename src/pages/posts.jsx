import { h, Component } from 'preact';
import loadImage from 'blueimp-load-image';
import '@/public/styles/posts.scss';
import { connect } from 'preact-redux';
import auth from '@/utils/auth';
import utils from '@/utils/utils';
import config from '@/utils/config';
import { route } from 'preact-router';
import { TX, FDT } from '@/utils/tx';
import postsReducer, { saveArticle, post } from '@/modules/posts-ducks';
import { addReducer } from '@/components/add-reducer';
import autosize from 'autosize';

class Posts extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.ta = document.getElementById('poster');
        autosize(this.ta);
    }
    postArticle = (e) =>{
        e.preventDefault();
        this.props.post(this.props.article);
        this.ta.value = '';
        autosize.update(this.ta);

    }
    handleArticle = (e) =>{
        this.props.saveArticle(e.target.value);
    }
    selectFile = (e) =>{
        let fileInput = document.getElementById('postpics');
        fileInput.click();
    }
    removeUpload(e){
        var span = e.target.parentNode;
        var imag = span.lastChild;
        var spina = e.target;
        utils.addClass(spina, 'animate-spin');
        var imagurl = imag.src.substr(imag.src.lastIndexOf('/')+1);
        var imagid = imagurl.split('-')[0];
        TX.post('/posts/delete-image', {image: imagid})
            .then(res => {
                span.parentNode.removeChild(span);
            })
            .catch(err => {
                span.parentNode.removeChild(span);
                console.log(err);
            });
        
    }
    postImage = (e) => {
        let files = e.target.files;
        // this.props.saveImage(files);
        for(var i = 0; i < files.length; i++){
            var elem = this;
            var progWrap = document.querySelector('.progress');
            var imag = document.createElement('img');
            imag.id = 'uploaded';
            imag.style.width = '100px';
            var progCloner = document.querySelector('.progs');
            var prog = progCloner.cloneNode(true);
            var error = document.createElement('div');
            var closeCloner = document.querySelector('.close');
            var close = closeCloner.cloneNode(true);
            close.addEventListener('click', function(e){
                elem.removeUpload(e);
            });
            var wrap = document.createElement('span');
            utils.addClass(wrap, 'wrap-upload');
            wrap.style.marginTop = '5px';
            wrap.style.borderBottom = '5px';
            wrap.style.marginRight = '5px';
            wrap.style.width = '100px';
            wrap.style.float = 'left';
            close.style.display = 'inline-block';
            prog.style.display = 'block';
            wrap.appendChild(close);
            wrap.appendChild(prog);
            progWrap.appendChild(wrap);

            var loadingImage = loadImage(
                files[i],
                function (img) {
                var blob = utils.dataURLtoBlob(img.toDataURL("image/jpeg")); 
                TX.post('posts/image', FDT({"imagepost" : blob}), {
                    onUploadProgress: function(uploadEvent){
                        prog.lastChild.style.width = parseInt(Math.round((uploadEvent.loaded * 100)/uploadEvent.total)) + '%';
                        prog.lastChild.innerHTML = parseInt(Math.round((uploadEvent.loaded * 100)/uploadEvent.total)) + '%';
                   }
                })
                .then(res => {
                    if(res.data.filename){
                        var imgNm = res.data.filename;
                        var imagid = imgNm.substr(imgNm.lastIndexOf('/')+1).split('-')[0];
                        imag.setAttribute('src', config.url + '/' +res.data.filename);
                        wrap.appendChild(imag);
                        utils.removeClass(close, 'animate-spin');
                        console.log('in success');
                    }else{
                        for(var k in res.data){
                            if(res.data.hasOwnProperty(k)){
                                let txt = document.createTextNode(res.data[k]);
                                error.appendChild(txt);
                            }
                            console.log(res.data);
                        }
                        error.style.display = 'block';
                        wrap.appendChild(error);
                    }
                })
                .catch(err => {
                    console.log(err);
                });               
            },
            {
                canvas: true,
                pixelRatio: window.devicePixelRatio,
                downsamplingRatio: 0.3,
                orientation: true
            });
        }
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
                                <input onChange={this.postImage} type="file" style="display: none;" name="postpics" id="postpics"/>
                                <div class='progress' style="display: flex; flex-wrap: wrap;">
                                    <div style="width:100px; display: none" class="prog-wrapper progs">
                                        <div class="prog">.</div>
                                    </div>       
                                    <i class="bw-icon icon-cancel animate-spin close" style={{fontSize: '18px', display: 'none', textAlign: 'center', cursor: 'pointer'}}></i>
                                </div>
                                <i class="bw-icon icon-picture" style="color: green; font-size: 20px; float: right; cursor: pointer" onClick={this.selectFile}></i>
                                <textarea onBlur={this.handleArticle} name="poster" id="poster" ></textarea>
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
        article: posts.article
    }
}
Posts = addReducer('posts', postsReducer)(Posts);
export default connect(mapStateToProps, {
    saveArticle, post
})(Posts);