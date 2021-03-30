// import react native
import React, {FC} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';

// import components
import ProductItemComponent from '../components/ProductItem';

// import redux
import {useSelector, useDispatch} from 'react-redux';
import {CartState, ProductsState} from '../redux/interfaces';
import {deleteProductFromCart, updateProductQuantity} from '../redux/actions';

// import global styles
import globalStyles from '../styles';
import {Colors} from '../styles/colors';

// export Cart component
const Cart: FC = (): JSX.Element => {
  // use cart selector
  const cartState: CartState = useSelector(state => state.CartReducer);

  // use products selector
  const productsState: ProductsState = useSelector(
    state => state.ProductsReducer,
  );

  // use dispatch
  const dispatch = useDispatch();

  return (
    <View style={globalStyles.cartView}>
      <Text style={globalStyles.cartTitleText}>My Cart</Text>
      <FlatList
        data={cartState.productsList}
        renderItem={({item}) => (
          <ProductItemComponent
            name={item.title}
            quantity={item.quantity}
            onPress={() => {
              // get quantity of current product in products reducer
              const index: number = productsState.productsList.findIndex(
                element => element.title === item.title,
              );
              dispatch(deleteProductFromCart(item));
              dispatch(
                updateProductQuantity({
                  ...item,
                  quantity:
                    productsState.productsList[index].quantity + item.quantity,
                }),
              );
            }}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{borderBottomWidth: 1, borderBottomColor: Colors.lightGrey}}
          />
        )}
      />
      <TouchableOpacity style={globalStyles.cartPayButtonView}>
        <Text style={{fontSize: 30, color: 'white'}}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Cart;
