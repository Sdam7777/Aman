"use client";
import { useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  sendEmailVerification 
} from "firebase/auth";
import { auth } from "./firebase"; 

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setMsg("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);
      setMsg("Akun dibuat! Cek email untuk verifikasi.");
      setIsLoginMode(true);
    } catch (err) { setError(err.message); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (!cred.user.emailVerified) {
        await signOut(auth);
        setError("Email belum diverifikasi! Cek inbox.");
      }
    } catch (err) { setError("Email atau Password salah!"); }
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-black text-white">Loading...</div>;

  if (user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">Dashboard Berita</h1>
        <p>Login sebagai: {user.email}</p>
        <p className="text-green-400 text-sm mb-6">Status: Terverifikasi ✅</p>
        <button onClick={() => signOut(auth)} className="bg-red-600 px-4 py-2 rounded">Keluar</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLoginMode ? "Login" : "Daftar"}</h2>
        {error && <div className="bg-red-900/50 p-2 mb-2 text-sm text-red-200 rounded">{error}</div>}
        {msg && <div className="bg-green-900/50 p-2 mb-2 text-sm text-green-200 rounded">{msg}</div>}
        
        <form onSubmit={isLoginMode ? handleLogin : handleRegister} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full bg-gray-800 p-3 rounded border border-gray-700" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full bg-gray-800 p-3 rounded border border-gray-700" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-600 p-3 rounded font-bold hover:bg-blue-700">{isLoginMode ? "Masuk" : "Daftar"}</button>
        </form>
        <button onClick={() => setIsLoginMode(!isLoginMode)} className="block w-full text-center mt-4 text-gray-400 text-sm hover:text-white">
          {isLoginMode ? "Belum punya akun? Daftar" : "Sudah punya akun? Login"}
        </button>
      </div>
    </div>
  );
}
