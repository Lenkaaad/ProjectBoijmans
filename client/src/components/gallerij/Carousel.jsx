import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Item from './Item';
import Swipeable from 'react-swipeable';

class Carousel extends Component {
    
  constructor(props) {
      super(props)
      this.state = {
          active: this.props.active,
          direction: ''
      }
      this.rightClick = this.moveRight.bind(this);
      this.leftClick = this.moveLeft.bind(this);
  }

  generateItems() {
      let items = [];
      let level;
      for (let i = this.state.active - 1; i < this.state.active + 2; i++) {
          let index = i;
          if (i < 0) {
              index = this.props.items.length + i;
          } else if (i >= this.props.items.length) {
              index = i % this.props.items.length;
          }
          level = this.state.active - i;
          items.push(<Item key={index} id={index} item={this.props.items[index]} level={level} />);
      }
      return items
  }
  
  moveLeft() {
      let newActive = this.state.active;
      newActive--;
      this.setState({
          active: newActive < 0 ? this.props.items.length - 1 : newActive,
          direction: 'left'
      });
  }
  
  moveRight() {
      let newActive = this.state.active;
      this.setState({
          active: (newActive + 1) % this.props.items.length,
          direction: 'right'
      });
  }
  
  render() {
      return(
        <Swipeable onSwipingLeft={this.rightClick} onSwipingRight={this.leftClick}>
            <div id="carousel" className="noselect">
                <div className="arrow arrow-left" onClick={this.leftClick}><i className="fi-arrow-left"></i></div>
                <CSSTransitionGroup 
                    transitionName={this.state.direction} transitionEnterTimeout={300} transitionLeaveTimeout={300} className="inner-carousel">
                    {this.generateItems()}
                </CSSTransitionGroup>
                <div className="arrow arrow-right" onClick={this.rightClick}><i className="fi-arrow-right"></i></div>
            </div>
        </Swipeable>
      )
  }
}

export default Carousel;