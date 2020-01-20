/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import moment from 'moment';

import {
  SET_ASSIGNMENT,
  SET_ASSIGNMENT_SUCCESS,
  SET_ASSIGNMENT_ERROR,
  UPDATED_ASSIGNED_ITEM,
  UPDATED_ASSIGNED_TASK_SUCCESS,
  UPDATED_ASSIGNED_ROOM_SUCCESS,
  LOAD_ASSIGNMENT,
  LOAD_ASSIGNMENT_SUCCESS,
  CHANGE_DATE
} from './constants';

export const initialState = {
  assignment: {
    id: '',
    rooms: [],
    tasks: [],
    date: '',
    updated: ''
  },
  date: moment().format('YYYY-MM-DD'),
  isLoading: false,
  error: false
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_DATE:
        draft.date = action.date;
      case LOAD_ASSIGNMENT:
        draft.isLoadgin = true;
        draft.error = false;
        break;
      case LOAD_ASSIGNMENT_SUCCESS:
        draft.isLoadgin = false;
        draft.error = false;
        console.log('LOAD_ASSIGNMENT_SUCCESS:', action)
        draft.assignment.id = action.assignment._id
        draft.assignment.rooms = action.assignment.rooms
        draft.assignment.tasks = action.assignment.tasks
        draft.assignment.date = action.assignment.date
        draft.date = action.assignment.date
        break;
      case UPDATED_ASSIGNED_ITEM:
        draft.isLoadgin = true;
        draft.error = false;
        break;
      case UPDATED_ASSIGNED_TASK_SUCCESS:
        const updatedTask = action.task;
        // if someone update and item from a different assignment date
        // if(draft.date == updatedTask.date){
          draft.assignment.tasks[draft.assignment.tasks.findIndex(task => task._id == updatedTask._id)].hkKey = updatedTask.hkKey;
        // }
        draft.isLoadgin = false;
        break;
      case UPDATED_ASSIGNED_ROOM_SUCCESS:
        const updatedRoom = action.room;
        // if someone update and item from a different assignment date
        console.log('draft', draft.date)
        console.log('room', updatedRoom.date)
        // if(draft.date == updatedRoom.date){
          draft.assignment.rooms[draft.assignment.rooms.findIndex(room => room._id == updatedRoom._id)].hkKey = updatedRoom.hkKey;
        // }
        draft.isLoadgin = false;
        break;
      case SET_ASSIGNMENT:
        console.log('SET_ASSIGNMENT with:', action);
        draft.isLoadgin = true;
        draft.error = false;
        draft.assignment.date = action.assignment.date;
        draft.assignment.rooms = action.assignment.rooms;
        draft.assignment.tasks = action.assignment.tasks;
        break;
      case SET_ASSIGNMENT_SUCCESS:
          console.log('SET_ASSIGNMENT_SUCCESS');
          draft.isLoadgin = false;
          draft.error = false;
          draft.assignment.tasks = [];
          draft.assignment.rooms = []
          draft.assignment.date = ''
        break;
      case SET_ASSIGNMENT_ERROR:
          draft.isLoadgin = false;
          draft.error = action.error;
        break;
    }
  });

export default appReducer;
