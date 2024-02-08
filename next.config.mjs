/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: "/api/hello", // Adjust the path to match your API routes
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "https://canibeyours.com", // Set to your app's domain
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type",
					},
				],
			},
		];
	},
};

export default nextConfig;
