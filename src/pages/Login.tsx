import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, UserPlus, ArrowRight, Loader2, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import ScrollReveal from "@/components/ScrollReveal";

import { useLang } from "@/lib/language";

const content = {
  en: {
    formCleared: "Form cleared due to 15 minutes of inactivity for your security.",
    emailError: "Only @the-unchain.com email addresses are allowed.",
    passwordMismatch: "Passwords do not match.",
    passwordLength: "Password must be at least 6 characters.",
    verificationSent: "Verification email sent! Please check your inbox.",
    loginSuccess: "Logged in successfully!",
    adminOnboarding: "Admin Onboarding",
    adminPortal: "Admin Portal",
    createAccount: "Create account",
    welcomeBack: "Welcome back",
    signupDesc: "Sign up to access the admin portal and manage content.",
    loginDesc: "Log in to manage the news and access your dashboard.",
    emailLabel: "Email",
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm Password",
    signupBtn: "Sign Up",
    loginBtn: "Login",
    alreadyAccount: "Already have an account? Login",
    noAccount: "Don't have an account? Sign up",
    errorOccurred: "An error occurred.",
    profileSetup: "Complete Your Profile",
    profileDesc: "Please enter your name to continue to the admin portal.",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    completeProfileBtn: "Complete Profile"
  },
  ja: {
    formCleared: "セキュリティのため、15分間操作がなかったためフォームをクリアしました。",
    emailError: "@the-unchain.comのメールアドレスのみ許可されています。",
    passwordMismatch: "パスワードが一致しません。",
    passwordLength: "パスワードは6文字以上である必要があります。",
    verificationSent: "認証メールを送信しました！受信トレイをご確認ください。",
    loginSuccess: "ログインに成功しました！",
    adminOnboarding: "管理者登録",
    adminPortal: "管理者ポータル",
    createAccount: "アカウントを作成",
    welcomeBack: "お帰りなさい",
    signupDesc: "管理者ポータルにアクセスしてコンテンツを管理するためにサインアップしてください。",
    loginDesc: "ニュースを管理し、ダッシュボードにアクセスするためにログインしてください。",
    emailLabel: "メールアドレス",
    passwordLabel: "パスワード",
    confirmPasswordLabel: "パスワード（確認用）",
    signupBtn: "サインアップ",
    loginBtn: "ログイン",
    alreadyAccount: "既にアカウントをお持ちですか？ ログイン",
    noAccount: "アカウントをお持ちでないですか？ サインアップ",
    errorOccurred: "エラーが発生しました。",
    profileSetup: "プロフィールを完了する",
    profileDesc: "管理者ポータルに進むには名前を入力してください。",
    firstNameLabel: "名",
    lastNameLabel: "姓",
    completeProfileBtn: "完了して進む"
  }
};

