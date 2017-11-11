// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from './Header';
import IdeaItem from './IdeaItem';
import AddIdeaModal from '../../components/modals/AddIdeaModal';
import { fetchIdeas, addIdea, handleAddIdeaError, updateIdea, handleUpdateIdeaError } from '../../actions/ideas';


type Props = {
  dispatch: any;
  ideas: any;
}

class Ideas extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.modalIdea = null;
    this.type = 'view'; // 'add', 'edit'
    dispatch(fetchIdeas());
  }

  props: Props;

  state = {
    isOpen: false,
  }

  handleIdea(idea, type) {
    const { dispatch } = this.props;
    const errorMessage = this.validateIdea(idea);
    console.log('error message ===> ', errorMessage);
    if (type === 'eidt') {
      if (errorMessage.length > 0) {
        dispatch(handleUpdateIdeaError(errorMessage));
        alert(errorMessage);
        return;
      }
      dispatch(updateIdea(idea));
    } else if (type === 'add') {
      if (errorMessage.length > 0) {
        dispatch(handleAddIdeaError(errorMessage));
        alert(errorMessage);
        return;
      }
      dispatch(addIdea(idea));
    }
    this.modalIdea = null;
    this.setState({ isOpen: false });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  validateIdea(idea) {
    let errorMessage = '';
    if (idea.title.length === 0) {
      errorMessage += 'Title must be required.\n';
    }

    if (idea.description.length === 0) {
      errorMessage += 'Description must be required.\n';
    }

    if (idea.stage.length === 0) {
      errorMessage += 'Stage must be required.\n';
    }

    if (idea.expectedCostInCents.length === 0) {
      errorMessage += 'ExpectedCostInCents must be required.\n';
    }

    if (idea.expectedTtm.length === 0) {
      errorMessage += 'ExpectedTtm must be required.\n';
    }

    if (idea.expectedProfit.length === 0) {
      errorMessage += 'ExpectedProfitInCents must be required.\n';
    }

    if (idea.tags.length === 0) {
      errorMessage += 'Tags must be required.\n';
    }

    if (errorMessage.endsWith('\n')) {
      errorMessage = errorMessage.substr(0, errorMessage.length - 1);
    }

    return errorMessage;
  }

  addIdeaButtonClickHandler() {
    this.setState({ isOpen: true });
    this.modalIdea = null;
    this.type = 'add';
  }

  editIdeaButtonClickHandler(idea) {
    this.setState({
      isOpen: true,
    });
    this.modalIdea = idea;
    this.type = 'edit';
    console.log('edit type ===>', this.type);
  }

  viewIdeaClickHandler(idea) {
    this.setState({
      isOpen: true,
    });
    this.modalIdea = idea;
    this.type = 'view';
    console.log('view type ===>', this.type);
  }

  render() {
    const { isOpen } = this.state;
    console.log('this.modalIdea ===>', this.modalIdea);
    const { ideas: { ideasArr, ideasErrorMessage, isFetchingIdeas } } = this.props;
    const renderIdeaItems = (!isFetchingIdeas && ideasArr !== undefined && ideasArr.length !== 0) ?
      ideasArr.map(item => (
        <IdeaItem key={item.id.toString()} idea={item} edit={() => this.editIdeaButtonClickHandler(item)} view={() => this.viewIdeaClickHandler(item)} />
      )) :
      null;
    return (
      <div className="container">
        <div className="ideas-container">
          <Header addIdeaButtonClick={() => this.addIdeaButtonClickHandler()} />
          {renderIdeaItems}
        </div>
        <AddIdeaModal isOpen={isOpen} idea={this.modalIdea} type={this.type} handleIdea={(idea, type) => this.handleIdea(idea, type)} close={() => this.closeModal()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ideas: state.ideas,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ideas);