import route from "next/router";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import firebase from "../../firebase/config";
import Usuario from "../../model/Usuario";

interface AuthContextProps {
  usuario?: Usuario;
  loginGoogle?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(
  usuarioFirebase: firebase.User
): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName,
    email: usuarioFirebase.email,
    token,
    provedor: usuarioFirebase.providerData[0].providerId,
    imagemUrl: usuarioFirebase.photoURL,
  };
}
<<<<<<< HEAD

function gerenciarCookie(logado: Boolean) {
  if (logado) {
    Cookies.set("admin-template-cod3r-auth", logado, {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-cod3r-auth");
  }
}
=======
>>>>>>> 9fab956c48059c93c5b0cdc23c39fffec61a6fa9

export function AuthProvider(props) {
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState<Usuario>(null);

  async function configurarSessao(usuarioFirebase) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario(null);
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }

  async function loginGoogle() {
    const resp = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    configurarSessao(resp.user);
    route.push("/");
  }

  useEffect(() => {
    const cancelar = firebase.auth().onIdTokenChanged(configurarSessao); // essa função vai dizer quando tiver alguma alteração no browser
    return () => cancelar();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, loginGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
