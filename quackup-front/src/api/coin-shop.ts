import instance from './instance';

export const getCoinShopList = () => {
  return instance.get('/coin-shop/list').then((resp) => resp.data);
};
