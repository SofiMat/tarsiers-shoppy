import { connect } from 'react-redux';
import {
  setCategory,
  addSize,
  removeSize,
  addBrand,
  removeBrand
} from '../../actions/filterActions';
import FilterArea from './FilterArea';

const mapStateToProps = state => ({
  wishlist: state.wishlist.wishlist,
  products: state.products.products,
  filter: state.filter
});
const mapDispatchToProps = dispatch => ({
  setCategory: data => dispatch(setCategory(data)),
  addSize: data => dispatch(addSize(data)),
  removeSize: data => dispatch(removeSize(data)),
  addBrand: data => dispatch(addBrand(data)),
  removeBrand: data => dispatch(removeBrand(data))
});
const FilterAreaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterArea);

export default FilterAreaContainer;