const Login = () => {
  const navigate = useNavigate();
  const { lang, localePath } = useLang();
  const t = content[lang];
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Profile completion state
  const [needsProfile, setNeedsProfile] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Inactivity timeout for clearing the form (15 minutes)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetActivityTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (email || password || confirmPassword || firstName || lastName) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        toast.info(t.formCleared);
      }
    }, 15 * 60 * 1000); // 15 minutes
  };

  useEffect(() => {
    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((event) => document.addEventListener(event, resetActivityTimeout));
    resetActivityTimeout();

    return () => {
      events.forEach((event) => document.removeEventListener(event, resetActivityTimeout));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [email, password, confirmPassword, firstName, lastName]);

  // Check if active session needs profile completion on load
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        checkProfileRequirement(session.user.id);
      }
    };
    checkSession();
  }, []);

  const checkProfileRequirement = async (uid: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', uid)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data || !data.first_name || !data.last_name) {
        setUserId(uid);
        setNeedsProfile(true);
      } else {
        navigate(localePath("/edit"));
      }
    } catch (err) {
      console.error("Profile check error:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    return email.endsWith("@the-unchain.com");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error(t.emailError);
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        toast.error(t.passwordMismatch);
        return;
      }
      if (password.length < 6) {
        toast.error(t.passwordLength);
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${localePath('/login')}`,
          },
        });

        if (error) throw error;

        toast.success(t.verificationSent);
        setIsSignUp(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast.success(t.loginSuccess);
        
        // Instead of navigating directly, check profile
        await checkProfileRequirement(data.user.id);
      }
    } catch (error: any) {
      toast.error(error.message || t.errorOccurred);
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !firstName.trim() || !lastName.trim()) return;

    setLoading(true);
    try {
      // Upsert profile
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: userId,
          first_name: firstName.trim(),
          last_name: lastName.trim()
        });

      if (error) throw error;
      
      setNeedsProfile(false);
      navigate(localePath("/edit"));
    } catch (error: any) {
      toast.error(error.message || t.errorOccurred);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      <Navigation />

      {/* Main content wrapper with data-nav-theme="light" so Navigation text is dark */}
      <section data-nav-theme="light" className="flex-grow flex flex-col justify-center items-center px-6 pt-32 pb-20 sm:pt-40 sm:pb-24 bg-secondary">
        <div className="w-full max-w-lg z-10">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-border/50 relative w-full text-left transition-transform duration-500 hover:shadow-md">

              {needsProfile ? (
                <>
                  <div className="text-center mb-10 text-light-heading">
                    <span className="label text-light-label mb-3 block">
                      {t.adminOnboarding}
                    </span>
                    <h2 className="heading-2">
                      {t.profileSetup}
                    </h2>
                    <p className="body mt-3 text-light-body max-w-sm mx-auto">
                      {t.profileDesc}
                    </p>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-light-heading ml-1">{t.firstNameLabel}</label>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-light-body transition-colors group-hover:text-primary">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          placeholder={lang === 'ja' ? "太郎" : "John"}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="w-full h-14 px-5 pl-14 rounded-xl text-base bg-secondary/50 border border-transparent outline-none transition-all duration-300 placeholder-light-body/40 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-light-heading ml-1">{t.lastNameLabel}</label>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-light-body transition-colors group-hover:text-primary">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          placeholder={lang === 'ja' ? "山田" : "Doe"}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="w-full h-14 px-5 pl-14 rounded-xl text-base bg-secondary/50 border border-transparent outline-none transition-all duration-300 placeholder-light-body/40 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !firstName.trim() || !lastName.trim()}
                      className="w-full btn-primary mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.completeProfileBtn}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="text-center mb-10 text-light-heading">
                    <span className="label text-light-label mb-3 block">
                      {isSignUp ? t.adminOnboarding : t.adminPortal}
                    </span>
                    <h2 className="heading-2">
                      {isSignUp ? t.createAccount : t.welcomeBack}
                    </h2>
                    <p className="body mt-3 text-light-body max-w-sm mx-auto">
                      {isSignUp ? t.signupDesc : t.loginDesc}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-light-heading ml-1">{t.emailLabel}</label>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-light-body transition-colors group-hover:text-primary">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          placeholder="you@the-unchain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full h-14 px-5 pl-14 rounded-xl text-base bg-secondary/50 border border-transparent outline-none transition-all duration-300 placeholder-light-body/40 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-light-heading ml-1">{t.passwordLabel}</label>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-light-body transition-colors group-hover:text-primary">
                          <Lock size={18} />
                        </div>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full h-14 px-5 pl-14 rounded-xl text-base bg-secondary/50 border border-transparent outline-none transition-all duration-300 placeholder-light-body/40 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                        />
                      </div>
                    </div>

                    {isSignUp && (
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-light-heading ml-1">{t.confirmPasswordLabel}</label>
                        <div className="relative group">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-light-body transition-colors group-hover:text-primary">
                            <Lock size={18} />
                          </div>
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required={isSignUp}
                            className="w-full h-14 px-5 pl-14 rounded-xl text-base bg-secondary/50 border border-transparent outline-none transition-all duration-300 placeholder-light-body/40 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? <><UserPlus size={18} /> {t.signupBtn}</> : <><LogIn size={18} /> {t.loginBtn}</>)}
                    </button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-border/50 text-center">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-sm font-medium text-light-body hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
                    >
                      {isSignUp ? t.alreadyAccount : t.noAccount}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Login;
