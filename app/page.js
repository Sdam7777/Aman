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
  
  // Input
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
      setMsg("Akun siap! Cek email untuk verifikasi.");
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
        setError("Email belum diverifikasi. Cek inbox Anda.");
      }
    } catch (err) { setError("Email atau Password salah."); }
  };

  // --- UI: LOADING MODERN ---
  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"></div>
      </div>
    </div>
  );

  // --- UI: DASHBOARD (Glass Effect) ---
  if (user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
        {/* Navbar */}
        <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              N E X U S
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400 hidden sm:block">{user.email}</span>
              <button 
                onClick={() => signOut(auth)} 
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded-full text-sm transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="max-w-4xl mx-auto mt-10 p-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-white/5 shadow-2xl">
            <h2 className="text-3xl font-bold mb-2">Selamat Datang</h2>
            <p className="text-slate-400 mb-6">Anda telah masuk ke dalam sistem.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/50 transition-colors group cursor-pointer">
                <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                  📝
                </div>
                <h3 className="font-bold text-lg mb-1">Tulis Berita</h3>
                <p className="text-sm text-slate-500">Mulai membuat konten baru.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/50 transition-colors group cursor-pointer">
                <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="font-bold text-lg mb-1">Statistik</h3>
                <p className="text-sm text-slate-500">Lihat performa berita Anda.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- UI: LOGIN / REGISTER (Modern Gradient Glow) ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 font-sans relative overflow-hidden">
      
      {/* Background Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      <div className="w-full max-w-md p-4 relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-400 text-sm">
              {isLoginMode ? "Enter your credentials to access." : "Get started with your free account."}
            </p>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-center">{error}</div>}
          {msg && <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl mb-6 text-sm text-center">{msg}</div>}

          <form onSubmit={isLoginMode ? handleLogin : handleRegister} className="space-y-5">
            <div>
              <input 
                type="email" 
                className="w-full bg-slate-950/50 border border-slate-700 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                placeholder="name@company.com"
                value={email} onChange={e=>setEmail(e.target.value)} required 
              />
            </div>
            <div>
              <input 
                type="password" 
                className="w-full bg-slate-950/50 border border-slate-700 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                placeholder="••••••••"
                value={password} onChange={e=>setPassword(e.target.value)} required 
              />
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95">
              {isLoginMode ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLoginMode(!isLoginMode)} 
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <span className="text-blue-400 font-semibold">{isLoginMode ? "Sign Up" : "Sign In"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
    }
