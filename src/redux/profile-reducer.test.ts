import profileReducer, {actions} from './profile-reducer'

let state = {
    posts: [
        {id: 1, message: 'Hi, are you?', likesCount: 2},
        {id: 2, message: 'It\'s my first post!', likesCount: 12},
        {id: 3, message: 'LOLUK', likesCount: 1338},
        {id: 4, message: 'WTF', likesCount: 0},
        {id: 5, message: 'Hello world!', likesCount: 42}
    ],
    profile: null,
    status: '',
    newPostText: ''
}

it('length of posts should be incremented', () => {

// 1 Готовим исходные данные - test data
    let action = actions.addPostActionCreator('Kamasutra')

// 2 Делаем экшн - action
    let newState = profileReducer(state, action)

// 3 Проверяем ожидание - expectation
    expect(newState.posts.length).toBe(6)
})

it('messege of new post should be correct', () => {
    let action = actions.addPostActionCreator('Kamasutra')
    let newState = profileReducer(state, action)
    expect(newState.posts[2].message).toBe('LOLUK')
})

it('after deleting length should be decrement', () => {
    let action = actions.deletePost(1)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)
})

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    let action = actions.deletePost(1000)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)
})