// import { createContext, useContext, useState } from "react";
// import { ISignupResType } from "../schema/authSchema";

// interface IUserContextType {
//   user: ISignupResType;
//   setUser: React.Dispatch<React.SetStateAction<ISignupResType>>;
// }

// const UserContext = createContext<IUserContextType | null>(null);

// function UserProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<ISignupResType>(
//     null as unknown as ISignupResType,
//   );

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// function useCurrentUser() {
//   const context = useContext(UserContext);

//   if (!context) {
//     throw new Error(
//       "💥 Error : You used the current user context out of scope",
//     );
//   }
//   return context;
// }

// export { useCurrentUser, UserProvider };
