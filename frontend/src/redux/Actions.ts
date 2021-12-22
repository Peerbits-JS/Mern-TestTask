export interface UserData {

  progress: boolean,
  loading: boolean,
  posts: Object
}

export interface Store {
  userDataReducer: UserData
}

export interface Posts {
  id: number,
  body: String,
  title: String,
  userId: number
}
