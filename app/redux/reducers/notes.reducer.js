import TransformerUtil from '../../utils/TransformerUtil';
import {ADD_NOTE, DELETE_NOTE, POPULATE_NOTES} from '../actions/index.actions';

const notes = (prevState = [], action) => {
  switch (action.type) {
  case ADD_NOTE: {
    return [...prevState, action.payload];
  }
    
  case DELETE_NOTE: {
    return TransformerUtil.removeNote(prevState, action.payload.id);
  }

  case POPULATE_NOTES: {
    return action.payload;
  }
  
  default: {
    return prevState;
  }
  }
};

export default notes;
