export const profileDefaultState = {
    name: '',
    email: '',
    expectedPerDayIntakeCalorie: 0.0, // Unit : Cal
    savedUserProfiles: [],
};

export const FETCH_PROFILE_PENDING = 'PROFILE/FETCH_PROFILE_PENDING';
export const FETCH_PROFILE_FULFILLED = 'PROFILE/FETCH_PROFILE_FULFILLED';
export const FETCH_PROFILE_REJECTED = 'PROFILE/FETCH_PROFILE_REJECTED';

export const SAVE_PROFILE_PENDING = 'PROFILE/SAVE_PROFILE_PENDING';
export const SAVE_PROFILE_FULFILLED = 'PROFILE/SAVE_PROFILE_FULFILLED';
export const SAVE_PROFILE_REJECTED = 'PROFILE/SAVE_PROFILE_REJECTED';

export const UPDATE_PROFILE_PENDING = 'PROFILE/UPDATE_PROFILE_PENDING';
export const UPDATE_PROFILE_FULFILLED = 'PROFILE/UPDATE_PROFILE_FULFILLED';
export const UPDATE_PROFILE_REJECTED = 'PROFILE/UPDATE_PROFILE_REJECTED';

export const FETCH_ALL_PROFILE_PENDING = 'PROFILE/FETCH_ALL_PROFILE_PENDING';
export const FETCH_ALL_PROFILE_FULFILLED = 'PROFILE/FETCH_ALL_PROFILE_FULFILLED';
export const FETCH_ALL_PROFILE_REJECTED = 'PROFILE/FETCH_ALL_PROFILE_REJECTED';

export const UPDATE_PROFILE_ADMIN_PENDING = 'PROFILE/UPDATE_PROFILE_ADMIN_PENDING';
export const UPDATE_PROFILE_ADMIN_FULFILLED = 'PROFILE/UPDATE_PROFILE_ADMIN_FULFILLED';
export const UPDATE_PROFILE_ADMIN_REJECTED = 'PROFILE/UPDATE_PROFILE_ADMIN_REJECTED';
