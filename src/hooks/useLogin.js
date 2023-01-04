import { useEffect, useState } from "react";
import * as RemoteLoginService from "../services/remoteLoginService";
import * as LocalStatusService from "../services/localStatusService";
import { toast } from "react-toastify";

const initialLogged = LocalStatusService.get();

const useLogin = () => {
  const [user, setUser] = useState(initialLogged);
  const [profile, setProfile] = useState(null);

  const loginWithEmail = async (userData) => {
    try {
      const { email, password } = userData;
      await RemoteLoginService.loginWithEmail(email, password);
    } catch (error) {
      loggerWithToast(error);
    }
  };

  const registerWithEmail = async (userData) => {
    try {
      const { email, password } = userData;
      await RemoteLoginService.registerWithEmail(email, password);
    } catch (error) {
      loggerWithToast(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await RemoteLoginService.loginWithGoogle();
    } catch (error) {
      loggerWithToast(error);
    }
  };

  const loginWithFacebook = async () => {
    try {
      await RemoteLoginService.loginWithFacebook();
    } catch (error) {
      loggerWithToast(error);
    }
  };

  const onStatusChanged = () => {
    return RemoteLoginService.onStatus((userLogged) => {
      console.log(userLogged);
      const isLogged = !!userLogged;

      const statusText = isLogged ? "USER_LOGGED" : "USER_NOT_LOGGED";

      LocalStatusService.save(isLogged);
      setUser(isLogged);

      console.log(`[ ✅ ${statusText} ✅ ]`);

      if (isLogged) setProfile((_) => ({ ...userLogged }));
    });
  };

  const verifyEmail = () =>
    RemoteLoginService.verifyEmail().catch(loggerWithToast);

  const logout = async () => {
    await RemoteLoginService.logout().catch(loggerWithToast);
    console.log(profile);
  };

  useEffect(() => {
    const cleanUp = onStatusChanged();
    // let effectId = Math.round(Math.random() * 1000 + 1);
    // console.log("💰 [MOUNT] 💰 ", effectId);
    return () => {
      // console.log("❌ [UNMOUNT] ❌ ", effectId);
      cleanUp();
    };
  }, []);

  return {
    logout,
    profile,
    verifyEmail,
    //
    user,
    //
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithFacebook,
  };
};

export default useLogin;

const loggerWithToast = (err) => {
  toast(err.code, { type: "error" });
  console.log(err);
};
