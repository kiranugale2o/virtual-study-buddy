/** @type {import('next').NextConfig} */
import { io } from "socket.io-client";
const nextConfig = {};

const socket = io("http://localhost:3000"); // Use the correct port

export default nextConfig;
