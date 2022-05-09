let state = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, are you?', likesCount: 2},
            {id: 2, message: 'It\'s my first post!', likesCount: 12},
            {id: 3, message: 'LOLUK', likesCount: 1338},
            {id: 4, message: 'WTF', likesCount: 0},
            {id: 5, message: 'Hello world!', likesCount: 42}
        ]
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
}

export let addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0
    }

    state.profilePage.posts.push(newPost)
}

export default state