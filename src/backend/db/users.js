import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: 'Adarsh',
    lastName: 'Balika',
    username: 'adarshbalika',
    password: 'adarshBalika123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: 'I am Adarsh Balika and I can do no wrong',
  },
  {
    _id: uuid(),
    firstName: 'Onkar ',
    lastName: 'Deshpande',
    username: 'Sashaboi',
    password: 'Sashaboi',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: 'I am Onkar Deshpande and I can do no wrong',
  },
  {
    _id: uuid(),
    firstName: 'Tushar ',
    lastName: 'Deshpande',
    username: 'Tushar',
    password: 'Sashaboi',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: 'I am Tushar Deshpande and I can do no wrong',
  },
  {
    _id: uuid(),
    firstName: 'Shubham ',
    lastName: 'Soni',
    username: 'shubhamsoni',
    password: 'Sashaboi',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: 'I am Tushar Soni and I can do no wrong',
  },
];
/*
loginJson = {
  email: 'adarshbalika@gmail.com',
  password: 'adarshBalika123'
};

*/
