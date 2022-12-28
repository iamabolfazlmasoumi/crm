import { useState } from "react";
import crmVideo from "../assets/crm1.mp4";
import saipalogo from "../assets/images/logo.png";
import { EyeIcon, EyeSlashIcon, UserIcon } from "@heroicons/react/24/solid";
const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    return (
        <>
            <div className="container grid min-h-screen min-w-full grid-cols-1 overflow-hidden md:grid-cols-3">
                <div className="flex w-full flex-col justify-center">
                    <img
                        width={64}
                        height={64}
                        src={saipalogo}
                        className="self-center pb-4"
                        alt="crm-saipa"
                    />
                    <h1 className="pb-8 text-center font-IRANSansBold text-[2rem]">
                        سامانه مدیریت امور مشتریان{" "}
                        <span className="text-primary">سایپا</span>
                    </h1>
                    <h1 className="pb-8 text-center font-IRANSans text-[2rem]">
                        ورود
                    </h1>
                    <form className="container flex flex-col">
                        <section className="relative flex">
                            <input
                                type="text"
                                className="m-2 w-full shadow-md shadow-slate-200 rounded-md border border-gray-300 p-3 font-IRANSans text-[1.3rem] text-sm outline-none transition focus-within:border-gray-400 focus-within:bg-slate-200"
                                placeholder="نام کاربری"
                            />
                            <UserIcon className="absolute left-8 top-6 h-[18px] w-[18px] font-IRANSansBold text-gray-500" />
                        </section>
                        <section className="relative flex">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="m-2 w-full shadow-md shadow-slate-200 rounded-md border border-gray-300 p-3 font-IRANSans text-[1.3rem] text-sm outline-none transition focus-within:border-gray-400 focus-within:bg-slate-200"
                                placeholder="رمز عبور"
                            />
                            {showPassword ? (
                                <EyeSlashIcon
                                    onClick={handleShowPassword}
                                    className="absolute left-8 top-6 h-[18px] w-[18px] font-IRANSansBold text-gray-500"
                                />
                            ) : (
                                <EyeIcon
                                    onClick={handleShowPassword}
                                    className="absolute left-8 top-6 h-[18px] w-[18px] font-IRANSansBold text-gray-500"
                                />
                            )}
                        </section>
                        <section className="relative flex">
                            <button className="m-1 w-full shadow-sm shadow-primary rounded-md bg-primary p-4 font-IRANSans text-[1.4rem] text-white transition hover:bg-orange-500">
                                ورود
                            </button>
                        </section>
                    </form>
                    <section className="relative flex">
                        <a
                            href="/"
                            className="m-1 p-4 font-IRANSans text-xl text-blue-400"
                        >
                            رمز عبور خود را فراموش کرده ام!
                        </a>
                    </section>
                </div>
                <div className="bg-login relative col-span-2 m-auto hidden md:block ">
                    <video autoPlay muted id="myVideo">
                        <source src={crmVideo} type="video/mp4" />
                    </video>
                </div>
            </div>
        </>
    );
};

export default Login;
