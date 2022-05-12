let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, are you?', likesCount: 2},
                {id: 2, message: 'It\'s my first post!', likesCount: 12},
                {id: 3, message: 'LOLUK', likesCount: 1338},
                {id: 4, message: 'WTF', likesCount: 0},
                {id: 5, message: 'Hello world!', likesCount: 42}
            ],
            newPostText: 'Your text in a new post...'
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are u?'},
                {id: 3, message: 'Yo'}
            ],
            dialogs: [
                {id: 1, name: 'Vito'},
                {id: 2, name: 'Max'},
                {id: 3, name: 'Li'},
                {id: 4, name: 'Eva'},
                {id: 5, name: 'Crazy'}
            ]
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('just text')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(this._state)
        }
    }
}

export default store
window.store = store