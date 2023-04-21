import usersReducer, {actions, InitialStateType} from './users-reducer'

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, followed: false, name: 'Vito',
                status: 'This status Test', photos: {small: null, large: null}
            }, {
                id: 1, followed: false, name: 'Vito1',
                status: 'This status Test 1', photos: {small: null, large: null}
            }, {
                id: 2, followed: true, name: 'Vito2',
                status: 'This status Test 2', photos: {small: null, large: null}
            }, {
                id: 3, followed: true, name: 'Vito3',
                status: 'This status Test 3', photos: {small: null, large: null}
            }
        ],
        pageSize: 50,
        totalUserCounter: 0,
        currentPage: 1,
        filter: {
            term: '',
            friend: null as null | boolean
        },
        isFetching: false,
        followingInProgress: []
    }
})


test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})