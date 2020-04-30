import * as PROFILE_CONST from '../constants/profile';
import { AppToaster } from "../components/toaster";
import { Intent } from '@blueprintjs/core';

const profile = (state = PROFILE_CONST.profileDefaultState, action) => {
    switch(action.type) {
        case PROFILE_CONST.UPDATE_PROFILE_ADMIN_PENDING: {
            return {
                ...state,
            };
        }
        case PROFILE_CONST.UPDATE_PROFILE_ADMIN_FULFILLED: {
            const updatedProfileList = state.savedUserProfiles.map(savedUserProfile => {
                if (savedUserProfile._id === action.payload._id) {
                    savedUserProfile.isActive = action.payload.isActive;
                } 
                return savedUserProfile;
            });

            AppToaster.show({ message: 'Successfully Updated', intent: Intent.SUCCESS });
            return {
                ...state,
                savedUserProfiles: updatedProfileList
            };
        }
        case PROFILE_CONST.UPDATE_PROFILE_ADMIN_REJECTED: {
            AppToaster.show({ message: action.payload, intent: Intent.DANGER });
            return {
                ...state,
            };
        }
        case PROFILE_CONST.FETCH_ALL_PROFILE_PENDING: {
            return {
                ...state,
                isSavedUserProfiles: true
            };
        }
        case PROFILE_CONST.FETCH_ALL_PROFILE_FULFILLED: {
            return {
                ...state,
                isSavedUserProfiles: false,
                savedUserProfiles: action.payload
            };
        }
        case PROFILE_CONST.FETCH_ALL_PROFILE_REJECTED: {
            AppToaster.show({ message: action.payload, intent: Intent.DANGER });
            return {
                ...state,
                isSavedUserProfiles: false
            };
        }
        case PROFILE_CONST.FETCH_PROFILE_PENDING: {
            return {
                ...state,
            };
        }
        case PROFILE_CONST.FETCH_PROFILE_FULFILLED: {
            const {...data} = action.payload;
            return {
                ...state,
                name: data.userName,
                email: data.userEmail,
                expectedPerDayIntakeCalorie: data.expectedPerDayIntakeCalorie,
                isActive: data.isActive
            };
        }
        case PROFILE_CONST.FETCH_PROFILE_REJECTED: {
            AppToaster.show({ message: action.payload, intent: Intent.DANGER });
            return {
                ...state,
            };
        }
        case PROFILE_CONST.SAVE_PROFILE_PENDING: {
            return {
                ...state,
            };
        }
        case PROFILE_CONST.SAVE_PROFILE_FULFILLED: {
            return {
                ...state,
            };
        }
        case PROFILE_CONST.SAVE_PROFILE_REJECTED: {
            return {
                ...state,
            };
        }
        case PROFILE_CONST.UPDATE_PROFILE_PENDING: {
            return {
                ...state,
            };
        }
        case PROFILE_CONST.UPDATE_PROFILE_FULFILLED: {
            const {...data} = action.payload;

            AppToaster.show({ message: 'Successfully Updated', intent: Intent.SUCCESS });
            return {
                ...state,
                name: data.userName,
                email: data.userEmail,
                _id: data._id,
                expectedPerDayIntakeCalorie: data.expectedPerDayIntakeCalorie,
                isActive: data.isActive,
            };
        }
        case PROFILE_CONST.UPDATE_PROFILE_REJECTED: {
            AppToaster.show({ message: action.payload, intent: Intent.DANGER });
            return {
                ...state,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
    
  };

export default profile;