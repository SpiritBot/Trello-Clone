import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import * as ModalActionCreators from '../../../modules/modals';

import '../Form.css'

const propTypes = {
  isCreateBoardModalOpen: PropTypes.bool.isRequired
}

class CreateBoard extends Component {
  render() {
    const { handleSubmit } = this.props;
		
    return (
			<div 
				className={this.getClassName()} 
				tabIndex="0" 
				onFocus={() => { this.focusOnPopHover(true) }}
				onBlur={() => { this.focusOnPopHover(false) }} 
			>
				<div className="Form-Header" >
					<span className="Form-Header-Title">Create Board 
						<FontAwesome 
							name="times" 
							className="Form-Header-Close-Button" 
							onClick={(event) => { this.closeModal() }} 
						/>
					</span>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="boardNewTitle">Title</label>
							<Field 
								className="Form-BoardTitle"
								type="text" 
								autoFocus={true}
								name="name" 
								placeholder="Like “School Research” for example…" 
								value="" 
								component="input"
								dir="auto"
							/>
						</div>
						<button type="submit" className="Form-SubmitButton">Create</button>
					</form>
				</div>
      </div>
    );
  }

	focusOnPopHover (isFocusOnPopHover) {
    
    if (isFocusOnPopHover) {
      this.props.modalActions.focusOnModal();
    } else {
      this.props.modalActions.blurOnModal();
    }
  }

	getClassName() {
		if (this.props.isCreateBoardModalOpen) {
			return "Form Form-Shown"
		}

		return "Form Form-Hidden"
	}

	closeModal() {
		this.props.modalActions.closeCreateBoardModal()
	}
}

CreateBoard = reduxForm({
  form: 'createBoardForm' // a unique name for this form
})(CreateBoard);

function mapStateToProps(state) {
	const { isCreateBoardModalOpen } = state.modals;

	return {
		isCreateBoardModalOpen
	}
}

function mapDispatchToProps(dispatch) {
  return { 
    modalActions: bindActionCreators(ModalActionCreators, dispatch)
  }
}

CreateBoard.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoard);

