import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { boardViewActionCreators } from '../../../modules/index';

import './CreateCard.css'

class CreateCard extends Component {
  render() {
		
    return (
			<div 
				className="Create-Card-Form"
				tabIndex="0" 
				onFocus={() => { this.focusOnForm(true) }}
				onBlur={() => { this.focusOnForm(false) }} 
			>
				<form onSubmit={ this.props.handleSubmit }>
					<Field
						className="Create-Card-Form-CardTitle"
						autoFocus={true}
						type="text" 
						name="name"
						value="" 
						placeholder="Add a card…" 
						component="input"
						dir="auto"
					/>
					<div className="Create-Card-Form-Footer">
						<button type="submit" className="Create-Card-Form-SubmitButton">Save</button>
						<FontAwesome 
							name="times"
							size="2x"
							className="Create-Card-Form-Header-Close-Button"
							onClick={ () => this.props.boardViewActions.closeCreateCardForm() }
						/>
					</div>
				</form>
      </div>
    );
  }

	focusOnForm(isFocusOnForm) {
    
    if (isFocusOnForm) {
      this.props.boardViewActions.focusOnBoard();
    } else {
      this.props.boardViewActions.blurOnBoard();
    }
  }
}

CreateCard = reduxForm({
  form: 'createCardForm'
})(CreateCard);

function mapStateToProps(state) {
	const { isCreateCardFormOpen } = state.boardView;

	return {
		isCreateCardFormOpen
	}
}

function mapDispatchToProps(dispatch) {
  return { 
    boardViewActions: bindActionCreators(boardViewActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);

