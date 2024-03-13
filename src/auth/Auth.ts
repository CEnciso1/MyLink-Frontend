import react from "react";
export interface auth {
  isAuthenticated: Boolean;
  loading: Boolean;
  setIsAuthenticated: react.Dispatch<react.SetStateAction<boolean>>;
  userData: {
    _id: string;
    email: string;
    username: string;
    password: string;
    __v: null;
    links: any[];
  };
  setUserData: react.Dispatch<
    react.SetStateAction<{
      _id: string;
      email: string;
      username: string;
      password: string;
      __v: null;
      links: any[];
    }>
  >;
}
// _id: null,
//     email: null,
//     username: null,
//     password: null,
//     __v: null,
//     links: null,
// _id: String;
//       email: String;
//       username: String;
//       password: String;
//       __v: Number;
//       links: Array<any>;
