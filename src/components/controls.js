
import { h, Component, options } from 'preact';
import { PropTypes } from 'prop-types';

const stringOrNumber = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
]);

class Input extends Component {
	static propTypes = {
		value: stringOrNumber,
		checked: PropTypes.bool,
		type: PropTypes.string,
	};
	constructor(props){
		super(props);
		this.state = {
			value: ''
		}
	}
	componentWillReceiveProps(nextProps) {
		const { props } = this;
	}
	
	displayRadio = (control, change) =>{
		return Object.keys(control.options).map(option => {
			let checked = control.value == control.options[option].value ? true : false;
			return(
				<label>
					<input type="radio" 
						className={control.attributes.class} 
						value={control.options[option].value} 
						name={control.name}
						onInput={change}
						checked={checked}
					/>
						{control.options[option].name}
					</label>
			)
		});
	}
	displaySelect = (control, change) =>{
		return(
			<select className={control.attributes.class} onInput={change} name={control.name} >
				<option value=''>Select</option>
				{
					Object.keys(control.value_options).map(opt => {
						return ( <option value={opt}>{control.value_options[opt]}</option> );
				})}
			</select>
		);
	}

	render() {
		const {
			control,
			change,
			cancelCrop,
			modalOpen,
			cropImage
		} = this.props;
		
		switch(control.type.toLowerCase()){
			case 'text':
				return (
					<span>
					<div style={{width: control.attributes.size + '%'}}>
						<input type="text" 
						className={control.attributes.class}	
						placeholder={control.attributes.placeholder} 
						onInput={change} value={control.value}
						name={control.name}
					/>
					</div>
					<small className={control.attributes.hintclass}>{ !!control.error ? control.error : control.hint}</small>
					</span>
				);
			break;
			case 'file':
				return (
					<span>
					<input type="file" 
						className={control.attributes.class}	
						placeholder={control.attributes.placeholder} 
						value={control.value} 
						onChange={change}
						id={control.name}
					/>
					<small className={control.attributes.hintclass}>{ !!control.error ? control.error : control.hint }</small>
					<span id="passview"></span>
					{modalOpen && <span class="box has-text-centered"><button class="button" onClick={cropImage} style="display: inline;">crop image</button>
					&nbsp;&nbsp; <button class="button" onClick={cancelCrop} style="display: inline;">cancel</button></span>}
					</span>
				);
			break;
			case 'email':
				return (
					<span>
						<div style={{width: control.attributes.size + '%'}}>					
						<input type="email" className={control.attributes.class}	
							placeholder={control.attributes.placeholder} 
							value={control.value}
						/>
						</div>
						<small className={control.attributes.hintclass}>{ !!control.error ? control.error : control.hint }</small>
					</span>
				);
			break;
			case 'password':
				return (
					<span>
						<div style={{width: control.attributes.size + '%'}}>
						<input type="password" className={control.attributes.class}	
							placeholder={control.attributes.placeholder} 
							onInput={change} 
							value={control.value}
							name={control.name}
						/>
						</div>
						<small className={control.attributes.hintclass}>{ !!control.error ? control.error : control.hint }</small>
					</span>
				);
			break;
			case 'radio':
				return (
					<span>
						{this.displayRadio(control, change)}
						<small className={control.attributes.hintclass}>{ !!control.error ? control.error : control.hint }</small>
					</span>
				);
			break;
			case 'select':
				return (
					<span>
						<div style={{width: control.attributes.size + '%'}}>
							{this.displaySelect(control, change)}
							<small className={control.attributes.hintclass}>{ !!control.error ? control.error : control.hint }</small>
						</div>
					</span>
				);
			break;
			default:
				return;
		}
	}
}

export default Input;
