import { Route, Routes, useNavigate } from 'react-router-dom'
import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useEffect, useState, useCallback } from "react";
import TablatureEditorPLUS from './pages/TablatureEditorPLUS/TablatureEditorPLUS';
import UserPool from "./utils/UserPool";
import * as profileServices from "./services/profileServices"
import Landing from './pages/Landing/Landing';
import Trending from './pages/Trending/Trending';
import Nav from './components/Nav/Nav';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import * as userUtils from "./utils/userUtils"
import Profile from './pages/Profile/Profile';


const UserContext = createContext();

function App() {

    // User needs profile info attached to it
    const [user, setUser] = useState(null)
    let navigate = useNavigate()

    // TODO ---
    const updateTabInUsersTablature = () => console.log('updateTabInUsersTablature')
    const addTabToUsersTablature = () => console.log('addTabToUsersTablature')
    const removeTabFromUsersTablature = () => console.log('removeTabFromUsersTablature')
    // TODO ---

    // Check if there is a user session in local storage
    const getUserSessionFromCognito = useCallback(()=> {
        const getSession = async () => {
            return await new Promise((resolve, reject) => {
                if(user) {
                    user.getSession((error, session) => {
                        if(error) {
                            reject(error);
                        } else {
                            resolve(session);
                        }
                    })
                } else {
                    reject('No user');
                }
            });
        }

        return getSession()

    }, [user]);

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            // 1. Create a user object with email and pool info
            const user = new CognitoUser({
                Username,
                Pool: UserPool
            });

            // 2. Get the authdetails needed to authenticate the user
            const authDetails = new AuthenticationDetails({
                Username,
                Password
            });

            // 3. Check if user is in the pool. The data returned will contain the access tokens.
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log('onSuccess: ', data);
                    setUser(user);
                    resolve(user);
                    navigate(`/profile/${user.username}`)
                },
                onFailure: (error) => {
                    console.error('onFailure: ', error);
                    reject(error);
                },
                newPasswordRequired: (data) => {
                    console.log('newPasswordRequired: ', data);
                    resolve(user);
                },
            });
        });
    };

    const logout = () => {
        if(user) {
            user.signOut();
            setUser(null);
            navigate('/login')
        }
    }

    useEffect(() => {

        if(!user) {
            const userFromPool = UserPool.getCurrentUser()
            setUser(userFromPool)
        }
        
        if(user) {
            const idToken = userUtils.getIdTokenFromUser(user)
            profileServices.getProfileOfLoggedInUser(user.username, idToken)
            .then( (response)=> {
                const profile = response.profile
                setUser( prev => {
                    return { profile, ...prev }
                })
            })

        }
    }, [user])


  return (

    <UserContext.Provider value={{ authenticate, getUserSessionFromCognito, logout, user, setUser }}>
        <Nav />
        <Routes>
            <Route 
                exact
                path='/'
                element={<Trending />}
            />
            <Route 
                exact
                path='/profile/:id'
                element={<Profile />}
            />
            <Route
                exact
                path='/login'
                element={<Landing />}
            />
            <Route
                exact
                path='/tablature/new'
                element={
                    <ProtectedRoute>
                        <TablatureEditorPLUS />
                    </ProtectedRoute>
                }
            />
            <Route
                exact
                path={'/tablature/:id'}
                element={
                    <ProtectedRoute>
                        <TablatureEditorPLUS />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </UserContext.Provider>

  );
}

export {App, UserContext};
