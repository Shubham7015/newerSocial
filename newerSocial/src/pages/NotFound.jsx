import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 overflow-hidden relative">
            {/* Background Elements */}
            <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 270, 0, 0, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                transition={{
                    duration: 12,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                }}
            />

            {/* Main Content */}
            <div className="z-10 text-center">
                <motion.h1
                    className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-right from-blue-600 to-purple-600"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                >
                    404
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Link
                        to="/"
                        className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Go Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

export default NotFound;
