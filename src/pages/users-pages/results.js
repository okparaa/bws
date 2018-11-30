import { h, Component } from 'preact';
import '@/public/styles/users.scss';
import { connect } from 'preact-redux';
import resultsReducer, {  } from '@/ducks/users-ducks/results';
import { addReducer } from '@/components/add-reducer';

class Results extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="container">
        
            </div>
        )
    }
}

const mapStateToProps = ({results}) => {
    if(!results)
        return {};

    return {
        item: results.item
    }
}
Results = addReducer('results', resultsReducer)(Results);
export default connect(mapStateToProps, {
    results
})(Results);