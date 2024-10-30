import instance from './instance';

export const getDuckShopList = () => {
  return instance.get('/duck-shop/list').then((resp) => resp.data);
};

export const buyDuck = (data: any) => {
  return instance.post('/duck-shop/buy', data).then((resp) => resp.data);
};
