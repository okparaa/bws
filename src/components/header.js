import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import Menu from '@/components/menu';

class Header extends Component {
    render(props) {
      return (
        <div class="container-full" id="nav">
            <Menu className="row" />
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