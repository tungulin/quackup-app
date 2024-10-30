import instance from './instance';


export const initializeUser = () => {
  return instance.post('/user/initialize').then((resp) => resp.data);
};

export const tapDuck = (data: any) => {
  return instance.post('/user/tap', data).then((resp) => resp.data);
};
  