import instance from './instance';

export const getDuckSlotsList = () => {
  return instance.get('/duck-slots/list').then((resp) => resp.data);
};

export const postDuckSlotsCrossing = (data: any) => {
  return instance.post('/duck-slots/crossing', data).then((resp) => resp.data);
};
export const deleteDuckSlot = (data: any) => {
  return instance.delete('/duck-slots/delete', { data }).then((resp) => resp.data);
};
