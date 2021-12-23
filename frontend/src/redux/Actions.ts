export interface UserData {

  progress: boolean,
  loading: boolean,
  posts: Object
}

export interface Store {
  userDataReducer: UserData
}

export interface Events {
  title: string,
  date: string,
  notes: string,
  bunting: boolean
}

export interface Posts {

}
