import {
    registerStart,
    registerSuccess,
    registerFailed
} from "./authSlice";
import axios from "axios";

export const register = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("https://localhost:7181/api/Auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (err) {
        console.log(err);
        dispatch(registerFailed("Something is wrong"));
    }
};