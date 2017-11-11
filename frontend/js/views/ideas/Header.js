// @flow
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TagSection from '../../components/tags/TagSection';
import {fetchIdeas} from "../../actions/ideas";

type Props = {
  addIdeaButtonClick: () => {}
};

class Header extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      filterText: "Top - Past Day (Default)",
      anyStageTicked: true
    };

    this.props = props;

    this.applyFilters.bind(this);
    this.clearFilters.bind(this);
  }

  showContent() {
    const $this = $(findDOMNode(this));
    $this.find('#collapse-container-body').collapse('show');
  }

  applyFilters() {

    console.log('this', this);
    const { dispatch } = this.props;

    if(this.state.filterText.startsWith('Top')) {
      this.props.fetchIdeas('Top', ['Incubation', 'Launched'])
    } else {
      this.props.fetchIdeas('Newest', ['Incubation'])
    }
  }

  clearFilters() {

  }

  setFilterText(filterText) {

    if(filterText !== 'Newest') {
      this.setState({ filterText: `Top - ${filterText}`});
    } else {
      this.setState({ filterText: filterText });
    }
  }

  render() {
    const { addIdeaButtonClick } = this.props;

    return (
      <div className="header-container shadow">
        <div className="nav-container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <button type="button" className="btn btn-link" data-toggle="collapse" href="#collapse-container-body">Filter</button>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <button type="button" className="btn btn-link btn-right" onClick={() => addIdeaButtonClick()}>Add Idea</button>
            </div>
          </div>
        </div>
        <div id="collapse-container-body" className="collapse">
          <div className="collapse-container">
            <div className="tag-section">
              <TagSection />
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="label-base-base">
                  Stage
                </div>
                <div className="">
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Any Stage (default)
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Incubation
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Prototyping
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Launched
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Canceled
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="label-base-base">
                  Sort by:
                </div>
                <div className="dropdown-container">
                  <ul className="nav site-nav">
                    <li className="flyout">
                      <a href="#" className="dropdown-title"><span id="selected">{ this.state.filterText }</span><span>▼</span></a>
                      <ul className="flyout-content sub nav stacked">
                        <li className="flyout-alt">
                          <a href="#">Top (default)</a>
                          <ul className="flyout-content sub nav stacked">
                            <li><a href="#" onClick={ () => this.setFilterText('Past Hour') }>Past Hour</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText('Past Day') }>Past Day (default)</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText('Past Week') }>Past Week</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText('Past Month') }>Past Month</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText('Past Year') }>Past Year</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText('All Time') }>All Time</a></li>
                          </ul>
                        </li>
                        <li><a href="#" onClick={ () => this.setFilterText('Newest') }>Newest</a></li>
                      </ul>
                    </li>
                  </ul>​
                </div>
              </div>
            </div>
            <div className="result-container">
              <div className="label-base-base">
                72 Results
              </div>
              <button type="button" className="btn btn-link label-base-base" onClick={ this.applyFilters.bind(this) } >Apply Filters</button>
              <button type="button" className="btn btn-link label-base-base" onClick={ this.clearFilters.bind(this) } >Clear Filters</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
