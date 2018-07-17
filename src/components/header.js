import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import Menu from '@/components/menu';

class Header extends Component {
    render(props) {
      return (
        <div class="container-full">
            <Menu className="row" />
            { props.url !== "/" && <div class="row">
                <div id="date" class="full-w">Monday, April 23, 2018 23:51am</div>
                <div class="social">
                    <a href="/accounts/register" class="fa fa-facebook"></a>
                    <a href="/accounts/register" class="fa fa-twitter"></a>
                    <a href="/accounts/register" class="fa fa-google-plus"></a>
                    <a href="/accounts/register" class="fa fa-linkedin"></a>
                    <a href="/accounts/register" class="fa fa-youtube"></a>
                    <a href="/accounts/register" class="fa fa-vimeo-square"></a>
                </div>
            </div>}
        </div>
      );
    }
}
const mapStateToProps = state => {
    return {
        account: state.account
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);