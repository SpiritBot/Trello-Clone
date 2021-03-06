import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoardView from './BoardView';

import { boardViewActionCreators } from './modules/index';

const mapStateToProps = state => {
  const { isFocusOnCreateCardForm, isCreateCardFormOpen } = state.boardView;

  return {
    isFocusOnCreateCardForm,
    isCreateCardFormOpen
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    boardViewActions: bindActionCreators(boardViewActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardView);
