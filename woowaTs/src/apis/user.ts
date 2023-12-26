import { APIBuilder } from '.';

interface User {
  name: string;
  age: number;
}
export const fetchUser = () => {
  return APIBuilder.get('/user').build().call<User>();
};

export const postUser = ({ name, age }: User) => {
  return APIBuilder.post('/user', { name, age }).build();
};
