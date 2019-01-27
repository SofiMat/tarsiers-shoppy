/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
import React, { Component } from 'react';
import { bool } from 'prop-types';

import productType from '../../types';
import HttpService from '../../../utils/http.service';
import appConfig from '../../../config/appConfig';
import { ViewFrontFull, ViewDetailsFull } from './viewFull';
import { ViewCartSmall, ViewInfoSmall } from './viewSmall';
import './ProductItem.scss';

const CN = 'product-item';
const { addToWishList, removeFromWishList } = appConfig.apiResources;

class ProductItem extends Component {
  static propTypes = {
    extended: bool,

    /**
     * data - productType shape
     */
    data: productType
  };

  static defaultProps = {
    extended: false,
    data: {}
  };

  state = { showDetails: false };

  showFront = () => this.setState({ showDetails: false });

  showDetails = () => this.setState({ showDetails: true });

  addToWishList = id => {
    const { addToWishListItem, isAddedtoWishList } = this.props;

    HttpService.post(addToWishList, { productId: id })
      .then(res => {
        if (res.status === 200 && !isAddedtoWishList) {
          addToWishListItem(id);
          console.log(`Added to the WishList: ${id}`);
        }
      })
      .catch(error => console.log(error));
  };

  removeFromWishList = id => {
    const { removeFromWishListItem } = this.props;

    HttpService.post(removeFromWishList, { productId: id })
      .then(res => {
        if (res.status === 200) {
          removeFromWishListItem(id);
          console.log(`Removed from the WishList: ${id}`);
        }
      })
      .catch(error => console.log(error));
  };

  toggleWishList = (e, id) => {
    e.preventDefault();
    const { isAddedtoWishList } = this.props;

    const cb = !isAddedtoWishList
      ? this.addToWishList
      : this.removeFromWishList;

    cb(id);
  };

  render() {
    const { showDetails } = this.state;
    const { data, extended, isAddedtoWishList } = this.props;
    const { src, title, price } = data;

    return extended ? (
      <div
        ref={this.itemRef}
        className={`${CN} ${CN}--full`}
        onMouseEnter={this.showDetails}
        onMouseLeave={this.showFront}
      >
        {showDetails ? (
          <ViewDetailsFull
            {...data}
            clickHandler={this.toggleWishList}
            wished={isAddedtoWishList}
          />
        ) : (
          <ViewFrontFull {...data} />
        )}
      </div>
    ) : (
      <div
        ref={this.itemRef}
        className={`${CN} ${CN}--small`}
        onMouseEnter={this.showDetails}
        onMouseLeave={this.showFront}
      >
        <img src={src} alt="" />
        {showDetails ? (
          <ViewCartSmall title={title} />
        ) : (
          <ViewInfoSmall title={title} price={price} />
        )}
      </div>
    );
  }
}

export default ProductItem;
